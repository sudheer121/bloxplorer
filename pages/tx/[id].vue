<template>
  <div v-if="!txnStore.loading" class="p-8 rounded bg-base-100">
    <div class="flex flex-row align-center" style="min-height: 80px">
      <h3 class="font-medium" style="font-size: 22px">Transaction</h3>
      <div></div>
    </div>
    <div class="grid grid-cols-4 gap-y-6 mb-3">
      <div class="col-span-4">
        <div class="text-xs" style="color: rgb(170, 170, 170)">HASH</div>
        <div class="text-base leading-8">
          {{ txn?.transactionHash }}
        </div>
      </div>
      <div class="col-span-1">
        <div class="text-xs" style="color: rgb(170, 170, 170)">TYPE</div>
        <div>
          <TxnTypeBtn :txn-type="txn?.type ?? null" />
        </div>
      </div>
      <div class="col-span-1">
        <div class="text-xs" style="color: rgb(170, 170, 170)">TIMESTAMP</div>
        <div></div>
      </div>
      <div class="col-span-4">
        <div class="text-xs mb-2" style="color: rgb(170, 170, 170)">STATUS</div>
        <div class="flex">
          <div
            class="btn btn-sm btn-rounded py-1 pl-3 pr-2 rounded-3xl font-medium text-white"
            style="background: rgb(17, 125, 73)"
          >
            <div>
              <img src="~/assets/tick.svg" width="16" height="16" alt="" />
            </div>
            <div style="font-size: 11px; line-height: 11px">Received</div>
          </div>
          <div class="w-8 flex flex-col justify-center align-center">
            <div style="background: rgb(17, 125, 73); height: 2px"></div>
          </div>
          <div
            class="btn btn-sm btn-rounded py-1 pl-3 pr-2 rounded-3xl font-medium text-white"
            style="background: rgb(17, 125, 73)"
          >
            <div>
              <img src="~/assets/tick.svg" width="16" height="16" alt="" />
            </div>
            <div style="font-size: 11px; line-height: 11px">Accepted On L2</div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex flex-row h-14 gap-x-10 mb-8 items-center align-middle font-medium"
      
    >
      <a 
        v-for="tab in tabs"
        class="h-14" 
        style="line-height: 56px"
        :class="activeTab === tab.slug ? 'border-b-2 border-shd-75 border-bdr-orng-1' : 'hover:border-b-2 hover:border-bdr-orng-2'"
        @click="activeTab = tab.slug"
      >
        <div class="align-middle">{{ tab.name }}</div>
      </a>
    </div>
    <div v-if="activeTab === tabs[0].slug">
      <TwoColTable :rows="transactionDetails" :header="'Transaction Details'"/>
      <div style="height: 40px;"></div>
      <TwoColTable :rows="devInfo" :header="'Developer Info'"/>
    </div>
  </div>
</template>

<script setup lang="ts">
const tabs = [
  {
    name: 'Overview',
    slug: 'overview'
  },
  {
    name: 'Events',
    slug: 'events'
  }
]
const activeTab = useState('activeTab', () => tabs[0].slug);
import { useTxnStore } from '~/stores.ts/Txn';
import type { Block } from '~/utils/models/Block';
import type { Transaction } from '~/utils/models/Transaction';

const route = useRoute();
const txnStore = useTxnStore();

const txn = computed((): Transaction | null => {
  return txnStore.transaction;
});
const block = computed((): Block | null => {
  return txn.value?.block ?? null;
})


const transactionDetails = computed(() => [
  {
    name: 'Block Number',
    value: block.value?.blockNumber,
    isLink: true
  },
  {
    name: 'Timestamp',
    value: block.value?.timestamp,
    isLink: false
  },
  {
    name: 'Actual Fee',
    value: '-',  
    isLink: false
  },
  {
    name: 'Max Fee',
    value: txn?.value?.maxFee,  
    isLink: false
  },
  {
    name: 'Gas Consumed',
    value: '-',  
    isLink: false
  },
  {
    name: 'Tokens Transferred',
    value: '-',  
    isLink: false
  },
  {
    name: 'Contract Address',
    value: txn.value?.senderAddress,
    isLink: false
  },
  {
    name: 'Class Hash',
    value: '-',
    isLink: false
  }
]);

const devInfo = computed(() => [
  {
    name: 'Unix Timestamp',
    value: block.value?.timestamp,
  },
  {
    name: 'Nonce',
    value: txn?.value?.nonce,
  },
  {
    name: 'Position',
    value: txn?.value?.position,
  },
  {
    name: 'Version',
    value: '-',
  },
  {
    name: 'L1 Txn Hash',
    value: '-',
  }
])

onMounted(async () => {
  await txnStore.getTxn(route.params.id as string);
});
</script>
