import React from "react";
import Typography from "../typography/Typography";

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SurveyRadioProps {
  label?: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: string;
  size?: "sm" | "md" | "lg";
  direction?: "vertical" | "horizontal";
  className?: string;
  name?: string;
}

const SurveyRadio: React.FC<SurveyRadioProps> = ({
  label,
  options,
  value,
  onChange,
  disabled = false,
  error,
  size = "md",
  direction = "vertical",
  className = "",
  name,
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-sm",
    lg: "text-base",
  };

  const handleChange = (optionValue: string) => {
    if (!disabled) {
      onChange?.(optionValue);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <Typography className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </Typography>
      )}
      
      <div className={`
        ${direction === "horizontal" 
          ? "flex flex-wrap gap-4" 
          : "space-y-2"
        }
      `}>
        {options.map((option) => (
          <div
            key={option.value}
            className="flex items-center"
          >
            <div
              onClick={() => !option.disabled && handleChange(option.value)}
              className={`
                ${sizeClasses[size]}
                border-2 rounded-full cursor-pointer transition-all duration-200
                flex items-center justify-center
                ${value === option.value
                  ? "bg-blue-500 border-blue-500"
                  : "bg-white border-gray-300 hover:border-gray-400"
                }
                ${disabled || option.disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-sm"
                }
                ${error ? "border-red-300" : ""}
              `}
            >
              {value === option.value && (
                <div className={`
                  bg-white rounded-full
                  ${size === "sm" ? "w-2 h-2" : size === "lg" ? "w-3 h-3" : "w-2.5 h-2.5"}
                `} />
              )}
            </div>

            <Typography
              className={`
                mr-2 font-medium cursor-pointer
                ${textSizeClasses[size]}
                ${disabled || option.disabled ? "text-gray-400" : "text-gray-700"}
                ${error ? "text-red-500" : ""}
              `}
              onClick={() => !option.disabled && handleChange(option.value)}
            >
              {option.label}
            </Typography>

            {/* Hidden input for form submission */}
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => {}} // Controlled by onClick
              className="sr-only"
            />
          </div>
        ))}
      </div>

      {error && (
        <Typography className="text-red-500 text-xs mt-1">
          {error}
        </Typography>
      )}
    </div>
  );
};

export default SurveyRadio;