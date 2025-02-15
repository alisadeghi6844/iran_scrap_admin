import React, { useState } from "react";
import { IoMdAttach } from "react-icons/io";
import { FaFileAlt } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
import OutsideClickHandler from "react-outside-click-handler";


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
          onClick={toggleBox}
          className="w-[50px] -mr-3 h-[60px] rounded-l-xl flex text-gray-700 items-center justify-center bg-white cursor-pointer transition-all hover:bg-gray-200"
        >
          <IoMdAttach className="text-2xl" />
        </div>
        {isVisible ? (
          <div
            className={`absolute min-w-[160px] bottom-full mb-2 left-0 bg-white rounded-xl flex flex-col justify-center items-center overflow-hidden duration-200 ${
              openBox
                ? "min-h-[50px] p-1 block translate-y-0"
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
