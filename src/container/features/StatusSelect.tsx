import React, { useState } from "react";
import SingleSelect from "../../components/select/SingleSelect";
import { PublicDictionary } from "../../utils/dictionary";
import { useField } from "formik";
import {
  CategorySelectTypes,
  SelectOptionTypes,
} from "../../types/features/FeatureSelectTypes";

const StatusSelect: React.FC<CategorySelectTypes> = (props) => {
  const { mode, name, required, ...rest } = props;

  const [selectOptions] = useState<SelectOptionTypes[]>([
    { label: "فعال", value: true },
    { label: "غیر فعال", value: false },
  ]);

  const [field, { error }, { setValue }] = useField(props);

  return (
    <SingleSelect
      errorMessage={error}
      required={required}
      label={PublicDictionary.status}
      options={selectOptions}
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
