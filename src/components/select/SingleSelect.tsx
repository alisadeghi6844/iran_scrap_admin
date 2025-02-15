import React, { useRef, useState } from "react";
import Select from "react-select";
import colors from "tailwindcss/colors";
import Typography from "../typography/Typography";
import { Option, SingleSelectTypes } from "../../types/components/SelectTypes";

const SingleSelect: React.FC<SingleSelectTypes> = (props) => {
  const {
    value,
    defaultValue,
    errorMessage,
    helperText,
    isClearable = true,
    disabled,
    size = "full",
    isLoading,
    isMulti,
    isSearchable,
    color,
    label,
    options,
    required,
    darkMode,
    placeholder = "",
    noBorder = false,
    ...rest
  } = props;

  const ref = useRef<Select<Option>>(null);
  const [isFocused, setIsFocused] = useState(false);

  const Styles = {
    control: (base: any) => ({
      ...base,
      borderRadius: "0px",
      alignItems: "end",
      cursor: `${disabled ? "not-allowed" : "pointer"}`,
      color: `${color === "primary" ? "#1EAFED" : "rgb(125 125 125)"}`,
      overflowY: "auto",
      height: isMulti
        ? "2rem"
        : size === "xs"
        ? "1.75rem"
        : size === "sm"
        ? "2rem"
        : size === "md"
        ? "2.5rem"
        : size === "lg"
        ? "2.75rem"
        : size === "xl"
        ? "3.5rem"
        : size === "full"
        ? "2.75rem"
        : "",
      maxHeight: isMulti ? "30rem" : undefined,
      fontSize:
        size === "xs"
          ? "0.75rem"
          : size === "sm"
          ? "0.875rem"
          : size === "md"
          ? "1rem"
          : size === "lg"
          ? "1.125rem"
          : size === "xl"
          ? "1.25rem"
          : size === "full"
          ? "0.875rem"
          : "",
      paddingRight: "0rem",
      boxShadow: "none",
      "&:hover": {
        borderColor: "none",
      },
      backgroundColor: "dark:bg-dark-gray-400",
      border: 0,
      borderBottom: noBorder ? "0px solid" : "2px solid rgb(210, 214, 218)",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "dark:text-white",
      cursor: `${disabled ? "not-allowed" : "pointer"}`,
    }),
    menuList: (base: any) => ({
      ...base,
      "::-webkit-scrollbar": {
        width: "0",
        cursor: `${disabled ? "not-allowed" : "pointer"}`,
      },
    }),
    option: (styles: any, { isSelected }: { isSelected: boolean }) => {
      return {
        ...styles,
        border: 0,
        cursor: `${disabled ? "not-allowed" : "pointer"}`,
        fontSize: "1rem",
        fontWeight: 500,
        backgroundColor: darkMode === "dark" ? "rgb(38  61  81)" : colors.white,
        color:
          isSelected && darkMode === "dark"
            ? "rgb(27 107 250)"
            : isSelected && darkMode === "light"
            ? "#82D3F5"
            : darkMode === "dark"
            ? "rgb(187 195 221)"
            : colors.gray[700],
        ":hover": {
          backgroundColor: "#50C1F1",
          color: "white",
        },
        justifyContent: "start",
        display: "flex",
      };
    },
    dropdownIndicator: (base: any) => ({
      ...base,
      color: `${color === "primary" ? "#1eafed" : "rgb(125 125 125)"}`,
      cursor: `${disabled ? "not-allowed" : "pointer"}`,
    }),
  };

  return (
    <div
      className={`w-full ${darkMode === "dark" ? "select-dark" : ""} ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <div className="relative w-full ">
        <Select
          classNamePrefix="select"
          ref={ref}
          components={{
            IndicatorSeparator: () => null,
          }}
          value={value}
          defaultValue={defaultValue || null}
          isDisabled={disabled}
          isClearable={isClearable}
          isLoading={isLoading}
          isMulti={isMulti}
          isRtl
          closeMenuOnSelect={isMulti}
          isSearchable={isSearchable}
          loadingMessage={() => "در حال بارگذاری..."}
          maxMenuHeight={140}
          noOptionsMessage={() => "موردی یافت نشد!"}
          options={options}
          openMenuOnFocus={true}
          placeholder={placeholder}
          styles={Styles}
          className={`basic-multi-select`}
          {...rest}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onMenuClose={() => setIsFocused(false)}
        />
        <label
          className={`absolute right-0 top-[12px] origin-right scale-90 transform cursor-pointer duration-300 ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          } ${color === "primary" ? "!text-primary-500" : "!text-gray-400"} ${
            isMulti
              ? isFocused || (value && (value as Option[]).length > 0)
                ? "-translate-y-8 scale-75 "
                : ""
              : isFocused || value
              ? "-translate-y-8 scale-75 "
              : ""
          } `}
          onClick={() => {
            ref.current?.focus();
          }}
        >
          {label}
          {required && <span className="text-error-500">*</span>}
        </label>
      </div>

      <Typography
        className={`text-xs ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }  ${
          !!errorMessage ? "text-error-500 " : "text-text-secondary"
        }`}
      >
        {!!errorMessage ? errorMessage : helperText}
      </Typography>
    </div>
  );
};

export default SingleSelect;
