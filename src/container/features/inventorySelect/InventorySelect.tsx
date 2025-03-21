import React, { useEffect, useState } from "react";
import { useField } from "formik";
import { CategorySelectTypes } from "../../../types/features/FeatureSelectTypes";
import SingleSelect from "../../../components/select/SingleSelect";

interface InventorySelectProps extends CategorySelectTypes {
  codes?: string[]; // اضافه کردن پراپس برای کدها
}

const InventorySelect: React.FC<InventorySelectProps> = (props) => {
  const { name, required, ...rest } = props;

  const [field, { error }, { setValue }] = useField(props);

  const options = [
    {
      label: "کیلو گرم",
      value: "KILOGRAM",
    },
    {
      label: "تن",
      value: "TON",
    },
  ];

  return (
    <SingleSelect
      errorMessage={error}
      required={required}
      label="وزن بر حسب"
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

export default InventorySelect;
