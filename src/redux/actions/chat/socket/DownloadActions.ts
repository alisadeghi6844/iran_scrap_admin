import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  RUN_FILE_DATA,
  SOCKET_PROGRESS_DOWNLOAD,
} from "../../../types/chat/socket/DownloadTypes";
import {
  SOCKET_ORIGINAL,
  SOCKET_STOP_DOWNLOAD,
} from "../../../types/chat/socket/SocketTypes";

// آرایه برای ذخیره وضعیت دانلودها
const downloadProgressArray: any = [];

export const socketProgressDownloadAction = createAsyncThunk(
  `${SOCKET_ORIGINAL}/${SOCKET_PROGRESS_DOWNLOAD}`,
  async (
    {
      fileId,
      downloadedSize,
      percentage,
    }: { fileId?: any; downloadedSize?: any; percentage?: any },
    { rejectWithValue }
  ) => {
    try {
      const existingIndex = downloadProgressArray.findIndex(
        (item: any) => item.fileId === fileId
      );

      if (existingIndex !== -1) {
  
        downloadProgressArray[existingIndex] = {
          ...downloadProgressArray[existingIndex],
          downloadedSize,
          percentage,
        };
      } else {
  
        downloadProgressArray.push({ fileId, downloadedSize, percentage });
      }

      return [...downloadProgressArray]; // بازگرداندن یک نسخه کپی از آرایه
    } catch (error: any) {
      return rejectWithValue(error.message || "خطای ناشناخته");
    }
  }
);

export const socketStopDownloadAction = createAsyncThunk(
  `${SOCKET_ORIGINAL}/${SOCKET_STOP_DOWNLOAD}`,
  async ({ fileId }: { fileId: any }, { rejectWithValue }) => {
    try {
      // بررسی وجود فایل در آرایه
      const existingIndex = downloadProgressArray.findIndex(
        (item: any) => item.fileId === fileId
      );

      if (existingIndex !== -1) {
        // حذف فایل از آرایه وضعیت دانلود
        downloadProgressArray.splice(existingIndex, 1);
      } else {
        console.warn(`فایل ${fileId} در لیست دانلود پیدا نشد.`);
      }

      return [...downloadProgressArray]; // بازگرداندن یک نسخه کپی از آرایه
    } catch (error: any) {
      console.error("خطا در توقف دانلود:", error.message);
      return rejectWithValue(error.message || "خطای ناشناخته");
    }
  }
);

export const runFileDataAction = createAsyncThunk(
  `${SOCKET_ORIGINAL}/${RUN_FILE_DATA}`,
  async ( {fileId,type}:any , { rejectWithValue }) => {
    try {
      return {fileId,type};
    } catch (error: any) {
      console.error("خطا در اجرای فایل", error.message);
      return rejectWithValue(error.message || "خطای ناشناخته");
    }
  }
);
