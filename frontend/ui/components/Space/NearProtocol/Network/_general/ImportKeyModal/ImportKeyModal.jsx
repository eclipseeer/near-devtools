import { useState } from 'react';
import { KeyBold } from '../../../../../_general/icons/KeyBold.jsx';
import { PasswordSeedPhraseInputOutline } from '../../../../../_general/icons/PasswordSeedPhraseInputOutline.jsx';
import { Ledger } from '../../../../../_general/icons/Ledger.jsx';
import { Item } from './Item/Item.jsx';
import { PrivateKey } from './PrivateKey/PrivateKey.jsx';
import { SeedPhrase } from './SeedPhrase/SeedPhrase.jsx';
import { BaseModal } from '../../../../../_general/modals/BaseModal/BaseModal.jsx';
import cn from './ImportKeyModal.module.scss';

export const ImportKeyModal = ({
  privateKeySchema,
  seedPhraseSchema,
  closeModal,
  setKey = () => ({}),
}) => {
  const [formType, setFormType] = useState('seedPhrase');

  return (
    <BaseModal close={closeModal} classes={{ modal: cn.modal }}>
      <div className={cn.list}>
        <Item
          formType={formType}
          setFormType={setFormType}
          type="seedPhrase"
          Icon={PasswordSeedPhraseInputOutline}
        >
          Seed phrase
        </Item>
        <Item formType={formType} setFormType={setFormType} type="privateKey" Icon={KeyBold}>
          Private key
        </Item>
        <Item Icon={Ledger} label="Soon" disabled={true}>
          Ledger
        </Item>
      </div>
      <div className={cn.content}>
        {formType === 'privateKey' && (
          <PrivateKey privateKeySchema={privateKeySchema} closeModal={closeModal} setKey={setKey} />
        )}
        {formType === 'seedPhrase' && (
          <SeedPhrase seedPhraseSchema={seedPhraseSchema} closeModal={closeModal} setKey={setKey} />
        )}
      </div>
    </BaseModal>
  );
};
