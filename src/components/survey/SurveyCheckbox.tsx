import React from "react";
import Typography from "../typography/Typography";
import { FiCheck } from "react-icons/fi";

interface SurveyCheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  error?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  name?: string;
  id?: string;
}

const SurveyCheckbox: React.FC<SurveyCheckboxProps> = ({
  label,
  checked = false,
  onChange,
  disabled = false,
  error,
  size = "md",
  className = "",
  name,
  id,
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

  const handleChange = () => {
    if (!disabled) {
      onChange?.(!checked);
    }
  };

  return (
    <div className={`flex items-start ${className}`}>
      <div className="flex items-center h-5">
        <div
          onClick={handleChange}
          className={`
            ${sizeClasses[size]}
            border-2 rounded cursor-pointer transition-all duration-200
            flex items-center justify-center
            ${checked
              ? "bg-blue-500 border-blue-500"
              : "bg-white border-gray-300 hover:border-gray-400"
            }
            ${disabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:shadow-sm"
            }
            ${error ? "border-red-300" : ""}
          `}
        >
          {checked && (
            <FiCheck 
              className={`text-white ${
                size === "sm" ? "w-3 h-3" : size === "lg" ? "w-4 h-4" : "w-3 h-3"
              }`} 
            />
          )}
        </div>
      </div>

      {label && (
        <div className="mr-2">
          <Typography
            className={`
              font-medium cursor-pointer
              ${textSizeClasses[size]}
              ${disabled ? "text-gray-400" : "text-gray-700"}
              ${error ? "text-red-500" : ""}
            `}
            onClick={handleChange}
          >
            {label}
          </Typography>
          
          {error && (
            <Typography className="text-red-500 text-xs mt-1">
              {error}
            </Typography>
          )}
        </div>
      )}

      {/* Hidden input for form submission */}
      <input
        type="checkbox"
        name={name}
        id={id}
        checked={checked}
        onChange={() => {}} // Controlled by onClick
        className="sr-only"
      />
    </div>
  );
};

export default SurveyCheckbox;