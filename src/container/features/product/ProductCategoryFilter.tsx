import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGetCategoryData,
  selectGetCategoryLoading,
} from "../../../redux/slice/category/CategorySlice";
import { GetCategoryAction } from "../../../redux/actions/category/CategoryActions";
import SelectField from "../../../components/molcols/formik-fields/SelectField";

interface ProductCategoryFilterProps {
  name: string;
  placeholder?: string;
  [key: string]: any;
}

const ProductCategoryFilter: React.FC<ProductCategoryFilterProps> = ({
  name,
  placeholder = "انتخاب دسته بندی",
  ...rest
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

  return (
    <SelectField
      name={name}
      options={selectOptions}
      placeholder={placeholder}
      isLoading={categoryLoading}
      noBorder
      isClearable
      {...rest}
    />
  );
};

export default ProductCategoryFilter;
