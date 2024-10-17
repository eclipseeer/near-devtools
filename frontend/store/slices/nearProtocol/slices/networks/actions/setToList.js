import { action } from '../../../../../../../react-vault/index.js';

export const setToList = action(({ slice, payload: networks }) => {
  slice.ids = [];
  slice.records = {};

  networks.forEach((network) => {
    slice.ids.push(network.networkId);
    slice.records[network.networkId] = network;
  });
});