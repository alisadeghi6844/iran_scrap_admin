import React from "react";
import { useField } from "formik";
import SingleSelect from "../../select/SingleSelect";

interface SelectFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  options: Array<{ value: string | number; label: string }>;
  required?: boolean;
  isLoading?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  placeholder,
  options,
  required = false,
  isLoading = false,
}) => {
  const [field, meta, helpers] = useField(name);

  const selectedOption = options.find(option => option.value === field.value);

  return (
    <SingleSelect
      label={label}
      value={selectedOption}
      onChange={(selectedOption: any) => {
        helpers.setValue(selectedOption?.value || "");
      }}
      options={options}
      errorMessage={meta.touched && meta.error ? meta.error : false}
      placeholder={placeholder}
      required={required}
      isLoading={isLoading}
    />
  );
};

export default SelectField;