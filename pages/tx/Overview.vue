<template>
  <TwoColTable :rows="transactionDetails" :header="'Transaction Details'">
  </TwoColTable>
  <div style="height: 40px"></div>
  <TwoColTable :rows="devInfo" :header="'Developer Info'">
    <template v-slot:exec>
      <div class="flex flex-col p-1">
        <div class="block mb-1">
          <Btn
            v-if="execRes?.steps"
            :value="`${execRes?.steps} STEPS`"
            :color="'GREEN'"
          />
        </div>
        <div>
          <Btn
            v-if="execRes?.pedersen_builtin_applications"
            :value="`${execRes?.pedersen_builtin_applications} PEDERSEN_BUILTIN`"
            :color="'ORANGE'"
            class="mr-1"
          />
          <Btn
            v-if="execRes?.range_check_builtin_applications"
            :value="`${execRes?.range_check_builtin_applications} RANGE_CHECK_BUILTIN`"
            :color="'ORANGE'"
          />
        </div>
      </div>
    </template>
    <template v-slot:calldata>
      <div class="my-2">
        <MultiBtn
          :id="'a'"
          :values="callDataBtns"
          :active-btn-slug="callDataBtns[0].slug"
        />
      </div>
      <div class="block w-full bg-shd-37 p-2 my-2">
        <MultiBtn
          :id="'b'"
          :values="dataFormat"
          :active-btn-slug="dataFormat[0].slug"
          @btn-clicked="formatChanged"
          class="mr-2"
        />
        <MultiBtn
          :id="'c'"
          :values="encryption"
          :active-btn-slug="encryption[1].slug"
        />
        <br />
        <CallDataTable
          class="mt-2"
          :data-arr="txn?.meta?.calldata ?? []"
          v-if="txnStore.getDataFormat"
        />
      </div>
    </template>
  </TwoColTable>
</template>
<script setup lang="ts">
import type { ExecutionResources } from '~/utils/models';
import type { Block } from '~/utils/models/Block';
import type { Transaction } from '~/utils/models/Transaction';
import CallDataTable from './CallDataTable.vue';

import { useTxnStore } from '~/stores.ts/Txn';
const txnStore = useTxnStore();

const { block, txn, execRes, ethToUsd } = defineProps<{
  txn: Transaction | null;
  block: Block | null;
  execRes: ExecutionResources | null;
  ethToUsd: number;
}>();

const transactionDetails = computed(() => {
  const actualFeeInHex = txn?.actualFeeAmount;
  const unit = txn?.actualFeeUnit;
  const maxFeeInHex = txn?.maxFee;

  const feeData = getEth(actualFeeInHex ?? '', unit ?? '', ethToUsd);
  const maxFeeData = getEth(maxFeeInHex ?? '', unit ?? '', ethToUsd)
  
  return [
    {
      name: 'Block Number',
      value: block?.blockNumber,
      isLink: true,
    },
    {
      name: 'Timestamp',
      value: `${getTimeFromNow(block?.timestamp ?? null)} ( ${getFormattedDate(block?.timestamp ?? null)} )`,
      isLink: false,
    },
    {
      name: 'Actual Fee',
      value: `${feeData?.eth ?? '-'} ETH (${feeData?.usd ?? '-'} USD)`,
      isLink: false,
    },
    {
      name: 'Max Fee',
      value: `${maxFeeData?.eth ?? '-'} ETH (${maxFeeData?.usd ?? '-'} USD)`,
      isLink: false,
    },
    {
      name: 'Gas Consumed',
      value: '-',
      isLink: false,
    },
    {
      name: 'Tokens Transferred',
      value: '-',
      isLink: false,
    },
    {
      name: 'Sender Address',
      value: txn?.senderAddress,
      isLink: true,
    },
    {
      name: 'Class Hash',
      value: '-',
      isLink: false,
    },
  ];
});

const devInfo = computed(() => [
  {
    name: 'Unix Timestamp',
    value: block?.timestamp,
  },
  {
    name: 'Nonce',
    value: txn?.nonce,
  },
  {
    name: 'Position',
    value: txn?.position,
  },
  {
    name: 'Version',
    value: '-',
  },
  {
    name: 'L1 Txn Hash',
    value: '-',
  },
  {
    name: 'Execution Resources',
    colSlug: 'exec',
  },
  {
    name: 'Selector',
    value: '-',
  },
  {
    name: 'Calldata',
    colSlug: 'calldata',
    noFlexOnValue: true,
  },
]);

const callDataBtns = [
  { name: 'Calls', slug: 'calls' },
  { name: 'Transaction', slug: 'transaction' },
];

const dataFormat = [
  { name: 'Hex', slug: 'hex' },
  { name: 'Dec', slug: 'dec' },
  { name: 'Text', slug: 'text' },
];

const encryption = [
  { name: 'Decoded', slug: 'decoded' },
  { name: 'Raw', slug: 'raw' },
];

const formatChanged = (format: string) => {
  txnStore.setDataFormat(format);
};
</script>
