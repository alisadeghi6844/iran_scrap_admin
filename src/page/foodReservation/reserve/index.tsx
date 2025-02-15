import React, { lazy, useEffect, useState } from "react";
import FoodDayCalander from "../../../components/calender/FoodDayCalander";
import { selectGetTimeData } from "../../../redux/slice/time/TimeSlice";
import { useDispatch, useSelector } from "react-redux";

import { getAllClientFoodReserveAction } from "../../../redux/actions/foodReservation/management/foodReserve/FoodReserveAction";
import { convertPersianToGregorian } from "../../../utils/MomentConvertor";
import { selectGetAllClientFoodReserveData } from "../../../redux/slice/foodReservation/management/foodReserve/FoodReserveSlice";
import Image from "../../../components/image";

const FoodReserve = lazy(
  () =>
    import(
      /* webpackChunkName: "food-reservation" */ "../../../container/features/reservationFood/FoodReserve"
    )
);

const Reserve = () => {
  const [currentDayData, setCurrentDayData] = useState<String>("");
  const getTime = useSelector(selectGetTimeData);

  const dispatch: any = useDispatch();

  const reserveData = useSelector(selectGetAllClientFoodReserveData);

   

  useEffect(() => {
    if (currentDayData) {
      dispatch(
        getAllClientFoodReserveAction({
          date: convertPersianToGregorian(currentDayData),
        })
      );
    }
  }, [currentDayData]);

  return (
    <div
      className="mt-[170px] w-[90%] mx-auto h-auto min-h-[50vh] rounded-xl bg-white relative p-6"
      style={{
        boxShadow: "0px 0px 4px 0px #00000040",
      }}
    >
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          {getTime?.data ? (
            <FoodDayCalander
            time={getTime}
              date={getTime?.data}
              setCurrentDayData={(e: any) => setCurrentDayData(e?.dayDate)}
            />
          ) : null}
        </div>
        <div className="font-bold text-lg flex items-center gap-x-2">
          <div className="flex items-center gap-x-2">
            <Image src="/images/food/Frame15.png" className="w-[44px] h-[44px] -mt-2" />
            <div>غذای رزرو شده امروز :</div>
          </div>
          <div className="text-md font-normal bg-primary-100 text-primary-500 rounded-lg p-1">
            {reserveData?.data?.length
              ? `${reserveData?.data[0]?.foodId?.title} ${
                  reserveData?.data[0]?.appetizerId?._id
                    ? ` + ${reserveData?.data[0]?.appetizerId?.title}`
                    : ""
                }`
              : "بدون رزرو"}
          </div>
        </div>
      </div>
      <FoodReserve currentWeekData={currentDayData} time={getTime} />
    </div>
  );
};
export default Reserve;
