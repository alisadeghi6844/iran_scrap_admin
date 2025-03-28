import React, { useCallback, useEffect, useState } from "react";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FormProps } from "../../../types/organism/Form";
import {
  selectCreateGeneralSettingLoading,
  selectUpdateGeneralSettingLoading,
} from "../../../redux/slice/generalSetting/GeneralSettingSlice";
import {
  CreateGeneralSettingAction,
  UpdateGeneralSettingAction,
} from "../../../redux/actions/generalSetting/GeneralSettingActions";
import FORM from "../../organism/FORM";
import InputField from "../../../components/molcols/formik-fields/InputField";
import TextAreaField from "../../../components/molcols/formik-fields/TextAreaField";

const GeneralSettingForm: React.FC<FormProps> = (props) => {
  const { mode = "create", onSubmitForm, value, ...rest } = props;

  const dispatch: any = useDispatch();

  const createLoading: any = useSelector(selectCreateGeneralSettingLoading);
  const updateLoading: any = useSelector(selectUpdateGeneralSettingLoading);

  const initialData = {
    Title: "",
    Category: "",
    Value: "",
  };

  const [initialValues, setInitialValues] = useState<any>(initialData);

  useEffect(() => {
    if (value?.id && mode === "update") {
      setInitialValues({
        Title: value?.title || "",
        Category: value?.category || "",
        Value: value?.value || "",
      });
    } else {
      setInitialValues(initialData);
    }
  }, [value, mode]);

  const validationSchema = () =>
    Yup.object({
      Title: Yup.string().required("پر کردن عنوان الزامی است"),
      Category: Yup.string().required("پر کردن دسته بندی الزامی است"),
      Value: Yup.string().required("پر کردن متن صفحه الزامی است"),
    });

  const handleSubmit = (data: any, resetForm: any) => {
    if (data) {
      const item = {
        title: data?.Title,
        category: data?.Category,
        value: data?.Value,
      };

      if (mode === "create") {
        dispatch(
          CreateGeneralSettingAction({
            credentials: item,
            onSubmitForm,
            resetForm,
          })
        );
      } else if (mode === "update") {
        dispatch(
          UpdateGeneralSettingAction({
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
                <InputField name="Title" label={`عنوان`} required />
              </div>
            ),
          },
          {
            component: (
              <div className="col-span-6">
                <InputField name="Category" label={`دسته بندی`} required />
              </div>
            ),
          },
          {
            component: (
              <div className="col-span-12">
                <TextAreaField name="Value" label={`متن صفحه`} required />
              </div>
            ),
          },
        ]}
        {...rest}
      />
    </>
  );
};

export default GeneralSettingForm;
