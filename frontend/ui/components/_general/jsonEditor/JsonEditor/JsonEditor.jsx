import { FieldTopbarLabel } from '../../FieldTopbarLabel/FieldTopbarLabel.jsx';
import { Tooltip } from '../../Tooltip/Tooltip.jsx';
import { CopyButton } from '../../CopyButton/CopyButton.jsx';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { theme } from './theme.js';
import { jsonLanguage } from '@codemirror/lang-json';
import { FieldErrorLabel } from '../../FieldErrorLabel/FieldErrorLabel.jsx';
import cnm from 'classnames';
import cn from './JsonEditor.module.scss';

export const JsonEditor = ({
  value = '',
  onChange,
  onBlur,
  topbar,
  readOnly = false,
  showClearBtn = true,
  showCopyBtn = true,
  classes,
  error = null,
  dynamicErrorSpace,
  errorLabel,
  customTheme,
}) => {
  const clearValue = () => onChange('');

  return (
    <div className={cnm(cn.container, classes?.container)}>
      {topbar && <FieldTopbarLabel label={topbar?.label} tooltip={topbar?.tooltip} />}
      <div className={error ? cn.errorPanel : cn.controlPanel}>
        <p className={cn.subtitle}>json</p>
        <div className={cn.btnWrapper}>
          {/*<Tooltip content="Format" placement="top" arrow={false}>*/}
          {/*  <button className={cn.format} />*/}
          {/*</Tooltip>*/}
          {showClearBtn && (
            <Tooltip content="Clear" placement="top" arrow={false}>
              <button className={cn.clear} onClick={clearValue} type="button" />
            </Tooltip>
          )}
          {showCopyBtn && (
            <Tooltip content="Copy" placement="top" arrow={false}>
              <CopyButton value={value} />
            </Tooltip>
          )}
        </div>
      </div>
      <hr className={cn.border} />
      <CodeMirror
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={cn.editor}
        theme={theme(error, customTheme?.contentMinHeight)}
        readOnly={readOnly}
        extensions={[jsonLanguage, EditorView.lineWrapping]}
        basicSetup={{ tabSize: 2 }}
      />
      {errorLabel || (
        <FieldErrorLabel error={error?.message} dynamicErrorSpace={dynamicErrorSpace} />
      )}
    </div>
  );
};