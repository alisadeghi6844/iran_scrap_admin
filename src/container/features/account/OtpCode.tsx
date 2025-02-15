import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import Button from "../../../components/button";
import { useCountdown } from "../../../hooks/UseCountDown";

const OtpCode = (props: any) => {
  const {
    phoneNumber,
    verifyOtpLoading,
    handleSendOtp,
    handleOtpClick,
    date,
    status,
  } = props;
  const [otp, setOtp] = useState("");
  const [timeLeft, actions] = useCountdown(300000, 1000); // 5 دقیقه برای status send

  useEffect(() => {
    if (status === "send") {
      actions.reset();
      actions.start();
    } else if (status === "has") {
      const currentTime = new Date().getTime();
      const expireTime = new Date(date).getTime();
      const remainingTime = expireTime - currentTime;

      if (remainingTime > 0) {
        actions.start(remainingTime); // شروع تایمر با زمان باقیمانده
      } else {
        actions.reset(); // اگر زمان اکسپایر شده باشد، تایمر را ریست کن
      }
    }
  }, [status, date]);

  useEffect(() => {
    if (otp?.length == 5) {
      handleSendOtp && handleSendOtp(otp);
    }
  }, [otp]);

  return (
    <>
      <div>
        کد فعالسازی 5 رقمی به شماره همراه{" "}
        <span className="text-primary-500 font-bold">{phoneNumber}</span> ارسال
        شد.
      </div>
      <div
        className="w-full h-full flex justify-center items-center pt-12"
        style={{ direction: "ltr" }}
      >
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={5}
          shouldAutoFocus
          containerStyle={{
            width: "full",
            display: "flex",
            gap: "22px",
            justifyContent: "center",
            alignItems: "center",
          }}
          inputStyle={{
            fontSize: "24px",
            outline: "none",
            border: "1px solid #BDBDBD",
            borderRadius: "8px",
            width: "66px",
            height: "66px",
          }}
          renderSeparator={<span>-</span>}
          renderInput={(props) => (
            <>
              <input {...props} />
            </>
          )}
        />
      </div>
      <div className="flex justify-center">
        <Button
          loading={verifyOtpLoading ?? false}
          onClick={() => {
            handleOtpClick && handleOtpClick();
          }}
          disable={timeLeft !== "00:00"}
          className="mt-12 h-[52px] text-xl w-[100%]"
        >
          {timeLeft !== "00:00" ? timeLeft : "ارسال مجدد"}
        </Button>
      </div>
    </>
  );
};

export default OtpCode;
