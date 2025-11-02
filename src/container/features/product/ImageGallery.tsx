import React from "react";
import Button from "../../../components/button";
import { FiTrash2 } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import Typography from "../../../components/typography/Typography";
import { toast } from "react-toastify";

interface ImageGalleryProps {
  imageURLs: string[];
  removeImage: (index: number) => void;
  uploadNewImage: (file: File) => void;
  imageActionLoading: boolean;
  maxImages?: number;
  uploadingImages?: Set<string>;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  imageURLs,
  removeImage,
  uploadNewImage,
  imageActionLoading,
  maxImages = 5,
  uploadingImages = new Set(),
}) => {
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    console.log('Files selected:', files.length); // Debug log
    console.log('Current image count:', imageURLs.length); // Debug log
    console.log('Current imageURLs:', imageURLs); // Debug log
    
    let uploadedCount = 0;
    
    for (const file of files) {
      // Check if we haven't exceeded max images (including files being uploaded in this batch)
      if (imageURLs.length + uploadedCount >= maxImages) {
        toast.warning(`حداکثر ${maxImages} تصویر می‌توانید آپلود کنید.`);
        break;
      }

      // Validate file type
      if (!file.type.match("image/jpeg") &&
          !file.type.match("image/png") &&
          !file.type.match("image/gif") &&
          !file.type.match("image/webp")) {
        toast.error(`فرمت فایل ${file.name} پشتیبانی نمی‌شود. لطفا فایل‌های JPG، PNG، GIF یا WebP انتخاب کنید.`);
        continue;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`حجم فایل ${file.name} بیش از 5 مگابایت است.`);
        continue;
      }

      console.log('About to upload image:', file.name); // Debug log
      // Upload image immediately
      uploadNewImage(file);
      uploadedCount++;
    }

    // Clear the input
    event.target.value = '';
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(event.dataTransfer.files);
    console.log('Files dropped:', files.length); // Debug log
    
    let uploadedCount = 0;
    
    for (const file of files) {
      // Check if we haven't exceeded max images (including files being uploaded in this batch)
      if (imageURLs.length + uploadedCount >= maxImages) {
        toast.warning(`حداکثر ${maxImages} تصویر می‌توانید آپلود کنید.`);
        break;
      }

      // Validate file type
      if (!file.type.match("image/jpeg") &&
          !file.type.match("image/png") &&
          !file.type.match("image/gif") &&
          !file.type.match("image/webp")) {
        toast.error(`فرمت فایل ${file.name} پشتیبانی نمی‌شود. لطفا فایل‌های JPG، PNG، GIF یا WebP انتخاب کنید.`);
        continue;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`حجم فایل ${file.name} بیش از 5 مگابایت است.`);
        continue;
      }

      console.log('About to upload dropped image:', file.name); // Debug log
      // Upload image immediately
      uploadNewImage(file);
      uploadedCount++;
    }
  };

  return (
    <div className="w-full py-6 border-t">
      <Typography className="text-[14px] text-[#272B30] pb-4">
        تصاویر محصول
      </Typography>
      
      {/* Upload Area */}
      <div className="flex justify-center mb-4">
        <div
          className={`w-full max-w-md rounded-lg h-[200px] border-2 border-dashed ${
            isDragOver 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-[#CED4DA] bg-[#F8F9FA]'
          } flex flex-col justify-center items-center gap-y-2 cursor-pointer hover:bg-gray-50 transition-colors`}
          onClick={() => document.getElementById("fileInput")?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            id="fileInput"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            disabled={imageActionLoading || imageURLs.length >= maxImages}
          />
          <div className="text-[14px] font-bold text-[#6A7178]">
            بارگذاری تصویر
          </div>
          <div className="text-[14px] text-[#ADB5BD] text-center px-4">
            لطفا تصویر مورد نظر را{" "}
            <span className="text-blue-500">انتخاب</span> و یا درگ کنید
          </div>
          <div className="text-xs text-gray-500">
            حداکثر {maxImages} تصویر
          </div>
          <FaPlus className="text-2xl text-gray-400" />
        </div>
      </div>

      {/* Loading State */}
      {imageActionLoading && (
        <div className="flex justify-center mb-4">
          <div className="text-[#66ADA1]">در حال آپلود تصویر...</div>
        </div>
      )}

      {/* Image Grid */}
      {imageURLs.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imageURLs.map((imagePath, index) => {
            const isUploading = uploadingImages.has(imagePath);
            console.log(`Image ${index}: ${imagePath}, isUploading: ${isUploading}`); // Debug log
            return (
              <div key={`image-${index}`} className="relative group">
                <img
                  src={imagePath}
                  alt={`product-image-${index}`}
                  className={`w-full h-[120px] object-cover rounded-lg border border-[#CED4DA] transition-opacity ${
                    isUploading 
                      ? 'opacity-50' 
                      : 'group-hover:opacity-75'
                  }`}
                  onLoad={() => console.log(`Image loaded: ${imagePath}`)}
                  onError={(e) => console.error(`Image failed to load: ${imagePath}`, e)}
                />
                
                {/* Loading overlay for uploading images */}
                {isUploading && (
                  <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
                    <div className="text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
                      در حال آپلود...
                    </div>
                  </div>
                )}
                
                {/* Spinner for uploading images */}
                {isUploading && (
                  <div className="absolute top-2 left-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  </div>
                )}
                
                {/* Delete button - only show for uploaded images */}
                {!isUploading && (
                  <Button
                    type="button"
                    onClick={() => removeImage(index)}
                    size="sm"
                    variant="error"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    loading={imageActionLoading}
                  >
                    <FiTrash2 />
                  </Button>
                )}
                
                {index === 0 && imageURLs.length > 0 && !isUploading && (
                  <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    تصویر اصلی
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {imageURLs.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          هیچ تصویری انتخاب نشده است
        </div>
      )}
    </div>
  );
};

export default ImageGallery;