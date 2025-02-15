import Avatar from "../../../../components/avatar";
import { IoClose } from "react-icons/io5";
import { FiMoreVertical } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { HiPhone } from "react-icons/hi2";
import { Tooltip } from "react-tooltip";
import { getPersianTimeFromNow } from "../../../../utils/MomentConvertor";
import { useSearchParams } from "react-router-dom";
import { useSocket } from "../../../../context/SocketContext";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectSocketIsTypingData,
  selectSocketOnlineContactUserData,
} from "../../../../redux/slice/chat/socket/socketSlice";

interface ChatHeaderTypes {
  userData?: any;
  loading?: boolean;
}

const ChatHeader: React.FC<ChatHeaderTypes> = (props) => {
  const { userData, loading } = props;

  const [searchParams, setSearchParams] = useSearchParams();
  const [isTyping, setIsTyping] = useState(false);
  const [isOnlineUser, setIsOnlineUser] = useState(false);

  const userIsTypingData = useSelector(selectSocketIsTypingData);
  const onlineUsers = useSelector(selectSocketOnlineContactUserData);

  const handleCloseChat = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("userId");
    setSearchParams(params);
  };

  useEffect(() => {
    setIsTyping(false);
    if (userIsTypingData?.userId === searchParams.get("userId")) {
      setIsTyping(userIsTypingData?.isTyping);
    }
  }, [userIsTypingData, searchParams.get("userId")]);

  useEffect(() => {
    if (userData?.user?.length) {
      const findUser = onlineUsers?.onlineContactUsers?.find(
        (item: any) => item?._id === userData?.user[0]?._id
      );
      if (findUser) {
        setIsOnlineUser(true);
      } else {
        setIsOnlineUser(false);
      }
    }
  }, [onlineUsers, userData]);

  return (
    <>
      {userData && userData?.user?.length ? (
        <div className="bg-white bg-opacity-60 backdrop-blur-md border z-40 border-white rounded-2xl absolute w-full -top-7 right-0 px-6 py-2 flex items-center justify-between">
          <div>
            <Avatar
              size="md"
              isTyping={isTyping}
              image={
                userData?.user[0]?.image?.length
                  ? userData?.user[0]?.image?.file
                  : null
              }
              title={`${userData?.user[0]?.firstName} ${userData?.user[0]?.lastName}`}
              isOnline={isOnlineUser}
              description={`${
                isOnlineUser
                  ? ""
                  : `آخرین بازدید ${
                      getPersianTimeFromNow(userData?.lastSeen).timeFromNow
                    }`
              }`}
            />
          </div>
          <div className="flex items-center gap-x-2 flex-row-reverse">
            <div
              onClick={handleCloseChat}
              data-tooltip-id="close_chat"
              data-tooltip-content="بستن گفت و گو"
              className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center text-xl text-gray-700 transition-all hover:bg-gray-200 cursor-pointer"
            >
              <IoClose />
            </div>
            <Tooltip id="close_chat" place="bottom" />
            <div
              data-tooltip-id="options"
              data-tooltip-content="گزینه های گفت و گو"
              className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center text-xl text-gray-700 transition-all hover:bg-gray-200 cursor-pointer"
            >
              <FiMoreVertical />
            </div>
            <Tooltip id="options" place="bottom" />
            <div
              data-tooltip-id="search"
              data-tooltip-content="جست و جو"
              className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center text-xl text-gray-700 transition-all hover:bg-gray-200 cursor-pointer"
            >
              <FiSearch />
            </div>
            <Tooltip id="search" place="bottom" />
            <div
              data-tooltip-id="voice_call"
              data-tooltip-content="تماس صوتی"
              className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center text-xl text-gray-700 transition-all hover:bg-gray-200 cursor-pointer"
            >
              <HiPhone />
            </div>
            <Tooltip id="voice_call" place="bottom" />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ChatHeader;
