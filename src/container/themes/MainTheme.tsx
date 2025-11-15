import React, { useEffect, useRef, useState } from "react";
import { AdminThemeTypes } from "../../types/organism/AdminThemeTypes";
import Header from "../organism/Header";
import DesktopSidebar from "../features/sideBar/DesktopSidebar";
import { selectGetUserProfileData } from "../../redux/slice/account/AccountSlice";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { SetToken } from "../../api/setToken";

const MainTheme: React.FC<AdminThemeTypes> = (props) => {
  const { children, title, crumb, ...rest } = props;
  const getUserData = useSelector(selectGetUserProfileData);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = title ?? "مدیریت دیجی فارم";
  }, [title]);

  useEffect(() => {
    console.log("getUserData", getUserData);
      // if (getUserData?.id && !getUserData.isAdmin) {
      //   SetToken("access_token", null, 0);
      // }
  }, [getUserData, navigate]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full" {...rest}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className="w-full">
        <div className="lg:grid lg:grid-cols-7 w-full">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <DesktopSidebar />
          </div>
          
          {/* Mobile Sidebar */}
          <div className={`fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
            sidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <DesktopSidebar isMobile={true} onClose={() => setSidebarOpen(false)} />
          </div>
          
          <div className="lg:col-span-6 w-full">
            <Header 
              onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
              sidebarOpen={sidebarOpen}
            />
            <div className="mt-[85px] px-4 lg:px-0">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTheme;
