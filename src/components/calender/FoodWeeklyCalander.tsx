import { WeeklyCalenderTypes } from "../../types/components/WeeklyCalenderTypes";
import Typography from "../typography/Typography";
import ArrowIcon from "../icon/custom/ArrowIcon";
import { useCallback, useEffect, useState } from "react";

import moment from "jalali-moment";

const FoodWeeklyCalander: React.FC<WeeklyCalenderTypes> = (props) => {
  const { value, onChange, setCurrentWeekData, ...rest } = props;

  const [year, setYear] = useState<string>("");
  const [mount, setMount] = useState<string>("");
  const [week, setWeek] = useState<string>("");
  const [days, setDays] = useState<any>([]);
  const [currentWeek, setCurrentWeek] = useState<any>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const monthNames: any = [
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
    // دریافت تاریخ فعلی
    const currentDate = moment();
    // تنظیم زبان و روزهای هفته فقط برای این کامپوننت
    const localizedDate: any = currentDate.locale("fa");

    setYear(localizedDate.jYear());
    setMount(localizedDate.jMonth());

    // شروع و پایان ماه فعلی
    const startOfMonth = localizedDate.clone().startOf("jMonth");
    const endOfMonth = localizedDate.clone().endOf("jMonth");

    // محاسبه روزهای ماه
    const daysInMonth = [];
    let day = startOfMonth.clone();

    while (day.isBefore(endOfMonth) || day.isSame(endOfMonth, "day")) {
      daysInMonth.push({
        dayDate: day.format("L"),
        dayName: day.format("ddd"),
        dayNumber: day.format("D"),
        isToday: day.isSame(currentDate, "day"),
        mount: monthNames[localizedDate.jMonth()],
      });
      day.add(1, "day");
    }

    // تقسیم روزها به هفته‌ها
    const weeks = [];
    for (let i = 0; i < daysInMonth.length; i += 7) {
      weeks.push(daysInMonth.slice(i, i + 7));
    }

    setDays(weeks);

    // پیدا کردن هفته فعلی
    const currentWeekIndex = weeks.findIndex((week) =>
      week.some((day) => day.isToday)
    );

    setCurrentIndex(currentWeekIndex);
    setCurrentWeek(weeks[currentWeekIndex]);
    setWeek(getWeekLabel(currentWeekIndex));
  }, []);

  const getWeekLabel = (index: number) => {
    const weekLabels = ["اول", "دوم", "سوم", "چهارم", "پنجم", "ششم"];
    return weekLabels[index] || "";
  };

  useEffect(() => {
    if (days.length > 0) {
      setCurrentWeek(days[currentIndex]);
      setWeek(getWeekLabel(currentIndex));
    }
  }, [currentIndex, days]);

  const handleNextWeek = useCallback(() => {
    if (currentIndex < days.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, days.length]);

  const handlePrevWeek = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (currentWeek?.length) {
      setCurrentWeekData && setCurrentWeekData(currentWeek);
    }
  }, [currentWeek]);

  return (
    <>
      <div className="flex items-center justify-between gap-x-4">
        <div
          onClick={handlePrevWeek}
          className={`flex items-center gap-x-2 rounded-3xl p-2 ${
            !(currentIndex > 0)
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
          style={{
            boxShadow: "0px 0px 4.4px 2px #0000001A",
          }}
        >
          <ArrowIcon />
          <Typography className="text-sm font-normal text-priamry-500">
            هفته قبل
          </Typography>
        </div>
        <div
          className="p-2 w-[240px] rounded-3xl flex justify-center items-center text-md text-gray-400 font-semibold"
          style={{
            boxShadow: "0px 0px 4.4px 2px #0000001A inset",
          }}
        >
          ` هفته {week} {monthNames[mount]} ماه {year} `
        </div>
        <div
          onClick={handleNextWeek}
          className={`flex items-center gap-x-2 rounded-3xl p-2 ${
            !(currentIndex < days.length - 1)
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
          style={{
            boxShadow: "0px 0px 4.4px 2px #0000001A",
          }}
        >
          <Typography className="text-sm font-normal text-priamry-500">
            هفته بعد
          </Typography>
          <div className="rotate-[180deg]">
            <ArrowIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodWeeklyCalander;
