import CactusIcon from "../../../components/icon/custom/CactusIcon";

const AuthLayout = (props: any) => {
  const { children, mode = "login" } = props;
  return (
    <div className="bg-gradient-to-br from-[#0084b079] via-[#4a90e2] to-[#db009d67] relative w-full min-h-screen flex items-center justify-center p-4">
      {/* Mobile Background Pattern */}
      <div className="absolute inset-0 lg:hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
        <div
          className="absolute bottom-20 left-10 w-24 h-24 bg-white/10 rounded-full blur-lg animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-md animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 bg-white w-full max-w-6xl h-auto lg:h-[85vh] rounded-2xl lg:rounded-[30px] shadow-2xl overflow-hidden relative z-10 backdrop-blur-sm">
        {/* Desktop Side Panel */}
        <div className="hidden lg:block lg:col-span-6 relative">
          {mode === "login" ? (
            <>
              <div className="h-full w-[60%] top-0 right-0 absolute bg-gradient-to-br from-[#c0dcea] to-[#a8c8e1] rounded-[30px]">
                <div className="absolute bottom-8 right-20">
                  <CactusIcon />
                </div>
              </div>
              <img
                className="absolute top-[10%] right-[40%] !w-[100px] h-[120px] drop-shadow-lg"
                src="/images/core/logo.png"
              />
            </>
          ) : mode === "forgetPassword" ? (
            <>
              <div className="h-full w-[60%] top-0 right-0 absolute bg-gradient-to-br from-[#FEDCC5] to-[#f4c2a1] rounded-[30px]"></div>
              <img
                className="absolute bottom-16 right-[6%] !w-[630px] h-[570px]"
                src="/images/core/89e31fb982e6d87f239196db2b3e9c.png"
              />
            </>
          ) : null}
        </div>

        {/* Form Section */}
        <div className="col-span-1 lg:col-span-6 flex flex-col justify-center min-h-[100vh] lg:min-h-0 animate-fade-in">
          {children}
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
