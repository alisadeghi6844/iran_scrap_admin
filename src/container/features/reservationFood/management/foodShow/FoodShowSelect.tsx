import React, { useEffect, useState } from "react";

import { useField } from "formik";
import {
  SelectOptionTypes,
  CategorySelectTypes,
} from "../../../../../types/features/FeatureSelectTypes";
import { PublicDictionary } from "../../../../../utils/dictionary";
import SingleSelect from "../../../../../components/select/SingleSelect";
import { useDispatch, useSelector } from "react-redux";

import { getAllClientFoodsAction } from "../../../../../redux/actions/foodReservation/management/foodShow/FoodShowAction";
import {
  selectGetAllClientFoodsData,
  selectGetAllClientFoodsLoading,
} from "../../../../../redux/slice/foodReservation/management/foodShow/FoodShowSlice";
import {
  convertPersianToGregorian,
  p2e,
} from "../../../../../utils/MomentConvertor";

const FoodShowSelect: React.FC<CategorySelectTypes> = (props) => {
  const { mode, name, date, required, ...rest } = props;

  const dispatch: any = useDispatch();

  const foodShowData = useSelector(selectGetAllClientFoodsData);
  const foodShowLoading = useSelector(selectGetAllClientFoodsLoading);

  const [selectOptions, setSelectOptions] = useState<SelectOptionTypes[]>([]);

  const [field, { error }, { setValue }] = useField(props);

  useEffect(() => {
    setValue(null);
    setSelectOptions([]);
    handleGetData();
  }, [date]);

  const handleGetData = async () => {
    if (date) {
      dispatch(
        getAllClientFoodsAction({ date: convertPersianToGregorian(p2e(date)) })
      );
    }
  };

  useEffect(() => {
    const option = foodShowData?.data?.length
      ? foodShowData?.data[0]?.foodId?.length
        ? foodShowData?.data[0]?.foodId?.map((item: any) => ({
            value: item._id,
            label: item.title,
          }))
        : null
      : null;
    setSelectOptions(option || []);
  }, [foodShowData]);

  return (
    <SingleSelect
      errorMessage={error}
      required={required}
      isLoading={foodShowLoading}
      label={PublicDictionary.food_show}
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

export default FoodShowSelect;
