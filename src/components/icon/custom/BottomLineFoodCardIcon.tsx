import React from 'react';

interface BottomLineFoodCardIconProps {
  variant?: 'primary' | 'success' | 'warning' | 'error';
}

const BottomLineFoodCardIcon: React.FC <BottomLineFoodCardIconProps> = ({ variant = "primary" }) => {
    return(
    <svg
      width="85"
      height="48"
      viewBox="0 0 85 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33.221 2.56383C34.1042 0.980962 35.7748 0 37.5874 0H78.1878C81.2409 0 83.1684 3.2827 81.6808 5.94893L58.2189 48H7.87036L33.221 2.56383Z"
        fill={`${{ primary: "#64748b", success: "#36B37E", warning: "#FF9800", error: "#FF5722" }[variant]}`}
      />
      <path d="M7.87037 48L11.2214 42H0L7.87037 48Z" fill="#223847" />
    </svg>
  );
};
 
export default BottomLineFoodCardIcon