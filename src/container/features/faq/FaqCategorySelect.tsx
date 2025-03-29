import React, { useEffect, useState } from "react";
import { useField } from "formik";
import { CategorySelectTypes } from "../../../types/features/FeatureSelectTypes";
import SingleSelect from "../../../components/select/SingleSelect";

interface FaqCategorySelectProps extends CategorySelectTypes {
  codes?: string[]; // اضافه کردن پراپس برای کدها
}
export const faqCategoryOption = [
  {
    label: "درخواست‌ها",
    value: "REQUESTS",
  },
  {
    label: "پیشنهادات",
    value: "OFFERS",
  },
  {
    label: "محصولات",
    value: "PRODUCTS",
  },
  {
    label: "ثبت‌ نام",
    value: "SIGNUP",
  },
  {
    label: "سایر",
    value: "OTHERS",
  },
];
const FaqCategorySelect: React.FC<FaqCategorySelectProps> = (props) => {
  const { name, required, ...rest } = props;

  const [field, { error }, { setValue }] = useField(props);



  return (
    <SingleSelect
      errorMessage={error}
      required={required}
      label="وضعیت"
      options={faqCategoryOption}
      onChange={(e: any) => {
        setValue(e);
      }}
      value={field.value}
      {...props}
      {...rest}
    />
  );
};

export default FaqCategorySelect;
