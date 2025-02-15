import React from "react";
import Image from "../../../components/image";
import Typography from "../../../components/typography/Typography";
import { FaChevronLeft } from "react-icons/fa6";
import { FoodCategoryCardTypes } from "../../../types/organism/FoodCategoryCardTypes";

const FoodCategoryCard: React.FC<FoodCategoryCardTypes> = (props) => {
  const { title, image, base64,active, ...rest } = props;
  return (
    <div
      className={`w-full h-[110px] rounded-2xl transition-all ${active?"bg-primary-200":"bg-white"} relative cursor-pointer group`} 
      style={{
        boxShadow:
          "rgba(58, 61, 66, 0.06) 0px 1px 0px, rgba(0, 0, 0, 0.3) 0px 8px 32px -16px",
      }}
    >
      <Image
        base64={base64}
        src={image ?? "/images/core/placeholder.png"}
        className="absolute  w-[93%] h-[92%] z-10 top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 rounded-2xl"
        alt={title ?? "__"}
      />
      <div className={` ${active?"bg-primary-200 text-primary-500 font-bold":"bg-white text-gray-800"} transition-all absolute bottom-[4px] right-[6px] z-20 h-[26px] gap-x-2 w-auto flex items-center justify-center px-3 py-3 rounded-tl-xl`}>
        <Typography> {title ?? "__"}</Typography>
        <FaChevronLeft className="text-md group-hover:-translate-x-1 text-primary font-bold transition-all" />
      </div>
    </div>
  );
};
export default FoodCategoryCard;
