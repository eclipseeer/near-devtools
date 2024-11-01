import { decompress } from 'fzstd';
import { getBlockTargetParams } from './helpers/getBlockTargetParams.js';

const getJsonABI = (result) => {
  const raw = decompress(new Uint8Array(result));
  const json = new TextDecoder().decode(raw);
  return JSON.parse(json);
};

const getResult = (result, methodName) => {
  if (methodName === '__contract_abi') return getJsonABI(result);
  return JSON.parse(Buffer.from(result).toString());
};

export const callContractViewMethod = async (rpc, params) => {
  const result = await rpc.contract.callFunction(
    getBlockTargetParams({
      contractId: params.contractId.value,
      methodName: params.methodName.value,
      args: params.args,
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.finality.blockId,
    }),
  );
  return getResult(result.result, params.methodName.value);
};
