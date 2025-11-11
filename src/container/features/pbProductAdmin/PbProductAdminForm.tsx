import React, { useCallback, useEffect, useState } from "react";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FormProps } from "../../../types/organism/Form";
import {
  selectCreatePbProductAdminLoading,
  selectUpdatePbProductAdminLoading,
} from "../../../redux/slice/pbProductAdmin/PbProductAdminSlice";
import {
  CreatePbProductAdminAction,
  UpdatePbProductAdminAction,
} from "../../../redux/actions/pbProductAdmin/PbProductAdminActions";
import FORM from "../../organism/FORM";
import InputField from "../../../components/molcols/formik-fields/InputField";
import CategorySelect from "../category/CategorySelect";
import { SelectValidation } from "../../../utils/SelectValidation";

const PbProductAdminForm: React.FC<FormProps> = (props) => {
  const { mode = "create", onSubmitForm, value, ...rest } = props;

  const dispatch = useDispatch();

  const createLoading = useSelector(selectCreatePbProductAdminLoading);
  const updateLoading = useSelector(selectUpdatePbProductAdminLoading);

  const initialData = {
    Name: "",
    Code: "",
    Order: 0,
    Category: null,
  };

  const [initialValues, setInitialValues] = useState(initialData);

  useEffect(() => {
    if ((value?._id || value?.id) && mode === "update") {
      setInitialValues({
        Name: value?.name || "",
        Code: value?.code || "",
        Order: value?.order || 0,
        Category: value?.categoryId ? {
          label: value?.categoryId?.name || value?.categoryId,
          value: value?.categoryId?.id || value?.categoryId
        } : null,
      });
    } else {
      setInitialValues(initialData);
    }
  }, [value, mode]);

  const validationSchema = () =>
    Yup.object({
      Name: Yup.string().required("پر کردن نام کالا الزامی است"),
      Code: Yup.string().required("پر کردن کد کالا الزامی است"),
      Order: Yup.number().required("پر کردن ترتیب الزامی است").min(0, "ترتیب نمی‌تواند منفی باشد"),
      Category: SelectValidation(Yup),
    });

  const handleSubmit = (data: Record<string, unknown>, resetForm: () => void) => {
    if (data) {
      const item = {
        name: data?.Name,
        code: data?.Code,
        order: data?.Order,
        categoryId: data?.Category?.value,
      };

      if (mode === "create") {
        dispatch(
          CreatePbProductAdminAction({
            credentials: item,
            onSubmitForm,
            resetForm,
          })
        );
      } else if (mode === "update") {
        dispatch(
          UpdatePbProductAdminAction({
            id: value?._id || value?.id,
            credentials: item,
            onSubmitForm,
            resetForm,
          })
        );
      } else {
        return null;
      }
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
                <InputField name="Name" label={`نام کالا`} required />
              </div>
            ),
          },
          {
            component: (
              <div className="col-span-6">
                <InputField name="Code" label={`کد کالا`} required />
              </div>
            ),
          },
          {
            component: (
              <div className="col-span-6">
                <InputField name="Order" label={`ترتیب`} type="number" required />
              </div>
            ),
          },
          {
            component: (
              <div className="col-span-6">
                <CategorySelect
                  name="Category"
                  label={`دسته بندی`}
                  required
                />
              </div>
            ),
          },
        ]}
        {...rest}
      />
    </>
  );
};

export default PbProductAdminForm;