import React from "react";
import { useField } from "formik";
import { CategorySelectTypes } from "../../../types/features/FeatureSelectTypes";
import SingleSelect from "../../../components/select/SingleSelect";
import { province, ProvinceType } from "./Province";

interface ProvinceSelectProps extends CategorySelectTypes {
  onProvinceChange?: (provinceId: number | null) => void;
}

const ProvinceSelect: React.FC<ProvinceSelectProps> = (props) => {
  const { name, required, label, onProvinceChange, ...rest } = props;

  const [field, { error }, { setValue }] = useField(props);

  const options = province?.map((item: ProvinceType) => ({
    label: item?.name,
    value: item?.id.toString(),
  }));

  return (
    <SingleSelect
      errorMessage={error}
      required={required}
      label={label || "استان"}
      options={options}
      onChange={(selectedProvince: any) => {
        setValue(selectedProvince);
        if (onProvinceChange) {
          onProvinceChange(selectedProvince?.value ? parseInt(selectedProvince.value) : null);
        }
      }}
      value={field.value}
      {...rest}
    />
  );
};

export default ProvinceSelect;