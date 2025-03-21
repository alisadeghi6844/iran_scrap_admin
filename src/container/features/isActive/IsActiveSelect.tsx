import React, { useEffect, useState } from "react";
import { useField } from "formik";
import { CategorySelectTypes } from "../../../types/features/FeatureSelectTypes";
import SingleSelect from "../../../components/select/SingleSelect";

interface IsActiveSelectProps extends CategorySelectTypes {
  codes?: string[]; // اضافه کردن پراپس برای کدها
}

const IsActiveSelect: React.FC<IsActiveSelectProps> = (props) => {
  const { name, required, ...rest } = props;

  const [field, { error }, { setValue }] = useField(props);

  const options = [
    {
      label: "فعال",
      value: true,
    },
    {
      label: "غیر فعال",
      value: false,
    },
  ];

  return (
    <SingleSelect
      errorMessage={error}
      required={required}
      label="وضعیت"
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

export default IsActiveSelect;
