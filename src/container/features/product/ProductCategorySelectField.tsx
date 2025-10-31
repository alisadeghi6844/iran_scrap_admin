import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useField } from "formik";
import {
  selectGetCategoryData,
  selectGetCategoryLoading,
} from "../../../redux/slice/category/CategorySlice";
import { GetCategoryAction } from "../../../redux/actions/category/CategoryActions";
import SingleSelect from "../../../components/select/SingleSelect";

interface ProductCategorySelectFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

const ProductCategorySelectField: React.FC<ProductCategorySelectFieldProps> = ({
  name,
  label = "دسته بندی",
  placeholder = "دسته بندی را انتخاب کنید",
  required = false,
}) => {
  const dispatch: any = useDispatch();
  const [field, meta, helpers] = useField(name);

  const categoryData = useSelector(selectGetCategoryData);
  const categoryLoading = useSelector(selectGetCategoryLoading);

  const [selectOptions, setSelectOptions] = useState<any[]>([]);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = async () => {
    dispatch(GetCategoryAction({ page: 0, size: 900000 }));
  };

  useEffect(() => {
    const options = categoryData?.data?.map((item: any) => ({
      value: item._id,
      label: item.name,
    }));
    setSelectOptions(options || []);
  }, [categoryData]);

  const selectedOption = selectOptions.find(option => option.value === field.value);

  return (
    <SingleSelect
      label={label}
      value={selectedOption}
      onChange={(selectedOption: any) => {
        helpers.setValue(selectedOption?.value || "");
      }}
      onBlur={() => helpers.setTouched(true)}
      options={selectOptions}
      errorMessage={meta.touched && meta.error ? meta.error : false}
      placeholder={placeholder}
      required={required}
      isLoading={categoryLoading}
    />
  );
};

export default ProductCategorySelectField;