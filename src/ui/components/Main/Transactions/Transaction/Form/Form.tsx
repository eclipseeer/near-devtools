import { Actions } from './Actions/Actions.tsx';
import { To } from './To/To.tsx';
import { useForm } from 'react-hook-form';
import { useStoreEffect } from '../../../../../../react-vault';
import { SignerAccount } from './SignerAccount/SignerAccount.tsx';
import { SignerKey } from './SignerKey/SignerKey.tsx';
import { useMemo, useEffect, useState } from "react";
import { Button } from '../../../general/Button/Button.tsx';
import cn from './Form.module.css';
import sendTransaction from '../../../../../assets/sendTransaction.svg';
import saveIcon from '../../../../../assets/saveIcon.svg';
import { Result } from './Result/Result.tsx';

const getFormDefaultValues = (transaction: any) => {
  return {
    transactionId: transaction.transactionId,
    signerId: transaction.signerId,
    signerKey: transaction.signerKey,
    receiver: transaction.receiver,
    actions: transaction.actions,
  };
};

export const Form = ({ transaction }: any) => {
  const onSendTransaction = useStoreEffect((store: any) => store.transactions.onSendTransaction);
  const onSaveTransaction = useStoreEffect((store: any) => store.transactions.onSaveTransaction);
  const formDefaultValues: any = useMemo(() => getFormDefaultValues(transaction), [transaction]);
  const form = useForm({ defaultValues: formDefaultValues });
  const [result, setResult] = useState('');

  const onSubmit = form.handleSubmit((formValues: any) => {
    onSendTransaction({ formValues, setResult });
  });

  useEffect(() => {
    form.reset(formDefaultValues);
  }, [transaction]);

  const save = () => {
    const data = form.getValues();
    onSaveTransaction(data);
  };

  return (
    <>
      <div className={cn.formScrollWrapper}>
        <form className={cn.form}>
          <div>
            <h3 className={cn.title}>Sender</h3>
            <SignerAccount form={form} />
            <SignerKey form={form} />
          </div>
          <Actions form={form} />
          <To form={form} />
        </form>
        {result && <Result result={result} />}
      </div>
      <div className={cn.bottomBar}>
        <div className={cn.sendTransaction}>
          <Button text="Sent Transaction" onClick={onSubmit} src={sendTransaction} />
        </div>
        <button className={cn.saveButton} type="button" onClick={save}>
          <img src={saveIcon} alt="#" />
        </button>
      </div>
    </>
  );
};