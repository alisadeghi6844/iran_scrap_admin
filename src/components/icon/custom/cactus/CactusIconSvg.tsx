import React from "react";
import CactusIconSvgContent from "./CactusIconSvgContent";
import CactusIconDefsA from "./CactusIconDefsA";
import CactusIconDefsB from "./CactusIconDefsB";
import CactusIconDefsGradients from "./CactusIconDefsGradients";

const CactusIconSvg: React.FC = () => {
  return (
    <svg
      width="170"
      height="450"
      viewBox="0 0 199 566"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CactusIconSvgContent />
      <CactusIconDefsA />
      <CactusIconDefsB />
      <CactusIconDefsGradients />
    </svg>
  );
};

export default CactusIconSvg;


