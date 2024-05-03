import { InputGroup } from '../../../../../../../../general/InputGroup/InputGroup.jsx';
import { Allowance } from './Allowance/Allowance.tsx';
import { AllowedMethods } from "./AllowedMethods/AllowedMethods.tsx";

export const FunctionCall = ({ form, getName }: any) => {
  return (
    <>
      <Allowance form={form} getName={getName} />
      <InputGroup
        register={form.register}
        name={getName('permission.restrictions.receiverId')}
        label="Contact Id"
      />
      <AllowedMethods form={form} getName={getName} />
    </>
  );
};
