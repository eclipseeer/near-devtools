import { InputGroup } from '../../../../../../../general/InputGroup/InputGroup.jsx';

export const DeleteAccount = ({ form, getName }: any) => {
  const { register } = form;
  return <InputGroup register={register} name={getName('beneficiaryId')} label="Beneficiary Id" />;
};
