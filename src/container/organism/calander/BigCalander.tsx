import React, { useState, useEffect, useCallback } from "react";
import moment from "jalali-moment";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import TextOverflow from "../../../utils/TextOverflow";
import FoodIcon3 from "../../../components/icon/custom/FoodIcon3";
import { TiPlus } from "react-icons/ti";
import Typography from "../../../components/typography/Typography";
import Button from "../../../components/button";
import { GrEdit } from "react-icons/gr";
import { Tooltip } from "react-tooltip";
import { FaRegTrashAlt } from "react-icons/fa";

import Skeleton from "../../../components/skeleton/Skeleton";
import { convertPersianToGregorian_2 } from "../../../utils/MomentConvertor";
import { selectGetTimeData } from "../../../redux/slice/time/TimeSlice";
import { useSelector } from "react-redux";

interface BigCalanderTypes {
  action?: any;
  setCurrent?: any;
  loading?: boolean;
  data?: any;
  onRowClick?: any;
}

const BigCalendar: React.FC<BigCalanderTypes> = (props) => {
  const { action, setCurrent, loading, onRowClick, data } = props;
  const [currentDate, setCurrentDate] = useState(moment().locale("fa"));
  const [calendar, setCalendar] = useState([]);

  const getDate: any = useSelector(selectGetTimeData);

  useEffect(() => {
    generateCalendar();
  }, [currentDate]);

  const generateCalendar = () => {
    const startDay = currentDate.clone().startOf("jMonth").startOf("week");
    const endDay = currentDate.clone().endOf("jMonth").endOf("week");

    let date = startDay.clone().subtract(1, "day");
    const calendarArray: any = [];

    while (date.isBefore(endDay, "day")) {
      calendarArray.push(
        Array(7)
          .fill(0)
          .map(() => date.add(1, "day").clone())
      );
    }

    setCalendar(calendarArray);
  };

  const nextMonth = () => setCurrentDate(currentDate.clone().add(1, "jMonth"));
  const prevMonth = () =>
    setCurrentDate(currentDate.clone().subtract(1, "jMonth"));

  const isToday = (day: any) => moment().isSame(day, "day");
  const isCurrentMonth = (day: any) => currentDate.isSame(day, "jMonth");
  const isWeekend = (day: any) => day.day() === 4 || day.day() === 5; // پنج‌شنبه و جمعه

  const persianMonths = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  useEffect(() => {
    const jYear = currentDate.jYear();
    const jMonth = currentDate.jMonth() + 1; // jMonth() صفر-ایندکس است
    const jalaliDate = `${jYear}/${jMonth < 10 ? "0" : ""}${jMonth}/01`; // فرمت شمسی

    setCurrent(jalaliDate);
  }, [currentDate]);

  const renderItems = useCallback(
    (date: moment.Moment) => {
      // فرض کنید date یک شیء تاریخ فارسی است
      const persianDate = `${date.jYear()}/${date.jMonth() + 1}/${date.jDate()}`;

      // تبدیل تاریخ شمسی به تاریخ میلادی
      const gregorianDate:any = convertPersianToGregorian_2(persianDate);
      
      // تقسیم تاریخ میلادی به سال، ماه و روز
      const [year, month, day] = gregorianDate.split("-").map(Number);
      
      // اطمینان از اینکه تاریخ به درستی ایجاد می‌شود
      const parsedDate2 = new Date(year, month - 1, day);
      
      // تبدیل parsedDate2 به تاریخ شمسی
      const parsedDate2InPersian = moment(parsedDate2).format("jYYYY/jMM/jDD");
      
      // فیلتر کردن داده‌ها
      const showData = data?.data?.filter((item:any) => {
        const parsedDate1 = new Date(item.date);
        const parsedDate1InPersian = moment(parsedDate1).format("jYYYY/jMM/jDD");
        
        // مقایسه تاریخ‌های شمسی
        return parsedDate1InPersian === parsedDate2InPersian;
      });

      if (showData && showData.length > 0) {
        return (
          <div className="flex flex-col gap-y-2 mt-3">
            {showData.map((item: any, num: any) =>
              num < 4 ? (
                item.foodId?.map((food: any, index: any) =>
                  index < 4 ? (
                    <div className="flex items-center gap-x-1">
                      <FoodIcon3 height={20} width={20} />
                      <TextOverflow number={16}>{food.title}</TextOverflow>
                    </div>
                  ) : null
                )
              ) : (
                <div className="-mt-2">.........................</div>
              )
            )}
            <div className="absolute flex items-center gap-x-2 top-2 left-2">
              <Button
                onClick={() => onRowClick && onRowClick("delete", showData)}
                data-tooltip-id="delete-button"
                data-tooltip-content="حذف"
                className=" !w-[32px] !h-[30px] !p-0"
                variant="outline-error"
              >
                <FaRegTrashAlt className="text-[16px]" />
              </Button>
              <Tooltip id="delete-button" />
              <Button
                onClick={() => onRowClick && onRowClick("update", showData)}
                data-tooltip-id="edit-button"
                data-tooltip-content="ویرایش"
                className=" !w-[32px] !h-[30px] !p-0"
                variant="outline-success"
              >
                <GrEdit className="text-[16px]" />
              </Button>
              <Tooltip id="edit-button" />
            </div>
          </div>
        );
      } else {
        return (
          <>
            {parsedDate2.getTime() <
            new Date(new Date(getDate?.data)?.setHours(0, 0, 0, 0)).getTime() ? null : (
              <div
                onClick={() => onRowClick && onRowClick("create", persianDate)}
              >
                <div className="border-4 transition-all group hover:border-primary-500 cursor-pointer border-dashed border-primary-200 w-[70%] rounded-xl h-[70%] absolute bottom-4 right-1/2 translate-x-1/2 flex items-center justify-center">
                  <div className="text-[48px] opacity-30 transition-all group-hover:opacity-100">
                    <TiPlus />
                    <Typography className="text-[18px] font-bold">
                      افزودن
                    </Typography>
                  </div>
                </div>
              </div>
            )}
          </>
        );
      }
    },
    [data]
  );

  return (
    <div>
      <div className="lg:flex lg:h-full lg:flex-col">
        <header className="flex items-center justify-between border-b border-gray-200  pb-3 lg:flex-none">
          <div>{action ?? null}</div>
          <div className="relative flex items-center shadow rounded-xl h-[45px]">
            <div
              onClick={prevMonth}
              className=" px-3 bg-primary-100 text-primary-500 h-full flex items-center rounded-r-xl cursor-pointer"
            >
              <FaChevronRight />
            </div>
            <div className="px-4">
              {persianMonths[currentDate.jMonth()] + " " + currentDate.jYear()}
            </div>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden"></span>
            <div
              onClick={nextMonth}
              className=" px-3 bg-primary-100 text-primary-500 h-full flex items-center rounded-l-xl cursor-pointer"
            >
              <FaChevronLeft />
            </div>
          </div>
        </header>
        <div className="shadow  lg:flex lg:flex-auto lg:flex-col">
          <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center font-semibold leading-6 text-gray-700 lg:flex-none">
            {[
              "شنبه",
              "یکشنبه",
              "دوشنبه",
              "سه شنبه",
              "چهارشنبه",
              "پنجشنبه",
              "جمعه",
            ].map((day, index) => (
              <div
                key={day}
                className={`flex justify-center bg-white py-3 text-md ${
                  index > 4 ? "text-red-500" : ""
                }`}
              >
                {day}
              </div>
            ))}
          </div>
          <div className="flex bg-gray-100 leading-6 text-gray-800 text-md lg:flex-auto">
            <div className="hidden w-full gap-2 p-2 lg:grid lg:grid-cols-7 ">
              {calendar.map((week: any, weekIndex: any) => (
                <React.Fragment key={weekIndex}>
                  {week.map((day: any, dayIndex: any) => (
                    <div
                      key={dayIndex}
                      className={`relative shadow px-3 py-2 min-h-[170px] rounded-xl ${
                        !isCurrentMonth(day)
                          ? "bg-gray-200 text-gray-500"
                          : isToday(day)
                          ? "font-semibold text-primary-500 bg-primary-100"
                          : isWeekend(day) && isCurrentMonth(day)
                          ? "text-red-500 bg-red-50"
                          : "bg-white"
                      }`}
                    >
                      <div className="font-bold">{day.jDate()}</div>
                      <div
                        className={`${
                          isWeekend(day) && isCurrentMonth(day) ? "hidden" : ""
                        }`}
                      >
                        {loading ? (
                          <div>
                            <Skeleton height="h-[20px]" className="my-3" />
                            <Skeleton height="h-[20px]" className="my-3" />
                            <Skeleton height="h-[20px]" className="my-3" />
                            <Skeleton height="h-[20px]" className="my-3" />
                          </div>
                        ) : (
                          renderItems(day)
                        )}
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigCalendar;
