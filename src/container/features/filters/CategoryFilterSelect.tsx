import React, { useEffect, useState } from "react";
import { getCategoryService } from "../../../redux/service/category/CategoryServices";
import SingleSelect from "../../../components/select/SingleSelect";
import { SelectOptionTypes } from "../../../types/features/FeatureSelectTypes";

interface CategoryFilterSelectProps {
  value: SelectOptionTypes | null;
  onChange: (value: SelectOptionTypes | null) => void;
  placeholder?: string;
  noBorder?: boolean;
  isClearable?: boolean;
}

interface CategoryItem {
  _id?: string;
  id?: string;
  name: string;
}

const CategoryFilterSelect: React.FC<CategoryFilterSelectProps> = ({
  value,
  onChange,
  placeholder = "انتخاب دسته‌بندی...",
  noBorder = false,
  isClearable = true,
}) => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await getCategoryService({size:50000000});
        if (response?.data?.data) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Get categories options
  const categoryOptions = React.useMemo(() => {
    return categories.map((category) => ({
      value: category._id || category.id || "",
      label: category.name,
    }));
  }, [categories]);

  return (
    <SingleSelect
      label=""
      isLoading={loading}
      options={categoryOptions}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      noBorder={noBorder}
      isClearable={isClearable}
    />
  );
};

export default CategoryFilterSelect;