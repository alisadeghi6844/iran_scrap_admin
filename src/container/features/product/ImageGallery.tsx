import React from "react";
import Button from "../../../components/button";
import { FiTrash2 } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import Typography from "../../../components/typography/Typography";

interface ImageGalleryProps {
  imageURLs: string[];
  removeImage: (index: number) => void;
  uploadNewImage: (file: File) => void;
  imageActionLoading: boolean;
  maxImages?: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  imageURLs,
  removeImage,
  uploadNewImage,
  imageActionLoading,
  maxImages = 5,
}) => {
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    for (const file of files) {
      // Validate file type
      if (!file.type.match("image/jpeg") &&
          !file.type.match("image/png") &&
          !file.type.match("image/gif")) {
        continue;
      }

      // Check if we haven't exceeded max images
      if (imageURLs.length >= maxImages) {
        break;
      }

      // Upload image immediately
      uploadNewImage(file);
    }

    // Clear the input
    event.target.value = '';
  };

  return (
    <div className="w-full py-6 border-t">
      <Typography className="text-[14px] text-[#272B30] pb-4">
        تصاویر محصول
      </Typography>
      
      {/* Upload Area */}
      <div className="flex justify-center mb-4">
        <div
          className="w-full max-w-md rounded-lg h-[200px] border-2 border-dashed border-[#CED4DA] bg-[#F8F9FA] flex flex-col justify-center items-center gap-y-2 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => document.getElementById("fileInput")?.click()}
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
          {imageURLs.map((imagePath, index) => (
            <div key={index} className="relative group">
              <img
                src={imagePath}
                alt={`product-image-${index}`}
                className="w-full h-[120px] object-cover rounded-lg border border-[#CED4DA] group-hover:opacity-75 transition-opacity"
              />
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
              {index === 0 && (
                <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  تصویر اصلی
                </div>
              )}
            </div>
          ))}
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