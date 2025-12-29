import React, { useEffect, useState } from "react";
import { useField } from "formik";
import {
  CategorySelectTypes,
  SelectOptionTypes,
} from "../../../types/features/FeatureSelectTypes";
import SingleSelect from "../../../components/select/SingleSelect";
import HttpServises from "../../../api/HttpServises";
import { BASE_URL } from "../../../api/config";
import { GET_CATEGORY_POINT } from "../../../redux/api/category/CategoryApi";

const CategorySelect: React.FC<CategorySelectTypes> = (props) => {
  const { mode, name, required, ...rest } = props;

  const [selectOptions, setSelectOptions] = useState<SelectOptionTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [field, { error }, { setValue }] = useField(props);

  useEffect(() => {
    if (mode === "create") {
      setValue(null);
    }
    // فقط اگر داده‌ها قبلاً لود نشده باشند، API رو صدا بزن
    if (!dataLoaded) {
      handleGetData();
    }
  }, []);

  const handleGetData = async () => {
    try {
      setLoading(true);
      const response = await HttpServises.get(
        `${BASE_URL}${GET_CATEGORY_POINT}?page=0&size=900000`
      );
      
      if (response?.data?.data) {
        const options = response.data.data.map((item: any) => ({
          value: item._id,
          label: item.name,
        }));
        setSelectOptions(options);
        setDataLoaded(true);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setSelectOptions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SingleSelect
      errorMessage={error}
      required={required}
      isLoading={loading}
      label="دسته بندی"
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

export default CategorySelect;
