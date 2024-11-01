import { getBlockTargetParams } from './helpers/getBlockTargetParams.js';

export const getAccountData = (rpc, params) =>
  rpc.account.viewAccount(
    getBlockTargetParams({
      accountId: params.accountId.value,
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.finality.blockId,
    }),
  );
