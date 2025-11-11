import React from "react";
import Typography from "../typography/Typography";

interface CheckboxProps {
  errorMessage?: string;
  helperText?: string;
  id?: string;
  label?: string;
  onChange?: (checked: boolean) => void;
  required?: boolean;
  value?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  name?: string;
  [key: string]: any;
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const {
    errorMessage,
    helperText,
    id,
    label,
    onChange: handleChange,
    required,
    value = false,
    defaultChecked = false,
    disabled = false,
    name,
    ...rest
  } = props;

  return (
    <div className="flex">
      <div className="flex items-center h-5">
        <input
          name={name}
          checked={value}
          defaultChecked={defaultChecked}
          disabled={disabled}
          className="cursor-pointer w-4 h-4 accent-primary-500 bg-background-default rounded border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
          id={id}
          onChange={(e) => {
            if (handleChange && !disabled) {
              handleChange(e.target.checked);
            }
          }}
          type="checkbox"
          {...rest}
        />
      </div>
      <div className="mr-2 -mt-1">
        <label
          htmlFor={id}
          className={`font-medium text-gray-700 text-[13px] dark:text-dark-text-secondary ${
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
          }`}
        >
          {label}
          {required && <span className="text-error-500">*</span>}
        </label>
        <Typography
          id="helper-checkbox-text"
          className={`text-xs ${
            !!errorMessage ? "text-error-500" : "text-text-secondary"
          }`}
        >
          {errorMessage ?? helperText}
        </Typography>
      </div>
    </div>
  );
};

export default Checkbox;
