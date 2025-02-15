import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { selectGetCurrentUserData } from "../redux/slice/account/AccountSlice";
import {
  getCurrentChatsAction,
  getMessagesAction,
  removeMessagesAction,
  socketGetOnlineContactUserAction,
  socketIsTypingAction,
  socketProgressUploadAction,
} from "../redux/actions/chat/socket/SocketActions";
import { GetToken } from "../api/getToken";
import { socketProgressDownloadAction, socketStopDownloadAction } from "../redux/actions/chat/socket/DownloadActions";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

const useSocketConnection = (userData: any) => {
  const socketRef: any = useRef(null);
  const dispatch: any = useDispatch();
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    let reconnectTimer;

    const setupSocket = () => {
      if (!userData?._id || isConnecting) return;

      try {
        setIsConnecting(true);

        if (socketRef.current) {
          socketRef.current.disconnect();
        }

        socketRef.current = io("http://localhost:3030", {
          withCredentials: true,
          auth: {
            token: GetToken("token"), // یا هر جایی که توکن رو ذخیره می‌کنید
          },
          transports: ["websocket"],
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          reconnectionAttempts: 5,
          timeout: 20000,
          autoConnect: false,
          forceNew: true,
        });

        // تنظیم event listeners قبل از اتصال
        socketRef.current.on("connect", () => {
          setIsConnecting(false);
        });

        socketRef.current.on("connect_error", (error: any) => {
          console.error("Connection error:", error);
          setIsConnecting(false);

          // تلاش مجدد بعد از خطا
          reconnectTimer = setTimeout(() => {
            setupSocket();
          }, 3000);
        });

        socketRef.current.on("disconnect", (reason: any) => {

          setIsConnecting(false);

          if (reason === "io server disconnect") {
            // اتصال مجدد در صورت قطع شدن از سمت سرور
            reconnectTimer = setTimeout(() => {
              setupSocket();
            }, 1000);
          }
        });

        const handleReciveMessage = (message: any) => {
          if (
            userData._id === message.sender ||
            userData._id === message.recipient
          ) {

            dispatch(getMessagesAction(message));
          }
          socketRef.current.emit("callUserChat", {
            userId: userData._id,
          });
        };

        const hanldeRemoveMessage =(messageId:string)=>{
          dispatch(removeMessagesAction(messageId))
        }

        const handleUploadProgress = ({
          progress,
          chunkNumber,
        }: {
          progress: number;
          chunkNumber: number;
        }) => {
          setTimeout(() => {
            dispatch(socketProgressUploadAction(progress));
          }, 0);
        };

        const handleGetCurrentChats = (data: any) => {
          dispatch(getCurrentChatsAction(data?.data));
        };
        const getUserIsTyping = (data: any) => {
          dispatch(socketIsTypingAction(data));
        };

        const getOnlineContactUsers = (data: any) => {
          dispatch(socketGetOnlineContactUserAction(data));
        };

        const downloadProgressBar = (data: any) => {
          dispatch(socketProgressDownloadAction(data));
        };

        const handleStopDownload =(data:any)=>{
          dispatch(socketStopDownloadAction(data));
        }


        socketRef.current.on("reciveMessage", handleReciveMessage);
        socketRef.current.on("deleteMessage",hanldeRemoveMessage);
        socketRef.current.on("uploadProgress", handleUploadProgress);
        socketRef.current.on("getCurrentChats", handleGetCurrentChats);
        socketRef.current.on("user:typing", getUserIsTyping);
        socketRef.current.on("onlineContactUsers", getOnlineContactUsers);
        socketRef.current.on("downloadProgress", downloadProgressBar); 
        socketRef.current.on("downloadStopped", handleStopDownload); 

        // شروع اتصال بعد از تنظیم همه event listeners
        socketRef.current.connect();

        return () => {
          clearTimeout(reconnectTimer);
          if (socketRef.current) {
            socketRef.current.off("reciveMessage", handleReciveMessage);
            socketRef.current.off("deleteMessage",hanldeRemoveMessage);
            socketRef.current.off("uploadProgress", handleUploadProgress);
            socketRef.current.off("getCurrentChats", handleGetCurrentChats);
            socketRef.current.off("user:typing", getUserIsTyping);
            socketRef.current.off("onlineContactUsers", getOnlineContactUsers);
            socketRef.current.off("downloadProgress", downloadProgressBar);
            socketRef.current.off("downloadStopped", handleStopDownload);
            socketRef.current.disconnect();
          }
        };
      } catch (error) {
        console.error("Socket setup error:", error);
        setIsConnecting(false);
      }
    };

    setupSocket();

    return () => {
      clearTimeout(reconnectTimer);
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [userData, dispatch]);

  return socketRef.current;
};

export const SocketProvider = ({ children }) => {
  const userData = useSelector(selectGetCurrentUserData);
  const socket = useSocketConnection(userData);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (socket) {
      const handleConnect = () => setIsConnected(true);
      const handleDisconnect = () => setIsConnected(false);

      socket.on("connect", handleConnect);
      socket.on("disconnect", handleDisconnect);

      // تنظیم وضعیت اولیه
      setIsConnected(socket.connected);

      return () => {
        socket.off("connect", handleConnect);
        socket.off("disconnect", handleDisconnect);
      };
    }
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
