import React, { forwardRef } from "react";
import Typography from "../typography/Typography";

interface SurveyInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  type?: "text" | "number" | "email" | "password";
  size?: "sm" | "md" | "lg";
  className?: string;
  name?: string;
}

const SurveyInput = forwardRef<HTMLInputElement, SurveyInputProps>(
  (
    {
      label,
      placeholder,
      value,
      onChange,
      onBlur,
      error,
      required = false,
      disabled = false,
      type = "text",
      size = "md",
      className = "",
      name,
      ...props
    },
    ref
  ) => {
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
            ref={ref}
            type={type}
            name={name}
            value={value || ""}
            onChange={(e) => onChange?.(e.target.value)}
            onBlur={onBlur}
            disabled={disabled}
            placeholder={placeholder}
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
              placeholder-gray-400
            `}
            {...props}
          />
        </div>

        {error && (
          <Typography className="text-red-500 text-xs mt-1">
            {error}
          </Typography>
        )}
      </div>
    );
  }
);

SurveyInput.displayName = "SurveyInput";

export default SurveyInput;