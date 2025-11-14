import React from "react";
import { SelectOptionTypes } from "../../../../types/features/FeatureSelectTypes";
import SingleSelect from "../../../../components/select/SingleSelect";

interface StatusFilterSelectProps {
  name: string;
  value?: SelectOptionTypes | null;
  onChange: (value: SelectOptionTypes | null) => void;
  placeholder?: string;
}

const StatusFilterSelect: React.FC<StatusFilterSelectProps> = ({
  name,
  value,
  onChange,
  placeholder = "انتخاب وضعیت...",
}) => {
  const statusOptions = [
    { value: "SUPER_DIAMOND", label: "سوپر الماسی" },
    { value: "DIAMOND", label: "الماسی" },
    { value: "GOLD", label: "طلایی" },
    { value: "SILVER", label: "نقره‌ای" },
    { value: "BRONZE", label: "برنزی" },
  ];

  return (
    <SingleSelect
      options={statusOptions}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      noBorder
      isClearable
    />
  );
};

export default StatusFilterSelect;