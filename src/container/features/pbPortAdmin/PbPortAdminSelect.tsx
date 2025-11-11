import React, { useEffect, useState } from "react";

import { useField } from "formik";

import { useDispatch, useSelector } from "react-redux";
import {
  selectGetPbPortAdminData,
  selectGetPbPortAdminLoading,
} from "../../../redux/slice/pbPortAdmin/PbPortAdminSlice";
import {
  CategorySelectTypes,
  SelectOptionTypes,
} from "../../../types/features/FeatureSelectTypes";
import { GetPbPortAdminAction } from "../../../redux/actions/pbPortAdmin/PbPortAdminActions";
import SingleSelect from "../../../components/select/SingleSelect";

const PbPortAdminSelect: React.FC<CategorySelectTypes> = (props) => {
  const { mode, name, required, ...rest } = props;

  const dispatch: any = useDispatch();

  const pbPortAdminData = useSelector(selectGetPbPortAdminData);
  const pbPortAdminLoading = useSelector(selectGetPbPortAdminLoading);

  const [selectOptions, setSelectOptions] = useState<SelectOptionTypes[]>([]);

  const [field, { error }, { setValue }] = useField(props);

  useEffect(() => {
    if (mode === "create") {
      setValue(null);
    }
    handleGetData();
  }, []);

  const handleGetData = async () => {
    dispatch(GetPbPortAdminAction({ page: 0, size: 900000 }));
  };

  useEffect(() => {
    const option = pbPortAdminData?.data?.map((item: any) => ({
      value: item._id || item.id,
      label: item.name,
    }));
    setSelectOptions(option || []);
  }, [pbPortAdminData]);

  return (
    <SingleSelect
      errorMessage={error}
      required={required}
      isLoading={pbPortAdminLoading}
      label="محل بارگیری"
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

export default PbPortAdminSelect;