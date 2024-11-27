import { useEffect, useMemo, useState } from 'react';
import { InfoCircleLinear } from '../icons/InfoCircleLinear.jsx';
import { CheckCircleBold } from '../icons/CheckCircleBold.jsx';
import { ErrorCircleBold } from '../icons/ErrorCircleBold.jsx';
import { DangerWarningTriangleOutline } from '../icons/DangerWarningTriangleOutline.jsx';
import { useStoreAction, useStoreState } from '@react-vault';
import cnm from 'classnames';
import cn from './ToastMessage.module.scss';

const type = {
  black: { container: cn.black, icon: <InfoCircleLinear style={cn.icon} /> },
  success: { container: cn.success, icon: <CheckCircleBold style={cn.icon} /> },
  error: { container: cn.error, icon: <ErrorCircleBold style={cn.icon} /> },
  warning: { container: cn.warning, icon: <DangerWarningTriangleOutline style={cn.icon} /> },
};

const getType = (variant) => {
  return variant ? type[variant] : type['success'];
};

export const ToastMessage = () => {
  const notification = useStoreState((store) => store.notification);
  const setNotification = useStoreAction((store) => store.setNotification);
  const { isOpen, message, variant, delay } = notification;
  const { container, icon } = useMemo(() => getType(variant), [variant]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let displayTimeout; // animation open time 500 like at css
    let closeTimeout;
    const closeTime = 500 + delay;// 500 it is animation close time and delay it is message duration

    if (isOpen) {
      setIsAnimating(true);
      displayTimeout = setTimeout(() => {
        setIsAnimating(false);

        closeTimeout = setTimeout(() => {
          setNotification({ isOpen: false });
        }, 500);
      }, closeTime);
    }
    return () => {
      clearTimeout(displayTimeout);
      clearTimeout(closeTimeout);
    };
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  return (
    <div className={cnm(container, isAnimating ? cn.start : cn.end)}>
      {icon}
      <h2 className={cn.title}>{message}</h2>
    </div>
  );
};
