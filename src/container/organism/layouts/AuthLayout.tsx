import React from "react";
import CactusIcon from "../../../components/icon/custom/CactusIcon";
import Image from "../../../components/image";

const AuthLayout = (props: any) => {
  const { children, mode = "login", ...rest } = props;
  return (
    <div className="bg-gradient-to-r from-[#0084b079] to-[#db009d67] relative w-full h-screen">
      <div className="grid grid-cols-12 absolute bg-white h-[80%] w-[80%] rounded-[30px] top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
        <div className="col-span-6 relative">
          {mode === "login" ? (
            <>
              <div className="h-full w-[60%] top-0 right-0 absolute bg-[#c0dcea] rounded-[30px]">
                <div className="absolute bottom-8 right-20">
                  {" "}
                  <CactusIcon />
                </div>
              </div>
              <Image
                className="absolute top-[10%] right-[40%] !w-[100px] h-[120px]"
                src="/images/core/logo.png"
              />
            </>
          ) : mode === "forgetPassword" ? (
            <>
              {" "}
              <div className="h-full w-[60%] top-0 right-0 absolute bg-[#FEDCC5] rounded-[30px]"></div>{" "}
              <Image
                className="absolute bottom-16 right-[6%] !w-[630px] h-[570px]"
                src="/images/core/89e31fb982e6d87f239196db2b3e9c.png"
              />
            </>
          ) : null}
        </div>
        <div className="col-span-6">{children}</div>
      </div>
    </div>
  );
};
export default AuthLayout;
