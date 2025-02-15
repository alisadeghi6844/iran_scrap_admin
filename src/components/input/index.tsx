import React, { forwardRef } from "react";
import Typography from "../typography/Typography";
import { InputTypes } from "../../types/components/InputTypes";

const Input = forwardRef<HTMLInputElement, InputTypes>((props, ref) => {
  const {
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
    ...rest
  } = props;

  return (
    <div className="w-full">
      <div className="relative z-0">
        <input 
          id={label}
          placeholder=" "
          ref={ref} // انتقال ref به input
          className={`block p-2 w-full text-sm text-gray-900
            bg-transparent border-0 border-b-2 border-gray-300 appearance-none
            dark:text-white dark:border-gray-600 dark:focus:border-primary-500 
            focus:outline-none focus:ring-0 focus:border-primary-600 peer
            ${!!errorMessage ? "text-error-500 focus:text-error-500" : "border-gray-300"} 
            ${startAdornment && "pr-9"} 
            ${leftAdornment && "pl-9"} 
            ${{
              xs: "h-7 text-xs",
              sm: "h-8 text-sm",
              md: "h-10 text-sm",
              lg: "h-11 text-lg",
              xl: "h-14 text-xl",
              full: "h-11 w-full",
              auto: "h-auto w-auto",
            }[size]} 
            ${className ?? ""}
          `}
          {...rest}
        />
       
        <label
          className="absolute flex gap-x-2 text-sm lg:text-base text-gray-400
            duration-300 transform -translate-y-7 top-2 -z-10 origin-right scale-90
            peer-focus:right-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75
            peer-focus:-translate-y-7"
        >
          {label}
          {    required?(<div className=" text-error">*</div>):null}
        </label>
        <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center">
          {leftAdornment}
        </div>
      </div>
      <Typography
        className={`text-xs ${
          !!errorMessage ? "text-error-500" : "text-text-secondary"
        }`}
      >
        {!!errorMessage ? errorMessage : helperText}
      </Typography>
    </div>
  );
});

export default Input;
