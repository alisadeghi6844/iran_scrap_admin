import React, { useState, useRef } from "react";

interface ProductFileUploaderProps {
  label?: string;
  accept?: string;
  onChange?: (file: File | null) => void;
  error?: string | false;
  value?: File | null;
}

const ProductFileUploader: React.FC<ProductFileUploaderProps> = ({
  label = "تصویر محصول",
  accept = "image/*",
  onChange,
  error,
  value,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    processFile(file);
  };

  const processFile = (file: File | null) => {
    if (file) {
      // بررسی نوع فایل
      if (!file.type.startsWith('image/')) {
        return;
      }

      // بررسی اندازه فایل (5MB)
      if (file.size > 5 * 1024 * 1024) {
        return;
      }

      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      onChange && onChange(file);
    } else {
      setPreviewUrl(null);
      onChange && onChange(null);
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
    const file = event.dataTransfer.files?.[0] || null;
    processFile(file);
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    onChange && onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
        } ${error ? "border-red-500" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        
        {!previewUrl ? (
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
              فرمت‌های مجاز: JPG, PNG, GIF (حداکثر 5MB)
            </p>
          </div>
        ) : (
          <div className="relative rounded-md overflow-hidden border border-gray-200">
            <img
              src={previewUrl}
              alt="پیش‌نمایش تصویر"
              className="w-full h-48 object-cover"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default ProductFileUploader;