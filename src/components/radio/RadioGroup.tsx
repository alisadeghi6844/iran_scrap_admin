import React from "react";
import Button from "../button";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  value: string;
  options: RadioOption[];
  onChange: (value: string) => void;
  className?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  options,
  onChange,
  className = "",
}) => {
  const getButtonVariant = (optionValue: string, isSelected: boolean) => {
    console.log("optionValue", optionValue);
    if (isSelected) {
      switch (optionValue) {
        case "PENDING":
          return "warning";
        case "CONFIRM":
          return "success";
        case "REJECT":
          return "error";
        default:
          return "primary";
      }
    } else {
      switch (optionValue) {
        case "PENDING":
          return "outline-warning";
        case "CONFIRM":
          return "outline-success";
        case "REJECT":
          return "outline-error";
        default:
          return "outline-primary";
      }
    }
  };

  return (
    <div className={`flex gap-1 ${className}`}>
      {options.map((option) => (
        <Button
          key={option.value}
          variant={getButtonVariant(option.value, value === option.value)}
          size="xs"
          onClick={() => onChange(option.value)}
          className="min-w-[70px] text-xs"
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default RadioGroup;
