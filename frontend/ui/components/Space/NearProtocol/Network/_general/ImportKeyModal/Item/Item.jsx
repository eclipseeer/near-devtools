import { Label } from '../../../../../../_general/Label/Label.jsx';
import cn from './Item.module.scss';

export const Item = ({
  formType,
  setFormType,
  type,
  children,
  icon,
  activeIcon,
  label = false,
  disabled = false,
}) => {
  const changeType = () => !disabled && setFormType(type);
  const isActive = formType === type;

  return (
    <button
      onClick={changeType}
      className={disabled ? cn.disabled : isActive ? cn.active : cn.item}
    >
      <span className={isActive && !disabled ? activeIcon : icon} />
      <div className={cn.container}>
        <p className={cn.title}>{children}</p>
        {label && <Label color="grey">{label}</Label>}
      </div>
    </button>
  );
};
