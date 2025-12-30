import React from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import Typography from '../typography/Typography';
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css';
import 'react-multi-date-picker/styles/colors/red.css';
import moment from 'jalali-moment';
import { IoClose } from 'react-icons/io5';

type CalendarPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
type DateMode = 'future' | 'past';
type DarkMode = 'dark' | 'light';

interface JalaliDatepickerProps {
  className?: string;
  col?: number;
  calenderPosition?: CalendarPosition;
  format?: string;
  mode?: DateMode;
  minDate?: string;
  maxDate?: string;
  value?: string;
  label?: string;
  isTime?: boolean;
  onlyMonthPicker?: boolean;
  onlyYearPicker?: boolean;
  onlyDayPicker?: boolean;
  onChange: (date: string) => void;
  range?: boolean;
  required?: boolean;
  errorMessage?: string;
  helperText?: string;
  darkMode?: DarkMode;
  endDate?: boolean;
  inputClassName?: string;
  hideSeconds?: boolean;
  name?: string;
  onBlur?: (e: React.FocusEvent<any>) => void;
  placeholder?: string;
  labelBg?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'auto';
  noBorder?: boolean;
}

const JalaliDatepicker: React.FC<JalaliDatepickerProps> = props => {
  const {
    className,
    col,
    calenderPosition = 'top-right',
    format = 'YYYY/MM/DD',
    mode,
    minDate,
    maxDate,
    value,
    label,
    isTime = false,
    onlyMonthPicker = false,
    onlyYearPicker = false,
    onlyDayPicker = false,
    onChange,
    range = false,
    required,
    errorMessage,
    helperText,
    darkMode,
    endDate = false,
    inputClassName,
    hideSeconds = false,
    name,
    onBlur,
    placeholder,
    labelBg = 'bg-white',
    size = 'full',
    noBorder = false,
    ...rest
  } = props;

  const hasError = !!errorMessage;

  const handleChangeDatePicker = (date: DateObject | DateObject[] | null) => {
    if (!date) {
      onChange('');
      return;
    }

    const dateObj = Array.isArray(date) ? date[0] : date;

    const getLastDayOfMonth = (month: number, year: number): number => {
      if (month <= 6) return 31;
      if (month <= 11) return 30;
      return year % 33 === 1 ||
        year % 33 === 5 ||
        year % 33 === 9 ||
        year % 33 === 13 ||
        year % 33 === 17 ||
        year % 33 === 22 ||
        year % 33 === 26 ||
        year % 33 === 30
        ? 30
        : 29;
    };

    if (onlyYearPicker) {
      if (endDate) {
        dateObj.set({ month: 12, day: getLastDayOfMonth(12, dateObj.year) });
      } else {
        dateObj.set({ month: 1, day: 1 });
      }
    } else if (onlyMonthPicker) {
      if (endDate) {
        const lastDay = getLastDayOfMonth(dateObj.month.number, dateObj.year);
        dateObj.set({ day: lastDay });
      } else {
        dateObj.set({ day: 1 });
      }
    }

    onChange(dateObj.format());
  };

  const handleClearDate = () => {
    onChange('');
  };

  const plugins = [];
  if (isTime) {
    plugins.push(<TimePicker position="bottom" hideSeconds={hideSeconds} key="time-picker" />);
  }

  const currentDate = moment().format('jYYYY/jMM/jDD');

  const dateValue = value
    ? new DateObject({ date: value, calendar: persian, locale: persian_fa })
    : null;

  return (
    <div className={`w-full relative ${noBorder ? 'mt-0 h-full' : 'mt-2'}`}>
      <div className={`relative ${noBorder ? 'h-full' : ''}`}>
        <DatePicker
          portal
          minDate={minDate ? minDate : mode === 'future' ? currentDate : undefined}
          maxDate={maxDate ? maxDate : mode === 'past' ? currentDate : undefined}
          inputClass={`block w-full text-xs sm:text-sm md:text-md
            bg-white ${noBorder ? 'border-0' : 'border rounded-lg sm:rounded-xl'} ${noBorder ? 'px-2' : 'py-2 sm:py-3 md:py-4 lg:py-6 px-3 sm:px-4'} placeholder:text-xs sm:placeholder:text-sm
            appearance-none focus:outline-none ${noBorder ? '' : 'focus:ring-1'} 
            ${
              hasError && !noBorder
                ? 'text-error-500 border-error-500 focus:border-error-500 focus:ring-error-500 placeholder:text-error-500/70'
                : hasError && noBorder
                ? 'text-error-500 placeholder:text-error-500/70'
                : noBorder
                ? 'text-gray-900 placeholder:text-gray-300'
                : 'text-gray-900 border-gray-300 focus:ring-primary-500 focus:border-primary-500 placeholder:text-gray-300'
            } 
            placeholder:text-right
            ${
              noBorder
                ? 'h-full'
                : {
                    xs: 'h-6 sm:h-7 text-xs',
                    sm: 'h-7 sm:h-8 text-xs sm:text-sm',
                    md: 'h-9 sm:h-10 text-xs sm:text-sm',
                    lg: 'h-10 sm:h-11 text-sm sm:text-base lg:text-lg',
                    xl: 'h-12 sm:h-14 text-base sm:text-lg lg:text-xl',
                    full: 'h-10 sm:h-11 w-full',
                    auto: 'h-auto w-auto',
                  }[size]
            } ${inputClassName ?? ''}`}
          editable={false}
          value={dateValue}
          range={range}
          onlyMonthPicker={onlyMonthPicker}
          onlyYearPicker={onlyYearPicker}
          format={format}
          plugins={plugins}
          highlightToday={false}
          onOpenPickNewDate={false}
          calendar={persian}
          className={`purple ${darkMode === 'dark' ? 'bg-dark' : ''} ${className ? className : ''}`}
          style={{ zIndex: 10000 }}
          onChange={handleChangeDatePicker}
          locale={persian_fa}
          calendarPosition={calenderPosition}
          name={name}
          placeholder={placeholder}
          {...rest}
        />

        {/* آیکون پاک کردن - سمت چپ */}
        {value && (
          <div className="absolute inset-y-0 left-2 flex items-center cursor-pointer z-10">
            <IoClose
              className="text-gray-400 text-lg sm:text-2xl hover:text-error-500 transition-colors pointer-events-auto"
              onClick={handleClearDate}
            />
          </div>
        )}
      </div>

      {/* لیبل */}
      {label && (
        <div className={`absolute -top-[9px] right-3 sm:right-4 px-1 ${labelBg}`}>
          <label
            className={`block text-[11px] sm:text-[13.5px] z-20 text-right ${
              hasError ? 'text-error-500' : 'text-gray-400'
            }`}
            htmlFor={label}
          >
            {label}
            {required ? (
              <Typography tag="span" className="text-error-500 text-[10px] sm:text-xs mr-1">
                *
              </Typography>
            ) : null}
          </label>
        </div>
      )}

      {/* پیام خطا یا راهنما */}
      {(hasError || helperText) && (
        <Typography
          className={`text-[10px] sm:text-xs mt-1 ${
            hasError ? 'text-error-500' : 'text-text-secondary'
          }`}
        >
          {hasError ? errorMessage : helperText}
        </Typography>
      )}
    </div>
  );
};

export default JalaliDatepicker;