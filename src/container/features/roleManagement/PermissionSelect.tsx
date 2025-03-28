import React, { useEffect, useState } from "react";

import { useField } from "formik";

import { useDispatch, useSelector } from "react-redux";

import { SelectOptionTypes } from "../../../types/features/FeatureSelectTypes";
import SingleSelect from "../../../components/select/SingleSelect";
import {
  selectGetPermissionsData,
  selectGetPermissionsLoading,
} from "../../../redux/slice/roleManagement/RoleManagementSlice";
import { GetPermissionsAction } from "../../../redux/actions/roleManagement/RoleManagementActions";

const PermissionSelect = (props: any) => {
  const { mode, name, required, ...rest } = props;

  const dispatch: any = useDispatch();

  const permissionData = useSelector(selectGetPermissionsData);
  const permissionLoading = useSelector(selectGetPermissionsLoading);

  const [selectOptions, setSelectOptions] = useState<SelectOptionTypes[]>([]);

  const [field, { error }, { setValue }] = useField(props);

  useEffect(() => {
    if (mode === "create") {
      setValue(null);
    }
    handleGetData();
  }, []);

  const handleGetData = async () => {
    dispatch(GetPermissionsAction({ page: 0, size: 900000 }));
  };

  useEffect(() => {
    const option = permissionData?.map((item: any) => ({
      value: item.id,
      label: item.title,
    }));
    setSelectOptions(option || []);
  }, [permissionData]);

  return (
    <SingleSelect
      errorMessage={error}
      required={required}
      isLoading={permissionLoading}
      label="مجوز ها"
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
