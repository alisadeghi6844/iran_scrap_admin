import React from "react";
import { FoodImageCardTypes } from "../../../types/organism/FoodImageCard";
import Typography from "../../../components/typography/Typography";
import Image from "../../../components/image";
import TextOverflow from "../../../utils/TextOverflow";
import { GrRestaurant } from "react-icons/gr";
import Button from "../../../components/button";
import { IoAddOutline } from "react-icons/io5";
import { LuTrash2 } from "react-icons/lu";

const FoodImageCard: React.FC<FoodImageCardTypes> = (props) => {
  const {
    image,
    title,
    small = false,
    categories,
    active,
    description,
    restaurant,
    selectFood,
    base64 = false,
    handleSelectFood,
    ...rest
  } = props;

  return (
    <>
      <div
        className="w-full h-auto p-2 rounded-xl border grid grid-cols-12 gap-7 bg-white"
        {...rest}
      >
        <div className="2xl:col-span-7 col-span-12 flex flex-col justify-between 2xl:order-1 order-2">
          <div>
            {" "}
            <Typography className="font-bold text-sm">
              {title ?? "__"}
            </Typography>
            {!small?(<Typography className={`text-gray-600 mt-2 text-sm ${small?"h-[50px]":"h-[100px]"}`}>
              {description ?? "__"}
            </Typography>):null}
          </div>
          <div className="flex items-center gap-x-2">
            <div className="flex flex-wrap gap-x-1">
              {categories?.length
                ? categories?.map((item: any) => (
                    <div
                      className={`text-sm  rounded-lg p-1  ${
                        selectFood
                          ? "bg-success-50 text-success-600"
                          : "bg-primary-100 text-primary-500"
                      }`}
                    >
                      {item?.name}
                    </div>
                  ))
                : null}
            </div>
            {!small ? (
              <div className="flex gap-x-2 ">
                <div
                  className={`flex items-center gap-x-1 p-1  rounded-lg ${
                    selectFood
                      ? "bg-success-50 text-success-600"
                      : "bg-primary-100 text-primary-500"
                  }`}
                >
                  <GrRestaurant />
                  <div className="text-sm">
                    <TextOverflow number={20}>{restaurant}</TextOverflow>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="2xl:col-span-5 col-span-12 2xl:order-2 order-1 2xl:block flex items-end gap-x-2">
          <div className={`bg-gray-100 w-full ${small?"h-[96px]":"h-[130px]"} rounded-xl`}>
            <Image
              base64
              src={image ?? "/images/core/placeholder.png"}
              className=" w-full h-full rounded-xl"
            />
          </div>
          <Button
            className={`2xl:mt-2 ${small?"h-[30px]":"h-[37px]"} text-sm relative flex items-center gap-x-2 2xl:w-full w-[70%] 2xl:ml-0 ml-2`}
            size="auto"
            disable={!active}
            variant={selectFood ? "outline-error" : "outline-primary"}
            onClick={handleSelectFood}
          >

            <div>
            {selectFood ? "حذف" : "افزودن"}
            </div>
            <div className="mr-2">
            {selectFood ? <LuTrash2 className="text-xl"/> : <IoAddOutline className="text-2xl"/>}
            </div>
    
          </Button>
        </div>
      </div>
    </>
  );
};

export default FoodImageCard;
