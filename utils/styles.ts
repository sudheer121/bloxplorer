import type { TransactionType } from './models';

export const txnTypeToStyleMap: Record<TransactionType, any> = {
  DECLARE: {
    borderColor: 'rgb(107, 125, 7)',
    backgroundColor: 'rgb(32, 46, 38)',
    color: 'rgb(254, 255, 181)',
  },
  DEPLOY: {
    borderColor: 'rgb(60, 80, 110)',
    backgroundColor: 'rgb(34, 54, 85)',
    color: 'rgb(210, 229, 255)',
  },
  DEPLOY_ACCOUNT: {
    borderColor: 'rgb(60, 80, 110)',
    backgroundColor: 'rgb(34, 54, 85)',
    color: 'rgb(210, 229, 255)',
  },
  INVOKE: {
    borderColor: 'rgb(46, 76, 60)',
    backgroundColor: 'rgb(32, 46, 38)',
    color: 'rgb(130, 244, 187)',
  },
  L1_HANDLER: {
    borderColor: 'rgb(94, 94, 94)',
    backgroundColor: 'rgb(56, 56, 56)',
    color: 'rgb(255, 255, 255)',
  },
};
