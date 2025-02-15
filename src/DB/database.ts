// database.ts
import { DB_NAME, STORE_NAME, METADATA_STORE } from './constants';
import { FileMetadata, FileChunk } from './types';

export async function initializeDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 2);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "chunkId" });
      }

      if (!db.objectStoreNames.contains(METADATA_STORE)) {
        db.createObjectStore(METADATA_STORE, {
          keyPath: "fileId",
          autoIncrement: false,
        });
      }
    };

    request.onsuccess = (event: Event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event: Event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
}

export async function saveFileMetadata(
  fileId: string,
  fileSize: number
): Promise<boolean> {
  const db = await initializeDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([METADATA_STORE], "readwrite");
    const store = transaction.objectStore(METADATA_STORE);

    const metadata: FileMetadata = {
      fileId,
      fileSize,
      downloadedPercentage: 0,
      downloadedSize: 0,
      timestamp: Date.now(),
    };

    const request = store.put(metadata);

    request.onsuccess = () => resolve(true);
    request.onerror = (event: Event) => {
      console.error("خطا در ذخیره متادیتا:", (event.target as IDBRequest).error);
      reject((event.target as IDBRequest).error);
    };
  });
}

export async function updateDownloadedProgress(
  fileId: string,
  downloadedSize: number,
  percentage: number
): Promise<boolean> {
  const db = await initializeDatabase();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([METADATA_STORE], "readwrite");
    const store = transaction.objectStore(METADATA_STORE);

    const request = store.get(fileId);
    request.onsuccess = (event: Event) => {
      const metadata = (event.target as IDBRequest).result as FileMetadata;
      if (metadata) {
        // اطمینان از اینکه downloadedSize از fileSize بیشتر نشود
        const validDownloadedSize = Math.min(downloadedSize, metadata.fileSize);
        // محاسبه درصد صحیح بر اساس سایز دانلود شده
        const validPercentage = Math.min(
          100,
          Number(((validDownloadedSize / metadata.fileSize) * 100).toFixed(2))
        );

        metadata.downloadedSize = validDownloadedSize;
        metadata.downloadedPercentage = validPercentage;

        const updateRequest = store.put(metadata);
        updateRequest.onsuccess = () => resolve(true);
        updateRequest.onerror = (event: Event) =>
          reject((event.target as IDBRequest).error);
      } else {
        reject("فایل یافت نشد.");
      }
    };

    request.onerror = (event: Event) =>
      reject((event.target as IDBRequest).error);
  });
}


export async function saveChunkToDatabase(
  fileId: string,
  chunkIndex: number,
  chunkData: ArrayBuffer
): Promise<void> {
  const db = await initializeDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME, METADATA_STORE], "readwrite");
    const chunkStore = transaction.objectStore(STORE_NAME);
    const metadataStore = transaction.objectStore(METADATA_STORE);
    const chunkId = `${fileId}_${chunkIndex}`;

    const saveChunkRequest = chunkStore.put({
      chunkId,
      fileId,
      chunkIndex,
      chunkData,
    });

    saveChunkRequest.onsuccess = () => {
      const getMetadataRequest = metadataStore.get(fileId);

      getMetadataRequest.onsuccess = (event: Event) => {
        const metadata = (event.target as IDBRequest).result;

        if (metadata) {
          const updateRequest = metadataStore.put({
            ...metadata,
            lastChunkIndex: Math.max(metadata.lastChunkIndex || 0, chunkIndex),
            updatedAt: new Date().toISOString(),
          });

          updateRequest.onsuccess = () => resolve();
          updateRequest.onerror = (event: Event) =>
            reject((event.target as IDBRequest).error);
        } else {
          const createRequest = metadataStore.put({
            fileId,
            lastChunkIndex: chunkIndex,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });

          createRequest.onsuccess = () => resolve();
          createRequest.onerror = (event: Event) =>
            reject((event.target as IDBRequest).error);
        }
      };

      getMetadataRequest.onerror = (event: Event) =>
        reject((event.target as IDBRequest).error);
    };

    saveChunkRequest.onerror = (event: Event) =>
      reject((event.target as IDBRequest).error);

    transaction.onerror = (event: Event) =>
      reject((event.target as IDBRequest).error);
  });
}

export async function getFileFromDatabase(fileId: string): Promise<Blob> {
  const db = await initializeDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);

    const range = IDBKeyRange.bound(
      `${fileId}_0`,
      `${fileId}_\uffff`
    );

    const request = store.getAll(range);

    request.onsuccess = (event: Event) => {
      const chunks = (event.target as IDBRequest).result as FileChunk[];

      if (!chunks || chunks.length === 0) {
        return reject(new Error(`چانک‌های فایل ${fileId} یافت نشد`));
      }

      // مرتب‌سازی چانک‌ها بر اساس ایندکس
      chunks.sort((a, b) => a.chunkIndex - b.chunkIndex);
      // تبدیل چانک‌ها به آرایه‌ای از داده‌های باینری
      const chunksData = chunks.map((chunk) => chunk.chunkData);
      // ایجاد یک Blob از تمام چانک‌ها
      const blob = new Blob(chunksData);

      resolve(blob);
    };

    request.onerror = (event: Event) => {
      console.error("خطا در بازیابی چانک‌ها:", (event.target as IDBRequest).error);
      reject((event.target as IDBRequest).error);
    };
  });
}


export async function deleteFileFromDatabase(fileId: string): Promise<void> {
  const db = await initializeDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME, METADATA_STORE], "readwrite");
    const fileChunksStore = transaction.objectStore(STORE_NAME);
    const metadataStore = transaction.objectStore(METADATA_STORE);

    const fileChunksIndex = fileChunksStore.index("fileId");
    const fileChunksRequest = fileChunksIndex.getAllKeys(fileId);

    fileChunksRequest.onsuccess = (event: Event) => {
      const chunkKeys = (event.target as IDBRequest).result;

      chunkKeys.forEach((chunkKey: string) => {
        fileChunksStore.delete(chunkKey);
      });

      const metadataRequest = metadataStore.delete(fileId);

      metadataRequest.onsuccess = () => resolve();
      metadataRequest.onerror = (event: Event) => {
        console.error("خطا در حذف متادیتای فایل:", (event.target as IDBRequest).error);
        reject((event.target as IDBRequest).error);
      };
    };

    fileChunksRequest.onerror = (event: Event) => {
      console.error("خطا در دریافت چانک‌های فایل:", (event.target as IDBRequest).error);
      reject((event.target as IDBRequest).error);
    };
  });
}

export async function checkFileExistsInDatabase(fileId: string): Promise<boolean> {
  const db = await initializeDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([METADATA_STORE], "readonly");
    const store = transaction.objectStore(METADATA_STORE);
    const request = store.get(fileId);

    request.onsuccess = (event: Event) => {
      resolve(!!request.result);
    };

    request.onerror = () => {
      console.error("خطا در جستجوی fileId در دیتابیس");
      reject(false);
    };
  });
}

export async function getFileMetadata(fileId: string): Promise<FileMetadata | null> {
  const db = await initializeDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([METADATA_STORE], "readonly");
    const store = transaction.objectStore(METADATA_STORE);
    const request = store.get(fileId);

    request.onsuccess = () => {
      resolve(request.result || null);
    };

    request.onerror = () => {
      console.error("خطا در دریافت اطلاعات فایل از دیتابیس");
      reject(null);
    };
  });
}
