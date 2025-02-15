import { useEffect, useState, useCallback } from "react";
import Image from "../../../../components/image";
import CircleProgressBar from "../../../../components/ProgressBar/CircleProgressBar";
import MediaDownloadBox from "../../../../components/ProgressBar/MediaDownloadBox";
import { useSocket } from "../../../../context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { selectSocketProgressDownloadData } from "../../../../redux/slice/chat/socket/socketSlice";
import {
  checkFileExistsInDatabase,
  createFileDownloader,
  getFileMetadata,
} from "../../../../DB";
import { runFileDataAction } from "../../../../redux/actions/chat/socket/DownloadActions";

const VideoCard = ({
  message,
  preview,
  isCurrentUser,
  uploadStatus,
  progress,
  fileSize,
  duration,
  fileId,
}: {
  message: any;
  fileSize?: any;
  preview: any;
  isCurrentUser: any;
  progress: any;
  uploadStatus?: any;
  duration?: any;
  fileId?: any;
}) => {
  const socket: any = useSocket();
  const fileDownloadProgress = useSelector(selectSocketProgressDownloadData);
  const dispatch: any = useDispatch();

  const [isDownloading, setIsDownloading] = useState(false);
  const [fileMetadata, setFileMetadata] = useState<any>(null);
  const [downloader, setDownloader] = useState<any>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  // ایجاد نمونه دانلودر در اولین رندر
  useEffect(() => {
    if (socket && !downloader) {
      const downloaderInstance = createFileDownloader(socket);
      setDownloader(downloaderInstance);
    }
  }, [socket]);

  // بررسی وضعیت فایل در دیتابیس
  useEffect(() => {
    const checkFile = async () => {
      if (fileId) {
        try {
          const exists = await checkFileExistsInDatabase(fileId);
          if (exists) {
            const metadata = await getFileMetadata(fileId);
            setFileMetadata(metadata);
            if (metadata?.downloadedPercentage > 99) {
              setIsDownloading(false);
            }
          }
        } catch (error) {
          console.error("خطا در بررسی فایل:", error);
        }
      }
    };

    checkFile();
  }, [fileId]);

  // پاکسازی هنگام unmount
  useEffect(() => {
    return () => {
      if (isDownloading && downloader) {
        downloader.stop(fileId).catch(console.error);
      }
    };
  }, [downloader, fileId, isDownloading]);

  const onClickDownload = useCallback(
    async (e: any) => {
      e.stopPropagation();
      if (!downloader || isDownloading || !fileId) return;

      try {
        setIsDownloading(true);
        await downloader.start(fileId);
      } catch (error) {
        console.error("خطا در شروع دانلود:", error);
        setIsDownloading(false);
      }
    },
    [downloader, fileId, isDownloading]
  );

  const onClickStopDownload = useCallback(
    async (e: any) => {
      e.stopPropagation();
      if (!downloader || !isDownloading || !fileId) return;

      try {
        await downloader.stop(fileId);
      } catch (error) {
        console.error("خطا در توقف دانلود:", error);
      } finally {
        setIsDownloading(false);
      }
    },
    [downloader, fileId, isDownloading]
  );

  const currentProgress = Math.floor(
    fileDownloadProgress?.find((item) => item?.fileId === fileId)?.percentage ||
      0
  );

  useEffect(() => {
    if (currentProgress > 99) {
      setIsDownloading(false);
    }
  }, [currentProgress]);

  const handlePlayVideo = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (!fileId) {
        console.error("شناسه فایل موجود نیست");
        return;
      }
      // بررسی مجدد وضعیت فایل در دیتابیس
      const exists = await checkFileExistsInDatabase(fileId);
      if (exists) {
        const metadata = await getFileMetadata(fileId);

        // بررسی وضعیت دانلود
        const isFullyDownloaded =
          metadata?.downloadedPercentage >= 99 ||
          currentProgress >= 99 ||
          fileMetadata?.downloadedPercentage >= 99;

        if (isFullyDownloaded) {
          dispatch(runFileDataAction({fileId,type:"video"}));
          return;
        }
      }
      if(isDownloading){
        await onClickStopDownload(e);
      }else{
        await onClickDownload(e);
      }
    
    } catch (error) {
      console.error("خطا در پخش/دانلود ویدیو:", error);
    }
  };

  
  useEffect(() => {
    const checkVideoStatus = async () => {
      if (fileId) {
        try {
          const exists = await checkFileExistsInDatabase(fileId);
          if (exists) {
            const metadata = await getFileMetadata(fileId);
            const isReady =
              metadata?.downloadedPercentage >= 99 ||
              currentProgress >= 99 ||
              fileMetadata?.downloadedPercentage >= 99;

            setIsVideoReady(isReady);
          }
        } catch (error) {
          console.error("خطا در بررسی وضعیت ویدیو:", error);
          setIsVideoReady(false);
        }
      }
    };

    checkVideoStatus();
  }, [fileId, currentProgress, fileMetadata]);

  return (
    <>
      {message ? (
        <div
          className={`w-full rounded bg-primary-300 ${
            message ? "border" : "border-0"
          }`}
        >
          {preview?.length ? (
            <Image
              className="w-full min-h-[230px] h-auto rounded"
              src={preview ?? null}
            />
          ) : (
            <div className="w-full h-full bg-black"></div>
          )}

          {message && (
            <div
              className={`text-[15px] break-words ${
                isCurrentUser ? "text-white" : "text-gray-800"
              } mt-2`}
            >
              {message}
            </div>
          )}
        </div>
      ) : preview?.length ? (
        <div
          className="w-full h-auto bg-primary-300 cursor-pointer"
          onClick={handlePlayVideo}
        >
          <div className={`relative ${isVideoReady ? "" : "image-effect"} `}>
            <Image
              className="w-full min-h-[260px] h-auto rounded-lg"
              src={preview ? `data:image/*;base64,${preview}` : null}
            />
          </div>

          {uploadStatus === "completed" && (
            <MediaDownloadBox
              onClickStopDownload={onClickStopDownload}
              startDownload={isDownloading}
              onClickDownload={onClickDownload}
              duration={duration}
              fileSize={fileSize}
              isDownload={fileMetadata?.downloadedPercentage === 100}
              downloadedSize={
                fileDownloadProgress?.find((item) => item?.fileId === fileId)
                  ?.downloadedSize || 0
              }
              progress={currentProgress}
            />
          )}
        </div>
      ) : (
        <div>
          <div className="w-full h-[340px] bg-black"></div>
          {uploadStatus === "uploading" && (
            <div className="absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2">
              <CircleProgressBar progress={progress} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default VideoCard;
