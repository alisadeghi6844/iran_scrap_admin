import React from "react";
import { useField } from "formik";
import Checkbox from "../../checkbox";

interface CheckboxFieldProps {
  name: string;
  label?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  [key: string]: any;
}

const CheckboxField: React.FC<CheckboxFieldProps> = (props) => {
  const { name, label, helperText, required, disabled, ...rest } = props;
  
  const [field, { error }, { setValue }] = useField(name);

  return (
    <Checkbox
      {...rest}
      id={name}
      name={name}
      label={label}
      helperText={helperText}
      required={required}
      disabled={disabled}
      errorMessage={error}
      value={field.value}
      onChange={(checked: boolean) => {
        setValue(checked);
      }}
    />
  );
};

export default CheckboxField;