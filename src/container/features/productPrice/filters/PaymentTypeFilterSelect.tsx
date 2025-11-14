import React from "react";
import { SelectOptionTypes } from "../../../../types/features/FeatureSelectTypes";
import SingleSelect from "../../../../components/select/SingleSelect";

interface PaymentTypeFilterSelectProps {
  name: string;
  value?: SelectOptionTypes | null;
  onChange: (value: SelectOptionTypes | null) => void;
  placeholder?: string;
}

const PaymentTypeFilterSelect: React.FC<PaymentTypeFilterSelectProps> = ({
  name,
  value,
  onChange,
  placeholder = "انتخاب نوع پرداخت...",
}) => {
  const paymentTypeOptions = [
    { value: "CASH", label: "نقدی" },
    { value: "INSTALLMENT1", label: "1 ماهه" },
    { value: "INSTALLMENT2", label: "2 ماهه" },
    { value: "INSTALLMENT3", label: "3 ماهه" },
    { value: "INSTALLMENT4", label: "4 ماهه" },
    { value: "INSTALLMENT5", label: "5 ماهه" },
    { value: "INSTALLMENT6", label: "6 ماهه" },
  ];

  return (
    <SingleSelect
      options={paymentTypeOptions}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      noBorder
      isClearable
    />
  );
};

export default PaymentTypeFilterSelect;