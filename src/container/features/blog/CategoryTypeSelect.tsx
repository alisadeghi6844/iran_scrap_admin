import React, { useEffect, useState } from "react";

import { useField } from "formik";

import { useDispatch, useSelector } from "react-redux";

import {
  CategorySelectTypes,
} from "../../../types/features/FeatureSelectTypes";
import { GetCategoryAction } from "../../../redux/actions/category/CategoryActions";
import SingleSelect from "../../../components/select/SingleSelect";

const CategoryTypeSelect: React.FC<CategorySelectTypes> = (props) => {
  const { mode, name, required, ...rest } = props;

  const dispatch: any = useDispatch();


  const [field, { error }, { setValue }] = useField(props);

  useEffect(() => {
    if (mode === "create") {
      setValue(null);
    }
    handleGetData();
  }, []);

  const handleGetData = async () => {
    dispatch(GetCategoryAction({ page: 0, size: 900000 }));
  };

  const options = [
    {
      label: "رشته",
      value: "STRING",
    },
    {
      label: "عدد",
      value: "NUMBER",
    },
    {
      label: "بولین",
      value: "BOOLEAN",
    },
    {
      label: "آپشن",
      value: "OPTION",
    },
  ];

  return (
    <SingleSelect
      errorMessage={error}
      required={required}
      isLoading={false}
      label="نوع ویژگی"
      options={options}
      onChange={(e: any) => {
        setValue(e);
      }}
      value={field.value}
      {...props}
      {...rest}
    />
  );
};

export default CategoryTypeSelect;
