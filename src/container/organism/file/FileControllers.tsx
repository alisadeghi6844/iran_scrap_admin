import { MdClose } from "react-icons/md";
import { HiOutlineZoomIn } from "react-icons/hi";
import { HiOutlineZoomOut } from "react-icons/hi";
import { MdOutlineFileDownload } from "react-icons/md";
import { RiShareForwardFill } from "react-icons/ri";
import { LuTrash2 } from "react-icons/lu";
import Avatar from "../../../components/avatar";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSocketIsTypingData,
  selectSocketOnlineContactUserData,
} from "../../../redux/slice/chat/socket/socketSlice";
import { selectGetContactByIdData } from "../../../redux/slice/chat/users/UsersChatSlice";
import { getPersianTimeFromNow } from "../../../utils/MomentConvertor";
import { runFileDataAction } from "../../../redux/actions/chat/socket/DownloadActions";

const FileControllers = (props: any) => {
  const { type, setZoomFile, handleDownloadFile } = props;
  const [isTyping, setIsTyping] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isZoom, setIsZoom] = useState(false);

  const dispatch: any = useDispatch();

  const userIsTypingData = useSelector(selectSocketIsTypingData);
  const onlineUsers = useSelector(selectSocketOnlineContactUserData);
  const getUserData = useSelector(selectGetContactByIdData);
  const [isOnlineUser, setIsOnlineUser] = useState(false);

  useEffect(() => {
    if (getUserData?.data?.user?.length) {
      const findUser = onlineUsers?.onlineContactUsers?.find(
        (item: any) => item?._id === getUserData?.data?.user[0]?._id
      );
      if (findUser) {
        setIsOnlineUser(true);
      } else {
        setIsOnlineUser(false);
      }
    }
  }, [onlineUsers, getUserData?.data]);

  useEffect(() => {
    setIsTyping(false);
    if (userIsTypingData?.userId === searchParams.get("userId")) {
      setIsTyping(userIsTypingData?.isTyping);
    }
  }, [userIsTypingData, searchParams.get("userId")]);

  const handleCloseFile = () => {
    dispatch(runFileDataAction({}));
  };

  const handleZoom = () => {
    setIsZoom((prev: any) => !prev);
  };

  useEffect(() => {
    setZoomFile && setZoomFile(isZoom);
  }, [isZoom]);

  return (
    <div className="fixed top-0 right-0 z-[999] w-full h-[80px] bg-black bg-opacity-70">
      <div className="h-full w-full flex justify-between items-center px-6">
        <div>
          <Avatar
            variant="secondary"
            size="md"
            isTyping={isTyping}
            image={
              getUserData?.data?.user[0]?.image?.length
                ? getUserData?.data?.user[0]?.image?.file
                : null
            }
            title={`${getUserData?.data?.user[0]?.firstName} ${getUserData?.data?.user[0]?.lastName}`}
            isOnline={isOnlineUser}
            description={`${
              isOnlineUser
                ? ""
                : `آخرین بازدید ${
                    getPersianTimeFromNow(getUserData?.data?.lastSeen)
                      .timeFromNow
                  }`
            }`}
          />
        </div>
        <div className="flex items-center gap-x-5">
          <div className="cursor-pointer" onClick={handleCloseFile}>
            <MdClose className="text-gray-500 duration-300 hover:text-white transition-all text-[34px]" />
          </div>
          <div onClick={handleZoom} className="cursor-pointer">
            {isZoom ? (
              <HiOutlineZoomOut className="text-gray-500 duration-300 hover:text-white transition-all text-[34px]" />
            ) : (
              <HiOutlineZoomIn className="text-gray-500 duration-300 hover:text-white transition-all text-[34px]" />
            )}
          </div>
          <div
            onClick={() => {
              handleDownloadFile && handleDownloadFile();
            }}
            className="cursor-pointer"
          >
            <MdOutlineFileDownload className="text-gray-500 duration-300 hover:text-white transition-all text-[34px]" />
          </div>

          <div className="cursor-pointer">
            <RiShareForwardFill className="text-gray-500 duration-300 hover:text-white transition-all text-[32px]" />
          </div>

          <div className="cursor-pointer">
            <LuTrash2 className="text-gray-500 duration-300 hover:text-white transition-all text-[29px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileControllers;
