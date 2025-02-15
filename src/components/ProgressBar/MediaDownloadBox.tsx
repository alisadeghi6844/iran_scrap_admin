import { useEffect, useState } from "react";
import CircleProgressBar from "./CircleProgressBar";
import { FaPlay } from "react-icons/fa6";

import { BsCloudDownload } from "react-icons/bs";
import { FaStop } from "react-icons/fa";

const MediaDownloadBox = ({
  fileSize,
  mode = "normal",
  duration,
  onClickDownload,
  startDownload,
  downloadedSize,
  progress = 0,
  isDownload = false,
  onClickStopDownload,
}: {
  fileSize: any;
  mode?:any;
  duration?: any;
  onClickDownload?: any;
  startDownload?: any;
  progress?: any;
  preview?: any;
  downloadedSize?: any;
  isDownload?: any;
  onClickStopDownload?: any;
}) => {
  const [status, setStatus] = useState("download");
  const [realDownload, setRealDownload] = useState(false);

  useEffect(() => {
    if (startDownload) {
      setStatus("downloading");
    } else {
      setStatus("download");
    }
  }, [startDownload]);

  useEffect(() => {
    if (progress > 99) {
      setRealDownload(true);
    }
  }, [progress]);

  return (
    <div>
      {mode === "image" ? (
        <>
          {" "}
          <div className="absolute w-[58px] h-[58px] rounded-full bg-black bg-opacity-50 top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 cursor-pointer flex items-center justify-center">
            <CircleProgressBar
              progress={progress}
              onClickStopDownload={onClickStopDownload}
              onClickDownload={onClickDownload}
              status={status}
              statusIcon="download"
            />
          </div>
        </>
      ) : mode === "document" || mode === "archive" ? (
        <>
          {" "}
          <div className="w-[24px] h-[24px] cursor-pointer flex items-center justify-center z-50">
            <CircleProgressBar
              type={"simple"}
              progress={progress}
              onClickStopDownload={onClickStopDownload}
              onClickDownload={onClickDownload}
              status={status}
              statusIcon="download"
            />
          </div>
        </>
      ) : (
        <>
          {!isDownload ? (
            !realDownload ? (
              <>
                <div className="bg-black bg-opacity-50 rounded-lg px-[5px] py-[3px] text-white absolute top-1 left-1 z-30 flex items-center gap-x-2">
                  <CircleProgressBar
                    onClickStopDownload={onClickStopDownload}
                    onClickDownload={onClickDownload}
                    duration={duration}
                    fileSize={fileSize}
                    size="small"
                    downloadedSize={downloadedSize}
                    status={status}
                    progress={progress}
                  />
                </div>
                <div className="absolute w-[58px] h-[58px] rounded-full bg-black bg-opacity-50 top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 cursor-pointer flex items-center justify-center">
                  {status === "download" ? (
                    <BsCloudDownload className="text-2xl text-white " />
                  ) : (
                    <FaStop className="text-2xl text-white " />
                  )}
                </div>
              </>
            ) : (
              <div className="absolute w-[58px] h-[58px] rounded-full bg-black bg-opacity-50 top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 cursor-pointer flex items-center justify-center">
                <FaPlay className="text-2xl text-white ml-1" />
              </div>
            )
          ) : (
            <div className="absolute w-[58px] h-[58px] rounded-full bg-black bg-opacity-50 top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 cursor-pointer flex items-center justify-center">
              <FaPlay className="text-2xl text-white ml-1" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MediaDownloadBox;
