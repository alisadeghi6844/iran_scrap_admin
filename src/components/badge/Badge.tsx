import React from "react";
import { BadgeTypes } from "../../types/components/BadgeTypes";

const Badge: React.FC<BadgeTypes> = (props) => {
  const {
    number,
    variant = "primary",
    className,
    size = "md",
    ...rest
  } = props;
  return (
    <div
      className={` rounded-full flex items-center pt-[1px] ${
        size === "md" ? "text-[12px]" : "text-[13px]"
      } justify-center  ${
        {
          md: "w-[24px] h-[24px]",
          lg: "w-[27px] h-[27px]",
        }[size]
      } ${
        {
          primary: "bg-primary text-white",
          secondary: "bg-secondary text-gray-900",
          error: "bg-error text-white",
          warning: "bg-warning text-white",
        }[variant]
      } ${className ?? null}`}
      {...rest}
    >
      {number}
    </div>
  );
};

export default Badge;
