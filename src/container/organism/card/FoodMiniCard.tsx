import React from "react";
import { Tooltip } from "react-tooltip";
import Typography from "../../../components/typography/Typography";
import TextOverflow from "../../../utils/TextOverflow";
import { FoodMiniCardTypes } from "../../../types/organism/FoodMiniCardTypoes";

const FoodMiniCard: React.FC<FoodMiniCardTypes> = (props) => {
  const { variant, title, subTitile, badgeText, ...rest } = props;

  return (
    <div
      className={`p-[3px] rounded-xl transition-all border-4 ${
        variant === "success"
          ? "border-success-500"
          : variant === "primary"
          ? "border-primary-500"
          : variant === "error"
          ? "border-error-500"
          : "border-gray-100"
      } w-full h-[128px]`}
      {...rest}
    >
      <div className="flex items-center justify-between">
        <Typography
          className={`text-sm font-bold ${
            variant === "success"
              ? "text-success-500"
              : variant === "primary"
              ? "text-primary-500"
              : variant === "error"
              ? "text-error-500"
              : "text-gray-700"
          }`}
        >
          {title ?? "__"}
        </Typography>
        <div
          className={`text-xs ${
            variant === "success"
              ? "text-success-500 bg-success-50"
              : variant === "primary"
              ? "text-primary-500 bg-priamry-100"
              : variant === "error"
              ? "text-error-500 bg-error-100"
              : "text-gray-700 bg-gray-100"
          }  p-1 rounded`}
        >
          {badgeText ?? "__"}
        </div>
      </div>
      <Typography
        className={`mt-2 text-sm ${
          variant === "success"
            ? "text-success-500"
            : variant === "primary"
            ? "text-primary-500"
            : variant === "error"
            ? "text-error-500"
            : "text-gray-700"
        }`}
      >
        <TextOverflow number={70}>{subTitile ?? "__"}</TextOverflow>
      </Typography>
    </div>
  );
};

export default FoodMiniCard;
