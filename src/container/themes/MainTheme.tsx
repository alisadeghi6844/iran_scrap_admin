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

  return (
    <div className="flex min-h-screen w-full" {...rest}>
      {/* <PageHeader /> */}
      <div>{/*<MobileSidebar sidebarstatus={sidebarstatus} />*/}</div>
      <div className="w-full">
        {/*<AdminHeader crumb={crumb} title={title} />*/}
        <div className="grid grid-cols-7 w-full">
          <div className="col-span-1">
            <DesktopSidebar />
          </div>
          <div className="col-span-6">
            <Header />
            <div className="mt-[85px]">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTheme;
