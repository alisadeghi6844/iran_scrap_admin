import React, { useEffect, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import Typography from "../typography/Typography";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import moment from "jalali-moment";
import { IoClose } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { JalaliDatepickerTypes } from "../../types/components/JalaliDatepickerTypes";


const JalaliDatepicker: React.FC<JalaliDatepickerTypes> = (props) => {
  const {
    className,
    col,
    calenderPosition = "top-right",
    format = "YYYY/MM/DD",
    mode,
    minDate,
    maxDate,
    value,
    label,
    isTime = false,
    onlyMonthPicker = false,
    onlyYearPicker = false,
    onChange,
    handleChangeInput,
    range = false,
    required,
    errorMessage,
    disabled,
    helperText,
    darkMode,
    inputClassName,
    onOpenPickNewDate = false,
    ...rest
  } = props;

  const handleChangeDatePicker = (date: DateObject, format: string) => {
    let object = { date, format };
    handleChangeInput&&handleChangeInput(date)
    onChange && onChange(new DateObject(object).format());
  };

  const plugins = [isTime ? <TimePicker position="bottom" /> : []];

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Set current date without Redux dependency
    const current = new Date();
    setCurrentDate(
      moment.from(current, "en", "YYYY/MM/DD").format("jYYYY/jMM/jDD")
    );
  }, []);

  return (
    <div className="w-full">
      <div className="relative z-0 w-full ">
        <DatePicker
          onOpenPickNewDate={onOpenPickNewDate}
          portal={false}
          minDate={
            minDate ? minDate : mode === "future" ? currentDate ?? null : null
          }
          maxDate={
            maxDate ? maxDate : mode === "past" ? currentDate ?? null : null
          }
          inputClass={`h-11 absolute -top-0 right-0 truncate w-full m-w-full
           focus:outline-none
           border-b-2 block py-4 px-2 text-sm text-gray-900
           bg-transparent border-0 border-b-2 border-gray-300 appearance-none
            focus:ring-0 focus:border-primary-600 peer ${
             inputClassName ? inputClassName : ""
           }`}
          editable={false}
          value={value && value}
          range={range && range}
          onlyMonthPicker={onlyMonthPicker && onlyMonthPicker}
          onlyYearPicker={onlyYearPicker && onlyYearPicker}
          format={format && format}
          plugins={plugins}
          calendar={persian}
          className={`${darkMode === "dark" ? "bg-dark" : ""} ${
            className && className
          }`}
          onChange={handleChangeDatePicker}
          locale={persian_fa}
          calendarPosition={calenderPosition && calenderPosition}
          disabled={disabled}
          {...rest}
        />
        <label
          className={`absolute right-0 top-[12px] -z-10
        origin-right scale-90 transform text-sm text-gray-400 duration-300 lg:text-base
         ${value ? "-translate-y-8 scale-75 " : ""} `}
        >
          {label}
          {required && <span className="text-error-500">*</span>}
        </label>
        {!!value && !disabled && (
          <div className="absolute left-6 top-0 ml-3 mt-2 px-1 cursor-pointer">
            <IoClose
              className="text-grey-600 hover:text-red-500 text-lg"
              onClick={() => {
                onChange && onChange("");
              }}
            />
          </div>
        )}
        <div className="absolute left-0 top-0 ml-3 mt-2">
          <FaRegCalendarAlt className="text-grey-600 text-lg" />
        </div>
      </div>
      <Typography
        className={`text-xs mt-5 ${
          !!errorMessage ? "text-error-500 " : "text-text-secondary"
        }`}
      >
        {!!errorMessage ? errorMessage : helperText}
      </Typography>
    </div>
  );
};

export default JalaliDatepicker;
