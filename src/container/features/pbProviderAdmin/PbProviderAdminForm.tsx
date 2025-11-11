import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FormProps } from "../../../types/organism/Form";
import {
  selectCreatePbProviderAdminLoading,
  selectUpdatePbProviderAdminLoading,
} from "../../../redux/slice/pbProviderAdmin/PbProviderAdminSlice";
import {
  CreatePbProviderAdminAction,
  UpdatePbProviderAdminAction,
} from "../../../redux/actions/pbProviderAdmin/PbProviderAdminActions";
import FORM from "../../organism/FORM";
import InputField from "../../../components/molcols/formik-fields/InputField";

const PbProviderAdminForm: React.FC<FormProps> = (props) => {
  const { mode = "create", onSubmitForm, value, ...rest } = props;

  const dispatch = useDispatch();

  const createLoading = useSelector(selectCreatePbProviderAdminLoading);
  const updateLoading = useSelector(selectUpdatePbProviderAdminLoading);

  const initialData = {
    Name: "",
    Order: 0,
  };

  const [initialValues, setInitialValues] = useState(initialData);

  useEffect(() => {
    if ((value?._id || value?.id) && mode === "update") {
      setInitialValues({
        Name: value?.name || "",
        Order: value?.order || 0,
      });
    } else {
      setInitialValues(initialData);
    }
  }, [value, mode]);

  const validationSchema = () =>
    Yup.object({
      Name: Yup.string().required("پر کردن نام تامین کننده الزامی است"),
      Order: Yup.number().required("پر کردن ترتیب الزامی است").min(0, "ترتیب نمی‌تواند منفی باشد"),
    });

  const handleSubmit = (data: Record<string, unknown>, resetForm: () => void) => {
    if (data) {
      const item = {
        name: data?.Name,
        order: data?.Order,
      };

      if (mode === "create") {
        dispatch(
          CreatePbProviderAdminAction({
            credentials: item,
            onSubmitForm,
            resetForm,
          })
        );
      } else if (mode === "update") {
        dispatch(
          UpdatePbProviderAdminAction({
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
              <div className="col-span-12">
                <InputField name="Name" label={`نام تامین کننده`} required />
              </div>
            ),
          },
          {
            component: (
              <div className="col-span-12">
                <InputField name="Order" label={`ترتیب`} type="number" required />
              </div>
            ),
          },
        ]}
        {...rest}
      />
    </>
  );
};

export default PbProviderAdminForm;