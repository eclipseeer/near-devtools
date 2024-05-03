import cn from './DeleteModal.module.css';
import { Modal } from '../../../../../../general/Modal/Modal.jsx';
import { CloseButton } from '../../../../../general/CloseButton/CloseButton.tsx';
import { Title } from '../../../../../general/Title/Title.tsx';
import { Subtitle } from '../../../../../general/Subtitle/Subtitle.tsx';
import { Button } from '../../../../../general/Button/Button.tsx';

export const DeleteModal = ({ isOpen, closeModal, remove }: any) => {
  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <div className={cn.container}>
        <div className={cn.header}>
          <CloseButton close={closeModal} />
          <Title text="Remove key" />
        </div>
        <Subtitle
          text="Are you sure to remove this key from the keys? Notice this action only removes key locally from this app and DOESN'T make any
        changes on the blockchain."
        />
        <Button text="Remove" style="secondary" onClick={remove} />
      </div>
    </Modal>
  );
};
