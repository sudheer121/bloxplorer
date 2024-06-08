import type { TransactionType } from './models';

export type TxnListFilter = {
  type?: TransactionType;
  page?: number;
  limit?: number;
};

export type Paginated<T> = {
  data: Array<T>;
  meta: any;
};
