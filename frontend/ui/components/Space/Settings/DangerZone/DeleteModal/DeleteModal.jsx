import { Modal } from '../../../../_general/Modal/Modal.jsx';
import { Input } from '../../../../_general/Input/Input.jsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../../../_general/Button/Button.jsx';
import { useStoreEffect } from '@react-vault';
import { useNavigate } from 'react-router-dom';
import { createSchema } from './schema.js';
import cn from './DeleteModal.module.scss';

export const DeleteModal = ({ isOpen, setOpen, space }) => {
  const { spaceId, name } = space;
  const remove = useStoreEffect((store) => store.spaces.remove);
  const navigate = useNavigate();
  const schema = createSchema(name);

  const form = useForm({
    defaultValues: { name: '' },
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  const closeModal = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = () => {
    remove({ spaceId, navigate });
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <form className={cn.deleteModal} onSubmit={handleSubmit(onSubmit)}>
        <div className={cn.textWrapper}>
          <h2 className={cn.title}>Delete {name}?</h2>
          <p className={cn.subtitle}>
            Deleting this space is permanent and cannot be undone. This will remove all data within
            the space, including accounts, keys, transactions, calls, and networks.
          </p>
        </div>
        <Input
          name="name"
          error={errors?.name?.message}
          control={control}
          label="Enter the space name to confirm"
          copy={false}
        />
        <div className={cn.buttonWrapper}>
          <Button color="secondary" size="medium" onClick={closeModal}>
            Cancel
          </Button>
          <Button disabled={!isValid} color="danger" size="medium" type="submit">
            Delete
          </Button>
        </div>
      </form>
    </Modal>
  );
};