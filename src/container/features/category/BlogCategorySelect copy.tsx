import React, { useEffect, useState } from "react";

import { useField } from "formik";

import { useDispatch, useSelector } from "react-redux";

import {
  CategorySelectTypes,
  SelectOptionTypes,
} from "../../../types/features/FeatureSelectTypes";
import { GetBlogCategoryAction } from "../../../redux/actions/blogCategory/BlogCategoryActions";
import SingleSelect from "../../../components/select/SingleSelect";
import {
  selectGetBlogCategoryData,
  selectGetBlogCategoryLoading,
} from "../../../redux/slice/blogCategory/BlogSlice";

const BlogCategorySelect: React.FC<CategorySelectTypes> = (props) => {
  const { mode, name, required, ...rest } = props;

  const dispatch: any = useDispatch();

  const blogCategoryData = useSelector(selectGetBlogCategoryData);
  const blogCategoryLoading = useSelector(selectGetBlogCategoryLoading);

  const [selectOptions, setSelectOptions] = useState<SelectOptionTypes[]>([]);

  const [field, { error }, { setValue }] = useField(props);

  useEffect(() => {
    if (mode === "create") {
      setValue(null);
    }
    handleGetData();
  }, []);

  const handleGetData = async () => {
    dispatch(GetBlogCategoryAction({ page: 0, size: 900000 }));
  };

  useEffect(() => {
    const option = blogCategoryData?.data?.map((item: any) => ({
      value: item._id,
      label: item.name,
    }));
    setSelectOptions(option || []);
  }, [blogCategoryData]);

  return (
    <SingleSelect
      errorMessage={error}
      required={required}
      isLoading={blogCategoryLoading}
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

export default BlogCategorySelect;
