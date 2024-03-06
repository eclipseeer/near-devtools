export const setupKeys = (db: any) => {
  const keys = db.createObjectStore('keys', { keyPath: ['spaceId', 'networkId', 'publicKey'] });
  keys.createIndex('spaceId_networkId_importedAt', ['spaceId', 'networkId', 'importedAt']);
};
