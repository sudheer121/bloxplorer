<template>
  <div class="p-8 rounded bg-base-100">
    <h2 class="font-medium" style="font-size: 22px">Transactions</h2>
    <h3 class="text-sm">A list of transactions on Starknet</h3>

    <div class="mt-5 w-1/2 mb-6">
      <div class="join flex rounded-sm">
        <button
          v-for="filter in txnFilters"
          :key="filter"
          class="join-item btn btn-sm font-normal text-white border border-shd-75 hover:border-shd-75 hover:bg-shd-56"
          :class="activeTxnType === filter ? 'bg-shd-75' : 'bg-shd-27'"
          @click="txnTypeClicked(filter)"
        >
          {{ filter.toLocaleLowerCase() }}
        </button>
      </div>
    </div>

    <table class="table w-full">
      <colgroup>
        <col span="1" style="width: 7%" />
        <col span="1" style="width: 20%" />
        <col span="1" style="width: 14%" />
        <col span="1" style="width: 33%" />
        <col span="1" style="width: 13%" />
        <col span="1" style="width: 13%" />
      </colgroup>
      <thead>
        <tr class="border border-top border-x-0 border-shd-75">
          <th v-for="col in columns" :key="col.accessorKey" class="font-medium">
            {{ col.header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in txnStore.getTransactions"
          :key="row.id"
          class="border-shd-75"
        >
          <td>
            <img
              v-if="row.type === BlockStatus.ACCEPTED_ON_L2"
              src="~/assets/l2.svg"
            />
            <img v-else src="~/assets/l1.svg" />
          </td>
          <td>{{ getShortHand(row.transactionHash) }}</td>
          <td>
            <TxnTypeBtn :txn-type="row.type" />
          </td>
          <td>...</td>
          <td>{{ row.block.blockNumber }}</td>
          <td>{{ getTimeStamp(row?.block?.timestamp ?? 0) }}</td>
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
</template>
<script setup lang="ts">
import moment from 'moment';
import TxnTypeBtn from '~/components/TxnTypeBtn.vue';
import { useTxnListStore } from '~/stores.ts/transaction';
import type { Transaction } from '~/utils/models/Transaction';
import {
  BlockStatus,
  TransactionTypeMap,
  getTransactionTypeFromInt,
  type TransactionType,
} from '~/utils/models/index';
const activeTxnType = useState('activeTxnType', () => '');
const router = useRouter();
const txnStore = useTxnListStore();

const getTimeStamp = (unixEpoch: number) => {
  if (!unixEpoch) return '-';
  return moment.unix(unixEpoch).fromNow();
};

const getShortHand = (str: string) => {
  if (!str) return '-';
  return str.slice(0, 6) + '...' + str.slice(-4);
};

const getTxnTypeFromRoute = computed(() => {
  const route = useRoute();
  const txnTypeInt = route.query['type']
    ? parseInt(route.query['type'] as string)
    : -1;
  return getTransactionTypeFromInt(txnTypeInt) ?? 'All';
});

const filterObject = computed(() => {
  if (activeTxnType.value === 'All') return {};
  return { type: activeTxnType.value };
});

onMounted(() => {
  activeTxnType.value = getTxnTypeFromRoute.value;
  let filterObj: TxnListFilter = { loadNext: true, ...filterObject.value };
  txnStore.getNextPage(filterObj);
  window.onscroll = onScroll;
});

const onScroll = () => {
  const reachedEnd =
    window.innerHeight + window.scrollY >= document.body.offsetHeight;
  console.log(filterObject.value);
  let filterObj: TxnListFilter = { loadNext: true, ...filterObject.value };
  if (reachedEnd && !txnStore.endOfPages) {
    txnStore.getNextPage(filterObj);
  }
};

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
</script>
