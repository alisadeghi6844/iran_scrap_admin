import React, { useState } from "react";
import { FeatureLoadingTypes } from "../../types/components/FeatureLoading";

const FeatureLoading:React.FC<FeatureLoadingTypes> = (props) => {
  const { color = "fill-primary-500", className, size = "md", ...rest } = props;
  return (
    <div
      className={
        className ? className : "flex justify-center items-center p-4 w-full"
      }
      role="status"
      {...rest}
    >
      <svg
        width="45"
        viewBox="0 0 44 44"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#7B68EE"
        className={`${
          {
            xs: "w-4 h-4",
            sm: "w-6 h-6",
            md: "w-8 h-8",
            lg: "w-10 h-10",
            xl: "w-16 h-16",
            xxl: "w-20 h-20",
          }[size]
        }`}
      >
        <g fill="none" fillRule="evenodd" strokeWidth="4">
          <circle cx="22" cy="22" r="1">
            <animate
              attributeName="r"
              begin="0s"
              dur="1.8s"
              values="1; 20"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.165, 0.84, 0.44, 1"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="stroke-opacity"
              begin="0s"
              dur="1.8s"
              values="1; 0"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.3, 0.61, 0.355, 1"
              repeatCount="indefinite"
            ></animate>
          </circle>
          <circle cx="22" cy="22" r="1">
            <animate
              attributeName="r"
              begin="-0.9s"
              dur="1.8s"
              values="1; 20"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.165, 0.84, 0.44, 1"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="stroke-opacity"
              begin="-0.9s"
              dur="1.8s"
              values="1; 0"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.3, 0.61, 0.355, 1"
              repeatCount="indefinite"
            ></animate>
          </circle>
        </g>
      </svg>
      <span className="sr-only">درحال بارگزاری...</span>
    </div>
  );
};

export default FeatureLoading;
