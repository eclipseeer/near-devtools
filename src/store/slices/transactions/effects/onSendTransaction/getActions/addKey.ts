import { utils, transactions } from 'near-api-js';

const functionCallKey = (restrictions: any) => {
  const { allowedAllowance, receiverId, allowedMethods, allowance, methodNames } = restrictions;

  const allowanceValue: any =
    allowedAllowance === 'Unlimited' ? null : utils.format.parseNearAmount(allowance);
  const methodNamesValue = allowedMethods === 'All' ? [] : methodNames.map((el: any) => el.name);

  return transactions.functionCallAccessKey(receiverId, methodNamesValue, allowanceValue);
};

export const addKey = (action: any) => {
  const { type, restrictions } = action.permission;

  const accessKey =
    type === 'FullAccess' ? transactions.fullAccessKey() : functionCallKey(restrictions);

  return transactions.addKey(utils.PublicKey.from(action.publicKey), accessKey);
};
