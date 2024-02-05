import { effect } from '../../../../react-vault';
import { v1 } from 'uuid';

const createTx = (order: number, transactionName: string, networkId: string) => {
  const transactionId = v1();

  return {
    spaceId: 'space1',
    networkId,
    transactionId,
    name: transactionName,
    createdAt: new Date(),
    order,
    signerId: '',
    signerKey: '',

    receiver: {
      type: 'existing',
      existing: {
        accountId: '',
      },
      newNamed: {
        accountId: '',
      },
      newImplicit: {
        accountId: '',
        seedPhrase: '',
        privateKey: '',
        publicKey: '',
      },
    },
    actions: [],
  };
};

export const onAddTransaction = effect(async ({ payload, slice, store }: any) => {
  const { navigate, transactionName } = payload;
  const networkId = store.getState((store: any) => store.networks.current.networkId);
  const [idb] = store.getEntities((store: any) => store.idb);
  const addTransaction = slice.getActions((slice: any) => slice.addTransaction);

  try {
    const [txOrder, txCounter] = await Promise.all([
      idb.countFromIndex(
        'transactions',
        'spaceId_networkId_order',
        IDBKeyRange.bound(['space1', networkId, 0], ['space1', networkId, Infinity]),
      ),
      idb.get('transactions-counter', ['space1', networkId]),
    ]);
    txCounter.count += 1;

    const transaction = createTx(txOrder, transactionName, networkId);

    await Promise.all([
      idb.add('transactions', transaction),
      idb.put('transactions-counter', txCounter),
    ]);

    addTransaction(transaction);
    navigate(`${transaction.transactionId}`);
  } catch (e) {
    console.log(e);
  }
});
