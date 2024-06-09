<template>
  <div class="p-8 rounded bg-base-100 min-h-screen">
    <h2 class="font-medium" style="font-size: 22px">Transactions</h2>
    <h3 class="text-sm">A list of transactions on Starknet</h3>

    <div class="mt-5 mb-6">
      <div class="join flex rounded-sm">
        <MultiBtn :values="txnFilters" @btn-clicked="txnTypeClicked" />
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
          <td>
            <div class="flex">
              <span class="text-lnk-1 hover:text-lnk-2">
                <NuxtLink :to="`/tx/${row.transactionHash}`">
                  {{ getShortHand(row.transactionHash) }}
                </NuxtLink>
              </span>
              <div class="flex flex-col justify-center ml-1">
                <div>
                  <img src="~/assets/copy.svg" width="14" alt="copy" />
                </div>
              </div>
            </div>
          </td>
          <td>
            <TxnTypeBtn :txn-type="row.type" />
          </td>
          <td>...</td>
          <td>{{ row.block.blockNumber }}</td>
          <td>{{ getTimeFromNow(row?.block?.timestamp ?? 0) }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="txnStore.loading" class="text-center p-5">
      <span class="loading loading-infinity loading-lg"></span>
    </div>
    <div
      v-if="txnStore.endOfPages && !txnStore.loading"
      class="text-center p-5"
    >
      <span> End Of Page </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import TxnTypeBtn from '~/components/TxnTypeBtn.vue';
import { useTxnListStore } from '~/stores.ts/TxnList';
import { getTimeFromNow } from '~/utils/time';
import {
  BlockStatus,
  TransactionTypeMap,
  getTransactionTypeFromInt,
  type TransactionType,
} from '~/utils/models/index';
const activeTxnType = useState('activeTxnType', () => '');
const router = useRouter();
const txnStore = useTxnListStore();

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

  let filterObj: TxnListFilter = { loadNext: true, ...filterObject.value };
  if (reachedEnd && !txnStore.endOfPages) {
    txnStore.getNextPage(filterObj);
  }
};

const txnFilters = ['All', ...Object.keys(TransactionTypeMap)].map((value) => {
  return {
    name: value.toLocaleLowerCase(),
    slug: value,
  };
});

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
  txnStore.clearList();
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
