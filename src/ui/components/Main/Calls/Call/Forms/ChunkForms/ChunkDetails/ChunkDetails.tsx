import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FormGroup } from '../../general/FormGroup/FormGroup.tsx';
import { SelectInputType } from './SelectInputType/SelectInputType.tsx';

const getFormValues = (call: any) => ({
  callId: call.callId,
  type: call.type,
  method: call.method,
  params: {
    type: call.params.type,
    chunk_id: call.params.chunk_id,
    shard_id: call.params.shard_id,
    block_id: call.params.block_id,
  },
  results: call.results,
});

export const ChunkDetails = ({ call }: any) => {
  const formDefaultValues: any = useMemo(() => getFormValues(call), [call.callId]);

  const form = useForm({
    defaultValues: formDefaultValues,
  });

  return (
    <FormGroup form={form} call={call} formDefaultValues={formDefaultValues}>
      <SelectInputType form={form} />
    </FormGroup>
  );
};