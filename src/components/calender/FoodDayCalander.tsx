import { WeeklyCalenderTypes } from "../../types/components/WeeklyCalenderTypes";
import Typography from "../typography/Typography";
import ArrowIcon from "../icon/custom/ArrowIcon";
import { useCallback, useEffect, useState, useMemo } from "react";
import moment from "jalali-moment";

const FoodDayCalander: React.FC<WeeklyCalenderTypes> = (props) => {
  const { value, onChange, date, setCurrentDayData, time, ...rest } = props;

  const [currentDate, setCurrentDate] = useState<moment.Moment>(() => {
    const initialDate = getNextValidDate(moment(time?.data));
    return initialDate.startOf('day');
  });

  const [days, setDays] = useState<any[]>([]);

  const monthNames: string[] = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند",
  ];

  // محاسبه isFirstDay و isLastDay با useMemo
  const { isFirstDay, isLastDay } = useMemo(() => {
    if (!time?.data) {
      return { isFirstDay: true, isLastDay: true };
    }

    const firstDay = currentDate
      .clone()
      .startOf('day')
      .isSameOrBefore(getNextValidDate(moment(time.data)), "day");

    const lastDay = currentDate
      .clone()
      .startOf('day')
      .isSameOrAfter(
        moment(time.data)
          .startOf('day')
          .add(import.meta.env.VITE_APP_MAX_RESERVE_DATE - 1, "days"),
        "day"
      );

    return { isFirstDay: firstDay, isLastDay: lastDay };
  }, [currentDate, time?.data]);

  useEffect(() => {
    const originalLocale = moment.locale();
    moment.updateLocale("fa", {
      weekdays: [
        "شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه",
        "چهارشنبه", "پنجشنبه", "جمعه"
      ],
    });

    if (time?.data) {
      const serverDate = moment(time.data).startOf('day');
      const validDate = getNextValidDate(serverDate);
      setCurrentDate(validDate);
      updateDays(validDate);
    }

    return () => {
      moment.locale(originalLocale);
    };
  }, [time?.data]);

  function getNextValidDate(date: moment.Moment): moment.Moment {
    let nextDate = date.clone().startOf('day');
    while (nextDate.day() === 4 || nextDate.day() === 5) {
      nextDate.add(1, "day");
    }
    return nextDate;
  }

  const updateDays = useCallback((startDate: moment.Moment) => {
    const newDays = [];
    let currentDay = startDate.clone().startOf('day');
    
    while (newDays.length < import.meta.env.VITE_APP_MAX_RESERVE_DATE) {
      if (currentDay.day() !== 4 && currentDay.day() !== 5) {
        newDays.push({
          dayDate: currentDay.locale("fa").format("L"),
          dayName: currentDay.locale("fa").format("ddd"),
          dayNumber: currentDay.locale("fa").format("D"),
          month: monthNames[currentDay.jMonth()],
          year: currentDay.jYear(),
        });
      }
      currentDay.add(1, "day");
    }
    setDays(newDays);
    setCurrentDayData && setCurrentDayData(newDays[0]);
  }, [setCurrentDayData]);

  const handleNextDay = useCallback(() => {
    if (!time?.data || isLastDay) return;

    const nextDate = getNextValidDate(currentDate.clone().add(1, "day"));
    const maxDate = moment(time.data)
      .startOf('day')
      .add(import.meta.env.VITE_APP_MAX_RESERVE_DATE, "days");
    
    if (nextDate.isBefore(maxDate, "day")) {
      setCurrentDate(nextDate);
      updateDays(nextDate);
    }
  }, [currentDate, time?.data, isLastDay, updateDays]);

  const handlePrevDay = useCallback(() => {
    if (!time?.data || isFirstDay) return;

    let prevDate = currentDate.clone().subtract(1, "day");
    while (prevDate.day() === 4 || prevDate.day() === 5) {
      prevDate.subtract(1, "day");
    }

    const serverDate = moment(time.data).startOf('day');
    const validServerDate = getNextValidDate(serverDate);

    if (prevDate.isBefore(validServerDate, "day")) {
      setCurrentDate(validServerDate);
      updateDays(validServerDate);
    } else {
      setCurrentDate(prevDate);
      updateDays(prevDate);
    }
  }, [currentDate, time?.data, isFirstDay, updateDays]);

  if (!time?.data) return null;

  return (
    <div className="flex items-center justify-between gap-x-4 select-none">
      <div
        onClick={handlePrevDay}
        className={`flex items-center gap-x-2 rounded-3xl p-2 ${
          isFirstDay ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        style={{
          boxShadow: "0px 0px 4.4px 2px #0000001A",
        }}
      >
        <ArrowIcon />
        <Typography className="text-sm font-normal text-priamry-500">
          روز قبل
        </Typography>
      </div>
      <div
        className="p-2 w-[240px] rounded-3xl flex justify-center items-center text-md text-gray-400 font-semibold"
        style={{
          boxShadow: "0px 0px 4.4px 2px #0000001A inset",
        }}
      >
        {days[0] && `${days[0].dayName} ${days[0].dayNumber} ${days[0].month} ${days[0].year}`}
      </div>
      <div
        onClick={handleNextDay}
        className={`flex items-center gap-x-2 rounded-3xl p-2 ${
          isLastDay ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        style={{
          boxShadow: "0px 0px 4.4px 2px #0000001A",
        }}
      >
        <Typography className="text-sm font-normal text-priamry-500">
          روز بعد
        </Typography>
        <div className="rotate-[180deg]">
          <ArrowIcon />
        </div>
      </div>
    </div>
  );
};

export default FoodDayCalander;
