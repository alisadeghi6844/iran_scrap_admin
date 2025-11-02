import React from "react";
import SingleSelect from "../../../components/select/SingleSelect";
import { province, ProvinceType } from "./Province";

interface StandaloneProvinceSelectProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  onProvinceChange?: (provinceId: number | null) => void;
  errorMessage?: string | false;
  placeholder?: string;
  required?: boolean;
}

const StandaloneProvinceSelect: React.FC<StandaloneProvinceSelectProps> = ({
  label = "استان",
  value,
  onChange,
  onProvinceChange,
  errorMessage,
  placeholder = "استان را انتخاب کنید",
  required = false,
}) => {
  const options = province?.map((item: ProvinceType) => ({
    label: item?.name,
    value: item?.id.toString(),
  }));

  const selectedOption = options.find((option) => option.value === value);

  return (
    <SingleSelect
      label={label}
      value={selectedOption}
      onChange={(selectedProvince: any) => {
        const provinceValue = selectedProvince?.value || "";
        onChange && onChange(provinceValue);
        if (onProvinceChange) {
          onProvinceChange(provinceValue ? parseInt(provinceValue) : null);
        }
      }}
      options={options}
      errorMessage={errorMessage}
      placeholder={placeholder}
      required={required}
    />
  );
};

export default StandaloneProvinceSelect;
