import React from "react";
import "react-tooltip/dist/react-tooltip.css";
import ProfileIcon from "./profile/ProfileIcon";
import SettingIcon from "../../components/icon/custom/SettingIcon";

import { Tooltip } from "react-tooltip";
import UsersIcon from "../../components/icon/custom/UsersIcon";
import BellIcon from "../../components/icon/custom/BellIcon";
import Badge from "../../components/badge/Badge";
import { BsSearch } from "react-icons/bs";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

interface HeaderProps {
  chatHeader?: boolean;
  onMenuClick?: () => void;
  sidebarOpen?: boolean;
}
const Header: React.FC<HeaderProps> = (props) => {
  const { chatHeader = false, onMenuClick, sidebarOpen = false } = props;
  return (
    <div
      className={`fixed top-0 left-0 ${
        chatHeader
          ? "w-full lg:w-[75%] border-b-2 border-gray-200"
          : "w-full lg:w-[84.3%] shadow-lg"
      } h-[80px] px-4 lg:px-[40px] py-5 bg-white z-50`}
    >
      <div className="flex w-full h-full items-center justify-between">
        <div className="flex items-center gap-x-5 z-50">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className={`lg:hidden p-2 rounded-md transition-all duration-300 ${
              sidebarOpen 
                ? "bg-primary-100 text-primary-600 rotate-180" 
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            {sidebarOpen ? (
              <IoClose className="text-2xl" />
            ) : (
              <HiMenuAlt3 className="text-2xl" />
            )}
          </button>
          <ProfileIcon />
          {chatHeader ? (
            <div className="mr-6 flex gap-x-6 flex-row items-center">
              <div>
                <Link to="/" className="text-gray-700 font-bold transition-all hover:text-primary-500">صفحه اصلی</Link>
              </div>
              <div>
                <Link to="/" className="text-gray-700 font-bold transition-all hover:text-primary-500">رزرواسیون تغذیه</Link>
              </div>
            </div>
          ) : null}
          {/* <div className="cursor-pointer" data-tooltip-id="setting" data-tooltip-content="تنظیمات">
                        <SettingIcon/>
                        <Tooltip id="setting"/>
                    </div>
                    <div className="cursor-pointer" data-tooltip-id="users" data-tooltip-content="کاربران">
                        <UsersIcon/>
                        <Tooltip id="users"/>
                    </div>
                    <div className="cursor-pointer relative" data-tooltip-id="notif" data-tooltip-content="اطلاعیه">
                        <BellIcon/>
                        <div className="absolute -top-2 -right-1">
                        <Badge number={4} variant="error" />
                        </div>
                        <Tooltip id="notif"/>
                    </div> */}
        </div>
        <div className="flex items-center gap-x-4">
          <div className="p-1 w-[64px] h-[34px] rounded-lg flex items-center justify-center bg-gray-200 text-gray-600 font-bold text-sm">
            Ctrl + K
          </div>
          <div className="cursor-pointer">
            <BsSearch className="text-2xl text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
