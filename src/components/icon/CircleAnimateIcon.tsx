import React from "react";

interface CircleAnimateIconTypes {
  size?: any;
  variant?: any;
}

const CircleAnimateIcon: React.FC<CircleAnimateIconTypes> = (props) => {
  const { size, variant = "success" } = props;
  return (
    <div
      className={`${size === "sm" ? "w-2 h-2" : "w-3 h-3"} pulse rounded-full ${
        {
          success: "bg-success-500",
          warning: "bg-warning-500",
          error: "bg-error-500",
        }[variant]
      } ml-1`}
    ></div>
  );
};

export default CircleAnimateIcon;
