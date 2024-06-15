import type { TransactionType } from './models';

export type TxnListFilter = {
  type?: TransactionType;
  page?: number;
  limit?: number;
  loadNext?: boolean;
};

export type Paginated<T> = {
  data: Array<T>;
  meta: any;
};

export type PagninationMeta = {
  currentPage: number;
  firstPage: number;
  lastPage: number;
  perPage: number;
  total: number;
};

export type TableColItem = {
  name: string;
  slug: string;
  width?: string;
};

export type TableRowItem = {
  id?: string;
  [key: string]: any;
};
