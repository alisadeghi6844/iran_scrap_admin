import React from 'react';

interface TopLineFoodCardIconProps {
  variant?: 'primary' | 'success' | 'warning' | 'error';
}

const TopLineFoodCardIcon: React.FC<TopLineFoodCardIconProps> = ({ variant = "primary" }) => {
  return (
    <>
      <svg
        width="85"
        height="48"
        viewBox="0 0 85 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M33.221 45.4362C34.1042 47.019 35.7748 48 37.5874 48H78.1878C81.2409 48 83.1684 44.7173 81.6808 42.0511L58.2189 0H7.87036L33.221 45.4362Z"
          fill={`${{ primary: "#64748b", success: "#36B37E", warning: "#FF9800", error: "#FF5722" }[variant]}`}
        />
        <path d="M7.87037 0L11.2184 6H0L7.87037 0Z" fill="#223847" />
      </svg>
    </>
  );
};

export default TopLineFoodCardIcon;
