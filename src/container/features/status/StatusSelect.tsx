import React, { useEffect, useState } from "react";
import { useField } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  CategorySelectTypes,
  SelectOptionTypes,
} from "../../../types/features/FeatureSelectTypes";
import {
  selectGetProductRequestStatusData,
  selectGetProductRequestStatusLoading,
} from "../../../redux/slice/productRequestStatus/ProductStatusRequestSlice";
import { GetRequestProductStatusAction } from "../../../redux/actions/productRequestStatus/RequestProductStatus";
import SingleSelect from "../../../components/select/SingleSelect";

interface StatusSelectProps extends CategorySelectTypes {
  codes?: string[]; // اضافه کردن پراپس برای کدها
}

const StatusSelect: React.FC<StatusSelectProps> = (props) => {
  const { mode, name, required, codes, ...rest } = props;

  const dispatch: any = useDispatch();

  const statusData = useSelector(selectGetProductRequestStatusData);
  const statusLoading = useSelector(selectGetProductRequestStatusLoading);

  const [selectOptions, setSelectOptions] = useState<SelectOptionTypes[]>([]);
  const [field, { error }, { setValue }] = useField(props);

  useEffect(() => {
    if (mode === "create") {
      setValue(null);
    }
    handleGetData();
  }, []);

  const handleGetData = async () => {
    dispatch(GetRequestProductStatusAction({ page: 0, size: 99999 }));
  };

  useEffect(() => {
    if (statusData?.data) {
      const filteredOptions = statusData.data
        .filter((item: any) => codes?.includes(item.code)) // فیلتر کردن بر اساس codes
        .map((item: any) => ({
          value: item.code,
          label: item.title,
        }));
      setSelectOptions(filteredOptions || []);
    }
  }, [statusData, codes]); // اضافه کردن codes به dependency

  return (
    <SingleSelect
      errorMessage={error}
      required={required}
      isLoading={statusLoading}
      label="وضعیت"
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

export default StatusSelect;
