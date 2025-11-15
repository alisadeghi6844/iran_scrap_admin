import React, { useState, ChangeEvent, useEffect, useCallback } from "react";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { Formik } from "formik";
import {
  selectVerifyOtpData,
  selectVerifyOtpLoading,
} from "../../../redux/slice/account/AccountSlice";
import {
  LoginAction,
  VerifyOtpAction,
} from "../../../redux/actions/account/AccountActions";
import AuthLayout from "../../../container/organism/layouts/AuthLayout";
import Input from "../../../components/input";
import Button from "../../../components/button";
import OtpCode from "../../../container/features/account/OtpCode";

const Login = () => {
  const dispatch = useDispatch();

  const loginLoading = useSelector(selectVerifyOtpLoading);
  const loginData = useSelector(selectVerifyOtpData);

  const [isSendOpt, setIsSendOtp] = useState(false);
  const [inputValues, setInputValues] = useState({
    PhoneNumber: "",
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
    PhoneNumber: "",
  };

  const validationSchema = () =>
    Yup.object({
      PhoneNumber: Yup.string()
        .required("لطفا شماره تلفن خود را وارد کنید")
        .matches(/^(09)\d{9}$/, "لطفا شماره تلفن معتبر وارد کنید"), // اعتبارسنجی شماره تلفن ایرانی
    });

  const handleSubmit = (data: any) => {
    if (data) {
      const items = {
        mobile: data.PhoneNumber,
      };
      dispatch(VerifyOtpAction(items));
      // dispatch(LoginAction(items));
    } else {
    }
  };

  useEffect(() => {
    if (loginData?.status == 201) {
      setIsSendOtp(true);
    }
  }, [loginData]);

  const handleResendOtp = () => {
    dispatch(
      VerifyOtpAction({
        mobile: inputValues?.PhoneNumber,
      })
    );
  };

  const handleLogin = (e: any) => {
    dispatch(
      LoginAction({
        mobile: inputValues?.PhoneNumber,
        totp: e,
      })
    );
  };

  return (
    <AuthLayout>
      <div className="w-full h-full flex flex-col justify-center p-6 lg:p-8 lg:pl-[200px]">
        {/* Mobile Logo and Header */}
        <div className="flex flex-col items-center lg:items-start mb-8 lg:mb-12">
          {/* Logo - visible on mobile */}
          <div className="flex justify-center mb-6 lg:hidden">
            <div className="relative">
              <img
                className="w-24 h-24 object-contain drop-shadow-lg"
                src="/images/core/logo.png"
                alt="دیجی فارم"
              />
            </div>
          </div>

          {/* Welcome Text */}
          <div className="text-center lg:text-right">
            <h1 className="font-bold text-2xl lg:text-3xl text-primary-500 mb-2">
              ورود به پنل ادمین دیجی فارم
            </h1>
            <p className="text-gray-600 text-sm lg:text-base">
              لطفاً شماره تلفن خود را وارد کنید
            </p>
          </div>
        </div>

        {!isSendOpt ? (
          <>
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
                  <div className="space-y-6">
                    <div className="relative">
                      <Input
                        onInput={() => setFieldTouched("PhoneNumber")}
                        errorMessage={
                          touched?.PhoneNumber && errors?.PhoneNumber
                        }
                        name="PhoneNumber"
                        type="text"
                        placeholder="09xxxxxxxxx"
                        value={values?.PhoneNumber}
                        onChange={(e: any) => {
                          handleChange(e);
                          onInputChange(e);
                        }}
                        ref={(el) => el && setInputWidth(el.offsetWidth)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="mt-8">
                    <Button
                      type="submit"
                      loading={loginLoading ?? false}
                      size="full"
                      className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                    >
                      {loginLoading ? "در حال ورود..." : "ورود به سامانه"}
                    </Button>
                  </div>

                  {/* Additional Info */}
                </form>
              )}
            </Formik>
          </>
        ) : (
          <div className="space-y-6">
            <div className="text-center lg:text-right">
              <h2 className="font-bold text-xl lg:text-2xl text-primary-500 mb-2">
                تایید شماره تلفن
              </h2>
              <p className="text-gray-600 text-sm lg:text-base">
                کد تایید به شماره {inputValues?.PhoneNumber} ارسال شد
              </p>
            </div>

            <OtpCode
              handleOtpClick={handleResendOtp}
              handleSendOtp={(e: any) => handleLogin(e)}
            />

            <div className="text-center">
              <button
                onClick={() => setIsSendOtp(false)}
                className="text-primary-500 text-sm hover:text-primary-600 transition-colors"
              >
                تغییر شماره تلفن
              </button>
            </div>
          </div>
        )}
      </div>
    </AuthLayout>
  );
};

export default Login;
