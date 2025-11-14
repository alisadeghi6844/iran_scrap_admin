import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGetPbBrandAdminData,
  selectGetPbBrandAdminLoading,
} from "../../../../redux/slice/pbBrandAdmin/PbBrandAdminSlice";
import { SelectOptionTypes } from "../../../../types/features/FeatureSelectTypes";
import { GetPbBrandAdminAction } from "../../../../redux/actions/pbBrandAdmin/PbBrandAdminActions";
import SingleSelect from "../../../../components/select/SingleSelect";

interface BrandFilterSelectProps {
  name: string;
  value?: SelectOptionTypes | null;
  onChange: (value: SelectOptionTypes | null) => void;
  placeholder?: string;
}

const BrandFilterSelect: React.FC<BrandFilterSelectProps> = ({
  name,
  value,
  onChange,
  placeholder = "انتخاب برند...",
}) => {
  const dispatch: any = useDispatch();

  const pbBrandAdminData = useSelector(selectGetPbBrandAdminData);
  const pbBrandAdminLoading = useSelector(selectGetPbBrandAdminLoading);

  const [selectOptions, setSelectOptions] = useState<SelectOptionTypes[]>([]);

  useEffect(() => {
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
      isLoading={pbBrandAdminLoading}
      options={selectOptions}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      noBorder
      isClearable
    />
  );
};

export default BrandFilterSelect;