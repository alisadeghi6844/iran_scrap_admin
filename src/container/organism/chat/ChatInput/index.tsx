import React, { useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";

import OutsideClickHandler from "react-outside-click-handler";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import AttachmentsButton from "./AttachmentsButton";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { selectGetCurrentUserData } from "../../../../redux/slice/account/AccountSlice";
import { useSocket } from "../../../../context/SocketContext";
import useDebounce from "../../../../hooks/UseDebounce";
import { delay_stop_is_typing } from "../../../../config/chat";
import Modal from "../../../../components/modal";
import FileUpload from "../../../features/chat/fileUpload/FileUpload";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { BsEmojiSmile } from "react-icons/bs";
import { RiAiGenerate } from "react-icons/ri";

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
    const isChatBot = searchParams.get("isChatBot");
    e.preventDefault();
    if (
      currentUserData._id &&
      searchParams.get("userId") &&
      inputValue?.length
    ) {
      if (inputValue?.length) {
        socket.emit("sendMessage", {
          sender: currentUserData._id,
          isChatBot: isChatBot == "chatBot",
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
    if (e.key === "Enter") {
      handleSendMessage(e);
    }
  };
  return (
    <div>
      <form
        className="w-full flex items-center justify-center gap-x-2"
        onSubmit={handleSendMessage}
      >
        <Modal
          size="md"
          open={openAttachModal}
          onClose={() => setOpenAttachModal(false)}
        >
          <FileUpload
            onClose={() => setOpenAttachModal(false)}
            openAttachModal={openAttachModal}
            attachType={attachType}
          />
        </Modal>
        <div className="w-full relative flex-1">
          <textarea
            ref={inputRef}
            onKeyPress={handleKeyPress}
            value={inputValue}
            onChange={handleTypeInput}
            placeholder={
              searchParams?.get("isChatBot") === "chatBot"
                ? "هر سوالی داری بپرس..."
                : "پیام خود را بنویسید ..."
            }
            className="w-full bg-white border text-md border-transparent rounded-t-lg p-3 -mb-2 outline-none resize-none min-h-[50px] max-h-[160px] overflow-y-auto"
            rows={1} // تنظیم تعداد ردیف‌های اولیه
            style={{
              height: inputValue
                ? `${inputRef.current.scrollHeight}px`
                : "50px",
            }}
            spellCheck="true"
          />
          <div className="w-full bg-white h-[48px] rounded-b-lg border-t z-20 relative border-gray-300 flex items-center p-3 justify-between">
            <div>
              <button
                type="submit"
                className={`w-[37px] h-[37px] rounded-full flex justify-center items-center transition-all ${
                  inputValue?.length
                    ? "bg-primary-500 cursor-pointer text-white"
                    : "text-white bg-gray-400 cursor-not-allowed"
                }`}
              >
                <IoMdSend className="text-[24px] ml-1" />
              </button>
            </div>
            <div className="flex items-center gap-x-4 flex-row-reverse">
              <AttachmentsButton
                onClickAttachment={(e: any) => {
                  setOpenAttachModal(true);
                  setAttachType(e);
                }}
              />
              <MdOutlineKeyboardVoice
                data-tooltip-id="voice_button"
                data-tooltip-content="ورودی صوتی"
                className="text-[26px] text-[#A1A1A1] transition-all hover:text-primary-500 cursor-pointer outline-none"
              />
              <Tooltip id="voice_button" />
              <div
                onClick={togglePicker}
                data-tooltip-id="emoji_button"
                data-tooltip-content="اموجی"
              >
                <BsEmojiSmile className="text-[26px] text-[#A1A1A1] transition-all hover:text-primary-500 cursor-pointer" />
              </div>
              <Tooltip id="emoji_button" />
              {isPickerOpen && (
                <OutsideClickHandler
                  onOutsideClick={() => {
                    setPickerOpen(false);
                  }}
                >
                  <div
                    className="absolute bottom-12 -mr-[10%] z-10"
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
              <RiAiGenerate
                data-tooltip-id="AI_button"
                data-tooltip-content="اصلاح متن با هوش مصنوعی"
                className={`text-[26px] text-[#A1A1A1] transition-all outline-none  ${
                  inputValue?.length
                    ? "cursor-pointer hover:text-primary-500"
                    : " cursor-not-allowed"
                }`}
              />
              <Tooltip id="AI_button" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
