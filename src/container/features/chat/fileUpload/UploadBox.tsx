import { useEffect, useState } from "react";
import Button from "../../../../components/button";
import UploadIcon from "../../../../components/icon/custom/UploadIcon";
import Typography from "../../../../components/typography/Typography";
import RenderFilePreview from "./RenderFilePreview";

// تعریف فرمت‌های قابل قبول بر اساس attachType
const ACCEPTED_FORMATS = {
  file: [".xls", ".xlsx", ".doc", ".docx", ".txt", ".pdf",".ppt",".rar",".zip"],
  media: [".jpg", ".jpeg", ".png", ".gif", ".mp4"],
};

const UploadBox = ({
  attachType = "file", // مقدار پیش‌فرض برای attachType
  error,
  getRootProps,
  getInputProps,
  selectedFile,
  openAttachModal,
  onUpload,
  onCancel,
}: {
  attachType?: "file" | "media";
  error?: any;
  getRootProps?: any;
  getInputProps?: any;
  selectedFile?: File | null;
  onUpload?: any;
  onCancel?: any;
  openAttachModal?: any;
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | "file" | null>(
    null
  );

  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      setFileType(null);
      return;
    }

    // تعیین نوع فایل
    if (selectedFile.type.startsWith("image/")) {
      setFileType("image");
      // ایجاد پیش‌نمایش برای تصاویر
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else if (selectedFile.type.startsWith("video/")) {
      setFileType("video");
    } else {
      setFileType("file");
      setPreview(null);
    }

    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [selectedFile]);

  // فرمت‌های قابل قبول بر اساس attachType
  const acceptedFormats = ACCEPTED_FORMATS[attachType]?.join(" , ");

  return (
    <div>
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-md">
          <p>{error}</p>
        </div>
      )}
      <Typography className="text-xl font-bold mb-2">ارسال فایل</Typography>
      <Typography className="text-gray-600">
        لطفا فرمت های {acceptedFormats} تا حجم 40 مگابایت را آپلود کنید
      </Typography>

      {selectedFile ? (
        RenderFilePreview({ selectedFile, fileType, preview, setPreview })
      ) : (
        <div
          {...getRootProps()}
          className="mt-8 h-[220px] w-full border-2 border-dashed border-primary-500 rounded-2xl bg-primary-100 flex items-center flex-col justify-center cursor-pointer"
        >
          <input {...getInputProps()} />
          <UploadIcon />
          <Typography className="mt-4 text-lg text-primary-900">
            فایل خود را اینجا بکشید و رها کنید یا کلیک کنید
          </Typography>
          <Typography className="mt-2 text-primary-600">
            فرمت مجاز : {acceptedFormats}
          </Typography>
        </div>
      )}

      <div className="flex justify-between items-center mt-6 gap-x-10">
        <Button
          className="w-[200px]"
          size="xl"
          onClick={onUpload}
          disabled={!selectedFile}
        >
          ارسال
        </Button>
        <Button
          className="w-[200px]"
          size="xl"
          variant="secondary"
          onClick={onCancel}
        >
          انصراف
        </Button>
      </div>
    </div>
  );
};

export default UploadBox;