import React, { ReactNode } from "react";
import Typography from "../../../components/typography/Typography";
import "animate.css";

interface AuthLayoutProps {
  children: ReactNode;
  [key: string]: any; // برای هر prop اضافی
}

const AuthLayout_2: React.FC<AuthLayoutProps> = (props) => {
  const { children, ...rest } = props;
  const shapeStyle: React.CSSProperties = {
    left: "0%",
    background:
      "linear-gradient(-54.452deg, #3E82FD 0%, rgba(92,175,98,61%) 100%)",
    transform: "translateX(0)",
  };

  return (
    <div
      className="w-full overflow-hidden flex flex-col lg:flex-row items-start justify-center lg:py-0"
      {...rest}
    >
      <span style={shapeStyle} className="hidden lg:block lg:w-[60%] h-full absolute">
        <div className="flex flex-col items-center justify-between gap-28 py-8">
          <div>
            <div
              className="w-[150px] h-[100px] 2xl:w-[200px] mb-4 mt-4 mx-auto"
              style={{
                backgroundImage: "url(images/core/logo-w.png)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "10vw",
                backgroundPosition: "center",
              }}
            />
            <Typography className="font-bold text-white text-2xl lg:text-3xl tracking-wider">
              سـامــــانه مدیریت کارکنان
            </Typography>
            <Typography className="font-bold text-white text-xl lg:text-2xl text-center mt-4">
              ویرا
            </Typography>
          </div>
          <div
            className="w-[60vw] h-[45vh] 2xl:h-[50vh]"
            style={{
              backgroundImage: "url(images/core/loginBG.png)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "38vw",
              backgroundPosition: "center",
            }}
          />
        </div>
      </span>
      <div className="w-full h-screen flex flex-col py-4 lg:py-8">
        <div className="w-full lg:w-[40%] flex flex-col items-center justify-center my-auto px-4 lg:px-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout_2;
