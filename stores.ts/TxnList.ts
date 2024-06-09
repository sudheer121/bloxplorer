import type { Transaction } from '~/utils/models/Transaction';
import type { Paginated } from '~/utils/types';

export const useTxnListStore = defineStore('txnListStore', {
  state: () => ({
    loading: false as boolean,
    transactions: [] as Transaction[],
    paginationMeta: {} as PagninationMeta,
    endOfPages: false as boolean,
  }),
  actions: {
    async getNextPage(filters: TxnListFilter) {
      const config = useRuntimeConfig();
      const api = config.public.apiEndpoint;
      const GET_TRANSACTION_LIST = `${api}/txns`;

      if (filters.loadNext) {
        filters.page = this.paginationMeta.currentPage + 1;
      }

      let params: Record<string, any> = {};
      if (filters.type) {
        params['type'] = filters.type;
      }
      params['page'] = filters.page ?? 1;
      params['limit'] = filters.limit ?? 20;
      const isFirstPage = params['page'] === 1;
      if (isFirstPage) {
        this.clearList();
      }
      
      this.loading = true;
      const paginatedData: Paginated<Transaction> = await $fetch(
        GET_TRANSACTION_LIST,
        { params }
      );

      this.paginationMeta = paginatedData.meta;
      if (isFirstPage) {
        this.transactions = paginatedData.data;
      } else {
        this.transactions = [...this.transactions, ...paginatedData.data];
      }
      this.endOfPages =
        this.paginationMeta.currentPage >= this.paginationMeta.lastPage;
      this.loading = false;
    },
    async clearList() {
      this.transactions = [];
    }
  },
  getters: {
    getTransactions: (state) => state.transactions,
  },
});
