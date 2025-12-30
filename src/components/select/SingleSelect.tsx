import React, { useRef } from "react";
import Select, { StylesConfig } from "react-select";
import Typography from "../typography/Typography";

interface Option {
  label: string;
  value: any;
  icon?: React.ReactNode;
}

interface SelectProps {
  errorMessage?: any;
  helperText?: string;
  noCol?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full" | "auto";
  label?: string;
  leftAdornment?: React.ReactNode;
  required?: boolean;
  startAdornment?: React.ReactNode;
  className?: string;
  position?: "bottom" | string;
  placeholder?: string;
  labelBg?: string;
  options: Option[];
  isMulti?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  isLoading?: boolean;
  value?: Option | Option[];
  defaultValue?: Option | Option[];
  noBorder?: boolean;
  [key: string]: any;
}

const SelectComponent: React.FC<SelectProps> = (props) => {
  const {
    labelBg = "bg-white",
    errorMessage,
    helperText,
    noCol,
    size = "full",
    label,
    leftAdornment,
    required,
    startAdornment,
    className,
    position = "bottom",
    placeholder = "",
    options,
    isMulti = false,
    isSearchable = true,
    isClearable = true,
    isLoading = false,
    value,
    defaultValue,
    noBorder = false,
    ...rest
  } = props;

  const hasError = !!errorMessage;
  const selectRef = useRef<any>(null);

  // رنگ‌های سازمانی
  const primaryColors = {
    30: "rgba(179, 217, 247, 0.07)",
    40: "#B3D9F7",
    50: "#8DC3F4",
    100: "#7AB3F0",
    200: "#66A3EB",
    300: "#5293E5",
    400: "#3F83E0",
    500: "#2B73DB", // رنگ اصلی
    600: "#1E5EB9",
    700: "#16437E",
    800: "#0F2A4C",
    900: "#030C18",
  };

  // تغییر در نحوه نمایش آپشن‌ها - آیکون در سمت راست و متن در سمت چپ
  const formatOptionLabel = ({ label, icon }: Option) => (
    <div className="flex items-center w-full">
      {icon && <div className="w-4 h-4 ml-2">{icon}</div>}
      <span>{label}</span>
    </div>
  );

  const customStyles: StylesConfig<Option, boolean> = {
    control: (base, state) => ({
      ...base,
      minHeight: noBorder
        ? "47px"
        : {
            xs: "1.75rem",
            sm: "2rem",
            md: "2.5rem",
            lg: "2.75rem",
            xl: "3.5rem",
            full: "42px",
            auto: "auto",
          }[size],
      height: isMulti
        ? "auto"
        : noBorder
        ? "47px"
        : {
            xs: "1.75rem",
            sm: "2rem",
            md: "2.5rem",
            lg: "2.75rem",
            xl: "3.5rem",
            full: "42px",
            auto: "auto",
          }[size],
      maxHeight: isMulti ? "230px" : undefined,
      overflowY: isMulti ? "auto" : undefined,
      borderRadius: noBorder ? "0" : "0.5rem",
      backgroundColor: "white",
      borderColor: noBorder
        ? "transparent"
        : hasError
        ? "rgb(239, 68, 68)"
        : state.isFocused
        ? primaryColors[500]
        : "#BDBDBD",
      borderWidth: noBorder ? "0" : "1px",
      boxShadow: noBorder
        ? "none"
        : state.isFocused
        ? hasError
          ? "0 0 0 1px rgb(239, 68, 68)"
          : `0 0 0 1px ${primaryColors[500]}`
        : "none",
      "&:hover": {
        borderColor: noBorder
          ? "transparent"
          : state.isFocused
          ? hasError
            ? "rgb(239, 68, 68)"
            : primaryColors[500]
          : "#BDBDBD",
      },
      paddingRight: noBorder
        ? startAdornment
          ? "1.25rem"
          : "0.5rem"
        : startAdornment
        ? "2rem"
        : "0.75rem",
      paddingLeft: noBorder
        ? leftAdornment
          ? "0.75rem"
          : "0.25rem"
        : leftAdornment
        ? "1rem"
        : "0.5rem",
      fontSize: "0.75rem",
      display: "flex",
      alignItems: isMulti ? "flex-start" : "center",
      paddingTop: isMulti ? "4px" : noBorder ? "0" : "0",
      paddingBottom: isMulti ? "4px" : noBorder ? "0" : "0",
      "@media (min-width: 640px)": {
        borderRadius: noBorder ? "0" : "0.75rem",
        fontSize: "0.875rem",
        paddingRight: noBorder
          ? startAdornment
            ? "1.5rem"
            : "0.5rem"
          : startAdornment
          ? "2.25rem"
          : "1rem",
        paddingLeft: noBorder
          ? leftAdornment
            ? "1rem"
            : "0.25rem"
          : leftAdornment
          ? "2.25rem"
          : "1rem",
        minHeight: noBorder
          ? "47px"
          : {
              xs: "1.75rem",
              sm: "2rem",
              md: "2.5rem",
              lg: "2.75rem",
              xl: "3.5rem",
              full: "50px",
              auto: "auto",
            }[size],
        height: isMulti
          ? "auto"
          : noBorder
          ? "47px"
          : {
              xs: "1.75rem",
              sm: "2rem",
              md: "2.5rem",
              lg: "2.75rem",
              xl: "3.5rem",
              full: "50px",
              auto: "auto",
            }[size],
      },
    }),

    valueContainer: (base) => ({
      ...base,
      padding: "0 8px",
      textAlign: "right",
      direction: "rtl",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      flexWrap: "wrap",
      overflowY: "auto",
      maxHeight: "230px",
      wordBreak: "break-word",
      overflowWrap: "break-word",
    }),

    input: (base) => ({
      ...base,
      margin: "0",
      padding: "0",
      textAlign: "right",
      direction: "rtl",
    }),
    placeholder: (base) => ({
      ...base,
      marginRight: "0",
      marginLeft: "auto",
      color: hasError ? "rgba(239, 68, 68, 0.7)" : "#D1D5DB",
      alignSelf: "center",
      textAlign: "right",
    }),
    singleValue: (base) => ({
      ...base,
      textAlign: "right",
      marginLeft: "auto",
      marginRight: "0",
      direction: "rtl",
      whiteSpace: "normal",
      wordBreak: "break-word",
      overflowWrap: "break-word",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: hasError
        ? "rgba(239, 68, 68, 0.1)"
        : `${primaryColors[30]}`,
      borderRadius: "0.375rem",
      marginRight: "2px",
      marginLeft: "2px",
      marginTop: "2px",
      marginBottom: "2px",
      direction: "rtl",
      alignSelf: "center",
      fontSize: "14px",
      maxWidth: "calc(100% - 4px)",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: hasError ? "rgb(239, 68, 68)" : primaryColors[500],
      padding: "0.125rem",
      paddingRight: "0.5rem",
      paddingLeft: "0",
      whiteSpace: "normal",
      wordBreak: "break-word",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: hasError ? "rgb(239, 68, 68)" : primaryColors[500],
      "&:hover": {
        backgroundColor: hasError ? "rgb(239, 68, 68)" : primaryColors[500],
        color: "white",
      },
      paddingRight: "0",
      paddingLeft: "0.5rem",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "0.75rem",
      zIndex: 30,
      textAlign: "right",
    }),
    menuList: (base) => ({
      ...base,
      padding: "0.5rem",
      textAlign: "right",
      "::-webkit-scrollbar": {
        width: "0",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? hasError
          ? "rgba(239, 68, 68, 0.1)"
          : primaryColors[30]
        : state.isFocused
        ? "rgba(243, 244, 246, 0.5)"
        : "transparent",
      color: state.isSelected
        ? hasError
          ? "rgb(239, 68, 68)"
          : primaryColors[500]
        : "rgb(17, 24, 39)",
      padding: "0.5rem",
      borderRadius: "0.375rem",
      textAlign: "right",
      display: "flex",
      flexDirection: "row-reverse",
      justifyContent: "flex-end",
      alignItems: "center",
      "&:hover": {
        backgroundColor: hasError
          ? "rgba(239, 68, 68, 0.05)"
          : primaryColors[30],
      },
      whiteSpace: "normal",
      wordBreak: "break-word",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: hasError ? "rgb(239, 68, 68)" : "#BDBDBD",
      "&:hover": {
        color: hasError ? "rgb(239, 68, 68)" : primaryColors[500],
      },
      alignSelf: "center",
      padding: "0 8px",
    }),
    clearIndicator: (base) => ({
      ...base,
      color: hasError ? "rgb(239, 68, 68)" : "#BDBDBD",
      "&:hover": {
        color: hasError ? "rgb(239, 68, 68)" : primaryColors[500],
      },
      alignSelf: "center",
      padding: "0 8px",
    }),
    indicatorsContainer: (base) => ({
      ...base,
      alignSelf: "center",
      height: "100%",
      display: "flex",
      alignItems: "center",
    }),
    container: (base) => ({
      ...base,
      direction: "rtl",
      width: "100%",
    }),
  };

  return (
    <div className={`w-full relative ${noBorder ? 'mt-0 h-full' : 'mt-2'}`}>
      <div className={`relative ${noBorder ? 'h-full' : ''}`}>
        <Select
          ref={selectRef}
          options={options}
          isMulti={isMulti}
          isSearchable={isSearchable}
          isClearable={isClearable}
          isLoading={isLoading}
          placeholder={placeholder}
          formatOptionLabel={formatOptionLabel}
          styles={customStyles}
          className={`block w-full ${className ?? ""}`}
          classNamePrefix="select"
          value={value}
          defaultValue={defaultValue}
          isRtl={true}
          noOptionsMessage={() => "موردی یافت نشد!"}
          loadingMessage={() => "در حال بارگذاری..."}
          {...rest}
        />

        {leftAdornment && (
          <div className="absolute inset-y-0 lg:left-3 left-1 flex items-center pointer-events-none">
            {leftAdornment}
          </div>
        )}

        {startAdornment && (
          <div className="absolute inset-y-0 lg:left-3 left-1 flex items-center pointer-events-none">
            {startAdornment}
          </div>
        )}
      </div>

      {label && (
        <div className={`absolute -top-[9px] right-3 sm:right-4 px-1 ${labelBg}`}>
          <label
            className={`block text-[11px] sm:text-[13.5px] z-20 text-right ${
              hasError ? "text-error-500" : "text-[#BDBDBD]"
            }`}
            htmlFor={label}
            onClick={() => selectRef.current?.focus()}
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

      {(hasError || helperText) && (
        <Typography
          className={`text-xs mt-1 text-right ${
            hasError ? "text-error-500" : "text-text-secondary"
          }`}
        >
          {hasError ? errorMessage : helperText}
        </Typography>
      )}
    </div>
  );
};

export default SelectComponent;