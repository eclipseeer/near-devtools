import { initPage } from './actions/initPage';
import { addCall } from './actions/addCall.ts';
import { putCall } from './actions/putCall.ts';
import { deleteTransaction } from './actions/deleteTransaction';
import { reorderTransactions } from './actions/reorderTransactions';
import { duplicateTransaction } from './actions/duplicateTransaction';
import { createCall } from './effects/createCall.ts';
import { getCalls } from './effects/getCalls.ts';
import { saveCall } from './effects/saveCall.ts';
import { onDeleteTransaction } from './effects/onDeleteTransaction';
import { onEditTransactionName } from './effects/onEditTransactionName';
import { getCallsCount } from './effects/getCallsCount.ts';
import { onReorderTransactions } from './effects/onReorderTransactions';
import { getAccountBalance } from './effects/getAccountBalance';
import { onDuplicateTransaction } from './effects/onDuplicateTransaction';
import { callMethod } from './effects/callMethod.ts';

export const calls = {
  // init state
  list: [],
  map: { a: 1 }, // TODO need to fix a bug - react-vault remove empty object from model
  // actions
  initPage,
  addCall,
  putCall,
  deleteTransaction,
  reorderTransactions,
  duplicateTransaction,
  // effects
  createCall,
  getCalls,
  saveCall,
  onDeleteTransaction,
  onEditTransactionName,
  getCallsCount,
  onReorderTransactions,
  getAccountBalance,
  onDuplicateTransaction,
  callMethod,
};