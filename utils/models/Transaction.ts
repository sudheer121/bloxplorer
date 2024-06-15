import type {
  BlockStatus,
  ExecutionResources,
  TransactionEvent,
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
    events?: TransactionEvent[];
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
