import React, { useEffect, useState } from "react";

import { useField } from "formik";

import { useDispatch, useSelector } from "react-redux";
import {
  selectGetPbProductAdminData,
  selectGetPbProductAdminLoading,
} from "../../../redux/slice/pbProductAdmin/PbProductAdminSlice";
import {
  CategorySelectTypes,
  SelectOptionTypes,
} from "../../../types/features/FeatureSelectTypes";
import { GetPbProductAdminAction } from "../../../redux/actions/pbProductAdmin/PbProductAdminActions";
import SingleSelect from "../../../components/select/SingleSelect";

const PbProductAdminSelect: React.FC<CategorySelectTypes> = (props) => {
  const { mode, name, required, ...rest } = props;

  const dispatch: any = useDispatch();

  const pbProductAdminData = useSelector(selectGetPbProductAdminData);
  const pbProductAdminLoading = useSelector(selectGetPbProductAdminLoading);

  const [selectOptions, setSelectOptions] = useState<SelectOptionTypes[]>([]);

  const [field, { error }, { setValue }] = useField(props);

  useEffect(() => {
    if (mode === "create") {
      setValue(null);
    }
    handleGetData();
  }, []);

  const handleGetData = async () => {
    dispatch(GetPbProductAdminAction({ page: 0, size: 900000 }));
  };

  useEffect(() => {
    const option = pbProductAdminData?.data?.map((item: any) => ({
      value: item._id || item.id,
      label: item.name,
    }));
    setSelectOptions(option || []);
  }, [pbProductAdminData]);

  return (
    <SingleSelect
      errorMessage={error}
      required={required}
      isLoading={pbProductAdminLoading}
      label="کالا"
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

export default PbProductAdminSelect;