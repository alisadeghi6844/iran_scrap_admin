import { useState } from "react";
import Typography from "../../../../components/typography/Typography";
import AvatarUploader from "../../../organism/AvatarUploader";

const NewChannelFeature = (props: any) => {
  const [typeState, setTypeState] = useState(0);
  return (
    <div className="px-[40px]">
      <div className="flex justify-center -mt-6 font-bold text-xl">
        کانال جدید
      </div>
      <div className="mt-[30px]">
        <div className="flex justify-center mb-4">
            <AvatarUploader/>
        </div>
        <Typography className="text-sm mb-2">نوع کانال</Typography>
        <div className="w-full h-[48px] rounded-2xl bg-gray-200 flex items-center justify-between p-1 gap-x-4 relative">
          <div onClick={()=>setTypeState(0)} className="h-full flex justify-center text-lg items-center w-1/2 rounded-2xl text-primary-500 cursor-pointer z-10">
            عمومی
          </div>
          <div onClick={()=>setTypeState(1)} className="h-full flex justify-center text-lg items-center w-1/2 rounded-2xl text-primary-500 cursor-pointer z-10">
            خصوصی
          </div>
          <div
            className={`h-[90%] absolute bg-white top-1/2 -translate-y-1/2 transition-all duration-300 w-1/2 rounded-2xl ${
              typeState == 1 ? "left-[3px]" : "left-[49.2%]"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default NewChannelFeature;
