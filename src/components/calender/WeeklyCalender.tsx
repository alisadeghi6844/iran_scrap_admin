import Typography from "../typography/Typography";
import ArrowIcon from "../icon/custom/ArrowIcon";
import { useEffect, useState } from "react";
import { WeeklyCalenderTypes } from "../../types/components/WeeklyCalenderTypes";
import moment from "jalali-moment";

const MonthlyCalendar: React.FC<WeeklyCalenderTypes> = (props) => {
    const { value, onChange, ...rest } = props;

    const [year, setYear] = useState<number>(0);
    const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(0);

    const monthNames = [
        "فروردین", "اردیبهشت", "خرداد",
        "تیر", "مرداد", "شهریور",
        "مهر", "آبان", "آذر",
        "دی", "بهمن", "اسفند"
    ];

    useEffect(() => {
        const currentDate = moment();
        setYear(currentDate.jYear());
        setSelectedMonthIndex(currentDate.jMonth());
    }, []);

    const handleNextYear = () => {
        setYear(prevYear => prevYear + 1);
    };

    const handlePrevYear = () => {
        setYear(prevYear => prevYear - 1);
    };

    const getYearLabel = () => {
        return `${monthNames[selectedMonthIndex]} ماه ${year}`;
    };

    const handleMonthSelect = (index: number) => {
        setSelectedMonthIndex(index);
        onChange(`${year}-${String(index + 1).padStart(2, '0')}-01`);
    };

    return (
        <>
            <div className="flex items-center justify-between mb-5">
                <div
                    onClick={handlePrevYear}
                    className="flex items-center gap-x-2 cursor-pointer rounded-3xl p-2"
                    style={{ boxShadow: "0px 0px 4.4px 2px #0000001A" }}
                >
                    <ArrowIcon />
                    <Typography className="text-sm text-primary-500">
                        سال قبل
                    </Typography>
                </div>
                <div
                    className="p-2 w-[240px] rounded-3xl flex justify-center items-center text-md text-gray-400 font-semibold"
                    style={{ boxShadow: "0px 0px 4.4px 2px #0000001A inset" }}
                >
                    {getYearLabel()}
                </div>
                <div
                    onClick={handleNextYear}
                    className="flex items-center gap-x-2 cursor-pointer rounded-3xl p-2"
                    style={{ boxShadow: "0px 0px 4.4px 2px #0000001A" }}
                >
                    <Typography className="text-sm font-normal text-primary-500">
                        سال بعد
                    </Typography>
                    <div className="rotate-[180deg]">
                        <ArrowIcon />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {monthNames.map((month, index) => (
                    <div
                        key={month}
                        className={`cursor-pointer text-center p-2 rounded-lg ${
                            index === selectedMonthIndex
                                ? "bg-primary-500 text-white"
                                : "hover:bg-gray-100"
                        }`}
                        onClick={() => handleMonthSelect(index)}
                    >
                        <Typography className={index === moment().jMonth() && index !== selectedMonthIndex ? 'text-primary font-bold' : ''}>
                            {month}
                        </Typography>
                    </div>
                ))}
            </div>
        </>
    );
};

export default MonthlyCalendar;
