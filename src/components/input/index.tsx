import React from 'react';
import Typography from '../typography/Typography';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'; 

interface InputProps {
  errorMessage?: any;
  helperText?: string;
  noCol?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'auto';
  label?: string;
  leftAdornment?: React.ReactNode;
  required?: boolean;
  startAdornment?: React.ReactNode;
  className?: string;
  position?: 'bottom' | string;
  placeholder?: string;
  labelBg?: string;
  noBorder?: boolean;
  [key: string]: any;
}

const Input: React.FC<InputProps> = props => {
  const {
    labelBg = 'bg-white',
    errorMessage,
    helperText,
    noCol,
    size = 'full',
    label,
    leftAdornment,
    required,
    startAdornment,
    placeholder,
    className,
    position = 'bottom',
    noBorder = false,
    ...rest
  } = props;

  const hasError = !!errorMessage;

  const tooltipId = label ? `tooltip-${label.replace(/\s+/g, '-')}` : undefined;

  return (
    <div className={`w-full relative ${noBorder ? 'mt-0 h-full' : 'mt-2'}`}>
      <div className={`relative ${noBorder ? 'h-full' : ''}`}>
        <input
          id={label}
          className={`block w-full text-xs sm:text-sm md:text-md
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
          ${startAdornment ? 'pr-8 sm:pr-9' : ''} ${leftAdornment ? 'pl-8 sm:pl-9' : ''} ${
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
          } ${className ?? ''}
          `}
          placeholder={placeholder}
          {...rest}
        />
        {leftAdornment && (
          <div className="absolute inset-y-0 left-2 sm:left-3 flex items-center pointer-events-none">
            {leftAdornment}
          </div>
        )}
        {startAdornment && (
          <div className="absolute inset-y-0 right-2 sm:right-3 flex items-center pointer-events-none">
            {startAdornment}
          </div>
        )}
      </div>

      {label && (
        <>
          <div
            data-tooltip-id={tooltipId}
            className={`absolute -top-[9px] right-3 sm:right-4 px-1 ${labelBg} max-w-[90%] truncate cursor-help`}
          >
            <label
              className={`block text-[11px] sm:text-[13.5px] z-20 text-right whitespace-nowrap overflow-hidden text-ellipsis ${
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
          <Tooltip id={tooltipId} place="top" content={label} />
        </>
      )}

      {(hasError || helperText) && (
        <Typography
          className={`text-[10px] sm:text-xs mt-1 ${hasError ? 'text-error-500' : 'text-text-secondary'}`}
        >
          {hasError ? errorMessage : helperText}
        </Typography>
      )}
    </div>
  );
};

export default Input;