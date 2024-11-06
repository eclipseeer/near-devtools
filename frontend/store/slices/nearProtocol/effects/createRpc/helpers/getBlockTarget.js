/*
  finality: Enum('final' | 'optimistic' | 'near-final')
  blockId: Enum(block_height | block_hash)
    block_height: Number (178317729)
    block_hash: String ('GkBD5hUvXN8Xf4ujYusZLpLoNn3zfkhZoq67bjWaRVaX')
 */

export const getBlockTarget = ({ finality = 'final', blockId, format = 'snake_case' }) => {
  if (!blockId) return { finality };

  const parsedBlock = parseInt(blockId);
  const id = Number.isNaN(parsedBlock) ? blockId.trim() : parsedBlock;

  if (format === 'camelCase') return { blockId: id };

  return { block_id: id };
};