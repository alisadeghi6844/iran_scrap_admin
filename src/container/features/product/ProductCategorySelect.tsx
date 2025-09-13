import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGetCategoryData,
  selectGetCategoryLoading,
} from "../../../redux/slice/category/CategorySlice";
import { GetCategoryAction } from "../../../redux/actions/category/CategoryActions";
import SingleSelect from "../../../components/select/SingleSelect";

interface ProductCategorySelectProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  errorMessage?: string | false;
  placeholder?: string;
  required?: boolean;
}

const ProductCategorySelect: React.FC<ProductCategorySelectProps> = ({
  label = "دسته بندی",
  value,
  onChange,
  errorMessage,
  placeholder = "دسته بندی را انتخاب کنید",
  required = false,
}) => {
  const dispatch: any = useDispatch();

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

  const selectedOption = selectOptions.find(option => option.value === value);

  return (
    <SingleSelect
      label={label}
      value={selectedOption}
      onChange={(selectedOption: any) => {
        onChange && onChange(selectedOption?.value || "");
      }}
      options={selectOptions}
      errorMessage={errorMessage}
      placeholder={placeholder}
      required={required}
      isLoading={categoryLoading}
    />
  );
};

export default ProductCategorySelect;