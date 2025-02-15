// components/VideoLoader.tsx
import React from 'react';

const VideoLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] bg-gray-900">
      {/* کانتینر اصلی انیمیشن */}
      <div className="relative">
        {/* دایره‌های متحرک */}
        <div className="absolute inset-0">
          <div className="animate-spin-slow absolute w-16 h-16 border-t-4 border-blue-500 rounded-full"></div>
          <div className="animate-spin-reverse absolute w-16 h-16 border-r-4 border-purple-500 rounded-full"></div>
          <div className="animate-pulse absolute w-16 h-16 border-b-4 border-teal-500 rounded-full"></div>
        </div>
        
        {/* آیکون پخش در مرکز */}
        <div className="relative z-10 w-16 h-16 flex items-center justify-center">
          <svg 
            className="w-8 h-8 text-white animate-pulse" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M8 5v10l7-5-7-5z" />
          </svg>
        </div>
      </div>
      
      {/* متن لودینگ */}
      <div className="mt-6 text-center">
        <p className="text-gray-300 font-medium">در حال آماده‌سازی ویدیو</p>
        <div className="flex gap-1 mt-2 justify-center">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-100"></div>
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoLoader;
