import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FormProps } from "react-router-dom";

import FORM from "../../../organism/FORM";
import InputField from "../../../../components/molcols/formik-fields/InputField";
import { PublicDictionary } from "../../../../utils/dictionary";
import { selectUpdateUserPasswordLoading } from "../../../../redux/slice/account/CreateUserSlice";
import { updateUserPasswordAction } from "../../../../redux/actions/account/CreateUser";

const ChangePasswordForm: React.FC<FormProps> = (props) => {
  const { mode = "create", onSubmitForm, value, ...rest } = props;

  const dispatch: any = useDispatch();

  const updateLoading: any = useSelector(selectUpdateUserPasswordLoading);

  const initialData = {
    NewPassword: "",
    ReNewPassword: "",
  };

  const [initialValues, setInitialValues] = useState<any>(initialData);

  const validationSchema = () =>
    Yup.object({
      NewPassword: Yup.string()
        .required("رمز عبور الزامی است")
        .min(6, "رمز عبور باید بیشتر از 5 کاراکتر باشد")
        .matches(/[a-z]/, "رمز عبور باید شامل حداقل یک حرف کوچک باشد")
        .matches(/[A-Z]/, "رمز عبور باید شامل حداقل یک حرف بزرگ باشد")
        .matches(/[0-9]/, "رمز عبور باید شامل حداقل یک عدد باشد")
        .matches(/[^a-zA-Z0-9]/, "رمز عبور باید شامل حداقل یک علامت خاص باشد"),
      ReNewPassword: Yup.string()
        .required("تکرار رمز عبور الزامی است")
        .oneOf(
          [Yup.ref("NewPassword"), null],
          "رمز عبور و تکرار رمز عبور باید یکسان باشند"
        ),
    });

  const handleSubmit = (data: any, resetForm: any) => {
    if (data) {
      const items = {
        newPassword: data?.NewPassword,
        reNewPassword: data?.ReNewPassword,
        userId: value?._id,
      };
      dispatch(
        updateUserPasswordAction({
          credentials: items,
          onSubmitForm,
          resetForm,
        })
      );
    }
  };

  return (
    <>
      <FORM
        mode={mode}
        loading={[
          updateLoading && updateLoading,
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
                <InputField
                  name="NewPassword"
                  type="password"
                  label={` ${PublicDictionary.new_password}`}
                  required
                />
              </div>
            ),
          },
          {
            component: (
              <div className="col-span-12">
                <InputField
                  name="ReNewPassword"
                  type="password"
                  label={` ${PublicDictionary.re_new_password}`}
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

export default ChangePasswordForm;
