import cn from './PrivateItem.module.css';
import { useState } from 'react';
import { hideText } from '../../../../../../store/slices/vault/helpers/regularExpressions.ts';
import { CopyButton } from '../../../general/CopyButton/CopyButton.tsx';
import { VisibleButton } from './VisibleButton/VisibleButton.tsx';

export const PrivateItem = ({ text }: any) => {
  const [visible, setVisible] = useState(false);

  const hideName =text&& hideText(text);

  return (
    <div className={cn.privateItem}>
      {!visible ? <p className={cn.hide}>{hideName}</p> : <p className={cn.name}>{text}</p>}
      <div className={cn.buttonWrapper}>
        <VisibleButton visible={visible} setVisible={setVisible} />
        <CopyButton text={text} />
      </div>
    </div>
  );
};
