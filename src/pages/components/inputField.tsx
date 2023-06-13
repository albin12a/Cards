interface InputProps {
  type?: string;
  className?: string;
  placeholder?: string;
  name?: string;
  imageName?: string;
  textarea?: boolean;
  value?: any;
  labelText?: string;
  readOnly?: boolean;
  row?: number;
  maxLength?: number;
  onChange?: (event: any) => void;
  options?: string[];
  inputref?: any;
  error?: string;
  required?: boolean;
}

const InputField = ({
  type,
  className = "",
  labelText,
  placeholder,
  name = "",
  imageName,
  value,
  textarea,
  readOnly,
  row,
  onChange,
  maxLength,
  options = [],
  inputref,
  error,
  required,
}: InputProps) => {
  return (
    <div className={`input-field-wrapper ${className}`}>
      <div className="label-wrapper">
        {!!labelText && <label>{labelText}</label>}{" "}
        {!!required && <span className="required">*</span>}
      </div>
      {textarea ? (
        <textarea
          className={`${error ? "inactive" : ""}`}
          readOnly={readOnly}
          rows={row ? row : 6}
          name={name}
          maxLength={maxLength}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : type === "select" ? (
        <select value={value} onChange={onChange}>
          <option value="" selected={value ? false : true} disabled>
            {placeholder}
          </option>
          {options.map((val, i) => (
            <option key={i} value={val} selected={value === val}>
              {val}
            </option>
          ))}
        </select>
      ) : type === "file" ? (
        <div
          className={`file-input-wrapper ${
            error && !imageName ? "inactive" : "active"
          }`}
          onClick={() => inputref.current.click()}
        >
          <input
            id={labelText}
            readOnly={readOnly}
            type={type}
            ref={inputref}
            placeholder={placeholder}
            onChange={onChange}
            name={name}
          />
          {imageName ? imageName : placeholder}
        </div>
      ) : (
        <input
          id={labelText}
          readOnly={readOnly}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          maxLength={maxLength}
          className={`${error ? "inactive" : ""}`}
        />
      )}
      {!!error && <p className="error-p">{error}</p>}
    </div>
  );
};

export default InputField;
