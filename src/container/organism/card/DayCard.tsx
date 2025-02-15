import React from "react";
import Typography from "../../../components/typography/Typography";
import { DayCardTypes } from "../../../types/organism/DayCardTypes";

const DayCard:React.FC<DayCardTypes> = (props) => {
  const { variant = "default", title, subTitle, ...rest } = props;
  return (
    <div
      className={`w-full p-2 h-[65px] rounded-3xl flex flex-col gap-y-1 items-center justify-center ${
        variant === "success" ? "bg-success-500" :variant==="error"?"bg-error-500": "bg-gray-100"
      }`}
      {...rest}
    >
      <Typography className={`font-bold ${variant==="success"||variant==="error"?"text-white":"text-gray-600"}`}>
        {title ?? "__"}
      </Typography>
      <Typography className={`${variant==="success"||variant==="error"?"text-white":"text-gray-500"}`}>{subTitle ?? "__"}</Typography>
    </div>
  );
};

export default DayCard;
