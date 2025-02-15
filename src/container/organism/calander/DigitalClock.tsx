import moment from "jalali-moment";
import React, { useEffect, useState } from "react";
import Image from "../../../components/image";
import TopLineFoodCardIcon from "../../../components/icon/custom/TopLineFoodCardIcon";
import BottomLineFoodCardIcon from "../../../components/icon/custom/BottomLineFoodCardIcon";

const DigitalClock: React.FC = () => {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      const formattedDate = moment(now).format("jYYYY/jM/jD");
      setTime(formattedTime);
      setDate(formattedDate);
    };

    const intervalId = setInterval(updateClock, 1000); // بروزرسانی هر ثانیه
    updateClock(); // بروزرسانی اولیه

    return () => clearInterval(intervalId); // پاک کردن تایمر
  }, []);

  return (
    <div className="w-full h-[105px] rounded-xl bg-white shadow-lg p-4 relative grid grid-cols-12">
         <div className="absolute -top-[6px] left-[100px] z-10">
        <TopLineFoodCardIcon  variant="primary"/>
      </div>
      <div className="absolute -bottom-[6px] left-[100px] z-10">
        <BottomLineFoodCardIcon  variant="primary"/>
      </div>
      <div className="col-span-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-600">{time}</h1>
        <p className="text-xl text-gray-600">{date}</p>
      </div>

      <div className="col-span-6 relative w-full h-full">
      <Image src="/images/food/Young smiling chef holding cloche.png" className="h-[100px] absolute -top-3 -left-4"/>
      </div>
    </div>
  );
};

export default DigitalClock;
