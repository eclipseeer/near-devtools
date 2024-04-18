import { effect } from '../../../../react-vault';

const getBodyType = (method: any, params: any, type: any) => {
  const bodyTypes = {
    view_code: type === 'view_code' && { account_id: params.account_id.value },
    view_state: type === 'view_state' && {
      account_id: params.account_id.value,
      prefix_base64: params.prefix_base64,
    },
    data_changes: type === 'data_changes' && {
      account_ids: [params.account_ids.value],
      key_prefix_base64: Buffer.from(params.key_prefix_base64).toString('base64'),
    },
    contract_code_changes: type === 'contract_code_changes' && {
      account_ids: [params.account_ids.value],
    },
    call_function: type === 'call_function' && {
      account_id: params.account_id.value,
      args_base64: Buffer.from(params.args_base64).toString('base64'),
    },
  };
  return { jsonrpc: '2.0', id: 1, method, params: { ...params, ...bodyTypes[type] } };
};

export const callMethod = effect(async ({ payload: formValues, slice, store }: any) => {
  const { callId, params, method, type } = formValues;
  const { url } = store.getState((store: any) => store.networks.current);
  const addResult = slice.getActions((slice: any) => slice.addResult);
  const setOpenResult = slice.getActions((slice: any) => slice.setOpenResult);
  console.log(formValues);

  try {
    setOpenResult({ callId, isOpen: true, isLoading: true });
    const body = getBodyType(method, params, type);

    const response: any = await fetch(url.rpc, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body),
    });
    const { result, error } = await response.json();

    if (result) return addResult({ callId, result: { result } });

    if (error) return addResult({ callId, result: { error: error.data } });
  } catch (e) {
    addResult({ callId, result: { error: e.message } });
    console.log(e);
  }
});
