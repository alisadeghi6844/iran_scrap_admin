import { useLocation, useSearchParams } from "react-router-dom";
import ChatContainer from "../../../container/organism/chat/container/ChatContainer";
import { useSocket } from "../../../context/SocketContext";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectGetCurrentUserData } from "../../../redux/slice/account/AccountSlice";

const ChatDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get("userId") || "";
  const currentUserData: any = useSelector(selectGetCurrentUserData);

  const socket: any = useSocket();

  useEffect(() => {
    if (socket && currentUserData?._id) {
      const emitUserChat = () => {
        if (socket.connected) {
          socket.emit("callOnlineContactUsers", {
            userId: currentUserData._id,
          });
        } else {
          console.warn(
            "Socket is not connected. Unable to emit callOnlineContactUsers."
          );
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

  return (
    <div
      className="background w-full h-full"
      style={{
        backgroundImage: "url('/images/chat/bg_chat.jpg')",
      }}
    >
      {userId ? (
        <div className="pt-[116px] px-[5%] w-full max-h-[100vh] h-full pb-4">
          <ChatContainer params={searchParams} />
        </div>
      ) : null}
    </div>
  );
};

export default ChatDashboard;
