import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { _t } from "../dashboard/DashboardDictionary";
import { PublicDictionary } from "../../../utils/dictionary";
import FORM from "../../organism/FORM";
import InputField from "../../../components/molcols/formik-fields/InputField";
import AuthLayout_2 from "../../organism/layouts/AuthLayout_2";
import Typography from "../../../components/typography/Typography";
import { useEffect, useState } from "react";

import {
  ChangePasswordAction,
  LogOutAction,
} from "../../../redux/actions/account/AccountActions";
import { selectChangePasswordLoading } from "../../../redux/slice/account/AccountSlice";

const ChangePasswordContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const changePasswordLoading = useSelector(selectChangePasswordLoading);

  useEffect(() => {
    if (isPasswordChanged) {
      dispatch(LogOutAction());
      navigate("/login");
    }
  }, [isPasswordChanged]);

  const initialValues = {
    OldPassword: "",
    NewPassword: "",
    RepeatNewPassword: "",
  };

  const submitHandler = (data: any) => {
    if (data) {
      const items = {
        oldPassword: data?.OldPassword,
        newPassword: data?.NewPassword,
      };

      dispatch(
        ChangePasswordAction({
          credentials: items,
          setIsPasswordChanged,
        })
      );
    }
  };

  const validationSchema = () =>
    Yup.object({
      OldPassword: Yup.string().required("پر کردن فیلد پسوورد اجباری میباشد"),
      NewPassword: Yup.string()
        .required("پر کردن این فیلد الزامی است.")
        .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد.")
        .matches(/[a-z]+/, "رمز عبور باید شامل حداقل یک حرف کوچک انگلیسی باشد.")
        .matches(/[A-Z]+/, "رمز عبور باید شامل حداقل یک حرف بزرگ انگلیسی باشد.")
        .matches(
          /[@$!%*#?&]+/,
          "رمز عبور باید شامل حداقل یک کاراکتر خاص (@ یا $ یا ! یا % یا * یا # یا ? یا &) باشد."
        )
        .matches(/\d+/, "رمز عبور باید شامل حداقل یک عدد باشد."),
      RepeatNewPassword: Yup.string()
        .required("پر کردن این فیلد الزامی است.")
        .oneOf(
          [Yup.ref("NewPassword"), null],
          "رمز عبورهای وارد شده یکسان نیستند."
        ),
    });

  return (
    <>
      <AuthLayout_2>
        <div className="w-[60%] flex flex-col">
          <Typography className="mb-2 border-dashed border-2 rounded-lg p-2 bg-primary-200 text-primary-500 font-bold">
            جهت تغییر رمز عبور، ابتدا "رمز عبور فعلی" و سپس "رمز عبور جدید" و
            "تکرار رمز عبور جدید" را وارد فرمایید.
          </Typography>
          <FORM
            mode="create"
            loading={[changePasswordLoading, changePasswordLoading]}
            initialValues={initialValues}
            handleSubmit={submitHandler}
            validationSchema={validationSchema}
            validateOnBlur
            filterButtonText="تغییر رمز عبور"
            items={[
              {
                component: (
                  <div className="col-span-12">
                    <InputField
                      type="password"
                      name="OldPassword"
                      label={PublicDictionary.oldPassword}
                      autoFocus
                    />
                  </div>
                ),
              },
              {
                component: (
                  <div className="col-span-12">
                    <InputField
                      type="password"
                      name="NewPassword"
                      label={PublicDictionary.new_password}
                    />
                  </div>
                ),
              },
              {
                component: (
                  <div className="col-span-12">
                    <InputField
                      type="password"
                      name="RepeatNewPassword"
                      label={PublicDictionary.re_new_password}
                    />
                  </div>
                ),
              },
            ]}
          />
        </div>
      </AuthLayout_2>
    </>
  );
};

export default ChangePasswordContent;
