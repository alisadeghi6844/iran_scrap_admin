import React, { useEffect } from "react";
import { useState } from "react";
import FoodWeeklyCalander from "../../../../components/calender/FoodWeeklyCalander";
import DayCard from "../../card/DayCard";
import FoodMiniCard from "../../card/FoodMiniCard";
import Alert from "../../../../components/alert/index";
import Button from "../../../../components/button";
import { FiHelpCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getAllClientFoodsAction } from "../../../../redux/actions/foodReservation/management/foodShow/FoodShowAction";
import {
  selectGetAllClientFoodsData,
  selectGetAllClientFoodsLoading,
} from "../../../../redux/slice/foodReservation/management/foodShow/FoodShowSlice";
import { convertPersianToGregorian } from "../../../../utils/MomentConvertor";
import { selectGetTimeData } from "../../../../redux/slice/time/TimeSlice";
import Skeleton from "../../../../components/skeleton/Skeleton";

interface FoodReserveTableTypes {
  setInfoModal?: any;
}

const FoodReserveTable: React.FC<FoodReserveTableTypes> = (props) => {
  const { setInfoModal } = props;
  const [currentWeekData, setCurrentWeekData] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const DateData: any = useSelector(selectGetTimeData);
  const getData: any = useSelector(selectGetAllClientFoodsData);
  const getLoading: any = useSelector(selectGetAllClientFoodsLoading);

  const dispatch: any = useDispatch();

  const [getDate, setGetDate] = useState<any>();

  useEffect(() => {
    setGetDate(DateData);
  }, [DateData]);

  useEffect(() => {
    setData([]);
  }, []);

  useEffect(() => {
    setData([]);

    if (currentWeekData?.length) {
      currentWeekData?.map((item: any) => {
        dispatch(
          getAllClientFoodsAction({
            date: convertPersianToGregorian(item?.dayDate),
          })
        );
      });
    }
  }, [currentWeekData]);

  useEffect(() => {
    setData((prev: any) => [
      ...prev,
      getData?.data?.length ? getData?.data[0] : null,
    ]);
  }, [getData]);

  return (
    <>
      <div className="w-full flex justify-between items-start">
        <Button
          endIcon={<FiHelpCircle className="text-xl" />}
          className="font-bold"
          variant="outline-primary"
          onClick={() => setInfoModal && setInfoModal(true)}
        >
          راهنمای رزرو غذا
        </Button>
        <div>
          <FoodWeeklyCalander
            setCurrentWeekData={(e: any) => setCurrentWeekData(e)}
          />
        </div>
      </div>
      <div className="w-full h-auto flex justify-between gap-x-2 pb-8 mt-6">
        {currentWeekData?.length ? (
          <>
            {currentWeekData?.map((day: any) => (
              <div className="w-full" key={day.dayDate}>
                <DayCard
                  title={day?.dayName}
                  subTitle={
                    day?.dayDate.slice(8, 11) + " " + day?.mount + " ماه"
                  }
                  variant={`${
                    day?.isToday
                      ? "success"
                      : day?.dayName === "جمعه" || day?.dayName === "پنج‌شنبه"
                      ? "error"
                      : null
                  }`}
                />
                <div className={`mt-3 flex flex-col gap-y-2 rounded-xl p-1`}>
                  {getLoading ? (
                    <>
                      <div>
                        <Skeleton
                          height="h-[105px]"
                          width="w-full"
                          className="my-3"
                        />
                      </div>
                      <div>
                        <Skeleton
                          height="h-[105px]"
                          width="w-full"
                          className="my-3"
                        />
                      </div>
                      <div>
                        <Skeleton
                          height="h-[105px]"
                          width="w-full"
                          className="my-3"
                        />
                      </div>
                      <div>
                        <Skeleton
                          height="h-[105px]"
                          width="w-full"
                          className="my-3"
                        />
                      </div>
                    </>
                  ) : data?.length ? (
                    data?.map((item: any) => {
                      const itemDate = new Date(item?.date);
                      const dayDate = new Date(
                        convertPersianToGregorian(day?.dayDate)
                      );

                      const isSameDate =
                        itemDate.getFullYear() === dayDate.getFullYear() &&
                        itemDate.getMonth() === dayDate.getMonth() &&
                        itemDate.getDate() === dayDate.getDate();

                      return isSameDate ? (
                        <>
                          {item?.foodId?.length
                            ? item?.foodId?.map((food: any) => {
                                // بررسی تاریخ و رزرو
                                const isReserved = food?.reserved;
                                const today = new Date(getDate?.data);
                                // تنظیم ساعت، دقیقه و ثانیه به 0 برای مقایسه فقط تاریخ
                                today.setHours(0, 0, 0, 0);
                                dayDate.setHours(0, 0, 0, 0); // تنظیم ساعت dayDate به 0

                                const isTodayOrBefore = dayDate <= today;

                                let variant = null;

                                if (isReserved) {
                                  variant = isTodayOrBefore
                                    ? "primary"
                                    : "success";
                                }

                                return (
                                  <FoodMiniCard
                                    title={
                                      isReserved
                                        ? `${food?.title} ${
                                            food?.appetizer?.title
                                              ? ` + ${food?.appetizer?.title}`
                                              : ""
                                          }` ?? "_"
                                        : food?.title ?? "_"
                                    }
                                    subTitile={food?.description}
                                    badgeText={food?.restaurantId?.name}
                                    variant={variant}
                                  />
                                );
                              })
                            : null}
                        </>
                      ) : null;
                    })
                  ) : null}
                </div>
              </div>
            ))}
          </>
        ) : (
          <Alert title="لطفا یک تاریخ معتبر برای نمایش انتخاب کنید" />
        )}
      </div>
    </>
  );
};

export default FoodReserveTable;
