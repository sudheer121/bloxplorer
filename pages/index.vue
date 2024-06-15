<template>
  <div class="p-8 rounded bg-base-100 min-h-screen">
    <div class="pb-6">
      <h2 class="font-medium text-white" style="font-size: 22px">
        Transactions
      </h2>
      <h3 class="text-sm text-shd-202">A list of transactions on Starknet</h3>
    </div>

    <div class="mt-5 mb-6">
      <div class="join flex rounded-sm">
        <MultiBtn
          :values="txnFilters"
          @btn-clicked="txnTypeClicked"
          :active-btn-slug="activeTxnType"
        />
      </div>
    </div>
    <Table :rows="txnStore.getTransactions" :columns="columnList">
      <template #row="{ item }: { item: Transaction }">
        <td class="p-1 h-9">
          <img
            v-if="item.type === BlockStatus.ACCEPTED_ON_L2"
            src="~/assets/l2.svg"
          />
          <img
            v-else-if="item.type === BlockStatus.REVERTED"
            src="~/assets/reverted.svg"
          />
          <img v-else src="~/assets/l1.svg" />
        </td>
        <td class="p-1 h-9">
          <CopyableText
            :link="`/tx/${item.transactionHash}`"
            :display-value="getShortHand(item.transactionHash)"
            :actual-value="item.transactionHash"
          />
        </td>
        <td class="p-1 h-9">
          <TxnTypeBtn :txn-type="item.type" />
        </td>
        <td class="p-1 h-9">...</td>
        <td class="p-1 h-9">{{ item.block.blockNumber }}</td>
        <td class="p-1 h-9">
          {{ getTimeFromNow(item?.block?.timestamp ?? 0) }}
        </td>
      </template>
    </Table>
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
import Table from '~/components/Table.vue';

import { useTxnListStore } from '~/stores.ts/TxnList';
import { getTimeFromNow } from '~/utils/time';
import {
  BlockStatus,
  TransactionTypeMap,
  getTransactionTypeFromInt,
  type TransactionType,
} from '~/utils/models/index';
import type { TableRowItem } from '~/utils/types';
import type { Transaction } from '~/utils/models/Transaction';

const getTxnTypeFromRoute = computed(() => {
  const route = useRoute();
  const txnTypeInt = route.query['type']
    ? parseInt(route.query['type'] as string)
    : -1;
  return getTransactionTypeFromInt(txnTypeInt) ?? 'All';
});
const activeTxnType = useState('activeTxnType', () => getTxnTypeFromRoute);
const router = useRouter();
const txnStore = useTxnListStore();

const getShortHand = (str: string) => {
  if (!str) return '-';
  return str.slice(0, 6) + '...' + str.slice(-4);
};

const filterObject = computed(() => {
  if (activeTxnType.value === 'All') return {};
  return { type: activeTxnType.value };
});

onMounted(() => {
  activeTxnType.value = getTxnTypeFromRoute.value;
  let filterObj: TxnListFilter = { ...filterObject.value, page: 1 };
  txnStore.getNextPage(filterObj);
  window.onscroll = onScroll;
});

const onScroll = () => {
  const reachedEnd =
    window.innerHeight + window.scrollY + 2 >= document.body.offsetHeight;

  let filterObj: TxnListFilter = { loadNext: true, ...filterObject.value };
  if (reachedEnd && !txnStore.endOfPages) {
    txnStore.getNextPage(filterObj);
  }
};

const txnFilters = computed(() => {
  const types = Object.keys(TransactionTypeMap).map((key) => {
    return { name: key.toLowerCase(), slug: key };
  });
  return [{ name: 'All', slug: 'All' }, ...types];
});

const columnList: TableColItem[] = [
  {
    name: 'Status',
    slug: 'status',
    width: '7%',
  },
  {
    name: 'Hash',
    slug: 'hash',
    width: '20%',
  },
  {
    name: 'Type',
    slug: 'type',
    width: '14%',
  },
  {
    name: 'Operations',
    slug: 'operations',
    width: '33%',
  },
  {
    name: 'Block',
    slug: 'block',
    width: '13%',
  },
  {
    name: 'Age',
    slug: 'age',
    width: '13%',
  },
];

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
