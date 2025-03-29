import React, { useCallback, useEffect, useState } from "react";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FormProps } from "../../../types/organism/Form";
import {
  selectCreateFaqLoading,
  selectUpdateFaqLoading,
} from "../../../redux/slice/faq/FaqSlice";
import {
  CreateFaqAction,
  UpdateFaqAction,
} from "../../../redux/actions/faq/FaqActions";
import FORM from "../../organism/FORM";
import InputField from "../../../components/molcols/formik-fields/InputField";
import FaqCategorySelect, { faqCategoryOption } from "./FaqCategorySelect";
import { SelectValidation } from "../../../utils/SelectValidation";
import TextAreaField from "../../../components/molcols/formik-fields/TextAreaField";
const FaqForm: React.FC<FormProps> = (props) => {
  const { mode = "create", onSubmitForm, value, ...rest } = props;

  const dispatch: any = useDispatch();

  const createLoading: any = useSelector(selectCreateFaqLoading);
  const updateLoading: any = useSelector(selectUpdateFaqLoading);

  const initialData = {
    Title: "",
    Category: null,
    description: "",
  };

  const [initialValues, setInitialValues] = useState<any>(initialData);

  useEffect(() => {
    if (value?.id && mode === "update") {
      setInitialValues({
        Title: value?.title || "",
        Category: {
          label:faqCategoryOption.find((item:any)=>item?.value==value?.category)?.label,
          value:value?.category
        },
        description: value?.description || "",
      });
    } else {
      setInitialValues(initialData);
    }
  }, [value, mode]);

  const validationSchema = () =>
    Yup.object({
      Title: Yup.string().required("پر کردن عنوان سوال الزامی است"),
      category: SelectValidation(Yup),
      description: Yup.string().required("پر کردن توضیحات الزامی است"),
    });

  const handleSubmit = (data: any, resetForm: any) => {
    if (data) {
      const item = {
        title: data?.Title,
        category: data?.Category?.value,
        description: data?.description,
      };

      if (mode === "create") {
        dispatch(
          CreateFaqAction({
            credentials: item,
            onSubmitForm,
            resetForm,
          })
        );
      } else if (mode === "update") {
        dispatch(
          UpdateFaqAction({
            id: value?.id,
            credentials: item,
            onSubmitForm,
            resetForm,
          })
        );
      } else {
        return null;
      }
      addEventListener;
    }
  };

  return (
    <>
      <FORM
        mode={mode}
        loading={[
          createLoading && createLoading,
          updateLoading && updateLoading,
        ]}
        initialValues={initialValues && initialValues}
        validationSchema={validationSchema}
        handleSubmit={handleSubmit}
        resetForm
        items={[
          {
            component: (
              <div className="col-span-6">
                <InputField name="Title" label={`عنوان سوال`} required />
              </div>
            ),
          },
          {
            component: (
              <div className="col-span-6">
                <FaqCategorySelect
                  name="Category"
                  label={`دسته بندی`}
                  required
                />
              </div>
            ),
          },
          {
            component: (
              <div className="col-span-12">
                <TextAreaField name="description" label={`توضیحات`} required />
              </div>
            ),
          },
        ]}
        {...rest}
      />
    </>
  );
};

export default FaqForm;
