export const TransactionTypeMap: Record<string, number> = {
  DECLARE: 2,
  DEPLOY: 0,
  DEPLOY_ACCOUNT: 4,
  INVOKE: 1,
  L1_HANDLER: 3,
} as const;
export type TransactionType = keyof typeof TransactionTypeMap;
export type TransactionTypeInt =
  (typeof TransactionTypeMap)[keyof typeof TransactionTypeMap];

export const getTransactionTypeFromInt = (type: TransactionTypeInt) => {
  return (
    Object.keys(TransactionTypeMap).find(
      (key) => TransactionTypeMap[key as TransactionType] === type
    ) ?? null
  );
};

export enum BlockStatus {
  ACCEPTED_ON_L1 = 'ACCEPTED_ON_L1',
  ACCEPTED_ON_L2 = 'ACCEPTED_ON_L2',
  REVERTED = 'REVERTED',
}

export enum TransactionFinalityStatus {
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
}

export type ExecutionResources = {
  steps: number;
  pedersen_builtin_applications: number;
  range_check_builtin_applications: number;
  bitwise_builtin_applications: number;
  ec_op_builtin_applications: number;
  data_availability: {
    l1_gas: number;
    l1_data_gas: number;
  };
};

export interface TransactionEvent {
  from_address: string;
  keys: string[];
  data: string[];
}
