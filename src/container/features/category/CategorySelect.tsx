import React, { useEffect, useState } from "react";

import { useField } from "formik";

import { useDispatch, useSelector } from "react-redux";
import {
  selectGetCategoryData,
  selectGetCategoryLoading,
} from "../../../redux/slice/category/CategorySlice";
import {
  CategorySelectTypes,
  SelectOptionTypes,
} from "../../../types/features/FeatureSelectTypes";
import { GetCategoryAction } from "../../../redux/actions/category/CategoryActions";
import SingleSelect from "../../../components/select/SingleSelect";

const CategorySelect: React.FC<CategorySelectTypes> = (props) => {
  const { mode, name, required, ...rest } = props;

  const dispatch: any = useDispatch();

  const categoryData = useSelector(selectGetCategoryData);
  const categoryLoading = useSelector(selectGetCategoryLoading);

  const [selectOptions, setSelectOptions] = useState<SelectOptionTypes[]>([]);

  const [field, { error }, { setValue }] = useField(props);

  useEffect(() => {
    if (mode === "create") {
      setValue(null);
    }
    handleGetData();
  }, []);

  const handleGetData = async () => {
    dispatch(GetCategoryAction({ page: 0, size: 900000 }));
  };

  useEffect(() => {
    const option = categoryData?.data?.map((item: any) => ({
      value: item._id,
      label: item.name,
    }));
    setSelectOptions(option || []);
  }, [categoryData]);

  return (
    <SingleSelect
      errorMessage={error}
      required={required}
      isLoading={categoryLoading}
      label="دسته بندی"
      options={selectOptions}
      onChange={(e: any) => {
        setValue(e);
      }}
      value={field.value}
      {...props}
      {...rest}
    />
  );
};

export default CategorySelect;
