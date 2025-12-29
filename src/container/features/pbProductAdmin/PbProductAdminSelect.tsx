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

interface PbProductAdminSelectProps extends CategorySelectTypes {
  onProductChange?: (product: any) => void;
}

const PbProductAdminSelect: React.FC<PbProductAdminSelectProps> = (props) => {
  const { mode, name, required, onProductChange, ...rest } = props;

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
      data: item, // Store full product data
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
        // Call onProductChange with full product data if provided
        if (onProductChange && e?.data) {
          onProductChange(e.data);
        }
      }}
      value={field.value}
      {...props}
      {...rest}
    />
  );
};

export default PbProductAdminSelect;