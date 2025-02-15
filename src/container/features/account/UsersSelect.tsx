import React, { useEffect, useState } from "react";

import { useField, useFormikContext } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGetAllUsersData,
  selectGetAllUsersLoading,
} from "../../../redux/slice/account/AccountSlice";
import { getAllUsersAction } from "../../../redux/actions/account/AccountActions";
import SingleSelect from "../../../components/select/SingleSelect";
import { PublicDictionary } from "../../../utils/dictionary";
import {
  CategorySelectTypes,
  SelectOptionTypes,
} from "../../../types/features/FeatureSelectTypes";

const UsersSelect: React.FC<CategorySelectTypes> = (props) => {
  const { mode, name, required, ...rest } = props;

  const dispatch: any = useDispatch();

  const usersData = useSelector(selectGetAllUsersData);
  const usersLoading = useSelector(selectGetAllUsersLoading);

  const [selectOptions, setSelectOptions] = useState<SelectOptionTypes[]>([]);

  const [field, { error }, { setValue }] = useField(props);

  useEffect(() => {
    if (mode === "create") {
      setValue(null);
    }
    handleGetData();
  }, []);

  const handleGetData = async () => {
    dispatch(getAllUsersAction({ pageSize: 100000 }));
  };

  useEffect(() => {
    const option = usersData?.data?.map((item: any) => ({
      value: item._id,
      label: `${item?.firstName ?? "_"} ${item?.lastName ?? "_"} (${
        item?.personnelCode ?? "_"
      })`,
    }));
    setSelectOptions(option || []);
  }, [usersData]);

  return (
    <SingleSelect
      errorMessage={error}
      required={required}
      isLoading={usersLoading}
      label={PublicDictionary.user}
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

export default UsersSelect;
