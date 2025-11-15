import React from "react";
import { FiDownload, FiFile, FiImage } from "react-icons/fi";

interface MessageFileAttachmentProps {
  fileUrl: string;
  isUserMessage: boolean;
}

const MessageFileAttachment: React.FC<MessageFileAttachmentProps> = ({
  fileUrl,
  isUserMessage,
}) => {
  if (!fileUrl) return null;

  // استخراج نام فایل از URL
  const getFileName = (url: string) => {
    try {
      const urlParts = url.split('/');
      return urlParts[urlParts.length - 1] || 'فایل ضمیمه';
    } catch {
      return 'فایل ضمیمه';
    }
  };

  // تشخیص نوع فایل
  const getFileType = (url: string) => {
    const extension = url.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
      return 'image';
    }
    return 'file';
  };

  const fileName = getFileName(fileUrl);
  const fileType = getFileType(fileUrl);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-2">
      {fileType === 'image' ? (
        <div className="space-y-2">
          <img
            src={fileUrl}
            alt={fileName}
            className="max-w-full max-h-48 rounded-lg border cursor-pointer"
            onClick={() => window.open(fileUrl, '_blank')}
          />
          <div
            className={`flex items-center gap-2 text-xs cursor-pointer hover:underline ${
              isUserMessage ? 'text-gray-600' : 'text-blue-100'
            }`}
            onClick={handleDownload}
          >
            <FiDownload className="w-3 h-3" />
            <span>دانلود تصویر</span>
          </div>
        </div>
      ) : (
        <div
          className={`flex items-center gap-2 p-2 rounded border cursor-pointer hover:bg-opacity-80 ${
            isUserMessage
              ? 'bg-gray-100 border-gray-300 text-gray-700'
              : 'bg-blue-400 border-blue-300 text-white'
          }`}
          onClick={handleDownload}
        >
          <FiFile className="w-4 h-4 flex-shrink-0" />
          <span className="text-xs truncate flex-1">{fileName}</span>
          <FiDownload className="w-3 h-3 flex-shrink-0" />
        </div>
      )}
    </div>
  );
};

export default MessageFileAttachment;