import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useSocket } from "../../../../context/SocketContext";
import { selectGetCurrentUserData } from "../../../../redux/slice/account/AccountSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import UploadBox from "./UploadBox";
import { socketProgressUploadAction } from "../../../../redux/actions/chat/socket/SocketActions";

interface FileUploadProps {
  onUploadComplete?: (fileInfo: any) => void;
  onUploadError?: (error: any) => void;
  attachType?: any;
  openAttachModal: boolean;
  onClose: () => void;
}

const CHUNK_SIZE = 512 * 1024;

const FileUpload: React.FC<FileUploadProps> = ({
  onUploadComplete,
  onUploadError,
  openAttachModal,
  attachType,
  onClose,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fileData, setFileData] = useState<{
    file: File | any;
    fileId: string | any;
  }>({
    file: null,
    fileId: null,
  });
  const [waitingForConfirmation, setWaitingForConfirmation] =
    useState<boolean>(false);

  const dispatch: any = useDispatch();
  const uploadingRef = useRef(false);
  const socket: any = useSocket();
  const uploadPositionRef = useRef<number>(0);
  const chunkNumberRef = useRef<number>(0);
  const lastConfirmedChunkRef = useRef<number>(-1);
  const currentUser = useSelector(selectGetCurrentUserData);
  const [searchParams] = useSearchParams();

  const resetUploadStates = () => {
    setProgress(0);
    setUploading(false);
    setError(null);
  };

  const uploadNextChunk = useCallback(
    async (offset: number, chunkNumber: number) => {
      if (!uploadingRef.current) {
        return;
      }

      if (!fileData.file) {
        return;
      }

      if (!socket?.connected) {
        setError("اتصال به سرور قطع شده است");
        stopUpload();
        return;
      }

      try {
        const chunk = fileData.file.slice(offset, offset + CHUNK_SIZE);
        const arrayBuffer = await chunk.arrayBuffer();
        const isLastChunk = offset + chunk.size >= fileData.file.size;

        setWaitingForConfirmation(true);
        socket.emit("uploadChunk", {
          chunk: new Uint8Array(arrayBuffer),
          chunkNumber,
          fileName: fileData.file.name,
          offset,
          isLastChunk,
          totalSize: fileData.file.size,
          fileId: fileData.fileId,
        });
      } catch (err) {
        console.error("Error in uploadNextChunk:", err);
        stopUpload(err instanceof Error ? err.message : "خطا در آپلود فایل");
      }
    },
    [socket, fileData]
  );

  const stopUpload = useCallback((errorMessage?: string) => {
    uploadingRef.current = false;
    setUploading(false);
    setWaitingForConfirmation(false);
    if (errorMessage) {
      setError(errorMessage);
    }
  }, []);

  const handleUpload = useCallback(async () => {
    if (!fileData.file || !socket) {
      setError("فایل یا اتصال به سرور موجود نیست");
      return;
    }

    if (!currentUser?._id) {
      setError("خطا در شناسایی کاربر");
      return;
    }

    try {
      setError(null);
      setProgress(0);
      setUploading(true);
      uploadingRef.current = true;
      uploadPositionRef.current = 0;
      chunkNumberRef.current = 0;
      lastConfirmedChunkRef.current = -1;
      setWaitingForConfirmation(false);

      // بستن مودال
      onClose();

      // شروع آپلود
      await new Promise<void>((resolve, reject) => {
        socket.emit(
          "startUpload",
          {
            fileName: fileData.file.name,
            size: fileData.file.size,
            senderId: currentUser._id,
            recipientId: searchParams.get("userId"),
            timestamp: new Date().toISOString(),
            totalChunks: Math.ceil(fileData.file.size / CHUNK_SIZE),
            fileId: fileData.fileId,
          },
          (response: { success: boolean; error?: string }) => {
            if (response.success) {
              resolve();
              uploadNextChunk(0, 0);
            } else {
              reject(new Error(response.error || "Start upload failed"));
            }
          }
        );
      });
    } catch (err) {
      console.error("Error starting upload:", err);
      setError(err instanceof Error ? err.message : "خطا در شروع آپلود");
      resetUploadStates();
    }
  }, [fileData, socket, currentUser, searchParams, uploadNextChunk, onClose]);

  useEffect(() => {
    if (!socket) return;

    const handleResumePosition = ({ position }: { position: number }) => {
      uploadPositionRef.current = position;
      chunkNumberRef.current = Math.floor(position / CHUNK_SIZE);
      if (fileData.file && uploadingRef.current) {
        uploadNextChunk(position, Math.floor(position / CHUNK_SIZE));
      }
    };

    const handleReadyToUpload = () => {
      uploadPositionRef.current = 0;
      chunkNumberRef.current = 0;
      if (fileData.file && uploadingRef.current) {
        uploadNextChunk(0, 0);
      }
    };

    const handleUploadProgress = (data: any) => {
      setProgress(data);
    };

    const handleUploadSuccess = (fileInfo: any) => {
      setUploading(false);
      setTimeout(() => {
        resetUploadStates();
        onUploadComplete?.(fileInfo);
        handleCancel();
      }, 500);
    };

    const handleUploadError = (error: any) => {
      setError(error.message);
      setUploading(false);
      onUploadError?.(error);
    };

    const handleChunkReceived = ({ chunkNumber }: { chunkNumber: number }) => {
      if (chunkNumber === lastConfirmedChunkRef.current + 1) {
        lastConfirmedChunkRef.current = chunkNumber;
        setWaitingForConfirmation(false);
        if (fileData.file) {
          const nextOffset = (chunkNumber + 1) * CHUNK_SIZE;
          if (nextOffset < fileData.file.size) {
            setTimeout(() => {
              if (uploadingRef.current) {
                uploadNextChunk(nextOffset, chunkNumber + 1);
              }
            }, 0);
          } else {
            stopUpload();
          }
        }
      } else {
        console.warn("Out of order chunk received:", {
          receivedChunk: chunkNumber,
          expectedChunk: lastConfirmedChunkRef.current + 1,
        });
      }
    };

    socket.on("resumePosition", handleResumePosition);
    socket.on("readyToUpload", handleReadyToUpload);
    socket.on("uploadProgress", handleUploadProgress);
    socket.on("uploadSuccess", handleUploadSuccess);
    socket.on("uploadError", handleUploadError);
    socket.on("chunkReceived", handleChunkReceived);

    return () => {
      socket.off("resumePosition", handleResumePosition);
      socket.off("readyToUpload", handleReadyToUpload);
      socket.off("uploadProgress", handleUploadProgress);
      socket.off("uploadSuccess", handleUploadSuccess);
      socket.off("uploadError", handleUploadError);
      socket.off("chunkReceived", handleChunkReceived);
    };
  }, [
    socket,
    onUploadComplete,
    onUploadError,
    fileData,
    uploadNextChunk,
    stopUpload,
  ]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setError(null);
    setFileData({ file, fileId: file.name + Date.now().toString() }); // ایجاد fileId
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept:
      attachType === "file"
        ? {
            // اکسل (Excel)
            "application/vnd.ms-excel": [".xls"],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
              [".xlsx"],

            // پی دی اف (PDF)
            "application/pdf": [".pdf"],

            // پاورپوینت (PowerPoint)
            "application/vnd.ms-powerpoint": [".ppt"],
            "application/vnd.openxmlformats-officedocument.presentationml.presentation":
              [".pptx"],

            // آرشیوها (Zip/RAR)
            "application/zip": [".zip"],
            "application/x-rar-compressed": [".rar"],
            "application/vnd.rar": [".rar"],

            // متن ساده (Text)
            "text/plain": [".txt"],

            // ورد (Word)
            "application/msword": [".doc"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
              [".docx"],
          }
        : { "image/*": [], "video/*": [] },
  });

  useEffect(() => {
    if (!openAttachModal) {
      resetUploadStates();
    }
  }, [openAttachModal]);

  useEffect(() => {
    dispatch(socketProgressUploadAction(progress));
  }, [progress, dispatch]);

  const handleCancel = useCallback(() => {
    setFileData({ file: null, fileId: null }); // حذف فایل انتخاب‌شده
    setError(null); // پاک کردن پیام خطا
    setProgress(0); // ریست کردن پیشرفت آپلود
    setUploading(false); // توقف وضعیت آپلود
    uploadingRef.current = false; // توقف آپلود از طریق ref
    setWaitingForConfirmation(false); // ریست وضعیت انتظار برای تأیید
  }, []);

  return (
    <div className="p-4">
      <UploadBox
        attachType={attachType}
        error={error}
        onUpload={handleUpload}
        onCancel={handleCancel}
        openAttachModal={openAttachModal}
        selectedFile={fileData.file} // تغییر به fileData.file
        getRootProps={getRootProps}
        getInputProps={getInputProps}
      />
    </div>
  );
};

export default FileUpload;
