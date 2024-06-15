import type { BlockStatus } from '.';

export interface Block {
  id: number;
  blockNumber?: number;
  status?: BlockStatus;
  blockHash?: string;
  parentHash?: string;
  timestamp?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
