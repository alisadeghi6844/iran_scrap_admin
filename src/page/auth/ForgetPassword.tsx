import React, { useState, ChangeEvent, useEffect, useCallback } from "react";

import AuthLayout from "../../container/organism/layouts/AuthLayout";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  SendClientOtpAction,
  VerifyOtpAction,
} from "../../redux/actions/account/AccountActions";
import { Formik } from "formik";
import Button from "../../components/button";
import Input from "../../components/input";
import {
  selectSendClientOtpData,
  selectSendClientOtpLoading,
  selectVerifyOtpData,
  selectVerifyOtpLoading,
} from "../../redux/slice/account/AccountSlice";
import Image from "../../components/image";
import Typography from "../../components/typography/Typography";
import OtpCode from "../../container/features/account/OtpCode";
import { FaArrowLeft } from "react-icons/fa6";
import ChangeUserPassword from "../../container/features/account/ChangeUserPassword";

const ForgetPassword = () => {
  const dispatch: any = useDispatch();

  const sendOtpLoading = useSelector(selectSendClientOtpLoading);
  const sendOtpData = useSelector(selectSendClientOtpData);
  const verifyOtpData = useSelector(selectVerifyOtpData);
  const verifyOtpLoading = useSelector(selectVerifyOtpLoading);

  const [isOtp, setIsOtp] = useState(false);

  const [inputLookMultiplier, setInputLookMultiplier] = useState(0);
  const [inputWidth, setInputWidth] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOtp, setDateOtp] = useState("");
  const [userName, setUserName] = useState("");
  const [otpState, setOtpState] = useState("");
  const [isChangePass, setIsChangePass] = useState(false);

  useEffect(() => {
    if (inputWidth && !inputLookMultiplier) {
      setInputLookMultiplier(inputWidth / 360);
    }
  }, [inputWidth, inputLookMultiplier]);

  const initialValues: any = {
    UserName: "",
    PhoneNumber: "",
  };

  const validationSchema = () =>
    Yup.object({
      UserName: Yup.string().required("وارد کردن نام کاربری الزامی می‌باشد."),
      PhoneNumber: Yup.string()
      .test(
        "no-leading-zero",
        "شماره تلفن نباید با صفر شروع شود.",
        (value) => {
          // بررسی اینکه آیا شماره تلفن با صفر شروع می‌شود
          if (!value) return true; // اگر مقدار خالی است، اعتبارسنجی را عبور بده
          return !/^0/.test(value); // اگر با صفر شروع شده باشد، اعتبارسنجی شکست می‌خورد
        }
      )
      .matches(
        /^(?:\+98|0098)?9\d{9}$/,
        "شماره تلفن باید با +98 یا 9 شروع شود و معتبر باشد."
      )
      .required("وارد کردن شماره تلفن الزامی می‌باشد."),
    });

  const handleSubmit = (data: any) => {
    if (data) {
      setUserName(data?.UserName);
      const items: any = {
        UserName: data?.UserName,
        phoneNumber: data?.PhoneNumber,
      };

      dispatch(SendClientOtpAction(items));
    }
  };

  useEffect(() => {
    setPhoneNumber("");
    if (sendOtpData?.data == "send" || sendOtpData?.data == "has") {
      setIsOtp(true);
      setPhoneNumber(sendOtpData?.phoneNumber);
      setDateOtp(sendOtpData?.date);
    } else if (sendOtpData?.data == "changePass") {
      setIsOtp(false);
      setPhoneNumber(sendOtpData?.phoneNumber);
      setDateOtp(sendOtpData?.date);
      setIsChangePass(true);
    } else {
      setIsOtp(false);
    }
  }, [sendOtpData]);

  const handleSendOtp = (e: any) => {
    if (e?.length) {
      setOtpState(e);
      dispatch(
        VerifyOtpAction({
          phoneNumber,
          otp: e,
        })
      );
    }
  };

  useEffect(() => {
    if (verifyOtpData?.status == 10) {
      setIsChangePass(true);
    } else {
      setIsChangePass(false);
    }
  }, [verifyOtpData]);

  const resetChangePassSetting = () => {
    setIsChangePass(false);
    setIsOtp(false);
  };

  return (
    <AuthLayout mode="forgetPassword">
      <div className="bg-white w-full p-8 pl-[200px]  rounded-[30px]">
        <div className="flex items-center justify-between gap-x-4 mt-32 mb-8">
          <div className="flex items-center gap-x-4">
            <Image
              src="/images/core/logo1.svg"
              alt="vira"
              className="h-[100px] w-[100px]"
            />
            <div className="font-bold text-3xl text-primary-500">
              {isChangePass
                ? "تغییر رمز عبور"
                : isOtp
                ? "رمز یکبار مصرف"
                : "فراموشی رمز عبور"}
            </div>
          </div>
          {!isChangePass && isOtp ? (
            <div
              onClick={() => setIsOtp(false)}
              className="text-xl cursor-pointer font-bold flex items-center gap-x-2"
            >
              <Typography>بازگشت</Typography>
              <FaArrowLeft />
            </div>
          ) : null}
        </div>

        {isChangePass ? (
          <>
            <ChangeUserPassword
            closeChangePassword={(e:any)=>setIsChangePass(e)}
              resetChangePassSetting={() => resetChangePassSetting()}
              phoneNumber={phoneNumber}
              otp={otpState}
            />
          </>
        ) : isOtp ? (
          <>
            <OtpCode
              verifyOtpLoading={verifyOtpLoading}
              handleOtpClick={() => {
                handleSubmit({
                  UserName: userName,
                  PhoneNumber: phoneNumber,
                });
              }}
              status={sendOtpData?.data}
              handleSendOtp={(e: any) => {
                handleSendOtp(e);
              }}
              date={dateOtp}
              phoneNumber={phoneNumber}
            />
          </>
        ) : (
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
                        }}
                        ref={(el) => el && setInputWidth(el.offsetWidth)}
                      />
                    </div>
                    <div className="relative w-full">
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
                        }}
                        ref={(el) => el && setInputWidth(el.offsetWidth)}
                      />
                      <Typography
                        tag="a"
                        link="/login"
                        className="absolute left-0 top-12 text-grey-600 hover:underline !text-md"
                      >
                        ورود به ویرا
                      </Typography>
                    </div>
                  </div>
                  <div className="mt-14">
                    <Button
                      type="submit"
                      loading={sendOtpLoading ?? false}
                      size="full"
                      className="text-xl"
                    >
                      دریافت کد
                    </Button>
                  </div>
                </form>
              )}
            </Formik>
          </>
        )}

        <div className="flex justify-center">
          <div className="mt-16 font-bold text-primary-500 text-lg">
            شرکت شاخص کنترل اسپادان
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgetPassword;
