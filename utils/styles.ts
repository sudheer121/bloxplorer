import type { TransactionType } from './models';

export const btnStyles: Record<TransactionType, any> = {
  YELLOW: {
    borderColor: 'rgb(107, 125, 7)',
    backgroundColor: 'rgb(32, 46, 38)',
    color: 'rgb(254, 255, 181)',
  },
  BLUE: {
    borderColor: 'rgb(60, 80, 110)',
    backgroundColor: 'rgb(34, 54, 85)',
    color: 'rgb(210, 229, 255)',
  },
  GREEN: {
    borderColor: 'rgb(46, 76, 60)',
    backgroundColor: 'rgb(32, 46, 38)',
    color: 'rgb(130, 244, 187)',
  },
  GREY: {
    borderColor: 'rgb(94, 94, 94)',
    backgroundColor: 'rgb(56, 56, 56)',
    color: 'rgb(255, 255, 255)',
  },
};

export const txnTypeToStyleMap: Record<TransactionType, any> = {
  DECLARE: btnStyles.YELLOW,
  DEPLOY: btnStyles.BLUE,
  DEPLOY_ACCOUNT: btnStyles.BLUE,
  INVOKE: btnStyles.GREEN,
  L1_HANDLER: btnStyles.GREY,
}
