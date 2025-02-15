import React, { useState, ChangeEvent, useEffect, useCallback } from "react";

import AuthLayout from "../../container/organism/layouts/AuthLayout";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { LoginAction } from "../../redux/actions/account/AccountActions";
import { Formik } from "formik";
import Button from "../../components/button";
import Input from "../../components/input";
import { selectLoginLoading } from "../../redux/slice/account/AccountSlice";
import InputPasswordField from "../../components/molcols/formik-fields/InputPasswordField";
import Image from "../../components/image";
import Typography from "../../components/typography/Typography";

const STATE_MACHINE_NAME = "Login Machine";

const Login = () => {
  const dispatch = useDispatch();

  const loginLoading = useSelector(selectLoginLoading);

  const [inputValues, setInputValues] = useState({
    UserName: "",
    Password: "",
  });
  const [inputLookMultiplier, setInputLookMultiplier] = useState(0);
  const [inputWidth, setInputWidth] = useState(0);

  useEffect(() => {
    if (inputWidth && !inputLookMultiplier) {
      setInputLookMultiplier(inputWidth / 360);
    }
  }, [inputWidth, inputLookMultiplier]);

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setInputValues((prev) => ({ ...prev, [name]: value }));
    },
    [inputLookMultiplier]
  );

  const initialValues: any = {
    UserName: "",
    Password: "",
  };

  const validationSchema = () =>
    Yup.object({
      UserName: Yup.string().required("وارد کردن نام کاربری الزامی می‌باشد."),
      Password: Yup.string()
        .max(64, "طول رمز عبور بیشتر از مقدار مجاز می‌باشد.")
        .required("وارد کردن رمز عبور الزامی می‌باشد."),
    });

  const handleSubmit = (data: any) => {
    if (data) {
      const items: any = {
        personnelCode: data?.UserName,
        password: data?.Password,
      };

      dispatch(LoginAction(items));
    } else {
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white w-full p-8 pl-[200px]  rounded-[30px]">
        <div className="flex items-center gap-x-4 mt-32 mb-8">
          <Image
            src="/images/core/logo1.svg"
            alt="vira"
            className="h-[100px] w-[100px]"
          />
          <div className="font-bold text-3xl text-primary-500">
            ورود به ویرا
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            touched,
            setFieldTouched,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-y-10">
                <div>
                  <Input
                    onInput={() => setFieldTouched("UserName")}
                    errorMessage={touched?.UserName && errors?.UserName}
                    label="نام کاربری"
                    name="UserName"
                    type="text"
                    value={values?.UserName}
                    onChange={(e: any) => {
                      handleChange(e);
                      onInputChange(e);
                    }}
                    ref={(el) => el && setInputWidth(el.offsetWidth)}
                    onBlur={() =>
                      isCheckingInput && (isCheckingInput.value = false)
                    }
                  />
                </div>
                <div className="relative w-full">
                  <InputPasswordField
                    onChange={handleChange}
                    onInput={() => setFieldTouched("Password")}
                    errorMessage={touched?.Password && errors?.Password}
                    passwordValue={values?.Password}
                    name="Password"
                    label="رمز عبور"
                  />
                  <Typography
                    tag="a"
                    link="/forget-password"
                    className="absolute left-0 top-12 text-grey-600 hover:underline !text-md"
                  >
                    فراموشی رمز عبور
                  </Typography>
                </div>
              </div>
              <div className="mt-14">
                <Button
                  loading={loginLoading ?? false}
                  size="full"
                  className="text-xl"
                >
                  ورود
                </Button>
              </div>
            </form>
          )}
        </Formik>
        <div className="flex justify-center">
          <div className="mt-16 font-bold text-primary-500 text-lg">
            شرکت شاخص کنترل اسپادان
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
