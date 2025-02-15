import { useEffect } from "react";

export const VideoThumbnail = ({ file, onThumbnailGenerated }: { 
  file: File;
  onThumbnailGenerated: (thumbnail: string) => void;
}) => {
  useEffect(() => {
    const generateThumbnail = async () => {
      try {
        // ایجاد URL برای ویدئو
        const videoUrl = URL.createObjectURL(file);
        const video = document.createElement("video");
        video.src = videoUrl;
        
        // تنظیمات ویدئو
        video.preload = "metadata";
        video.currentTime = 2; // فریم اول
        video.muted = true;
        
        // منتظر لود شدن ویدئو می‌مانیم
        await new Promise((resolve) => {
          video.onloadeddata = () => resolve(true);
        });

        // ایجاد canvas برای گرفتن فریم
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

        // تبدیل canvas به تصویر
        const thumbnail = canvas.toDataURL("image/jpeg");
        onThumbnailGenerated(thumbnail);

        // پاکسازی
        URL.revokeObjectURL(videoUrl);
      } catch (error) {
        console.error("Error generating thumbnail:", error);
      }
    };

    generateThumbnail();
  }, [file, onThumbnailGenerated]);

  return null;
};