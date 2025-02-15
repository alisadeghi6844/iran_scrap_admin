import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { _t } from "../dashboard/DashboardDictionary";
import { PublicDictionary } from "../../../utils/dictionary";
import FORM from "../../organism/FORM";
import { useEffect, useState } from "react";

import { ChangeClientPasswordAction } from "../../../redux/actions/account/AccountActions";
import {
  selectChangeClientPasswordData,
  selectChangeClientPasswordLoading,
} from "../../../redux/slice/account/AccountSlice";
import InputPasswordField from "../../../components/molcols/formik-fields/InputPasswordField";

const ChangePassword = (props: any) => {
  const { phoneNumber, otp,resetChangePassSetting,closeChangePassword } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const changeClientPasswordLoading = useSelector(
    selectChangeClientPasswordLoading
  );
  const changeClientPasswordData = useSelector(selectChangeClientPasswordData);

  useEffect(() => {
    if (isPasswordChanged) {
      closeChangePassword(false)
      navigate("/login");
    }
  }, [isPasswordChanged]);
  const initialValues = {
    NewPassword: "",
    RepeatNewPassword: "",
  };

  const submitHandler = (data: any) => {
    if (data) {
      const items = {
        newPassword: data?.NewPassword,
        otp,
        phoneNumber,
      };

      dispatch(ChangeClientPasswordAction({ credentials: items, setIsPasswordChanged }));
    }
  };

  const validationSchema = () =>
    Yup.object({
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


    if(isPasswordChanged){
      resetChangePassSetting()
    }

  return (
    <>
      <FORM
        mode="create"
        loading={[changeClientPasswordLoading, changeClientPasswordLoading]}
        initialValues={initialValues}
        handleSubmit={submitHandler}
        validationSchema={validationSchema}
        filterButtonText="تغییر رمز عبور"
        items={[
          {
            component: (
              <div className="col-span-12">
                <InputPasswordField
                  name="NewPassword"
                  label={PublicDictionary.new_password}
                />
              </div>
            ),
          },
          {
            component: (
              <div className="col-span-12">
                <InputPasswordField
                  name="RepeatNewPassword"
                  label={PublicDictionary.re_new_password}
                />
              </div>
            ),
          },
        ]}
      />
    </>
  );
};

export default ChangePassword;
