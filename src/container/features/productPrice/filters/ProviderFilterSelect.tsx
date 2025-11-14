import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGetPbProviderAdminData,
  selectGetPbProviderAdminLoading,
} from "../../../../redux/slice/pbProviderAdmin/PbProviderAdminSlice";
import { SelectOptionTypes } from "../../../../types/features/FeatureSelectTypes";
import { GetPbProviderAdminAction } from "../../../../redux/actions/pbProviderAdmin/PbProviderAdminActions";
import SingleSelect from "../../../../components/select/SingleSelect";

interface ProviderFilterSelectProps {
  name: string;
  value?: SelectOptionTypes | null;
  onChange: (value: SelectOptionTypes | null) => void;
  placeholder?: string;
}

const ProviderFilterSelect: React.FC<ProviderFilterSelectProps> = ({
  name,
  value,
  onChange,
  placeholder = "انتخاب تامین کننده...",
}) => {
  const dispatch: any = useDispatch();

  const pbProviderAdminData = useSelector(selectGetPbProviderAdminData);
  const pbProviderAdminLoading = useSelector(selectGetPbProviderAdminLoading);

  const [selectOptions, setSelectOptions] = useState<SelectOptionTypes[]>([]);

  useEffect(() => {
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
      isLoading={pbProviderAdminLoading}
      options={selectOptions}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      noBorder
      isClearable
    />
  );
};

export default ProviderFilterSelect;