import React, { useEffect } from "react";
import { AdminThemeTypes } from "../../types/organism/AdminThemeTypes";
import Header from "../organism/Header";
import DesktopSidebar from "../features/sideBar/DesktopSidebar";
import ChatDraver from "../organism/chat/chatDraver";

const ChatTheme: React.FC<AdminThemeTypes> = (props) => {
  const { children, title, crumb, ...rest } = props;

  useEffect(() => {
    document.title = title ?? "پیام رسان سازمانی";
  }, [title]);

  return (
    <div className="flex h-full w-full" {...rest}>
        <div className="grid grid-cols-12 w-full">
          <div className="col-span-3 w-full h-screen relative">
            <ChatDraver />
          </div>
          <div className="col-span-9 relative bg-gray-100 w-full h-[100vh]">
            <Header chatHeader={true} />
            <div className="w-full h-full">{children}</div>
          </div>
        </div>
    </div>
  );
};

export default ChatTheme;
