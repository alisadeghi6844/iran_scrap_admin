import React, { useEffect, useState } from "react";

import { useField, useFormikContext } from "formik";
import {
  SelectOptionTypes,
  CategorySelectTypes,
} from "../../../../../types/features/FeatureSelectTypes";
import { PublicDictionary } from "../../../../../utils/dictionary";
import SingleSelect from "../../../../../components/select/SingleSelect";
import { useDispatch, useSelector } from "react-redux";

import { getAllFoodAction } from "../../../../../redux/actions/foodReservation/management/food/FoodAction";
import {
  selectGetAllFoodData,
  selectGetAllFoodLoading,
} from "../../../../../redux/slice/foodReservation/management/food/FoodSlice";

const FoodSelect: React.FC<CategorySelectTypes> = (props) => {
  const { mode, name, required, ...rest } = props;

  const dispatch: any = useDispatch();

  const foodData = useSelector(selectGetAllFoodData);
  const foodLoading = useSelector(selectGetAllFoodLoading);

  const [selectOptions, setSelectOptions] = useState<SelectOptionTypes[]>([]);

  const [field, { error }, { setValue }] = useField(props);

  useEffect(() => {
    if (mode === "create") {
      setValue(null);
    }
    handleGetData();
  }, []);

  const handleGetData = async () => {
    dispatch(getAllFoodAction({pageSize:10000}));
  };

  useEffect(() => {
 
    const option = foodData?.data?.map((item: any) => ({
      value: item._id,
      label: item.title+" : " + item?.restaurantId?.name,
    }));
    setSelectOptions(option || []);
  }, [foodData]);

  return (
    <SingleSelect
      errorMessage={error}
      required={required}
      isLoading={foodLoading}
      label={PublicDictionary.food}
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

export default FoodSelect;
