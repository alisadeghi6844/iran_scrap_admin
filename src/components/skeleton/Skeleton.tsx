import React from "react";
import { SkeletonTypes } from "../../types/components/SkeletonTypes";

const Skeleton: React.FC<SkeletonTypes> = (props) => {
  const {
    width = "w-full",
    height = "h-full",
    bg = "bg-gray-200",
    rounded = "rounded-md",
    className,
    ...rest
  } = props;

  return (
    <div className="h-full w-full animate-pulse">
      <div
        className={`${height} ${width} ${bg} ${rounded} ${className ?? ""}`}
        {...rest}
      ></div>
    </div>
  );
};

export default Skeleton;
