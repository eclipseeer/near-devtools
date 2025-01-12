import cnm from 'classnames';
import { useWatch } from 'react-hook-form';
import { Checkbox } from '../../Checkbox/Checkbox.jsx';
import { FormInput } from '../../input/FormInput/FormInput.jsx';
import { Tooltip } from '../../Tooltip/Tooltip.jsx';
import cn from './RpcForm.module.scss';

export const RpcForm = ({ form, classes }) => {
  const { control, register, setValue, clearErrors } = form;

  // TODO: Refactor header to FieldArray
  const header = useWatch({ control, name: 'header' });

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setValue('header', { name: '', value: '' });
    } else {
      setValue('header', null);
      clearErrors(['header.name', 'header.value']);
    }
  };

  return (
    <div className={cnm(cn.rpcForm, classes?.container && classes.container)}>
      <FormInput
        control={control}
        name="name"
        label="RPC Name"
        placeholder="My Awesome RPC"
        copy={false}
      />
      <FormInput
        control={control}
        name="url"
        label="RPC URL"
        placeholder="https://rpc.network.com"
        tooltip={
          <Tooltip
            content="The RPC API allows you to communicate directly with the NEAR network."
            placement="top"
            defaultContent
          />
        }
        copy={false}
      />
      <div className={cn.checkboxContainer}>
        <Checkbox register={register} name="withHeader" onChange={handleCheckboxChange} />
        <p className={cn.label}>Add custom header</p>
      </div>
      {header && (
        <div className={cn.container}>
          <FormInput
            control={control}
            name="header.name"
            label="Name"
            placeholder="Authorization"
            copy={false}
            tooltip={<Tooltip content="Name" placement="top" defaultContent />}
          />
          <FormInput
            control={control}
            name="header.value"
            label="Value"
            placeholder="e.g. API key or ID"
            copy={false}
            tooltip={<Tooltip content="Value" placement="top" defaultContent />}
          />
        </div>
      )}
    </div>
  );
};
