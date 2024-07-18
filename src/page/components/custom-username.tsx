import CustomReturn from '../../models/client-model/CustomReturn';
export default function CustomUsername({
  title,
  subTitle,
  placeholder,
  name,
  id,
  className,
  value,
  readonly,
  disabled,
  onChange,
  onKeyPress,
  type,
  required,
}: {
  type?: string;
  title?: string;
  subTitle?: string;
  placeholder?: string;
  name?: string;
  id?: string;
  className?: string;
  value?: string;
  readonly?: boolean | false;
  disabled?: boolean | false;
  onChange?: (data: CustomReturn) => void;
  onKeyPress?: (key: React.KeyboardEvent<HTMLDivElement>) => void;
  required?: boolean;
}) {
  return (
    <div className={'custom-input ' + (required && !value && 'required ')}>
      {title && (
        <label className='input-title' htmlFor={name}>
          {title} {required && <span className='required'>REQUIRED</span>}
        </label>
      )}
      {subTitle && (
        <label className='input-subtitle' htmlFor={name}>
          {subTitle}
        </label>
      )}
      <input
        disabled={disabled}
        readOnly={readonly}
        placeholder={placeholder}
        type={!type ? 'text' : type}
        className={'username ' + className}
        name={name}
        id={id}
        value={value ?? ''}
        onChange={(e) => {
          // alert(e.target.value.replaceAll(/^[^a-zA-Z0-9_@.-]+$/g, ''));
          onChange?.({
            elementName: name ?? '',
            value: e.target.value.replaceAll(/[^\d\w_@.-]/g, ''),
          });
        }}
        onKeyDown={onKeyPress}
      />
    </div>
  );
}
