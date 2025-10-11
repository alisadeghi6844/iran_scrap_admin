import React from "react";
import { useField } from "formik";
import { CategorySelectTypes } from "../../../types/features/FeatureSelectTypes";
import SingleSelect from "../../../components/select/SingleSelect";

const VehicleSelect: React.FC<CategorySelectTypes> = (props) => {
  const { name, required, label, ...rest } = props;

  const [field, { error }, { setValue }] = useField(props);

  const options = [
    { label: "کامیون", value: "truck" },
    { label: "کامیونت", value: "pickup" },
    { label: "تریلی", value: "trailer" },
    { label: "وانت", value: "van" },
    { label: "کشنده", value: "tractor" },
  ];

  return (
    <SingleSelect
      errorMessage={error}
      required={required}
      label={label || "نوع ناوگان"}
      options={options}
      onChange={(e: any) => {
        setValue(e);
      }}
      value={field.value}
      {...props}
      {...rest}
    />
  );
};

export default VehicleSelect;