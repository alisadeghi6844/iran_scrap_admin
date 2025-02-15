import React, { useEffect, useState } from "react";

import { useField, useFormikContext } from "formik";
import {
  CategorySelectTypes,
  SelectOptionTypes,
} from "../../../../../types/features/FeatureSelectTypes";
import { PublicDictionary } from "../../../../../utils/dictionary";
import SingleSelect from "../../../../../components/select/SingleSelect";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantAction } from "../../../../../redux/actions/foodReservation/management/restaurant/RestaurantAction";
import {
  selectGetAllRestaurantData,
  selectGetAllRestaurantLoading,
} from "../../../../../redux/slice/foodReservation/management/restaurant/RestaurantSlice";

const RestaurantSelect: React.FC<CategorySelectTypes> = (props) => {
  const { mode, name, required, ...rest } = props;

  const dispatch: any = useDispatch();

  const restaurantData = useSelector(selectGetAllRestaurantData);
  const restaurantLoading = useSelector(selectGetAllRestaurantLoading);

  const [selectOptions, setSelectOptions] = useState<SelectOptionTypes[]>([]);

  const [field, { error }, { setValue }] = useField(props);

  useEffect(() => {
    if (mode === "create") {
      setValue(null);
    }
    handleGetData();
  }, []);

  const handleGetData = async () => {
    dispatch(getAllRestaurantAction());
  };

  useEffect(() => {
    const option = restaurantData?.data?.map((item: any) => ({
      value: item._id,
      label: item.name,
    }));
    setSelectOptions(option || []);
  }, [restaurantData]);

  return (
    <SingleSelect
      errorMessage={error}
      required={required}
      isLoading={restaurantLoading}
      label={PublicDictionary.food_restaurant}
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

export default RestaurantSelect;
