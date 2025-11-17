import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGetCategoryData,
  selectGetCategoryLoading,
} from "../../../redux/slice/category/CategorySlice";
import { GetCategoryAction } from "../../../redux/actions/category/CategoryActions";
import SingleSelect from "../../../components/select/SingleSelect";
import { SelectOptionTypes } from "../../../types/features/FeatureSelectTypes";
import { AppDispatch } from "../../../redux/store";

interface CategoryFilterSelectProps {
  value: SelectOptionTypes | null;
  onChange: (value: SelectOptionTypes | null) => void;
  placeholder?: string;
  noBorder?: boolean;
  isClearable?: boolean;
}

const CategoryFilterSelect: React.FC<CategoryFilterSelectProps> = ({
  value,
  onChange,
  placeholder = "انتخاب دسته‌بندی...",
  noBorder = false,
  isClearable = true,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const categoryData = useSelector(selectGetCategoryData);
  const categoryLoading = useSelector(selectGetCategoryLoading);

  useEffect(() => {
    dispatch(GetCategoryAction({}));
  }, [dispatch]);

  // Get categories from category API
  const categoryOptions = React.useMemo(() => {
    if (!categoryData?.data) return [];
    return categoryData.data.map((category: any) => ({
      value: category._id || category.id,
      label: category.name,
    }));
  }, [categoryData]);

  return (
    <SingleSelect
      label=""
      isLoading={categoryLoading}
      options={categoryOptions}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      noBorder={noBorder}
      isClearable={isClearable}
    />
  );
};

export default CategoryFilterSelect;