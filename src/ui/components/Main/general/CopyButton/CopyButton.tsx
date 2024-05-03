import cn from './CopyButton.module.css';
import { CopyIcon } from '../../../../assets/components/CopyIcon.jsx';
import { useState } from 'react';

export const CopyButton = ({ text, size = 20 }: any) => {
  const [copied, setCopied] = useState(false);

  const copyTextToClipboard = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <button onClick={copyTextToClipboard} className={cn.button} type="button">
      {copied ? (
        <CopyIcon style={cn.copy} size={size} />
      ) : (
        <CopyIcon style={cn.icon} size={size} />
      )}
    </button>
  );
};
