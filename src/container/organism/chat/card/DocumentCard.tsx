import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../../../context/SocketContext";
import { FormatFileSize } from "../../../../utils/FormatFileSize";
import FileThumbnail from "../../../features/chat/fileUpload/FileThumbnail";
import {
  selectSocketProgressDownloadData,
  selectSocketProgressUploadData,
} from "../../../../redux/slice/chat/socket/socketSlice";
import { useCallback, useEffect, useState } from "react";
import {
  checkFileExistsInDatabase,
  createFileDownloader,
  getFileFromDatabase,
  getFileMetadata,
} from "../../../../DB";
import MediaDownloadBox from "../../../../components/ProgressBar/MediaDownloadBox";
import CircleProgressBar from "../../../../components/ProgressBar/CircleProgressBar";
import { detectFileType } from "../../../../utils/DetectFileType";

interface DocumentTypes {
  fileSize?: any;
  uploadStatus?: string;
  message?: string;
  isCurrentUser?: boolean;
  duration?: any;
  fileId?: string;
  fileName?: string;
}

const DocumentCard: React.FC<DocumentTypes> = (props) => {
  const {
    uploadStatus,
    message,
    isCurrentUser,
    duration,
    fileId,
    fileName,
    fileSize,
  } = props;

  const socket: any = useSocket();
  const fileDownloadProgress = useSelector(selectSocketProgressDownloadData);
  const uploadProgress: any = useSelector(selectSocketProgressUploadData);

  const [isDownloading, setIsDownloading] = useState(false);
  const [fileMetadata, setFileMetadata] = useState<any>(null);
  const [downloader, setDownloader] = useState<any>(null);
  const [isDocumentReady, setIsDocumentReady] = useState(false);
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    if (socket && !downloader) {
      const downloaderInstance = createFileDownloader(socket);
      setDownloader(downloaderInstance);
    }
  }, [socket]);

  useEffect(() => {
    const checkFile = async () => {
      if (fileId) {
        try {
          const exists = await checkFileExistsInDatabase(fileId);
          if (exists) {
            const metadata: any = await getFileMetadata(fileId);
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

  useEffect(() => {
    return () => {
      if (isDownloading && downloader) {
        downloader.stop(fileId).catch(console.error);
      }
    };
  }, [downloader, fileId, isDownloading]);

  const onClickDownload = useCallback(async () => {
    // e.stopPropagation();
    if (!isDocumentReady) {
      if (!downloader || isDownloading || !fileId) return;
      try {
        setIsDownloading(true);
        await downloader.start(fileId);
      } catch (error) {
        console.error("خطا در شروع دانلود:", error);
        setIsDownloading(false);
      }
    } else {
      console.log("download file");
      return;
    }
  }, [downloader, isDocumentReady, fileId, isDownloading]);

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

  useEffect(() => {
    const checkVideoStatus = async () => {
      if (fileId) {
        try {
          const exists = await checkFileExistsInDatabase(fileId);
          if (exists) {
            const metadata: any = await getFileMetadata(fileId);
            const isReady =
              metadata?.downloadedPercentage >= 99 ||
              currentProgress >= 99 ||
              fileMetadata?.downloadedPercentage >= 99;

            setIsDocumentReady(isReady);
          }
        } catch (error) {
          console.error("خطا در بررسی وضعیت ویدیو:", error);
          setIsDocumentReady(false);
        }
      }
    };

    checkVideoStatus();
  }, [fileId, currentProgress, fileMetadata]);

  useEffect(() => {
    if (isDocumentReady && fileId) {
      const getDocument = async () => {
        try {
          setTimeout(async () => {
            const findDocumentFile = await getFileFromDatabase(fileId);
            if (findDocumentFile) {
              const url = URL.createObjectURL(findDocumentFile);
              setDocumentUrl(url);
            }
          }, 100);
        } catch (error) {
          console.error("Error creating document URL:", error);
        }
      };
      getDocument();
    }

    return () => {
      if (documentUrl) {
        URL.revokeObjectURL(documentUrl);
      }
    };
  }, [isDocumentReady, fileId]);

  useEffect(() => {
    if (fileDownloadProgress?.length) {
      const data =
        fileDownloadProgress?.find((item) => item?.fileId === fileId)
          ?.percentage || 0;
      setProgress(data);
    } else if (uploadProgress?.fileId) {
      const data =
        uploadProgress?.fileId === fileId ? uploadProgress?.progress : 0;
      setProgress(data);
    }
  }, [fileDownloadProgress, uploadProgress]);

  const handleDownloadFile = async () => {
    try {
      if (!isDocumentReady) {
        await onClickDownload();
        return;
      }

      const fileBlob = await getFileFromDatabase(fileId);
      const detectedMimeType = await detectFileType(fileBlob);

      // ایجاد Blob جدید با MIME type تشخیص داده شده
      const typedBlob = new Blob([fileBlob], { type: detectedMimeType });

      const downloadUrl = URL.createObjectURL(typedBlob);
      const link = document.createElement("a");

      link.href = downloadUrl;
      link.download = fileName || `downloaded-file-${Date.now()}`;

      link.type = detectedMimeType;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("خطا در دانلود فایل:", error);
    }
  };

  const handleStopUpload = () => {
    if (fileId) {
      socket.emit("stopUpload", {
        fileId,
      });
    }
  };

  return (
    <div>
      <FileThumbnail
        status="up"
        handleClickFile={handleDownloadFile}
        itemBox={
          <div>
            {!isDocumentReady ? (
              uploadStatus === "completed" ? (
                <MediaDownloadBox
                  mode="document"
                  onClickStopDownload={onClickStopDownload}
                  startDownload={isDownloading}
                  onClickDownload={onClickDownload}
                  duration={duration}
                  fileSize={fileSize}
                  isDownload={fileMetadata?.downloadedPercentage === 100}
                  downloadedSize={
                    fileDownloadProgress?.find(
                      (item) => item?.fileId === fileId
                    )?.downloadedSize || 0
                  }
                  progress={progress}
                />
              ) : (
                <div className="flex justify-center items-center mr-2 -ml-1">
                  <CircleProgressBar
                    status="upload"
                    onClickStopDownload={() => handleStopUpload()}
                    progress={progress}
                  />
                </div>
              )
            ) : null}
          </div>
        }
        boxImage={!isDocumentReady}
        fileName={fileName}
        fileSize={
          isDownloading ? (
            <div className="text-[14px]">
              {progress == 0
                ? "0 بیت از"
                : FormatFileSize(
                    fileDownloadProgress?.find(
                      (item) => item?.fileId === fileId
                    )?.downloadedSize || 0
                  )}{" "}
              از {FormatFileSize(fileSize)}
            </div>
          ) : (
            FormatFileSize(fileSize)
          )
        }
      />
    </div>
  );
};

export default DocumentCard;
