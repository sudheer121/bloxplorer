import type { Transaction } from '~/utils/models/Transaction';

export const useTxnStore = defineStore('txn', {
  state: () => ({
    transaction: null as Transaction | null,
    loading: false as boolean,
    dataFormat: 'hex' as string,
    ethToUsd: 0 as number,
  }),
  actions: {
    async getTxn(id: string) {
      const config = useRuntimeConfig();
      const api = config.public.apiEndpoint;
      const GET_TRANSACTION_LIST = `${api}/txns/${id}`;
      this.loading = true;
      const response: Transaction = await $fetch(GET_TRANSACTION_LIST);
      this.transaction = response;

      this.ethToUsd = await this.getEthToUsd();
      this.loading = false;
    },
    async getEthToUsd() {
      const config = useRuntimeConfig();
      const api = config.public.apiEndpoint;
      const GET_USD = `${api}/currency/ethtousd`;
      const response: { value: number } = await $fetch(GET_USD);
      console.log(response);
      return response.value;
    },
    setDataFormat(dataFormat: string) {
      this.dataFormat = dataFormat;
    },
  },
  getters: {
    getTransaction: (state) => state.transaction,
    getLoading: (state) => state.loading,
    getDataFormat: (state) => state.dataFormat,
  },
});
