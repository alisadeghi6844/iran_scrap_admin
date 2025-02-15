import moment from "jalali-moment";
import TextCard from "../card/TextCard";
import { getHourAndMinute } from "../../../../utils/MomentConvertor";
import { useEffect } from "react";

interface RenderMessagesTypes {
  isTyping?: boolean;
  data?: any;
  currentUserData?: any;
  userId?: string | null;
  myData?: any; // myData به عنوان ورودی کامپوننت
  uploadProgress?: any;
}

export const renderMessages: React.FC<RenderMessagesTypes> = ({
  data,
  currentUserData,
  userId,
  myData,
  uploadProgress, // اضافه کردن uploadProgress به ورودی
}) => {
  let lastDate: string | null = null;

  return data
    ?.slice()
    ?.reverse()
    .map((message: any, index: number) => {
      const messageDate = moment
        .utc(message?.updatedAt)
        .locale("fa")
        .format("dddd, D MMM YYYY");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div
          className={
            message.sender === myData?._id
              ? "current-text-card"
              : "owner-text-card"
          }
          key={message?._id}
        >
          {showDate && (
            <div className="text-center flex items-center justify-center">
              <div className="p-2 rounded-xl bg-white bg-opacity-60 backdrop-blur text-[12.6px] mb-2">
                {lastDate}
              </div>
            </div>
          )}
          {currentUserData?.data?._id &&
            (userId === message.sender || userId === message.recipient) &&
            renderDMMessages(message, myData, uploadProgress)}
        </div>
      );
    });
};

const renderDMMessages = (message: any, myData: any, uploadProgress: any) => {
  const messageType = message.messageType;


  return (
    <>
      {messageType === "text" && message.content?.text ? (
        <TextCard
          type="text"
          message={message.content.text}
          time={getHourAndMinute(message.updatedAt)}
          isCurrentUser={message.sender === myData?._id}
        />
      ) : messageType === "file" ? (
        <TextCard
          type="file"
          message={message.content.text}
          duration={message.content.duration}
          preview={message.content.preview}
          fileName={message.content.fileName}
          fileSize={message.content.fileSize}
          uploadStatus={message.content.uploadStatus}
          fileId={message.content.fileId}
          progress={
            message.content.fileId === uploadProgress?.fileId
              ? uploadProgress?.progress
              : null
          }
          contentType={message.content.contentType}
          time={getHourAndMinute(message.createdAt)}
          isCurrentUser={message.sender === myData?._id}
        />
      ) : null}
    </>
  );
};
