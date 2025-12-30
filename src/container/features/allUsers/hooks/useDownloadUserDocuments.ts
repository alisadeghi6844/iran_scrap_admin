import { useState } from "react";
import HttpServises from "../../../../api/HttpServises";

// Extracted from AllUsersTable without behavior changes.
export function useDownloadUserDocuments() {
  const [downloadingFiles, setDownloadingFiles] = useState<string[]>([]);

  const getFileExtension = (contentType: string, originalPath: string) => {
    const urlExtension = originalPath.split(".").pop()?.toLowerCase();
    if (
      urlExtension &&
      ["jpg", "jpeg", "png", "gif", "pdf", "doc", "docx", "txt"].includes(urlExtension)
    ) {
      return `.${urlExtension}`;
    }

    const mimeToExt: { [key: string]: string } = {
      "image/jpeg": ".jpg",
      "image/jpg": ".jpg",
      "image/png": ".png",
      "image/gif": ".gif",
      "application/pdf": ".pdf",
      "application/msword": ".doc",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
      "text/plain": ".txt",
      "application/octet-stream": ".jpg",
    };

    return mimeToExt[contentType] || ".jpg";
  };

  const generateFileName = (originalPath: string, contentType: string, index: number) => {
    const pathParts = originalPath.split("/");
    let baseName = pathParts[pathParts.length - 1];

    if (!baseName || baseName.length > 50 || baseName.includes("?")) {
      baseName = `document-${index + 1}`;
    }

    baseName = baseName.split(".")[0];
    const extension = getFileExtension(contentType, originalPath);

    return `${baseName}${extension}`;
  };

  const handleDownloadDocuments = async (extraImages: string[], userId: string) => {
    if (!extraImages || extraImages.length === 0) return;

    setDownloadingFiles((prev) => [...prev, userId]);

    try {
      for (let index = 0; index < extraImages.length; index++) {
        const imagePath = extraImages[index];
        try {
          const response = await HttpServises.get(`${imagePath}`, {
            responseType: "arraybuffer",
          });

          const contentType = response.headers["content-type"] || "application/octet-stream";

          const blob = new Blob([response.data], { type: contentType });

          let fileName = "";

          const disposition = response.headers["content-disposition"];
          if (disposition && disposition.includes("filename=")) {
            fileName = disposition.split("filename=")[1].replace(/['"]/g, "");
          }

          if (!fileName) {
            fileName = generateFileName(imagePath, contentType, index);
          }

          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(`خطا در دانلود فایل ${imagePath}:`, error);
        }
      }
    } finally {
      setDownloadingFiles((prev) => prev.filter((id) => id !== userId));
    }
  };

  return { downloadingFiles, handleDownloadDocuments };
}


