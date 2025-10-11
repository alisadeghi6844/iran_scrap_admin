import React, { useState, useEffect } from "react";
import { useField } from "formik";
import { CategorySelectTypes } from "../../../types/features/FeatureSelectTypes";
import SingleSelect from "../../../components/select/SingleSelect";
import { city, CityType } from "./city";

interface CitySelectProps extends CategorySelectTypes {
  provinceId?: number | null;
}

const CitySelect: React.FC<CitySelectProps> = (props) => {
  const { name, required, label, provinceId, ...rest } = props;
  const [field, { error }, { setValue }] = useField(props);
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // به‌روزرسانی لیست شهرها هنگام تغییر provinceId
  useEffect(() => {
    if (provinceId) {
      const filteredCities = city
        .filter((cityItem: CityType) => cityItem.province_id === provinceId)
        .map((cityItem: CityType) => ({
          label: cityItem.name,
          value: cityItem.id.toString(),
        }));
      setOptions(filteredCities);

      // اگر این اولین بار است که provinceId تنظیم می‌شود، آن را به عنوان initialized علامت‌گذاری کن
      if (!isInitialized) {
        setIsInitialized(true);
      } else {
        // فقط پس از initialization، اگر شهر انتخاب شده متعلق به استان جدید نباشد، آن را پاک کن
        if (field.value && field.value.value && !filteredCities.some((cityItem) => cityItem.value === field.value.value)) {
          setValue(null);
        }
      }
    } else {
      setOptions([]);
      // فقط پس از initialization، اگر استان پاک شد، شهر را هم پاک کن
      if (isInitialized && field.value) {
        setValue(null);
      }
    }
  }, [provinceId, isInitialized, setValue]);

  return (
    <SingleSelect
      errorMessage={error}
      required={required}
      label={label || "شهر"}
      options={options}
      onChange={(selectedCity: any) => {
        setValue(selectedCity);
      }}
      value={field.value}
      {...rest}
    />
  );
};

export default CitySelect;