import { useStoreEffect, useStoreAction, useStoreState } from '@react-vault';
import { Button } from '../../../../../../../_general/Button/Button.jsx';
import { useParams } from 'react-router-dom';
import { Tooltip } from '../../../../../../../_general/Tooltip/Tooltip.jsx';
import { useIsFormHasChanges } from './useIsFormHasChanges.js';
import { useIsExtraConfirmation } from './useIsExtraConfirmation.js';
import { ConfirmationModal } from './ConfirmationModal/ConfirmationModal.jsx';
import { useToggler } from '@hooks/useToggler.js';
import cn from './ActionBar.module.scss';

export const ActionBar = ({ form, transaction }) => {
  const [isModalOpen, openModal, closeModal] = useToggler();
  const { spaceId, networkId, transactionId } = useParams();
  const setResult = useStoreAction((store) => store.nearProtocol.transactions.setResult);
  const sendOne = useStoreEffect((store) => store.nearProtocol.transactions.sendOne);
  const saveChanges = useStoreEffect((store) => store.nearProtocol.transactions.saveChanges);
  const revertChanges = useStoreEffect((store) => store.nearProtocol.transactions.revertChanges);
  const txResult = useStoreState(
    (store) => store.nearProtocol.transactions.results[transactionId],
    [transactionId],
  );
  const hasChanges = useIsFormHasChanges(form, transaction);
  const extraConfirmation = useIsExtraConfirmation(form);

  const onSubmit = form.handleSubmit((formValues) => {
    sendOne({ formValues, spaceId, networkId, transactionId });
  });

  const revert = () => revertChanges({ form, transactionId });
  const save = () => saveChanges({ form, transactionId });
  const openResult = () => setResult({ transactionId, isOpen: true });

  return (
    <div className={cn.actionBar}>
      <div className={cn.container}>
        <Tooltip disabled={!hasChanges} arrow={false} content="Revert changes" placement="top">
          <Button
            disabled={!hasChanges}
            size="medium"
            onClick={revert}
            color="tertiary"
            iconLeftStyles={cn.historyIcon}
          />
        </Tooltip>
        <Tooltip disabled={!hasChanges} arrow={false} content="Save changes" placement="top">
          <Button
            disabled={!hasChanges}
            size="medium"
            onClick={save}
            color="tertiary"
            iconLeftStyles={cn.saveIcon}
          />
        </Tooltip>
        <hr className={cn.border} />
        <Button size="medium" onClick={extraConfirmation ? openModal : onSubmit}>
          Send
        </Button>
      </div>
      {Boolean(txResult) && (
        <>
          <hr className={cn.secondBorder} />
          <div className={cn.container}>
            <Button
              size="medium"
              color="tertiary"
              onClick={openResult}
              iconRightStyles={cn.arrowRightIcon}
            >
              Open result
            </Button>
          </div>
        </>
      )}
      {isModalOpen && (
        <ConfirmationModal
          onSubmit={onSubmit}
          transaction={transaction}
          closeModal={closeModal}
          confirmationType={extraConfirmation}
        />
      )}
    </div>
  );
};
