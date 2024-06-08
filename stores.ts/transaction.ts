import type { Transaction } from '~/utils/models/Transaction';
import type { Paginated } from '~/utils/types';

export const useTxnListStore = defineStore('txnListStore', {
  state: () => ({
    nextPage: 0,
    limit: 20,
    transactions: [] as Transaction[],
  }),
  actions: {
    async getNextPage(filters: TxnListFilter) {
      const config = useRuntimeConfig();
      const api = config.public.apiEndpoint;
      const GET_TRANSACTION_LIST = `${api}/txns`;

      let params: Record<string, any> = {};
      if (filters.type) {
        params['type'] = filters.type;
      }
      params['page'] = filters.page ?? 1;
      params['limit'] = filters.limit ?? 20;

      const paginatedData: Paginated<Transaction> = await $fetch(
        GET_TRANSACTION_LIST,
        { params }
      );

      if (params['page'] === 1) {
        this.transactions = paginatedData.data;
      } else {
        this.transactions = [...this.transactions, ...paginatedData.data];
      }
    },
  },
  getters: {
    getTransactions: (state) => state.transactions,
  },
});
