import React, { useEffect, useState } from "react";
import { GetUsersProvidersService } from "../../../redux/service/users/UsersServices";
import SingleSelect from "../../../components/select/SingleSelect";
import { SelectOptionTypes } from "../../../types/features/FeatureSelectTypes";

interface ProviderFilterSelectProps {
  value: SelectOptionTypes | null;
  onChange: (value: SelectOptionTypes | null) => void;
  placeholder?: string;
  noBorder?: boolean;
  isClearable?: boolean;
}

interface ProviderUser {
  id: string;
  firstName?: string;
  lastName?: string;
  mobile?: string;
  companyName?: string;
  usertype: string;
}

const ProviderFilterSelect: React.FC<ProviderFilterSelectProps> = ({
  value,
  onChange,
  placeholder = "انتخاب تامین‌کننده...",
  noBorder = false,
  isClearable = true,
}) => {
  const [providers, setProviders] = useState<ProviderUser[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        const response = await GetUsersProvidersService({ credentials: {} });
        if (response?.data?.data) {
          setProviders(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching providers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  // Get providers from users API with Provider or Both usertype
  const providerOptions = React.useMemo(() => {
    return providers
      .filter(
        (user) => user.usertype === "Provider" || user.usertype === "Both"
      )
      .map((user) => ({
        value: user.id,
        label:
          user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.mobile || user.companyName || "نامشخص",
      }));
  }, [providers]);

  return (
    <SingleSelect
      label=""
      isLoading={loading}
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