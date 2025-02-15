import React from "react";
import { useField } from "formik";

import JalaliDatepicker from "../../jalaliDatepicker";

interface DatePickerFieldProps {
  label?: string;
  required?: boolean;
  onChange?: (date: string) => void;
  inputClassName?: string;
  [key: string]: any; // برای هر ویژگی اضافی
}

const DatePickerField: React.FC<DatePickerFieldProps> = (props) => {
  const { label, required, onChange, inputClassName, ...rest } = props;
  const [{ value }, { error }, { setValue }] = useField(rest);


  
  return (
    <JalaliDatepicker
      errorMessage={error}
      required={required}
      label={label}
      onChange={(e: string) => {
        onChange && onChange(e);
        setValue(e);
      }}
      value={value}
      inputClassName={inputClassName}
      {...rest}
    />
  );
};

export default DatePickerField;
