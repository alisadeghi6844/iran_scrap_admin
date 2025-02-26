import React, { useEffect, useState } from "react";

import { useField } from "formik";
import {
  SelectOptionTypes,
  CategorySelectTypes,
} from "../../../../../types/features/FeatureSelectTypes";
import { PublicDictionary } from "../../../../../utils/dictionary";
import SingleSelect from "../../../../../components/select/SingleSelect";
import { useDispatch, useSelector } from "react-redux";

import { getAllAppetizerAction } from "../../../../../redux/actions/foodReservation/management/appetizer/AppetizerAction";
import {
  selectGetAllAppetizerData,
  selectGetAllAppetizerLoading,
} from "../../../../../redux/slice/foodReservation/management/appetizer/AppetizerSlice";

const AppetizerSelect: React.FC<CategorySelectTypes> = (props) => {
  const { mode, name, required, ...rest } = props;

  const dispatch: any = useDispatch();

  const appetizerData = useSelector(selectGetAllAppetizerData);
  const appetizerLoading = useSelector(selectGetAllAppetizerLoading);

  const [selectOptions, setSelectOptions] = useState<SelectOptionTypes[]>([]);

  const [field, { error }, { setValue }] = useField(props);

  useEffect(() => {
    if (mode === "create") {
      setValue(null);
    }
    handleGetData();
  }, []);

  const handleGetData = async () => {
      dispatch(getAllAppetizerAction());
  };

  useEffect(() => {
    const option = appetizerData?.data?.map((item: any) => ({
      value: item._id,
      label: item.title,
    }));
    setSelectOptions(option || []);
  }, [appetizerData]);

  return (
    <SingleSelect
      errorMessage={error}
      required={required}
      isLoading={appetizerLoading}
      label={PublicDictionary.appetizer}
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

export default AppetizerSelect;
