import { action } from '../../../../react-vault';

export const setOpenResult = action(({ slice, payload }: any) => {
  const { transactionId, isOpen, isLoading = false } = payload;
  slice.map[transactionId].results.isOpen = isOpen;
  slice.map[transactionId].results.isLoading = isLoading;
});