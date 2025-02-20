import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { FaPen } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineSound } from "react-icons/ai";
import Typography from "../../../../components/typography/Typography";
import { RiGroupLine } from "react-icons/ri";
import { GoPerson } from "react-icons/go";
import NewChatFeature from "../../../features/chat/draver/NewChatFeature";
import CurrentChatFeature from "../../../features/chat/draver/CurrentChatFeature";
import Modal from "../../../../components/modal";
import NewChannelFeature from "../../../features/chat/draver/NewChannelFeature";

const ChatDraver = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [draverStatus, setDraverStatus] = useState<string>("currentChats");
  const [searchValue, setSearchValue] = useState<string>("");
  const [isCreateChannel, setIsCreateChannel] = useState<boolean>(false);

  useEffect(() => {
    setSearchValue("");
  }, [draverStatus]);

  return (
    <>
      <div
        className="bg-white fixed w-[25%] top-0 right-0 h-full group bounce-group border-l border-gray-100"
        onMouseLeave={() => setOpen(false)}
      >
        <div className="px-6 pt-7 relative">
          <div className=" flex items-center gap-x-6">
            <div
              onClick={() => setDraverStatus("currentChats")}
              className={`hamburger ${
                draverStatus !== "currentChats" ? "open" : ""
              }`}
            >
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>

            <div className="relative w-full">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <IoSearchSharp className="text-2xl text-gray-700" />
              </div>
              <input
                onChange={(e: any) => setSearchValue(e.target.value)}
                value={searchValue}
                placeholder={
                  draverStatus === "currentChats"
                    ? "جست و جو در گفت و گوها"
                    : "جست و جو در مخاطبین"
                }
                type="text"
                className="w-full outline-none rounded-2xl bg-gray-100 p-3"
              />
            </div>
          </div>
        </div>
        <div className="w-full h-full scroll-container">
          {draverStatus === "currentChats" ? (
            <CurrentChatFeature />
          ) : draverStatus === "newChat" ? (
            <NewChatFeature
              draverStatus={draverStatus}
              searchValue={searchValue}
            />
          ) : (
            <CurrentChatFeature />
          )}
        </div>
        <div
          onClick={() => setOpen((prev: boolean) => !prev)}
          className={`absolute left-4 -bottom-16 w-[56px] h-[56px] bounce z-30 rounded-full flex justify-center items-center bg-primary-500 text-white text-xl cursor-pointer transition-all duration-300 group-hover:bottom-4`}
        >
          {open ? <AiOutlineClose className="text-2xl" /> : <FaPen />}
        </div>
        <div
          style={{
            boxShadow: " 0 .25rem .5rem .125rem rgb(114, 114, 114, 0.251)",
          }}
          className={`p-2 flex-col rounded-lg bg-white min-w-[200px] z-[40] min-h-[100px] h-auto w-auto absolute bottom-20 left-4 ${
            open ? "flex" : "hidden"
          }`}
        >
          <div
            onClick={() => setIsCreateChannel(true)}
            className="flex items-center gap-x-3 cursor-pointer p-2 transition-all hover:bg-gray-100 rounded-lg"
          >
            <div>
              <AiOutlineSound className="text-xl text-gray-600" />
            </div>
            <Typography className="text-gray-900 text-[15px] font-bold">
              کانال جدید
            </Typography>
          </div>
          <div className="flex items-center gap-x-3 cursor-pointer p-2 transition-all hover:bg-gray-100 rounded-lg">
            <div>
              <RiGroupLine className="text-xl text-gray-600" />
            </div>
            <Typography className="text-gray-900 text-[15px] font-bold">
              گروه جدید
            </Typography>
          </div>
          <div
            onClick={() => setDraverStatus("newChat")}
            className="flex items-center gap-x-3 cursor-pointer p-2 transition-all hover:bg-gray-100 rounded-lg"
          >
            <div>
              <GoPerson className="text-xl text-gray-600" />
            </div>
            <Typography className="text-gray-900 text-[15px] font-bold">
              شروع گفت و گو
            </Typography>
          </div>
        </div>
      </div>
      <Modal
      size="md"
        open={isCreateChannel}
        onClose={() => setIsCreateChannel(false)}
      >
        <NewChannelFeature/>
      </Modal>
    </>
  );
};
export default ChatDraver;
