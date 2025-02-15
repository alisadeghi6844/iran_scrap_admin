// storage.ts
import { StorageEstimate } from './types';
import { deleteFileFromDatabase, getFileMetadata } from './database';
import { STORAGE_CLEANUP_THRESHOLD, CLEANUP_PERCENTAGE } from './constants';

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const checkStorageQuota = async (): Promise<StorageEstimate> => {
  if (!navigator.storage || !navigator.storage.estimate) {
    throw new Error("Storage API not supported");
  }

  try {
    const estimate = await navigator.storage.estimate();
    const { quota = 0, usage = 0 } = estimate;

    return { quota, usage };
  } catch (error) {
    console.error("Error checking storage quota:", error);
    throw error;
  }
};

export const cleanupOldFiles = async (): Promise<void> => {
  try {
    const files = await getFileMetadata(""); // Get all files
    if (!Array.isArray(files)) return;

    const sortedFiles = files.sort(
      (a, b) => (a.timestamp || 0) - (b.timestamp || 0)
    );

    const filesToDelete = sortedFiles.slice(
      0,
      Math.ceil(sortedFiles.length * CLEANUP_PERCENTAGE)
    );

    for (const file of filesToDelete) {
      try {
        await deleteFileFromDatabase(file.fileId);
        console.log(`Deleted old file: ${file.fileId}`);
      } catch (deleteError) {
        console.error(`Error deleting file ${file.fileId}:`, deleteError);
      }
    }
  } catch (error) {
    console.error("Error in cleanup:", error);
    throw error;
  }
};

export async function checkAndFreeSpace(requiredSpace: number): Promise<boolean> {
  try {
    const estimate = await checkStorageQuota();
    const availableSpace = estimate.quota - estimate.usage;

    if (availableSpace >= requiredSpace) {
      return true;
    }

    await cleanupOldFiles();
    const newEstimate = await checkStorageQuota();
    return (newEstimate.quota - newEstimate.usage) >= requiredSpace;
  } catch (error) {
    console.error("Error in checkAndFreeSpace:", error);
    return false;
  }
}
