import React from "react";
import { useField, FieldHookConfig } from "formik";
import SingleSelect from "../../../components/select/SingleSelect";
import { PublicDictionary } from "../../../utils/dictionary";

interface StatusSelectProps extends FieldHookConfig<boolean> {
  name?: any;
  label?: string;
  trueValue?: string;
  falseValue?: string;
  required?: boolean;
  handleChangeSelect?: (value: boolean) => void;
}

const StatusSelect: React.FC<StatusSelectProps> = (props) => {
  const {
    name,
    label = "وضعیت",
    trueValue = PublicDictionary.active,
    falseValue = PublicDictionary.inActive,
    required,
    handleChangeSelect,
    ...rest
  } = props;

  const options = [
    { label: trueValue, value: true },
    { label: falseValue, value: false },
  ];

  const [field, { error }, { setValue }] = useField<boolean>(props);

  return (
    <>
      <SingleSelect
        errorMessage={error}
        required={required}
        label={label}
        options={options}
        onChange={(e: any) => {
          handleChangeSelect && handleChangeSelect(e);
          setValue(e);
        }}
        value={field.value}
        {...props}
        {...rest}
      />
    </>
  );
};

export default StatusSelect;
