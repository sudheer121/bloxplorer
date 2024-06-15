<template>
  <div v-if="!txnStore.loading" class="p-8 rounded bg-base-100">
    <div class="flex flex-row align-center" style="min-height: 80px">
      <h3 class="font-medium" style="font-size: 22px">Transaction</h3>
      <div></div>
    </div>
    <div class="grid grid-cols-4 gap-y-6 mb-3">
      <div class="col-span-4">
        <div class="text-xs" style="color: rgb(170, 170, 170)">HASH</div>
        <div class="text-base flex flex-row leading-8">
          <div>{{ txn?.transactionHash }}</div>
          <Copy :value="txn?.transactionHash ?? ''" :width="16" />
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
        <div>{{ getFormattedDate(block?.timestamp ?? null) }}</div>
      </div>
      <div class="col-span-4">
        <div class="text-xs mb-2" style="color: rgb(170, 170, 170)">STATUS</div>
        <div class="flex">
          <div
            class="btn bg-success hover:bg-success btn-sm btn-rounded py-1 pl-3 pr-2 rounded-3xl font-medium text-white"
          >
            <div>
              <img src="~/assets/tick.svg" width="16" height="16" alt="" />
            </div>
            <div style="font-size: 11px; line-height: 11px">{{ getReadableStatus(txn?.executionStatus ?? '') }}</div>
          </div>
          <div class="w-8 flex flex-col justify-center align-center">
            <div style="background: rgb(17, 125, 73); height: 2px"></div>
          </div>
          <div
            class="btn btn-sm bg-success hover:bg-success btn-rounded py-1 pl-3 pr-2 rounded-3xl font-medium text-white"
          >
            <div>
              <img src="~/assets/tick.svg" width="16" height="16" alt="" />
            </div>
            <div style="font-size: 11px; line-height: 11px"> {{ getReadableStatus(txn?.finalityStatus ?? '') }}</div>
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
        :class="
          activeTab === tab.slug
            ? 'border-b-2 border-bdr-orng-1'
            : 'hover:border-b-2 hover:border-bdr-orng-2'
        "
        @click="activeTab = tab.slug"
      >
        <div class="align-middle">{{ tab.name }}</div>
      </a>
    </div>
    <div v-if="activeTab === 'overview'">
      <Overview
        :txn="txn"
        :block="block"
        :exec-res="execRes"
        :eth-to-usd="txnStore.ethToUsd"
      />
    </div>
    <div v-if="activeTab === 'events'">
      <EventsTable
        :events="txn?.meta?.events ?? []"
        :block-no="block?.blockNumber ?? -1"
        :txn-index="txn?.position ?? -1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const tabs = [
  {
    name: 'Overview',
    slug: 'overview',
  },
  {
    name: 'Events',
    slug: 'events',
  },
];
const activeTab = useState('activeTab', () => tabs[0].slug);
import { useTxnStore } from '~/stores.ts/Txn';
import type { ExecutionResources } from '~/utils/models';
import type { Block } from '~/utils/models/Block';
import type { Transaction } from '~/utils/models/Transaction';
import { getFormattedDate } from '~/utils/time';
import Overview from './Overview.vue';
import EventsTable from './EventsTable.vue';

const route = useRoute();
const txnStore = useTxnStore();

const txn = computed((): Transaction | null => {
  return txnStore.transaction;
});
const block = computed((): Block | null => {
  return txn.value?.block ?? null;
});
const execRes = computed((): ExecutionResources | null => {
  return txn.value?.meta?.executionResources ?? null;
});

onMounted(async () => {
  await txnStore.getTxn(route.params.id as string);
});

const getReadableStatus = (status: string) => {
  console.log(status, typeof status)
  let statuses = status.split('_').map((s) => {
    s = s.toLowerCase()
    return s.charAt(0).toUpperCase() + s.slice(1)
  });
  return statuses.join(" ")
}
</script>
