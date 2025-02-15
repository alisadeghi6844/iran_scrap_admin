import React, { useEffect, useState } from "react";

import { useField, useFormikContext } from "formik";
import {
  CategorySelectTypes,
  SelectOptionTypes,
} from "../../../../../types/features/FeatureSelectTypes";
import { PublicDictionary } from "../../../../../utils/dictionary";
import SingleSelect from "../../../../../components/select/SingleSelect";
import { useDispatch, useSelector } from "react-redux";
import { getAllFoodCategoryAction } from "../../../../../redux/actions/foodReservation/management/category/CategoriesAction";
import {
  selectGetAllFoodCategoryData,
  selectGetAllFoodCategoryLoading,
} from "../../../../../redux/slice/foodReservation/management/category/CategoriesSlice";

const CategorySelect: React.FC<CategorySelectTypes> = (props) => {
  const { mode, name, required, ...rest } = props;

  const dispatch: any = useDispatch();

  const categoryData = useSelector(selectGetAllFoodCategoryData);
  const categoryLoading = useSelector(selectGetAllFoodCategoryLoading);

  const [selectOptions, setSelectOptions] = useState<SelectOptionTypes[]>([]);

  const [field, { error }, { setValue }] = useField(props);

  useEffect(() => {
    if (mode === "create") {
      setValue(null);
    }
    handleGetData();
  }, []);

  const handleGetData = async () => {
    dispatch(getAllFoodCategoryAction());
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
      label={PublicDictionary.food_category}
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
