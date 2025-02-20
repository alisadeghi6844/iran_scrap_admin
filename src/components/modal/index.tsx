import React from "react";

import Typography from "../typography/Typography";
import { ModalTypes } from "../../types/components/ModalTypes";
import { IoCloseSharp } from "react-icons/io5";

const Modal:React.FC<ModalTypes> = (props) => {
  const {
    bgModal,
    headerIcon,
    headerTitle,
    headerSubTitle,
    className,
    children,
    bgColor,
    hideIcon = false,
    hideBackground = false,
    onClose,
    open = false,
    size = "auto",
    ...rest
  } = props;

  return (
    <>
      {!hideBackground ? (
        <div
          onClick={() => onClose()}
          className={`w-full h-full fixed top-0 right-0 z-[999] ${bgColor?bgColor:"bg-gray-800 opacity-80"}  ${
            open ? "block" : "hidden"
          }`}
        />
      ) : null}

      <div
        className={`z-[9999] fixed overflow-y-auto top-1/2 right-1/2 max-h-[95vh] ${
          bgModal ? bgModal : "bg-white"
        } px-4 pb-4 ${
          hideIcon ? "pt-4" : "pt-10"
        } rounded-xl translate-x-1/2 -translate-y-1/2 overflow-y-auto ${
          className ? className : ""
        } ${open ? "block" : "hidden"}
        ${
          {
            auto: "w-auto h-auto",
            sm: "w-[16%]",
            md: "w-[28%]",
            lg: "min-w-[40%]",
            xl: "min-w-[60%] min-h-[40vh]",
            "2xl": "min-w-[80%] min-h-[70vh]",
            full: "w-full h-auto",
          }[size]
        }
        `}
        {...rest}
      >
 
        {headerTitle?(<div className="-mt-6">
          <div className="flex items-center">
            {headerIcon ? headerIcon : null}
            {headerTitle ? (
              <Typography className="font-bold text-lg" tag="h6">
                {headerTitle}
              </Typography>
            ) : null}
          </div>
          {headerSubTitle ? <Typography>{headerTitle}</Typography> : null}
        </div>):null}
        {!hideIcon ? (
          <div
            className="absolute cursor-pointer top-2 left-2 z-20"
            onClick={() => onClose()}
          >
            <IoCloseSharp className="text-3xl" />
          </div>
        ) : null}
        {children}
      </div>
    </>
  );
};

export default Modal;
