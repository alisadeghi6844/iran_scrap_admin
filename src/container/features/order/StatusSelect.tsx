import React from "react";
import { useField } from "formik";
import SingleSelect from "../../../components/select/SingleSelect";
import { orderStatusOptions } from "../../../types/OrderStatus";

interface StatusSelectProps {
  name: string;
  label?: string;
  required?: boolean;
  noBorder?: boolean;
}

const StatusSelect: React.FC<StatusSelectProps> = (props) => {
  const { name, required, label = "وضعیت", noBorder = false, ...rest } = props;

  const [field, { error }, { setValue }] = useField(props);

  const options = orderStatusOptions;

  return (
    <SingleSelect
      errorMessage={error}
      required={required}
      label={label}
      options={options}
      noBorder={noBorder}
      onChange={(e: any) => {
        setValue(e);
      }}
      value={field.value}
      {...props}
      {...rest}
    />
  );
};

export default StatusSelect;