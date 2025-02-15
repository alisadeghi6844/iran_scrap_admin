// constants.ts
export const DB_NAME = "FileChunkDatabase";
export const STORE_NAME = "fileChunks";
export const METADATA_STORE = "fileMetadata";
export const CHUNK_SIZE = 1024 * 1024; // 1MB

export const STORAGE_CLEANUP_THRESHOLD = 10; // 10% free space threshold
export const CLEANUP_PERCENTAGE = 0.2; // Remove 20% of old files
export const STOP_DOWNLOAD_TIMEOUT = 5000; // 5 seconds
