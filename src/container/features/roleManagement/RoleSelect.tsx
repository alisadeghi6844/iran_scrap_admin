import React, { useEffect, useState } from "react";

import { useField } from "formik";

import { useDispatch, useSelector } from "react-redux";

import { SelectOptionTypes } from "../../../types/features/FeatureSelectTypes";
import SingleSelect from "../../../components/select/SingleSelect";
import {
  selectGetRoleManagementData,
  selectGetRoleManagementLoading,
} from "../../../redux/slice/roleManagement/RoleManagementSlice";
import { GetRoleManagementAction } from "../../../redux/actions/roleManagement/RoleManagementActions";

const PermissionSelect = (props: any) => {
  const { mode, name, required, ...rest } = props;

  const dispatch: any = useDispatch();

  const roleData = useSelector(selectGetRoleManagementData);
  const roleLoading = useSelector(selectGetRoleManagementLoading);

  const [selectOptions, setSelectOptions] = useState<SelectOptionTypes[]>([]);

  const [field, { error }, { setValue }] = useField(props);

  useEffect(() => {
    if (mode === "create") {
      setValue(null);
    }
    handleGetData();
  }, []);

  const handleGetData = async () => {
    dispatch(GetRoleManagementAction({ page: 0, size: 900000 }));
  };

  useEffect(() => {
    const option = roleData?.map((item: any) => ({
      value: item.id,
      label: item.title,
    }));
    setSelectOptions(option || []);
  }, [roleData]);

  return (
    <SingleSelect
      errorMessage={error}
      required={required}
      isLoading={roleLoading}
      label="دسترسی ها"
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

export default PermissionSelect;
