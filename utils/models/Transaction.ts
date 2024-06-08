import type {
  BlockStatus,
  ExecutionResources,
  TransactionFinalityStatus,
  TransactionType,
} from '.';
import type { Block } from './Block';
export interface Transaction {
  id: number;
  blockId: number;
  type: TransactionType;
  transactionHash: string;
  actualFeeAmount: string;
  actualFeeUnit: string;
  executionStatus?: BlockStatus;
  finalityStatus?: TransactionFinalityStatus;
  meta?: {
    executionResources?: ExecutionResources;
    calldata?: string[];
  };
  position: number;
  senderAddress: string;
  maxFee: string;
  nonce: string;
  version: string;
  createdAt: Date;
  updatedAt: Date;
  block: Block;
}
