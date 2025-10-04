import React, { useState, useRef, useEffect } from "react";
import Typography from "../typography/Typography";
import { FiChevronDown, FiCheck } from "react-icons/fi";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SurveySelectProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  options: SelectOption[];
  error?: string;
  required?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  name?: string;
  searchable?: boolean;
}

const SurveySelect: React.FC<SurveySelectProps> = ({
  label,
  placeholder = "انتخاب کنید...",
  value,
  onChange,
  onBlur,
  options,
  error,
  required = false,
  disabled = false,
  size = "md",
  className = "",
  name,
  searchable = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: "h-8 text-sm px-3",
    md: "h-10 text-sm px-3",
    lg: "h-12 text-base px-4",
  };

  const selectedOption = options.find(option => option.value === value);

  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
        onBlur?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onBlur]);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (searchable && !isOpen) {
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    }
  };

  return (
    <div className={`w-full ${className}`} ref={selectRef}>
      {label && (
        <Typography className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </Typography>
      )}
      
      <div className="relative">
        <div
          onClick={handleToggle}
          className={`
            w-full border rounded-lg transition-colors duration-200 cursor-pointer
            ${sizeClasses[size]}
            ${error 
              ? "border-red-300 focus:border-red-500" 
              : "border-gray-300 focus:border-blue-500"
            }
            ${disabled 
              ? "bg-gray-100 text-gray-500 cursor-not-allowed" 
              : "bg-white text-gray-900 hover:border-gray-400"
            }
            ${isOpen ? "border-blue-500 ring-2 ring-blue-200 ring-opacity-50" : ""}
            flex items-center justify-between
          `}
        >
          <span className={selectedOption ? "text-gray-900" : "text-gray-400"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <FiChevronDown 
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`} 
          />
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
            {searchable && (
              <div className="p-2 border-b border-gray-200">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="جستجو..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            )}
            
            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => !option.disabled && handleSelect(option.value)}
                    className={`
                      px-3 py-2 text-sm cursor-pointer flex items-center justify-between
                      ${option.disabled 
                        ? "text-gray-400 cursor-not-allowed" 
                        : "text-gray-900 hover:bg-blue-50"
                      }
                      ${value === option.value ? "bg-blue-100 text-blue-900" : ""}
                    `}
                  >
                    <span>{option.label}</span>
                    {value === option.value && (
                      <FiCheck className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500 text-center">
                  موردی یافت نشد
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <Typography className="text-red-500 text-xs mt-1">
          {error}
        </Typography>
      )}

      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={value || ""} />
    </div>
  );
};

export default SurveySelect;