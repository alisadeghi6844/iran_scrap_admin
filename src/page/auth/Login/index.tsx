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
      <div className="bg-white w-full mt-12 p-8 pl-[200px]  rounded-[30px]">
        <div className="flex items-center gap-x-4 mt-32 mb-8">
          <div className="font-bold text-3xl text-primary-500">
            ورود به دیجی فارم
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
                  <div className="flex flex-col mt-12 gap-y-10">
                    <div>
                      <Input
                        onInput={() => setFieldTouched("PhoneNumber")}
                        errorMessage={
                          touched?.PhoneNumber && errors?.PhoneNumber
                        }
                        label="شماره تلفن"
                        name="PhoneNumber"
                        type="text"
                        value={values?.PhoneNumber}
                        onChange={(e: any) => {
                          handleChange(e);
                          onInputChange(e);
                        }}
                        ref={(el) => el && setInputWidth(el.offsetWidth)}
                      />
                    </div>
                  </div>
                  <div className="mt-20">
                    <Button
                      type="submit"
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
          </>
        ) : (
          <OtpCode
            handleOtpClick={handleResendOtp}
            handleSendOtp={(e: any) => handleLogin(e)}
          />
        )}
      </div>
    </AuthLayout>
  );
};

export default Login;
