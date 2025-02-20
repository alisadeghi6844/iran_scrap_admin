import { LuImageUp } from "react-icons/lu";

const AvatarUploader = () => {
  return (
    <div className="w-[120px] h-[120px] rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
      <LuImageUp className="text-[38px] text-gray-600"/>
    </div>
  );
};

export default AvatarUploader;
