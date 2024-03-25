import { InputGroup } from '../../../../../../../general/InputGroup/InputGroup.tsx';
import cn from './Transfer.module.css';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { transferSelectorStyles } from './transferSelectorStyles.ts';

export const Transfer = ({ form, getName }: any) => {
  const { register, control } = form;
  const options = [
    { value: 'NEAR', label: 'NEAR' },
    { value: 'yoctoNEAR', label: 'yoctoNEAR' },
  ];

  return (
    <div className={cn.transfer}>
      <div className={cn.amount}>
        <InputGroup register={register} name={getName('amount')} label="Amount" />
      </div>
      <div className={cn.wrapper}>
        <Controller
          name={getName('amountType')}
          control={control}
          render={({ field }: any) => (
            <Select {...field} isSearchable options={options} styles={transferSelectorStyles} />
          )}
        />
      </div>
    </div>
  );
};
