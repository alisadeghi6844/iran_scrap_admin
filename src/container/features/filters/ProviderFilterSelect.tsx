import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGetUsersProvidersData,
  selectGetUsersProvidersLoading,
} from "../../../redux/slice/users/UsersSlice";
import { GetUsersProvidersAction } from "../../../redux/actions/users/UsersActions";
import SingleSelect from "../../../components/select/SingleSelect";
import { SelectOptionTypes } from "../../../types/features/FeatureSelectTypes";
import { AppDispatch } from "../../../redux/store";

interface ProviderFilterSelectProps {
  value: SelectOptionTypes | null;
  onChange: (value: SelectOptionTypes | null) => void;
  placeholder?: string;
  noBorder?: boolean;
  isClearable?: boolean;
}

const ProviderFilterSelect: React.FC<ProviderFilterSelectProps> = ({
  value,
  onChange,
  placeholder = "انتخاب تامین‌کننده...",
  noBorder = false,
  isClearable = true,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const providersData = useSelector(selectGetUsersProvidersData);
  const providersLoading = useSelector(selectGetUsersProvidersLoading);

  useEffect(() => {
    dispatch(GetUsersProvidersAction({ credentials: {} }));
  }, [dispatch]);

  // Get providers from users API with Provider or Both usertype
  const providerOptions = React.useMemo(() => {
    if (!providersData?.data?.data) return [];
    return providersData.data.data
      .filter(
        (user: any) => user.usertype === "Provider" || user.usertype === "Both"
      )
      .map((user: any) => ({
        value: user.id,
        label:
          user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.mobile || user.companyName || "نامشخص",
      }));
  }, [providersData]);

  return (
    <SingleSelect
      label=""
      isLoading={providersLoading}
      options={providerOptions}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      noBorder={noBorder}
      isClearable={isClearable}
    />
  );
};

export default ProviderFilterSelect;