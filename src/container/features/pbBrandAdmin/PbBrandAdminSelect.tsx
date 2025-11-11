import React, { useEffect, useState } from "react";

import { useField } from "formik";

import { useDispatch, useSelector } from "react-redux";
import {
  selectGetPbBrandAdminData,
  selectGetPbBrandAdminLoading,
} from "../../../redux/slice/pbBrandAdmin/PbBrandAdminSlice";
import {
  CategorySelectTypes,
  SelectOptionTypes,
} from "../../../types/features/FeatureSelectTypes";
import { GetPbBrandAdminAction } from "../../../redux/actions/pbBrandAdmin/PbBrandAdminActions";
import SingleSelect from "../../../components/select/SingleSelect";

const PbBrandAdminSelect: React.FC<CategorySelectTypes> = (props) => {
  const { mode, name, required, ...rest } = props;

  const dispatch: any = useDispatch();

  const pbBrandAdminData = useSelector(selectGetPbBrandAdminData);
  const pbBrandAdminLoading = useSelector(selectGetPbBrandAdminLoading);

  const [selectOptions, setSelectOptions] = useState<SelectOptionTypes[]>([]);

  const [field, { error }, { setValue }] = useField(props);

  useEffect(() => {
    if (mode === "create") {
      setValue(null);
    }
    handleGetData();
  }, []);

  const handleGetData = async () => {
    dispatch(GetPbBrandAdminAction({ page: 0, size: 900000 }));
  };

  useEffect(() => {
    const option = pbBrandAdminData?.data?.map((item: any) => ({
      value: item._id || item.id,
      label: item.name,
    }));
    setSelectOptions(option || []);
  }, [pbBrandAdminData]);

  return (
    <SingleSelect
      errorMessage={error}
      required={required}
      isLoading={pbBrandAdminLoading}
      label="برند"
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

export default PbBrandAdminSelect;