export const SelectValidation = (yup:any) => {
  return yup
    .object()
    .shape({ value: yup.string(), label: yup.string() })
    .nullable()
    .required("پر کردن این فیلد الزامی است");
};
