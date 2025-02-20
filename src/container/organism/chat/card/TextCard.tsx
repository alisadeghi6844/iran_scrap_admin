import React, { useEffect, useState } from "react";
import ChatInputRightIcon from "../../../../components/icon/custom/ChatInputRightIcon";
import VideoCard from "./VideoCard";
import RenderReplayTo from "./ReplayTo";
import RenderTimeAndCheckIcon from "./RenderTimeAndCheckIcon";
import ImageCard from "./ImageCard";
import DocumentCard from "./DocumentCard";
import { useSearchParams } from "react-router-dom";
import AIRenderMessage from "./AIRendermessage";

interface TextCardTypes {
  isCurrentUser?: boolean;
  message?: string;
  time?: any;
  replayTo?: any;
  className?: any;
  preview?: string;
  contentType?: string;
  fileName?: string;
  fileSize?: any;
  type?: string;
  progress?: string;
  uploadStatus?: any;
  duration?: any;
  fileId?: any;
}

const TextCard: React.FC<TextCardTypes> = (props) => {
  const {
    isCurrentUser,
    message,
    type,
    duration,
    preview,
    contentType,
    fileSize,
    time,
    replayTo,
    fileName,
    className,
    progress,
    uploadStatus,
    fileId,
    ...rest
  } = props;

  const isMediaContent = contentType === "image" || contentType === "video";
  const isTextContent = type === "text";
  const hasMessage = !!message;

  const textColorClass = isCurrentUser ? "text-black" : "text-black";
  const bgColorClass = isCurrentUser ? "bg-primary-300" : "bg-white";

  const [searchParams, setSearchParams] = useSearchParams();

  const renderContent = () => {
    if (isTextContent) {
      return (
        <>
          {searchParams.get("isChatBot") === "chatBot" ? (
            <>
            <AIRenderMessage message={message}/>
            </>
          ) : (
            <div className={`text-[15px] break-words ${textColorClass}`}>
              {message}
            </div>
          )}
        </>
      );
    }

    if (contentType === "video") {
      return (
        <VideoCard
          fileSize={fileSize}
          progress={progress}
          uploadStatus={uploadStatus}
          preview={preview}
          message={message}
          isCurrentUser={isCurrentUser}
          duration={duration}
          fileId={fileId}
        />
      );
    }

    if (contentType === "image") {
      return (
        <ImageCard
          fileSize={fileSize}
          progress={progress}
          uploadStatus={uploadStatus}
          preview={preview}
          message={message}
          isCurrentUser={isCurrentUser}
          duration={duration}
          fileId={fileId}
        />
      );
    }

    if (contentType === "document" || contentType === "archive") {
      return (
        <DocumentCard
          fileSize={fileSize}
          progress={progress}
          uploadStatus={uploadStatus}
          message={message}
          isCurrentUser={isCurrentUser}
          duration={duration}
          fileId={fileId}
          fileName={fileName}
        />
      );
    }

    return null;
  };

  return (
    <div
      {...rest}
      className={`flex text-card h-auto ${className} ${
        isCurrentUser ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`${isTextContent ? "w-auto max-w-[70%]" : "w-auto"} ${
          isMediaContent && !hasMessage
            ? "max-w-[40%] min-w-[25%] w-full border-2 border-primary-300 rounded-lg"
            : `p-2 pb-6 ${bgColorClass}`
        } text-box text-[14px] relative min-w-[80px] ${
          replayTo ? "pt-[60px]" : ""
        }`}
      >
        <div
          className={`absolute sender-icon  ${
            isCurrentUser
              ? `${
                  isMediaContent && !hasMessage
                    ? "-right-[16px] -bottom-[9px]"
                    : "-right-[13px] -bottom-[7px]"
                }  rotate-[360deg]`
              : `${
                  isMediaContent && !hasMessage
                    ? "-left-[16px] -bottom-[9px]"
                    : "-left-[13px] -bottom-[7px]"
                }   rotate-y-180`
          }`}
        >
          <ChatInputRightIcon
            variant={
              isMediaContent && !hasMessage
                ? "primary"
                : isCurrentUser
                ? "primary"
                : "default"
            }
          />
        </div>

        {RenderReplayTo({ replayTo })}
        {renderContent()}
        {RenderTimeAndCheckIcon({ isCurrentUser, time, contentType, message })}
      </div>
    </div>
  );
};

export default TextCard;
