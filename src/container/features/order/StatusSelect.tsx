import React from "react";
import { useField } from "formik";
import SingleSelect from "../../../components/select/SingleSelect";

interface StatusSelectProps {
  name: string;
  label?: string;
  required?: boolean;
  noBorder?: boolean;
}

const StatusSelect: React.FC<StatusSelectProps> = (props) => {
  const { name, required, label = "وضعیت", noBorder = false, ...rest } = props;

  const [field, { error }, { setValue }] = useField(props);

  const options = [
    {
      label: "در انتظار تایید",
      value: "Pending",
    },
    {
      label: "تایید شده",
      value: "Accepted",
    },
    {
      label: "رد شده",
      value: "Rejected",
    },
    {
      label: "پرداخت شده",
      value: "Payed",
    },
    {
      label: "پرداخت تایید شده",
      value: "Paymentverified",
    },
    {
      label: "پرداخت رد شده",
      value: "Paymentdeclined",
    },
    {
      label: "در حال آماده‌سازی",
      value: "Preparing",
    },
    {
      label: "در حال ارسال",
      value: "Shipping",
    },
    {
      label: "تحویل داده شده",
      value: "Delivered",
    },
  ];

  return (
    <SingleSelect
      errorMessage={error}
      required={required}
      label={label}
      options={options}
      noBorder={noBorder}
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