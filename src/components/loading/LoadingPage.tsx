import React from "react";

interface LoadingPageProps {
  text?: string;
}

const LoadingPage: React.FC<LoadingPageProps> = (props) => {
  const { text = "درحال بارگذاری ..." } = props;

  return (
    <div className="w-full min-h-screen flex justify-center items-center text-black flex-col">
      <div className="relative w-40 h-40 animate-pulse">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#64748b" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#64748b" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>

          <rect width="200" height="200" fill="url(#bgGradient)" rx="20" ry="20" />

          <g transform="translate(40, 40)">
            <path
              d="M0 0 L60 100 L120 0"
              stroke="url(#logoGradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M20 0 L60 70 L100 0"
              stroke="url(#logoGradient)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="60" cy="85" r="5" fill="#64748b" />
            <circle cx="45" cy="100" r="3" fill="#475569" />
            <circle cx="75" cy="100" r="3" fill="#475569" />
          </g>
        </svg>
      </div>
      <div className="mt-6 text-primary-500 text-xl">{text}</div>
    </div>
  );
};

export default LoadingPage;
