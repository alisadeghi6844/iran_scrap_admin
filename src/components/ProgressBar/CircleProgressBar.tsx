import React, { useEffect, useState, useMemo } from "react";
import { IoClose } from "react-icons/io5";
import { BsCloudDownload } from "react-icons/bs";
import { FaStop } from "react-icons/fa6";
import { FormatFileSize } from "../../utils/FormatFileSize";
import { FormatTime } from "../../utils/FormatTime";
import { FaArrowDown } from "react-icons/fa6";
import { HiOutlineDownload } from "react-icons/hi";


const CircleProgressBar = ({
  progress,
  status = "upload",
  size = "normal",
  statusIcon = "cloud",
  type = "normal",
  fileSize,
  duration,
  onClickDownload,
  downloadedSize,
  onClickStopDownload,
}: {
  progress?: any;
  status?: any;
  size?: any;
  statusIcon?: any;
  type?: any;
  fileSize?: any;
  duration?: any;
  onClickDownload?: any;
  downloadedSize?: any;
  onClickStopDownload?: any;
}) => {
  const radius = size === "small" ? 12 : type === "simple" ? 16 : 18;
  const strokeWidth = 2;
  const circumference = 2 * Math.PI * radius;

  const offset = useMemo(() => {
    if (status === "download") {
      return circumference;
    }

    if (status === "downloading" && progress === 0) {
      return circumference - (4 / 100) * circumference;
    }

    return circumference - (progress / 100) * circumference;
  }, [progress, status, circumference]);

  return (
    <div
      className="flex items-center gap-x-1 cursor-pointer"
      onClick={
        status === "download"
          ? onClickDownload
          : status === "downloading" || status === "upload"
          ? onClickStopDownload
          : null
      }
    >
      {(status === "download" || status === "downloading") &&
      size == "small" ? (
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-x-[2px]">
            {status === "downloading" ? (
              <div className="text-[11px]">
                {progress == 0 ? "0 بیت از" : FormatFileSize(downloadedSize)} /
              </div>
            ) : null}
            <div className="text-[11px]" style={{ fontWeight: 100 }}>
              {FormatFileSize(fileSize)}
            </div>
          </div>
          <div className="text-[11px]" style={{ fontWeight: 100 }}>
            {FormatTime(duration)}
          </div>
        </div>
      ) : null}
      <div
        className={`relative ${
          size === "small"
            ? "w-[32px] h-[32px]"
            : type === "simple"
            ? "w-[60px] h-[60px]"
            : status==="upload"?"w-[40px] h-[40px]":"w-[58px] h-[58px]"
        } ${
          type !== "simple" && "bg-[#000]"
        } rounded-full cursor-pointer bg-opacity-40`}
      >
        <svg
          className={`w-full h-full ${
            status === "downloading" ? "rotating-circle" : ""
          }`}
          style={{ transform: "rotate(-90deg)" }}
        >
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#000"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="opacity-0"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={type === "simple" ? "#64748b" : "white"}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {status === "download" ? (
            <>
              {statusIcon == "download" ? (
                <>
                  {type === "simple" ? (
                    <HiOutlineDownload className={"text-2xl text-primary-500"} />
                  ) : (
                    <FaArrowDown
                      className={
                        size === "small"
                          ? "text-[20px]"
                          : type === "simple"
                          ? "text-xl text-primary-500"
                          : "text-2xl text-white"
                      }
                    />
                  )}
                </>
              ) : (
                <>
                  {" "}
                  <BsCloudDownload
                    className={
                      size === "small" ? "text-[20px]" : "text-2xl text-white"
                    }
                  />
                </>
              )}
            </>
          ) : status === "downloading" ? (
            <>
              {statusIcon == "download" ? (
                <IoClose
                  className={
                    size === "small"
                      ? "text-[14px]"
                      : type === "simple"
                      ? "text-xl text-primary-500"
                      : "text-2xl text-white"
                  }
                />
              ) : (
                <FaStop
                  className={
                    size === "small" ? "text-[12px]" : "text-2xl text-white"
                  }
                />
              )}
            </>
          ) : (
            <IoClose
              className={
                size === "small"
                  ? "text-[14px]"
                  : type === "simple"
                  ? "text-xl text-primary-500"
                  : "text-2xl text-white"
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CircleProgressBar;
