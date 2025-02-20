import React, { useEffect, useRef, useState } from "react";
import ChatInput from "../ChatInput";
import ChatPage from "./ChatPage";
import ChatHeaderFeature from "../../../features/chat/header/ChatHeaderFeature";
import Button from "../../../../components/button";
import { FaAngleDown } from "react-icons/fa6";

interface ChatContainerTypes {
  params?: any;
}

const ChatContainer: React.FC<ChatContainerTypes> = (props) => {

  return (
    <div className="w-full h-full flex flex-col justify-end relative">
     <ChatHeaderFeature />
      <div
        className={`h-full relative w-full `}
      >
        <ChatPage />
      </div>
      <ChatInput />
    </div>
  );
};

export default ChatContainer;
