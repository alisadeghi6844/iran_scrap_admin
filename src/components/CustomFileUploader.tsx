import React, { useState, useEffect, useRef } from "react";
import { useField, useFormikContext } from "formik";

interface FileUploaderProps {
  name: string;
  label?: string;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  errorLabel?: string;
  errorLabelSize?: string;
  mode?: string;
  editImageFile?: any[];
  id?: string;
}

const CustomFileUploader: React.FC<FileUploaderProps> = ({
  name,
  label,
  acceptedFileTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"],
  maxFileSize = 5 * 1024 * 1024, // 5MB default
  errorLabel = "فرمت فایل وارد شده صحیح نمیباشد.",
  errorLabelSize = "اندازه فایل بیش از حد مجاز است.",
  mode,
  editImageFile = [],
  id,
}) => {
  const [field, meta, helpers] = useField(name);
  const { setFieldValue } = useFormikContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [fileError, setFileError] = useState<string | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  // برای نمایش تصویر در حالت ویرایش
  useEffect(() => {
    if (editImageFile && editImageFile.length > 0 && mode === "update") {
      const previews = editImageFile.map(item => {
        if (item.file) {
          // اگر فایل به صورت base64 است
          return `data:${item.contentType};base64,${item.file}`;
        }
        return "";
      }).filter(url => url !== "");
      
      setPreviewUrls(previews);
    }
  }, [editImageFile, mode]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    validateAndProcessFiles(files);
  };

  const validateAndProcessFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newFiles: File[] = [];
    const newPreviewUrls: string[] = [];
    setFileError(null);

    Array.from(files).forEach(file => {
      // بررسی نوع فایل
      if (!acceptedFileTypes.includes(file.type)) {
        setFileError(errorLabel);
        return;
      }

      // بررسی اندازه فایل
      if (file.size > maxFileSize) {
        setFileError(errorLabelSize);
        return;
      }

      newFiles.push(file);
      const fileUrl = URL.createObjectURL(file);
      newPreviewUrls.push(fileUrl);
    });

    if (newFiles.length > 0) {
      setFieldValue(name, newFiles);
      setPreviewUrls(newPreviewUrls);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    validateAndProcessFiles(event.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...field.value];
    updatedFiles.splice(index, 1);
    
    const updatedPreviewUrls = [...previewUrls];
    const removedUrl = updatedPreviewUrls.splice(index, 1)[0];
    
    // آزاد کردن URL برای جلوگیری از نشت حافظه
    if (removedUrl && !removedUrl.startsWith('data:')) {
      URL.revokeObjectURL(removedUrl);
    }
    
    setFieldValue(name, updatedFiles);
    setPreviewUrls(updatedPreviewUrls);
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div
        className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
        } ${meta.touched && meta.error ? "border-red-500" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFileTypes.join(",")}
          onChange={handleFileChange}
          className="hidden"
          multiple={false}
        />
        
        {previewUrls.length === 0 ? (
          <div className="py-4">
            <div className="flex justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm text-gray-500">
              فایل خود را بکشید و اینجا رها کنید یا برای انتخاب کلیک کنید
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {acceptedFileTypes.map(type => type.replace("image/", ".")).join(", ")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 mt-2">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative rounded-md overflow-hidden border border-gray-200">
                <img
                  src={url}
                  alt={`پیش‌نمایش ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleBrowseClick}
              className="mt-2 w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              تغییر تصویر
            </button>
          </div>
        )}
      </div>
      
      {fileError && (
        <p className="mt-1 text-sm text-red-600">{fileError}</p>
      )}
      
      {meta.touched && meta.error && !fileError && (
        <p className="mt-1 text-sm text-red-600">{meta.error}</p>
      )}
    </div>
  );
};

export default CustomFileUploader;