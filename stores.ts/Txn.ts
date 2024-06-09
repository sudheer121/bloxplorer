import type { Transaction } from '~/utils/models/Transaction';

export const useTxnStore = defineStore('txn', {
  state: () => ({
    transaction: null as Transaction | null,
    loading: false as boolean,
  }),
  actions: {
    async getTxn(id: string) {
      const config = useRuntimeConfig();
      const api = config.public.apiEndpoint;
      const GET_TRANSACTION_LIST = `${api}/txns/${id}`;
      this.loading = true;
      const response: Transaction = await $fetch(GET_TRANSACTION_LIST);
      this.transaction = response;
      this.loading = false;
    },
  },
});
