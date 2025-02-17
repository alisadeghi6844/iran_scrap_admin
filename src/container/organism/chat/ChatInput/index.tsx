import React, { useRef, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import ChatInputRightIcon from "../../../../components/icon/custom/ChatInputRightIcon";
import OutsideClickHandler from "react-outside-click-handler";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import EmojiIcon from "../../../../components/icon/custom/EmojiIcon";
import AttachmentsButton from "./AttachmentsButton";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { selectGetCurrentUserData } from "../../../../redux/slice/account/AccountSlice";
import { useSocket } from "../../../../context/SocketContext";
import useDebounce from "../../../../hooks/UseDebounce";
import { delay_stop_is_typing } from "../../../../config/chat";
import Modal from "../../../../components/modal";
import FileUpload from "../../../features/chat/fileUpload/FileUpload";

const ChatInput = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPickerOpen, setPickerOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openAttachModal, setOpenAttachModal] = useState(false);
  const [attachType, setAttachType] = useState("");

  const currentUserData = useSelector(selectGetCurrentUserData);

  const socket: any = useSocket();

  const togglePicker = () => {
    setPickerOpen((prev: boolean) => !prev);
  };
  const onEmojiClick = (emojiData: EmojiClickData) => {
    const emoji = emojiData.emoji;
    const cursorPosition = inputRef.current?.selectionStart || 0;
    const textBeforeCursor = inputValue.slice(0, cursorPosition);
    const textAfterCursor = inputValue.slice(cursorPosition);

    setInputValue(textBeforeCursor + emoji + textAfterCursor);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        const newCursorPosition = cursorPosition + emoji.length;
        inputRef.current.setSelectionRange(
          newCursorPosition,
          newCursorPosition
        );
      }
    }, 0);
  };

  const handleSendMessage = (e: any) => {
    const isChatBot = searchParams.get("isChatBot")
    e.preventDefault();
    if (currentUserData._id && searchParams.get("userId")) {
      if (inputValue?.length) {
        socket.emit("sendMessage", {
          sender: currentUserData._id,
          isChatBot:isChatBot=="chatBot",
          content: {
            text: inputValue,
            contentType: "text",
          },
          recipient: searchParams.get("userId"),
          messageType: "text",
        });
        setInputValue("");
      }
    }
  };
  const handleTypeInput = (e: any) => {
    setInputValue(e.target.value);
    socket.emit("typing:start", {
      senderId: currentUserData._id,
      receiverId: searchParams.get("userId"),
    });
  };

  const delay = delay_stop_is_typing;
  useDebounce(
    () => {
      socket.emit("typing:stop", {
        senderId: currentUserData._id,
        receiverId: searchParams.get("userId"),
      });
    },
    [inputValue],
    delay
  );
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage(e);
    }
  };
  return (
    <form
      className="w-full flex items-center justify-center gap-x-2"
      onSubmit={handleSendMessage}
    >
      <Modal
        size="md"
        open={openAttachModal}
        onClose={() => setOpenAttachModal(false)}
      >
        <FileUpload  onClose={() => setOpenAttachModal(false)} openAttachModal={openAttachModal} attachType={attachType} />
      </Modal>
      <button
        type="submit"
        className="w-[54px] h-[54px] rounded-full flex justify-center items-center bg-white transition-all text-primary-500 cursor-pointer hover:bg-primary-500 hover:text-white"
      >
        <BsFillSendFill className="text-2xl mt-[2px] mr-[2px]" />
      </button>
      <div className="w-full relative flex-1">
        <div className="-right-[14px] -bottom-[6.5px] absolute">
          <ChatInputRightIcon />
        </div>
        <input
        onKeyPress={handleKeyPress}
          ref={inputRef}
          value={inputValue}
          onChange={(e: any) => {
            handleTypeInput(e);
          }}
          placeholder="پیامی بنویسید ......"
          className="w-full bg-white  rounded-tr-xl py-[18px] outline-none px-14"
        />
        <div className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2">
          <div onClick={togglePicker}>
            <EmojiIcon />
          </div>
          {isPickerOpen && (
            <OutsideClickHandler
              onOutsideClick={() => {
                setPickerOpen(false);
              }}
            >
              <div
                className="absolute bottom-12 -left-20 z-10"
                style={{ direction: "ltr" }}
              >
                <EmojiPicker
                  onEmojiClick={onEmojiClick}
                  autoFocusSearch={false}
                  width={300}
                  height={400}
                />
              </div>
            </OutsideClickHandler>
          )}
        </div>
      </div>
      <AttachmentsButton
        onClickAttachment={(e: any) => {
          setOpenAttachModal(true);
          setAttachType(e);
        }}
      />
    </form>
  );
};
export default ChatInput;
