import { FormDropdown } from '../../../../../../../../_general/FormDropdown/FormDropdown.jsx';
import { useAccountsOptions } from '../../../../../_general/hooks/useAccountsOptions.js';
import { BlockTarget } from '../../_general/BlockTarget/BlockTarget.jsx';
import { Form } from '../../_general/Form/Form.jsx';
import { MethodDescription } from '../../_general/MethodDescription/MethodDescription.jsx';
import { Tooltip } from '../../../../../../../../_general/Tooltip/Tooltip.jsx';
import { ConfigureTitle } from '../../_general/ConfigureTitle/ConfiguresTitle.jsx';
import { schema } from './schema.js';
import cn from './GetAccount.module.scss';

export const GetAccount = ({ call, draft }) => {
  const options = useAccountsOptions();
  return (
    <Form
      call={call}
      draft={draft}
      schema={schema}
      methodDescription={
        <MethodDescription
          description={`
             Provides general account details, including creation date, associated keys, and
             possibly the contract’s state.
          `}
          link="https://docs.near.org/api/rpc/contracts#view-account"
        />
      }
    >
      <ConfigureTitle />
      <div className={cn.wrapper}>
        <FormDropdown
          name="accountId"
          label="Account Id"
          options={options}
          isSearchable
          isClearable
          creatableSelect
          tooltip={<Tooltip content="Account id" placement="top" defaultContent />}
        />
        <BlockTarget />
      </div>
    </Form>
  );
};
