import React, { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FormProps } from "../../../types/organism/Form";
import {
  selectCreateCategoryAttributeLoading,
  selectGetCategoryByIdData,
  selectGetCategoryByIdLoading,
  selectUpdateCategoryAttributeLoading,
} from "../../../redux/slice/category/CategorySlice";
import {
  CreateCategoryAttributeAction,
  GetCategoryByIdAction,
  UpdateCategoryAttributeAction,
} from "../../../redux/actions/category/CategoryActions";
import FormSkeleton from "../../organism/skeleton/FormSkeleton";
import FORM from "../../organism/FORM";
import InputField from "../../../components/molcols/formik-fields/InputField";
import TextAreaField from "../../../components/molcols/formik-fields/TextAreaField";
import CategorySelect from "./CategorySelect";
import CategoryTypeSelect from "./CategoryTypeSelect";
import { SelectValidation } from "../../../utils/SelectValidation";

const CategoryAttributeForm: React.FC<FormProps> = (props) => {
  const { mode = "create", onSubmitForm, id, ...rest } = props;

  const dispatch: any = useDispatch();
  const getValue = useSelector(selectGetCategoryByIdData);
  const getLoading = useSelector(selectGetCategoryByIdLoading);
  const createLoading = useSelector(selectCreateCategoryAttributeLoading);
  const updateLoading = useSelector(selectUpdateCategoryAttributeLoading);

  const initialData = {
    Name: "",
    Description: "",
    Category: null,
    Type: null,
  };

  const [initialValues, setInitialValues] = useState<any>(initialData);

  const loadData = useCallback(() => {
    if (id && mode === "update") {
      dispatch(GetCategoryByIdAction({ credentials: id }));
    }
  }, [id, mode]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (getValue?.data && mode === "update") {
      setInitialValues({
        Name: getValue.data.name || "",
        Description: getValue.data.description || "",
        Category: getValue.data.categoryId || null,
        Type: getValue.data.type || null,
      });
    } else {
      setInitialValues(initialData);
    }
  }, [getValue, mode]);

  const validationSchema = () =>
    Yup.object({
      Name: Yup.string().required("پر کردن نام ویژگی دسته بندی الزامی است"),
      Category: SelectValidation(Yup),
      Type: SelectValidation(Yup),
      Description: Yup.string().required("پر کردن توضیحات ویژگی دسته بندی الزامی است"),
    });

  const handleSubmit = (data: any, resetForm: any) => {
    if (data) {
      const items={
        name:data?.Name,
        description:data?.Description,
        categoryId:data?.Category?.value,
        type:data?.Type?.value
      }

        dispatch(CreateCategoryAttributeAction({ credentials: items, onSubmitForm, resetForm }));
      
    }
  };

  return (
    <>
      {getLoading ? (
        <FormSkeleton />
      ) : (
        <FORM
          mode={mode}
          loading={[createLoading, updateLoading]}
          initialValues={initialValues}
          validationSchema={validationSchema}
          handleSubmit={handleSubmit}
          resetForm
          items={[
            {
              component: (
                <div className="col-span-6">
                  <InputField name="Name" label="نام ویژگی دسته بندی" required />
                </div>
              ),
            },
            {
              component: (
                <div className="col-span-6">
                  <CategorySelect name="Category" required />
                </div>
              ),
            },
            {
              component: (
                <div className="col-span-6">
                  <CategoryTypeSelect name="Type" required />
                </div>
              ),
            },
            {
              component: (
                <div className="col-span-12">
                  <TextAreaField
                    name="Description"
                    label="توضیحات ویژگی دسته بندی"
                    required
                  />
                </div>
              ),
            },
          ]}
          {...rest}
        />
      )}
    </>
  );
};

export default CategoryAttributeForm;
