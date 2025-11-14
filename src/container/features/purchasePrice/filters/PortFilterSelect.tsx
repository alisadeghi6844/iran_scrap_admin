import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGetPbPortAdminData,
  selectGetPbPortAdminLoading,
} from "../../../../redux/slice/pbPortAdmin/PbPortAdminSlice";
import { SelectOptionTypes } from "../../../../types/features/FeatureSelectTypes";
import { GetPbPortAdminAction } from "../../../../redux/actions/pbPortAdmin/PbPortAdminActions";
import SingleSelect from "../../../../components/select/SingleSelect";

interface PortFilterSelectProps {
  name: string;
  value?: SelectOptionTypes | null;
  onChange: (value: SelectOptionTypes | null) => void;
  placeholder?: string;
}

const PortFilterSelect: React.FC<PortFilterSelectProps> = ({
  name,
  value,
  onChange,
  placeholder = "انتخاب محل بارگیری...",
}) => {
  const dispatch: any = useDispatch();

  const pbPortAdminData = useSelector(selectGetPbPortAdminData);
  const pbPortAdminLoading = useSelector(selectGetPbPortAdminLoading);

  const [selectOptions, setSelectOptions] = useState<SelectOptionTypes[]>([]);

  useEffect(() => {
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
      isLoading={pbPortAdminLoading}
      options={selectOptions}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      noBorder
      isClearable
    />
  );
};

export default PortFilterSelect;