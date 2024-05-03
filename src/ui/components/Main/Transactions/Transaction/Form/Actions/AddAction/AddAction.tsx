import { useState } from 'react';
import { Modal } from '../../../../../../general/Modal/Modal.jsx';
import { appendAction } from './appendAction.ts';
import cn from './AddAction.module.css';
import { Button } from '../../../../../general/Button/Button.tsx';
import addIcon from '../../../../../../../assets/addIcon.svg';
import { Item } from './Item/Item.tsx';
import { Title } from '../../../../../general/Title/Title.tsx';
import { CloseButton } from '../../../../../general/CloseButton/CloseButton.tsx';

export const AddAction = ({ append }: any) => {
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const createAccount = () => {
    appendAction.createAccount(append);
    closeModal();
  };

  const transfer = () => {
    appendAction.transfer(append);
    closeModal();
  };

  const addKey = () => {
    appendAction.addKey(append);
    closeModal();
  };

  const functionCall = () => {
    appendAction.functionCall(append);
    closeModal();
  };

  const deployContract = () => {
    appendAction.deployContract(append);
    closeModal();
  };

  const deleteKey = () => {
    appendAction.deleteKey(append);
    closeModal();
  };

  const deleteAccount = () => {
    appendAction.deleteAccount(append);
    closeModal();
  };

  return (
    <>
      <div className={cn.btnContainer}>
        <Button text="Add Action" onClick={openModal} src={addIcon} />
      </div>
      <Modal isOpen={isOpen} close={closeModal}>
        <div className={cn.modal}>
          <div className={cn.header}>
            <div className={cn.title}>
              <Title text="Choose Action" />
            </div>
            <div className={cn.closeBtn}>
              <CloseButton close={closeModal} />
            </div>
          </div>
          <Item onClick={createAccount} text="Create Account" />
          <Item onClick={transfer} text="Transfer" />
          <Item onClick={addKey} text="Add Key" />
          <Item onClick={deployContract} text="Deploy Contract" />
          <Item onClick={functionCall} text="Function Call" />
          <Item onClick={deleteKey} text="Delete Key" />
          <Item onClick={deleteAccount} text="Delete Account" />
        </div>
      </Modal>
    </>
  );
};
