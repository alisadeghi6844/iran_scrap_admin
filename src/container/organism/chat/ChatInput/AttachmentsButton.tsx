import React, { useState } from "react";
import { LuCirclePlus } from "react-icons/lu";

import { FaFileAlt } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
import OutsideClickHandler from "react-outside-click-handler";
import { Tooltip } from "react-tooltip";


interface AttachmentsButtonTypes{
  onClickAttachment?:any;
}

const AttachmentsButton:React.FC<AttachmentsButtonTypes> = (props) => {
  const {onClickAttachment} = props;

  const [openBox, setOpenBox] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleBox = () => {
    if (!openBox) {
      setIsVisible(true);
    } else {
      setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }
    setOpenBox((prev) => !prev);
  };

  return (
    <div className="relative">
      <OutsideClickHandler
        onOutsideClick={() => {
          setOpenBox(false);
        }}
      >
        <div
        data-tooltip-id="attachment_button" data-tooltip-content="آپلود فایل"
          onClick={toggleBox}
        >
          <LuCirclePlus className="text-[26px] text-[#A1A1A1] transition-all hover:text-primary-500 cursor-pointer" />
        </div>
        <Tooltip id="attachment_button" />
        {isVisible ? (
          <div
            className={`absolute min-w-[160px] bottom-[110%] mb-2 -left-4 bg-white rounded-xl flex flex-col justify-center items-center overflow-hidden duration-200 shadow-lg ${
              openBox
                ? "min-h-[40px] p-1 block translate-y-0"
                : " p-0 hidden -translate-y-4"
            } transition-all`}
          >
            <div onClick={()=>onClickAttachment("file")} className="w-full h-full p-3 flex items-center gap-x-2 cursor-pointer hover:bg-gray-200 transition-all rounded-xl">
              <FaFileAlt className="text-2xl text-gray-800" />
              <div className="text-md text-gray-700">فایل</div>
            </div>
            <div onClick={()=>onClickAttachment("media")} className="w-full h-full p-3 flex items-center gap-x-2 cursor-pointer hover:bg-gray-200 transition-all rounded-xl">
              <FaRegImage className="text-2xl text-gray-800" />
              <div className="text-md text-gray-700">عکس یا فیلم</div>
            </div>
          </div>
        ):null}
      </OutsideClickHandler>
    </div>
  );
};

export default AttachmentsButton;
