import React, { useRef } from "react";
import { InputMaxLength } from "../../utils/setting";
import Typography from "../typography/Typography";
import { TextAreaTypes } from "../../types/components/TextAreaTypes";

const TextArea: React.FC<TextAreaTypes> = (props) => {
  const {
    errorMessage,
    helperText,
    label,
    placeholder,
    required,
    rows,
    value,
    onChange,
    className,
    disabled = false,
    ...rest
  } = props;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="w-full h-full">
      <Typography className="text-start mb-1 text-gray-800 text-md">
        {label}
        {required && <span className="text-error-500">*</span>}
      </Typography>
      <textarea
        maxLength={InputMaxLength}
        ref={textareaRef}
        id={label}
        disabled={disabled}
        className={`p-2.5 w-full bg-gray-100 text-text-primary bg-background-paper dark:bg-dark-gray-400 dark:text-dark-text-primary rounded-lg shadow-sm border focus:outline-none focus:border-primary-main ${
          !!errorMessage
            ? "text-error-500 focus:text-error-500"
            : "border-gray-300 dark:border-dark-text-secondary"
        } ${className ? className : ""}`}
        rows={rows ?? 4}
        placeholder={placeholder ?? "متن خود را این جا وارد کنید..."}
        value={value}
        onChange={(e: any) => {
          onChange && onChange(e.target.value);
        }}
        {...rest}
      />

      <Typography
        className={`text-xs mt-1 ${
          !!errorMessage ? "text-error-500" : "text-text-secondary"
        }`}
      >
        {errorMessage ?? helperText}
      </Typography>
    </div>
  );
};

export default TextArea;
