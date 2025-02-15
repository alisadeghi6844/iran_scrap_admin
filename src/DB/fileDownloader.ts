// fileDownloader.ts
import { DownloadTask } from "./types";
import { CHUNK_SIZE, STOP_DOWNLOAD_TIMEOUT } from "./constants";
import {
  saveFileMetadata,
  getFileMetadata,
  saveChunkToDatabase,
  updateDownloadedProgress,
} from "./database";
import { checkAndFreeSpace } from "./storage";

export function createFileDownloader(socket: any) {
  let downloadQueue: DownloadTask[] = [];
  let currentTask: DownloadTask | null = null;
  let currentChunkIndex = 0;
  let isDownloading = false;
  let isStopped = false;
  let hasReceivedStopConfirmation = false;
  let stopPromiseResolver: ((value: void) => void) | null = null;
  let isInitializing = false;

  function resetState() {
    currentChunkIndex = 0;
    isDownloading = false;
    isStopped = false;
    hasReceivedStopConfirmation = false;
    stopPromiseResolver = null;
    isInitializing = false;
  }

  function removeListeners() {
    socket.off("readyToDownload");
    socket.off("fileChunk");
    socket.off("endOfFile");
    socket.off("downloadStopped");
    socket.off("error");
  }

  async function saveChunkToDatabaseWithSpaceManagement(
    fileId: string,
    chunkIndex: number,
    chunkData: ArrayBuffer
  ): Promise<void> {
    const metadata = await getFileMetadata(fileId);
    if (!metadata) {
      throw new Error("متادیتای فایل یافت نشد");
    }

    await checkAndFreeSpace(chunkData.byteLength);
    await saveChunkToDatabase(fileId, chunkIndex, chunkData);

    const downloadedSize = metadata.downloadedSize + chunkData.byteLength;
    const percentage = Math.round((downloadedSize / metadata.fileSize) * 100);
    await updateDownloadedProgress(fileId, downloadedSize, percentage);
  }

  function requestNextChunk(fileId: string): void {
    if (isInitializing || isDownloading || isStopped) {
      return;
    }

    isDownloading = true;

    socket.emit("downloadChunk", {
      fileId,
      chunkIndex: currentChunkIndex,
      chunkSize: CHUNK_SIZE,
    });
  }

  function setupListeners(fileId: string) {
    removeListeners();

    socket.on(
      "readyToDownload",
      async ({ fileId, fileName, fileSize, isResume = false }: any) => {
        if (isStopped) return;
    
        try {
          isInitializing = true;
          const fileMetaData = await getFileMetadata(fileId);
    
          // اگر ادامه دانلود است، فقط پیشرفت را آپدیت کن
          if (isResume && fileMetaData) {
            console.log("ok")
            await updateDownloadedProgress(
              fileId,
              fileMetaData.downloadedSize,
              fileMetaData.downloadedPercentage
            );
          } 
          // اگر دانلود جدید است، متادیتا را ذخیره کن
          else if (!isResume) {
            console.log("false")
            await saveFileMetadata(fileId, fileSize);
          }
    
          currentChunkIndex =
            fileMetaData?.fileId === fileId && fileMetaData?.lastChunkIndex
              ? fileMetaData.lastChunkIndex - 1
              : 0;
           
          isInitializing = false;
          isDownloading = false;
          requestNextChunk(fileId);
        } catch (error) {
          console.error("خطا در مدیریت متادیتا:", error);
          isInitializing = false;
          isDownloading = false;
        }
      }
    );
    

    socket.on(
      "fileChunk",
      async ({
        fileId,
        chunkIndex,
        chunk,
      }: {
        fileId: string;
        chunkIndex: number;
        chunk: ArrayBuffer;
      }) => {
        if (isStopped) return;

        try {
          if (chunkIndex !== currentChunkIndex) {
            console.error(
              `خطا: ایندکس چانک نامعتبر. انتظار: ${currentChunkIndex}, دریافتی: ${chunkIndex}`
            );
            return;
          }

          await saveChunkToDatabaseWithSpaceManagement(
            fileId,
            chunkIndex,
            chunk
          );
          socket.emit("getDownloadProgress", { fileId });
  
          currentChunkIndex++;
   
          isDownloading = false;

          if (!isStopped) {
            requestNextChunk(fileId);
          }
        } catch (error) {
          console.error("خطا در ذخیره چانک:", error);
          isDownloading = false;
        }
      }
    );

    socket.on("endOfFile", async ({ fileId }: { fileId: string }) => {
      if (isStopped) return;
      try {
        isDownloading = false;
        currentChunkIndex = 0;
        currentTask?.resolve();
        completeDownload();
      } catch (error) {
        currentTask?.reject(error);
        failDownload(error);
      }
    });

    socket.on("error", (error: string) => {
      console.error("خطای سوکت:", error);
      isDownloading = false;
    });
  }

  const start = async (fileId: string): Promise<void> => {
    try {
      const fileMetaData = await getFileMetadata(fileId);

      return new Promise((resolve, reject) => {
        const task: DownloadTask = {
          fileId,
          start: () => {
            resetState();
            setupListeners(fileId);
            if (fileMetaData && fileMetaData?.lastChunkIndex > 0) {
              console.log("fileMetaData.downloadedPercentage",fileMetaData.downloadedPercentage)
              socket.emit("continueDownload", {
                fileId,
                lastChunkIndex: fileMetaData.lastChunkIndex,
                chunkSize: CHUNK_SIZE,
                downloadedPercentage: fileMetaData.downloadedPercentage,
                downloadedSize: fileMetaData.downloadedSize,
              });
            } else {
              socket.emit("startDownload", { fileId });
            }
          },
          resolve,
          reject,
        };

        downloadQueue.push(task);
        processQueue();
      });
    } catch (error) {
      console.error("Error starting download:", error);
      throw error;
    }
  };

  const stop = (fileId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const queueIndex = downloadQueue.findIndex(
        (task) => task.fileId === fileId
      );

      if (queueIndex !== -1) {
        const [removedTask] = downloadQueue.splice(queueIndex, 1);
        removedTask.reject(new Error("دانلود لغو شد - در صف انتظار"));
        resolve();
        return;
      }

      if (isStopped) {
        console.log("دانلود قبلاً متوقف شده است.");
        resolve();
        return;
      }

      isStopped = true;
      isDownloading = false;
      stopPromiseResolver = resolve;

      socket.once(
        "downloadStopped",
        ({ success, message }: { success: boolean; message: string }) => {
          hasReceivedStopConfirmation = true;
          if (success) {
            console.log("دانلود با موفقیت متوقف شد.");
            removeListeners();
            resetState();
            if (currentTask) {
              currentTask.reject(new Error("توسط کاربر متوقف شد"));
              currentTask = null;
            }
            resolve();
          } else {
            console.error(`خطا در توقف دانلود فایل ${fileId}: ${message}`);
            resetState();
            reject(new Error(message));
          }
        }
      );

      socket.emit("stopDownload", { fileId });

      setTimeout(() => {
        if (isStopped && !hasReceivedStopConfirmation) {
          console.log("سرور پاسخی برای توقف دانلود ارسال نکرد.");
          removeListeners();
          resetState();
          if (stopPromiseResolver) {
            stopPromiseResolver();
            stopPromiseResolver = null;
          }
        }
      }, STOP_DOWNLOAD_TIMEOUT);
    });
  };

  const processQueue = async () => {
    try {
      if (!currentTask && isDownloading) {
        resetState();
      }

      if (!isDownloading && downloadQueue.length > 0) {
        const nextTask = downloadQueue[0];
        if (!nextTask) {
          console.warn("تسک بعدی در صف یافت نشد");
          return;
        }

        try {
          isDownloading = true;
          currentTask = nextTask;
          downloadQueue.shift();
          await nextTask.start();
        } catch (error) {
          console.error("خطا در پردازش تسک:", error);
          nextTask.reject(error);
        }
      }
    } catch (error) {
      console.error("خطای کلی در پردازش صف:", error);
      resetState();
    }
  };

  const completeDownload = () => {
    isDownloading = false;
    currentTask = null;
    processQueue();
  };

  const failDownload = (error: any) => {
    if (currentTask) {
      console.error(`❌ خطا در دانلود ${currentTask.fileId}:`, error);
      const index = downloadQueue.findIndex(
        (t) => t.fileId === currentTask?.fileId
      );
      if (index !== -1) {
        downloadQueue.splice(index, 1);
      }
    }

    isDownloading = false;
    currentTask = null;
    processQueue();
  };

  return {
    start,
    stop,
  };
}
