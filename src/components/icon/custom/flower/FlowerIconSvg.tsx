import React from "react";
import FlowerIconContentA from "./FlowerIconContentA";
import FlowerIconContentB from "./FlowerIconContentB";

const FlowerIconSvg: React.FC = () => {
  return (
    <svg width="463" height="169" viewBox="0 0 463 169" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.4">
        <FlowerIconContentA />
        <FlowerIconContentB />
      </g>
    </svg>
  );
};

export default FlowerIconSvg;
