import { DateObject } from "react-multi-date-picker";

export interface JalaliDatepickerTypes {
    className?: string;
    col?: number;
    calenderPosition?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
    format?: string;
    mode?: "past" | "future";
    minDate?: string | DateObject;
    maxDate?: string | DateObject;
    value?: string | DateObject;
    label?: string;
    isTime?: boolean;
    onlyMonthPicker?: boolean;
    onlyYearPicker?: boolean;
    onChange?: (date: string) => void;
    range?: boolean;
    required?: boolean;
    errorMessage?: string;
    helperText?: string;
    darkMode?: "dark" | "light";
    inputClassName?: string;
    onOpenPickNewDate?: boolean;
    [key: string]: any; // برای هر ویژگی اضافی
  }