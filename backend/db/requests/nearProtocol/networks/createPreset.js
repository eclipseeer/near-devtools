const validateNetworkId = async (execute, spaceId, networkId) => {
  // We don't really expect that someone would create a network with id 'networks',
  // but if it happens it will break the app.
  if (networkId === 'networks')
    throw new Error(`
      You can't import network with ID 'networks' - 'networks' is an inner keyword
    `);

  const query = `
    SELECT networkId FROM near_protocol_networks 
      WHERE spaceId = '${spaceId}' AND networkId = '${networkId}';
  `;
  const [network] = await execute(query);

  if (network)
    throw new Error(`
      The network ‘${network.networkId}’ is already exists in this space. 
      Please make sure you entered the correct URL of RPC provider
    `);
};

export const createPreset = async ({ execute, request }) => {
  const { spaceId, rpcActive, listRpc } = request.body;
  const { networkId } = request.body.formValues;

  const activeRpc = JSON.stringify(rpcActive);
  const rpcList = JSON.stringify(listRpc);
  const createdAt = Date.now();

  await validateNetworkId(execute, spaceId, networkId);

  const query = `
    BEGIN TRANSACTION;

    INSERT INTO near_protocol_networks
      (networkId, spaceId, createdAt, activeRpc, rpcList)
    VALUES('${networkId}', '${spaceId}', ${createdAt}, '${activeRpc}', '${rpcList}')
    RETURNING *;

    INSERT INTO near_protocol_counters
      (spaceId, networkId, transactions, calls)
    VALUES('${spaceId}', '${networkId}', 0, 0);

    COMMIT;
  `;

  const [network] = await execute(query);
  return {
    ...network,
    activeRpc: JSON.parse(network.activeRpc),
    rpcList: JSON.parse(network.rpcList),
  };
};
