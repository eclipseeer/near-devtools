import {
  getBlockTargetParams,
  transformForExport,
  getFormBlockTarget,
  getDropdownValueForImport,
  getDropdownValueForExport,
} from '../utils.js';

const rpcCaller = (rpc, params) =>
  rpc.getAccount(
    getBlockTargetParams({
      accountId: params.accountId.value,
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
      responseNameConvention: 'snake_case',
    }),
  );

const exportTransformer = transformForExport({
  version: '1.0',
  paramsExtractor: (params) =>
    getBlockTargetParams({
      accountId: getDropdownValueForExport(params.accountId),
      blockTarget: params.blockTarget,
      finality: params.finality?.value,
      blockId: params.blockId,
    }),
});

const importTransformer = ({ params }) => ({
  accountId: getDropdownValueForImport(params.accountId),
  ...getFormBlockTarget(params),
});

export const getAccount = {
  rpcCaller,
  exportTransformer,
  importTransformer,
};