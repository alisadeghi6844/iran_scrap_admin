import React, { useEffect, useState } from "react";
import { getAllAppetizerAction } from "../../../redux/actions/foodReservation/management/appetizer/AppetizerAction";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGetAllAppetizerData,
  selectGetAllAppetizerLoading,
} from "../../../redux/slice/foodReservation/management/appetizer/AppetizerSlice";
import FoodImageCard from "../../organism/card/FoodImageCard";
import CardSkeleton from "../../organism/skeleton/CardSkeleton";
import EmptyImage from "../../../components/image/EmptyImage";
import Button from "../../../components/button";
import { BsCartPlus } from "react-icons/bs";
import Typography from "../../../components/typography/Typography.tsx";
import Image from "../../../components/image";
import { createClientFoodReserveAction } from "../../../redux/actions/foodReservation/management/foodReserve/FoodReserveAction.ts";
import { convertPersianToGregorian } from "../../../utils/MomentConvertor.ts";
import { selectCreateClientFoodReserveLoading } from "../../../redux/slice/foodReservation/management/foodReserve/FoodReserveSlice.ts";

interface AppetizerTypes {
  selectedFood?: any;
  time?: any;
}

const Appetizer: React.FC<AppetizerTypes> = (props) => {
  const { selectedFood, time } = props;

  const createLoading: boolean = useSelector(
    selectCreateClientFoodReserveLoading
  );

  const dispatch: any = useDispatch();

  const appetizerData: any = useSelector(selectGetAllAppetizerData);
  const appetizerLoading: any = useSelector(selectGetAllAppetizerLoading);

  const [food, setFood] = useState<any>({});

  useEffect(() => {
    dispatch(getAllAppetizerAction());
  }, []);

  useEffect(() => {
    setFood({ food: selectedFood });
  }, [selectedFood]);

  const handleClickReserve = () => {
    if (food?.food?._id && time?.length) {
      const item: any = {
        date: convertPersianToGregorian(time),
        foodId: food?.food?._id,
        appetizerId: food?.appetizer?.id ?? null,
      };
      dispatch(
        createClientFoodReserveAction({
          credentials: item,
          query: convertPersianToGregorian(time),
        })
      );
    }
  };

  return (
    <div className="pt-8 px-0 xl:px-8 w-full h-ful">
      <div className="w-full p-3 border-2 border-dashed border-primary-500 text-primary-500 bg-primary-100 mb-6 rounded-xl">
        کاربر گرامی شما میتوانید فقط یکی از موارد زیر را همراه با غذا انتخاب
        کنید
      </div>
      <div className="grid grid-cols-12 gap-x-6 gap-y-8 pb-[140px]">
        {appetizerLoading ? (
          <CardSkeleton />
        ) : (
          <>
            {appetizerData?.data?.length ? (
              appetizerData?.data?.map((item: any) => (
                <div className="3xl:col-span-3 col-span-4">
                  <FoodImageCard
                    small
                    selectFood={food?.appetizer?._id === item?._id}
                    handleSelectFood={() => {
                      if (food?.appetizer?.id === item?._id) {
                        setFood({ ...food, appetizer: null });
                      } else {
                        setFood({ ...food, appetizer: item });
                      }
                    }}
                    active
                    base64
                    title={item?.title ?? "_"}
                    image={item?.image?.length ? item?.image[0]?.file : null}
                  />
                </div>
              ))
            ) : (
              <div className="mt-6 col-span-12 w-full flex items-center justify-center">
                <EmptyImage />
              </div>
            )}
          </>
        )}
      </div>
      <div className="absolute bottom-6  w-[98%] right-1/2 translate-x-1/2 h-[70px] rounded-xl z-20 shadow-xl bg-white flex items-center justify-between border px-6 ">
        <div className="flex items-center gap-x-2">
          <Image src="/images/food/Frame15.png" className="h-[42px] w-[42px]" />
          <Typography className="font-bold text-lg">{`${food?.food?.title} ${
            food?.appetizer?._id ? ` + ${food?.appetizer?.title}` : ""
          }`}</Typography>
        </div>
        <Button
          loading={createLoading}
          disable={!food?.food?._id}
          size={"lg"}
          endIcon={<BsCartPlus className={"text-xl"} />}
          onClick={handleClickReserve}
        >
          رزرو غذا
        </Button>
      </div>
    </div>
  );
};

export default Appetizer;
