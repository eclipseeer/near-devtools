import { GetAccountData } from './methods/GetAccountData/GetAccountData.jsx';
import { CallContractViewMethod } from './methods/CallContractViewMethod/CallContractViewMethod.jsx';

const fields = {
  getAccountData: GetAccountData,
  callContractViewMethod: CallContractViewMethod,
};

export const getFields = (method) => (!fields[method] ? null : fields[method]);