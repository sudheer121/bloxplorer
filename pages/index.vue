<template>
  <div
    data-theme="dark"
    class="bg-neutral p-8"
    style="border-color: rgb(75, 75, 75)"
    @scroll="onScroll"
  >
    <div class="border-inherit p-8 rounded bg-base-100">
      <h2 class="font-medium" style="font-size: 22px">Transactions</h2>
      <h3 class="text-sm">A list of transactions on Starknet</h3>

      <div class="mt-5 w-1/2 mb-6">
        <div class="join flex rounded-sm">
          <button
            v-for="filter in txnFilters"
            :key="filter"
            class="join-item btn btn-sm font-normal text-white border"
            :style="{
              backgroundColor:
                activeTxnType === filter ? 'rgb(75,75,75)' : 'rgb(27, 27, 27)',
              borderColor: 'rgb(75,75,75)',
            }"
            @click="txnTypeClicked(filter)"
          >
            {{ filter.toLocaleLowerCase() }}
          </button>
        </div>
      </div>

      <table class="table w-full">
        <thead>
          <tr
            style="border-color: rgb(75, 75, 75)"
            class="border border-top border-x-0"
          >
            <th
              v-for="col in columns"
              :key="col.accessorKey"
              class="font-medium"
            >
              {{ col.header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in txnStore.getTransactions"
            :key="row.id"
            style="border-color: rgb(75, 75, 75)"
          >
            <td>
              <img
                v-if="row.type === BlockStatus.ACCEPTED_ON_L2"
                src="~/assets/l2.svg"
              />
              <img v-else src="~/assets/l1.svg" />
            </td>
            <td>{{ row.transactionHash }}</td>
            <td>
              <div
                class="py-1 px-2 text-xs inline-block rounded border"
                :style="{
                  color: txnToStyleMap[row.type].color,
                  borderColor: txnToStyleMap[row.type].borderColor,
                  backgroundColor: txnToStyleMap[row.type].backgroundColor,
                }"
              >
                {{ row.type }}
              </div>
            </td>
            <td>...</td>
            <td>{{ row.block.blockNumber }}</td>
            <td>{{ row.block.timestamp }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="txnStore.loading" class="text-center p-5">
        <span class="loading loading-infinity loading-lg"></span>
      </div>
      <div v-if="txnStore.endOfPages" class="text-center p-5">
        <span> End Of Page </span> 
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useTxnListStore } from '~/stores.ts/transaction';
import {
  BlockStatus,
  TransactionTypeMap,
  getTransactionTypeFromInt,
  type TransactionType,
} from '~/utils/models/index';
const activeTxnType = useState('activeTxnType', () => 'All');
const router = useRouter();
const config = useRuntimeConfig();
const txnStore = useTxnListStore();

onMounted(() => {
  const route = useRoute();
  const txnTypeInt = route.query['type']
    ? parseInt(route.query['type'] as string)
    : -1;
  const txnType = getTransactionTypeFromInt(txnTypeInt);
  txnStore.getNextPage(txnType ? {type: txnType}: {});
  window.onscroll = onScroll;
});

const onScroll =  ()  => {
  const reachedEnd = window.innerHeight + window.scrollY >= document.body.offsetHeight;
  let filterObj:TxnListFilter = {loadNext: true}
  if(activeTxnType.value !== 'All'){
    filterObj.type = activeTxnType.value
  }
  if (reachedEnd && !txnStore.endOfPages) {
    txnStore.getNextPage(filterObj);
  }
}

const txnToStyleMap: Record<TransactionType, any> = {
  DECLARE: {
    borderColor: 'rgb(107, 125, 7)',
    backgroundColor: 'rgb(32, 46, 38)',
    color: 'rgb(254, 255, 181)',
  },
  DEPLOY: {
    borderColor: 'rgb(60, 80, 110)',
    backgroundColor: 'rgb(34, 54, 85)',
    color: 'rgb(210, 229, 255)',
  },
  DEPLOY_ACCOUNT: {
    borderColor: 'rgb(60, 80, 110)',
    backgroundColor: 'rgb(34, 54, 85)',
    color: 'rgb(210, 229, 255)',
  },
  INVOKE: {
    borderColor: 'rgb(46, 76, 60)',
    backgroundColor: 'rgb(32, 46, 38)',
    color: 'rgb(130, 244, 187)',
  },
  L1_HANDLER: {
    borderColor: 'rgb(94, 94, 94)',
    backgroundColor: 'rgb(56, 56, 56)',
    color: 'rgb(255, 255, 255)',
  },
};
const txnFilters = ['All', ...Object.keys(txnToStyleMap)];

const initCols = [
  {
    accessorKey: 'status',
    header: 'STATUS',
    size: 60,
  },
  {
    accessorKey: 'hash',
    header: 'HASH',
    size: 60,
  },
  {
    accessorKey: 'type',
    header: 'TYPE',
    size: 60,
  },
  {
    accessorKey: 'operations',
    header: 'OPERATIONS',
    size: 60,
  },
  {
    accessorKey: 'block',
    header: 'BLOCK',
    size: 60,
  },
  {
    accessorKey: 'age',
    header: 'AGE',
    size: 60,
  },
];

const initRows = [
  {
    id: 1,
    status: 'declare',
    hash: '0x123',
    type: 'L1_HANDLER',
    operations: '0x123',
    block: '0x123',
    age: '0x123',
  },
  {
    id: 2,
    status: 'declare',
    hash: '0x123',
    type: 'INVOKE',
    operations: '0x123',
    block: '0x123',
    age: '0x123',
  },
];

const txnTypeClicked = async (txnTypeSlug: TransactionType) => {
  activeTxnType.value = txnTypeSlug;
  const typeInt =
    txnTypeSlug === 'All'
      ? undefined
      : TransactionTypeMap[txnTypeSlug].toString();
  appendQueryParamsToUrl(typeInt ? { type: typeInt } : {});
  await txnStore.getNextPage(typeInt ? { type: txnTypeSlug } : {});
};

const appendQueryParamsToUrl = (queryObj: any) => {
  router.push({ query: queryObj, path: '' });
};

const columns = useState('columns', () => initCols);
const rows = useState('rows', () => initRows);
</script>
