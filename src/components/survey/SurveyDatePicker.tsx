import React from "react";
import Typography from "../typography/Typography";

interface SurveyDatePickerProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  min?: string;
  max?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  name?: string;
  placeholder?: string;
}

const SurveyDatePicker: React.FC<SurveyDatePickerProps> = ({
  label,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  min,
  max,
  size = "md",
  className = "",
  name,
  placeholder = "تاریخ را انتخاب کنید",
}) => {
  const sizeClasses = {
    sm: "h-8 text-sm px-3",
    md: "h-10 text-sm px-3",
    lg: "h-12 text-base px-4",
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <Typography className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </Typography>
      )}
      
      <div className="relative">
        <input
          type="date"
          name={name}
          value={value || ""}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
          min={min}
          max={max}
          className={`
            w-full border rounded-lg transition-colors duration-200
            ${sizeClasses[size]}
            ${error 
              ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
            }
            ${disabled 
              ? "bg-gray-100 text-gray-500 cursor-not-allowed" 
              : "bg-white text-gray-900"
            }
            focus:outline-none focus:ring-2 focus:ring-opacity-50
            [&::-webkit-calendar-picker-indicator]:opacity-0
            [&::-webkit-calendar-picker-indicator]:absolute
            [&::-webkit-calendar-picker-indicator]:right-3
            [&::-webkit-calendar-picker-indicator]:w-5
            [&::-webkit-calendar-picker-indicator]:h-5
            [&::-webkit-calendar-picker-indicator]:cursor-pointer
          `}
        />
        

        
        {/* Placeholder when no value */}
        {!value && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400 text-sm">
            {placeholder}
          </div>
        )}
      </div>

      {error && (
        <Typography className="text-red-500 text-xs mt-1">
          {error}
        </Typography>
      )}
    </div>
  );
};

export default SurveyDatePicker;