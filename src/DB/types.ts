// types.ts
export interface FileMetadata {
    fileId: string;
    fileSize: number;
    downloadedPercentage: number;
    downloadedSize: number;
    timestamp: number;
    lastChunkIndex?: number;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface FileChunk {
    chunkId: string;
    fileId: string;
    chunkIndex: number;
    chunkData: ArrayBuffer;
  }
  
  export interface StorageEstimate {
    quota: number;
    usage: number;
  }
  
  export interface DownloadTask {
    fileId: string;
    start: () => void;
    resolve: () => void;
    reject: (reason?: any) => void;
  }
  
  export interface SocketEventHandlers {
    readyToDownload: (data: { fileId: string; fileName: string; fileSize: number }) => void;
    fileChunk: (data: { fileId: string; chunkIndex: number; chunk: ArrayBuffer }) => void;
    endOfFile: (data: { fileId: string }) => void;
    error: (error: string) => void;
    downloadStopped?: (data: { success: boolean; message: string }) => void;
  }
  

  // اضافه کردن interface های جدید برای VideoCard
export interface VideoCardProps {
  message?: string;
  fileSize?: number;
  preview: string;
  isCurrentUser: boolean;
  progress: number;
  uploadStatus?: 'uploading' | 'completed';
  duration?: string;
  fileId?: string;
}

export interface DownloadProgress {
  fileId: string;
  percentage: number;
  downloadedSize: number;
}