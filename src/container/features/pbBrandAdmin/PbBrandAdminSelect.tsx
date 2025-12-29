import React, { useEffect, useState } from "react";

import { useField } from "formik";

import { useDispatch, useSelector } from "react-redux";
import {
  selectGetPbBrandAdminData,
  selectGetPbBrandAdminLoading,
  selectGetPbBrandAdminError,
} from "../../../redux/slice/pbBrandAdmin/PbBrandAdminSlice";
import {
  CategorySelectTypes,
  SelectOptionTypes,
} from "../../../types/features/FeatureSelectTypes";
import { GetPbBrandAdminAction } from "../../../redux/actions/pbBrandAdmin/PbBrandAdminActions";
import SingleSelect from "../../../components/select/SingleSelect";

interface PbBrandAdminSelectProps extends CategorySelectTypes {
  categoryId?: string | null;
}

const PbBrandAdminSelect: React.FC<PbBrandAdminSelectProps> = (props) => {
  const { mode, name, required, categoryId, ...rest } = props;

  const dispatch: any = useDispatch();

  const pbBrandAdminData = useSelector(selectGetPbBrandAdminData);
  const pbBrandAdminLoading = useSelector(selectGetPbBrandAdminLoading);
  const pbBrandAdminError = useSelector(selectGetPbBrandAdminError);

  const [selectOptions, setSelectOptions] = useState<SelectOptionTypes[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);

  const [field, { error }, { setValue }] = useField(props);

  useEffect(() => {
    if (mode === "create") {
      setValue(null);
    }
    handleGetData();
  }, [categoryId]); // Add categoryId to dependency array

  // Clear brand selection when categoryId changes (except for initial load in edit mode)
  useEffect(() => {
    if (categoryId !== undefined && mode === "create") {
      setValue(null);
    }
  }, [categoryId, setValue, mode]);

  const handleGetData = async () => {
    const queryParams: any = { page: 0, size: 900000 };

    // Add categoryId to query if provided
    if (categoryId) {
      queryParams.categoryId = categoryId;
    }

    setHasError(false); // Reset error state

    try {
      dispatch(GetPbBrandAdminAction(queryParams));
    } catch (error) {
      setHasError(true);
      // Fallback: try to load all brands if category filtering fails
      if (categoryId) {
        dispatch(GetPbBrandAdminAction({ page: 0, size: 900000 }));
      }
    }
  };

  // Handle error state
  useEffect(() => {
    if (pbBrandAdminError) {
      setHasError(true);
      // Fallback: try to load all brands if there's an error with category filtering
      if (categoryId) {
        dispatch(GetPbBrandAdminAction({ page: 0, size: 900000 }));
      }
    }
  }, [pbBrandAdminError, categoryId, dispatch]);

  useEffect(() => {
    const option = pbBrandAdminData?.data?.map((item: any) => ({
      value: item._id || item.id,
      label: item.name,
    }));
    setSelectOptions(option || []);

    // Reset error state when data is successfully loaded
    if (option && option.length > 0) {
      setHasError(false);
    }
  }, [pbBrandAdminData]);

  // Get appropriate placeholder text
  const getPlaceholderText = () => {
    if (categoryId === null) {
      return "ابتدا کالا را انتخاب کنید";
    }
    if (pbBrandAdminLoading) {
      return "در حال بارگذاری برندها...";
    }
    if (hasError || pbBrandAdminError) {
      return "خطا در بارگذاری برندها";
    }
    if (selectOptions.length === 0 && categoryId) {
      return "برندی برای این دسته‌بندی یافت نشد";
    }
    return "انتخاب برند";
  };

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
      disabled={pbBrandAdminLoading || (categoryId !== null && !categoryId)} // Disable when loading or no categoryId
      placeholder={getPlaceholderText()}
      {...props}
      {...rest}
    />
  );
};

export default PbBrandAdminSelect;
