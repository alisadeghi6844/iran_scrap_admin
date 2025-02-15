import React from "react";
import { StatusFoodCardTypes } from "../../../types/organism/StatusFoodCard";
import Typography from "../../../components/typography/Typography";
import FoodIconCard from "../../../components/icon/custom/FoodIconCard";
import TopLineFoodCardIcon from "../../../components/icon/custom/TopLineFoodCardIcon";
import BottomLineFoodCardIcon from "../../../components/icon/custom/BottomLineFoodCardIcon";

const StatusFoodCard: React.FC<StatusFoodCardTypes> = (props) => {
  const { number, title, variant, icon, ...rest } = props;

  return (
    <div
      className="w-full h-[105px] rounded-xl bg-white shadow-lg p-4 flex items-center justify-between relative"
      {...rest}
    >
      <div className="absolute -top-[6px] left-[84px] z-10">
        <TopLineFoodCardIcon  variant={variant}/>
      </div>
      <div className="absolute -bottom-[6px] left-[84px] z-10">
        <BottomLineFoodCardIcon  variant={variant}/>
      </div>
      <div>
        <Typography tag="p" className="font-bold text-gray-400 text-xl">
          {title??"_"} :
        </Typography>
        <Typography tag="p" className="font-bold text-2xl mt-2">
          {number??0}
        </Typography>
      </div>
      <div>
        <FoodIconCard variant={variant} />
      </div>
    </div>
  );
};

export default StatusFoodCard;
