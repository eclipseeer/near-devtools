import cn from './EditModal.module.css';
import { Modal } from '../../../../../../../../_general/Modal/Modal.jsx';
import { useStoreEffect, useStoreState } from '../../../../../../../../../../../react-vault/index.js';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema.js';
import { InputGroup } from '../../../../../../../../_general/InputGroup/InputGroup.jsx';
import { CloseButton } from '../../../../../_general/CloseButton/CloseButton.jsx';
import { Title } from '../../../../../_general/Title/Title.jsx';
import { ErrorMessage } from '../../../../../_general/ErrorMessage/ErrorMessage.jsx';
import { Button } from '../../../../../_general/Button/Button.jsx';

export const EditModal = ({ isOpen, setOpen, transactionId }) => {
  const onEditTransactionName = useStoreEffect((store) => store.transactions.onEditTransactionName);
  const txName = useStoreState((state) => state.transactions.map[transactionId]?.name);

  const open = isOpen === 'editModal';

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { transactionName: txName },
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const transactionName = useWatch({
    control,
    name: 'transactionName',
  });

  const closeModal = () => {
    setOpen(null);
    reset();
  };

  const edit = () => {
    onEditTransactionName({ transactionId, transactionName });
    setOpen(null);
  };

  return (
    <Modal isOpen={open} close={closeModal}>
      <div className={cn.container}>
        <div className={cn.wrapper}>
          <Title text="Edit name" />
          <CloseButton close={closeModal} />
        </div>
        <div className={cn.inputContainer}>
          <InputGroup
            register={register}
            name="transactionName"
            textarea={true}
            rows={4}
            label="Transaction name"
          />
          <ErrorMessage error={errors.transactionName?.message} />
        </div>
        <Button text="Save" onClick={handleSubmit(edit)} style="secondary" />
      </div>
    </Modal>
  );
};