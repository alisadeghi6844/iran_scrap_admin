import React, { useState, useEffect } from "react";
import SingleSelect from "../../../components/select/SingleSelect";
import { city, CityType } from "./city";

interface StandaloneCitySelectProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  provinceId?: number | null;
  errorMessage?: string | false;
  placeholder?: string;
  required?: boolean;
}

const StandaloneCitySelect: React.FC<StandaloneCitySelectProps> = ({
  label = "شهر",
  value,
  onChange,
  provinceId,
  errorMessage,
  placeholder = "شهر را انتخاب کنید",
  required = false,
}) => {
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
        if (value && !filteredCities.some((cityItem) => cityItem.value === value)) {
          onChange && onChange("");
        }
      }
    } else {
      setOptions([]);
      // فقط پس از initialization، اگر استان پاک شد، شهر را هم پاک کن
      if (isInitialized && value) {
        onChange && onChange("");
      }
    }
  }, [provinceId, isInitialized, value, onChange]);

  const selectedOption = options.find(option => option.value === value);

  return (
    <SingleSelect
      label={label}
      value={selectedOption}
      onChange={(selectedCity: any) => {
        onChange && onChange(selectedCity?.value || "");
      }}
      options={options}
      errorMessage={errorMessage}
      placeholder={placeholder}
      required={required}
    />
  );
};

export default StandaloneCitySelect;