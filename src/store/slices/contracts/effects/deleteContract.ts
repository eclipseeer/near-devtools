import { effect } from '../../../../react-vault';

const getNextRoute = (ids: any, contractId: string, networkId: string) => {
  // If we have only 1 tx in the list after we will have 0 records
  if (ids.length === 1) return `/${networkId}/contracts`;
  const index = ids.findIndex((id: any) => id === contractId);
  // If we want to delete the second or further tx - return the upper one
  if (0 < index) return `/${networkId}/contracts/${ids[index - 1]}`;
  // If we want to delete is first tx in the list - return the lover one
  if (0 === index) return `/${networkId}/contracts/${ids[index + 1]}`;
};

export const deleteContract = effect(async ({ slice, store, payload }: any) => {
  const { contractId, navigate } = payload;
  const [idb] = store.getEntities((store: any) => store.idb);
  const removeContract = slice.getActions((slice: any) => slice.removeContract);
  const ids = store.getState((store: any) => store.contracts.ids);
  const networkId = store.getState((store: any) => store.networks.current.networkId);

  try {
    const nextRoute = getNextRoute(ids, contractId, networkId);

    await idb.delete('contracts', contractId);
    removeContract(contractId);
    navigate(nextRoute);
  } catch (e) {
    console.log(e);
  }
});