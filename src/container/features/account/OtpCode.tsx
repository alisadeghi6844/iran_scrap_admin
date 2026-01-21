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
  const [timeLeft, actions] = useCountdown(20000, 1000); // 5 دقیقه برای status send

  useEffect(() => {
      actions.reset();
      actions.start();

  }, [status, date]);

  useEffect(() => {
    if (otp?.length == 6) {
      handleSendOtp && handleSendOtp(otp);
    }
  }, [otp]);

  return (
    <div className="space-y-6">
      {phoneNumber && (
        <div className="text-center lg:text-right text-gray-600 text-sm lg:text-base">
          کد فعالسازی 6 رقمی به شماره همراه{" "}
          <span className="text-primary-500 font-bold">{phoneNumber}</span> ارسال شد.
        </div>
      )}
      
      <div
        className="w-full flex justify-center items-center py-8"
        style={{ direction: "ltr" }}
      >
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          shouldAutoFocus
          containerStyle={{
            width: "100%",
            display: "flex",
            gap: window.innerWidth < 768 ? "8px" : "16px",
            justifyContent: "center",
            alignItems: "center",
          }}
          inputStyle={{
            fontSize: window.innerWidth < 768 ? "18px" : "24px",
            outline: "none",
            border: "2px solid #E5E7EB",
            borderRadius: "12px",
            width: window.innerWidth < 768 ? "48px" : "66px",
            height: window.innerWidth < 768 ? "48px" : "66px",
            textAlign: "center",
            transition: "all 0.2s ease",
            backgroundColor: "#f1f5f9",
          }}
          focusStyle={{
            border: "2px solid #64748b",
            backgroundColor: "#f8fafc",
            boxShadow: "0 0 0 3px rgba(100, 116, 139, 0.1)",
          }}
          renderInput={(props) => (
            <input 
              {...props} 
              className="focus:border-primary-500 focus:bg-white focus:shadow-lg transition-all duration-200"
            />
          )}
        />
      </div>
      
      <div className="space-y-4">
        <Button
          loading={verifyOtpLoading ?? false}
          onClick={() => {
            handleOtpClick && handleOtpClick();
          }}
          disable={timeLeft !== "00:00"}
          className="w-full py-4 text-lg font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
          variant={timeLeft !== "00:00" ? "outline" : "primary"}
        >
          {timeLeft !== "00:00" ? `ارسال مجدد (${timeLeft})` : "ارسال مجدد کد"}
        </Button>
        
        {timeLeft !== "00:00" && (
          <div className="text-center">
            <p className="text-xs text-gray-500">
              کد را دریافت نکردید؟ لطفاً {timeLeft} صبر کنید
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OtpCode;
