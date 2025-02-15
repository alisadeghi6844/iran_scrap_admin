import React from "react";
import FlowerIcon from "../../../components/icon/custom/FlowerIcon";
import FrameFoodCardIcon from "../../../components/icon/custom/FrameFoodCardIcon";
import FrameFoodCardIcon_2 from "../../../components/icon/custom/FrameFoodCardIcon_2";
import HeartIcon from "../../../components/icon/custom/HeartIcon";
import Typography from "../../../components/typography/Typography";
import { NotificationsTypes } from '../../../types/organism/NotificationsTypes';

const FoodCard:React.FC<NotificationsTypes> = (props) => {
    const {title = "غذاهای امروز",subTitle,text,...rest} = props;
  return (
    <div className="w-full h-[170px] rounded-lg p-6 bg-primary relative" {...rest}>
      <div className="w-[74%]">
        <div className="flex items-center justify-between">
          <Typography tag="p" className="font-bold text-white text-2xl">
            {title} :{" "}
          </Typography>
          <div className="flex items-center gap-x-1">
            <div
              className="w-[34px] h-[34px] rounded flex items-center justify-center "
              style={{
                background:
                  "linear-gradient(105.73deg, #47976B 5.85%, #3419CA 92.75%)",
              }}
            >
              <HeartIcon />
            </div>
            <div className="flex items-center justify-center h-[34px] px-4 text-success-700  bg-success-50 rounded">
              <Typography tag="p">{subTitle}</Typography>
            </div>
          </div>
        </div>
        <div>
          <Typography tag="p" className="mt-4 text-lg text-white"> 
          {text}
          </Typography>
        </div>
      </div>
      <div className="absolute left-0 bottom-0">
        <FrameFoodCardIcon/>
      </div>
      <div className="absolute left-0 bottom-0">
        <FrameFoodCardIcon_2/>
      </div>
      <div className="absolute left-0 bottom-0">
        <FlowerIcon/>
      </div>
    </div>
  );
};
export default FoodCard;
