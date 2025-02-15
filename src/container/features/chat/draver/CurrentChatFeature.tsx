import { useDispatch, useSelector } from "react-redux";
import CurrentChats from "../../../organism/chat/chatDraver/CurrentChats";
import { useEffect, useState } from "react";
import { useSocket } from "../../../../context/SocketContext";
import { selectGetCurrentUserData } from "../../../../redux/slice/account/AccountSlice";
import {
  selectCurrentChatsData,
  selectSocketIsTypingData,
} from "../../../../redux/slice/chat/socket/socketSlice";

const CurrentChatFeature = () => {
  const currentChatData = useSelector(selectCurrentChatsData);
  const currentUserData: any = useSelector(selectGetCurrentUserData);
  const socket: any = useSocket();
  const userIsTypingData = useSelector(selectSocketIsTypingData);

  const [isTypingUsers, setIsTypingUsers] = useState<any>([]);

  useEffect(() => {
    if (socket && currentUserData?._id) {
      const emitUserChat = () => {
        if (socket.connected) {
          socket.emit("callUserChat", {
            userId: currentUserData._id,
          });
        } else {
          console.warn("Socket is not connected. Unable to emit callUserChat.");
        }
      };

      emitUserChat();

      const handleConnect = () => {
        emitUserChat();
      };

      socket.on("connect", handleConnect);

      // cleanup function
      return () => {
        socket.off("connect", handleConnect);
      };
    }
  }, [currentUserData, socket]);

  useEffect(() => {
    if (userIsTypingData?.isTyping) {
      setIsTypingUsers([...isTypingUsers, userIsTypingData]);
    } else {
      const senderId = userIsTypingData?.senderId;
      const array = isTypingUsers?.filter(
        (item: any) => item?.senderid !== senderId
      );
      setIsTypingUsers(array);
    }
  }, [userIsTypingData]);
  return (
    <div>
      <CurrentChats
        isTypingUsers={isTypingUsers}
        currentChatData={currentChatData}
      />
    </div>
  );
};

export default CurrentChatFeature;
