import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGetPbProductAdminData,
  selectGetPbProductAdminLoading,
} from "../../../../redux/slice/pbProductAdmin/PbProductAdminSlice";
import { SelectOptionTypes } from "../../../../types/features/FeatureSelectTypes";
import { GetPbProductAdminAction } from "../../../../redux/actions/pbProductAdmin/PbProductAdminActions";
import SingleSelect from "../../../../components/select/SingleSelect";

interface ProductFilterSelectProps {
  name: string;
  value?: SelectOptionTypes | null;
  onChange: (value: SelectOptionTypes | null) => void;
  placeholder?: string;
}

const ProductFilterSelect: React.FC<ProductFilterSelectProps> = ({
  name,
  value,
  onChange,
  placeholder = "انتخاب کالا...",
}) => {
  const dispatch: any = useDispatch();

  const pbProductAdminData = useSelector(selectGetPbProductAdminData);
  const pbProductAdminLoading = useSelector(selectGetPbProductAdminLoading);

  const [selectOptions, setSelectOptions] = useState<SelectOptionTypes[]>([]);

  useEffect(() => {
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
      isLoading={pbProductAdminLoading}
      options={selectOptions}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      noBorder
      isClearable
    />
  );
};

export default ProductFilterSelect;