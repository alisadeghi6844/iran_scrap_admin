import React, { useEffect, useState } from "react";

import { useField } from "formik";

import { useDispatch, useSelector } from "react-redux";
import {
  selectGetPbProviderAdminData,
  selectGetPbProviderAdminLoading,
} from "../../../redux/slice/pbProviderAdmin/PbProviderAdminSlice";
import {
  CategorySelectTypes,
  SelectOptionTypes,
} from "../../../types/features/FeatureSelectTypes";
import { GetPbProviderAdminAction } from "../../../redux/actions/pbProviderAdmin/PbProviderAdminActions";
import SingleSelect from "../../../components/select/SingleSelect";

const PbProviderAdminSelect: React.FC<CategorySelectTypes> = (props) => {
  const { mode, name, required, ...rest } = props;

  const dispatch: any = useDispatch();

  const pbProviderAdminData = useSelector(selectGetPbProviderAdminData);
  const pbProviderAdminLoading = useSelector(selectGetPbProviderAdminLoading);

  const [selectOptions, setSelectOptions] = useState<SelectOptionTypes[]>([]);

  const [field, { error }, { setValue }] = useField(props);

  useEffect(() => {
    if (mode === "create") {
      setValue(null);
    }
    handleGetData();
  }, []);

  const handleGetData = async () => {
    dispatch(GetPbProviderAdminAction({ page: 0, size: 900000 }));
  };

  useEffect(() => {
    const option = pbProviderAdminData?.data?.map((item: any) => ({
      value: item._id || item.id,
      label: item.name,
    }));
    setSelectOptions(option || []);
  }, [pbProviderAdminData]);

  return (
    <SingleSelect
      errorMessage={error}
      required={required}
      isLoading={pbProviderAdminLoading}
      label="تامین کننده"
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

export default PbProviderAdminSelect;