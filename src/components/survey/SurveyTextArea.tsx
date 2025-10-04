import React, { forwardRef } from "react";
import Typography from "../typography/Typography";

interface SurveyTextAreaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  className?: string;
  name?: string;
}

const SurveyTextArea = forwardRef<HTMLTextAreaElement, SurveyTextAreaProps>(
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
      rows = 3,
      maxLength,
      className = "",
      name,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`w-full ${className}`}>
        {label && (
          <Typography className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500 mr-1">*</span>}
          </Typography>
        )}
        
        <div className="relative">
          <textarea
            ref={ref}
            name={name}
            value={value || ""}
            onChange={(e) => onChange?.(e.target.value)}
            onBlur={onBlur}
            disabled={disabled}
            placeholder={placeholder}
            rows={rows}
            maxLength={maxLength}
            className={`
              w-full border rounded-lg transition-colors duration-200 resize-none
              px-3 py-2 text-sm
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
          
          {maxLength && (
            <div className="absolute bottom-2 left-2 text-xs text-gray-400">
              {value?.length || 0}/{maxLength}
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
  }
);

SurveyTextArea.displayName = "SurveyTextArea";

export default SurveyTextArea;