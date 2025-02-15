import { VideoThumbnail } from "./VideoThumbnail";
import Typography from "../../../../components/typography/Typography";
import TextOverflow from "../../../../utils/TextOverflow";
import { FormatFileSize } from "../../../../utils/FormatFileSize";
import Image from "../../../../components/image";
import FileThumbnail from "./FileThumbnail";

const RenderFilePreview = ({
  selectedFile,
  fileType,
  preview,
  setPreview,
}: {
  preview: any;
  selectedFile: any;
  fileType: any;
  setPreview: any;
}) => {
  if (!selectedFile) return null;

  return (
    <div
      className={`mt-8 ${
        fileType == "image" || fileType == "video"
          ? "border border-primary-200"
          : ""
      }  rounded-2xl w-auto h-auto`}
    >
      {/* پیش‌نمایش فایل */}
      <div className="flex items-center justify-center overflow-hidden rounded-xl w-full h-full relative ">
        {fileType == "image" || fileType == "video" ? (
          <>
            {" "}
            <div className="absolute top-1 left-1 bg-gray-300 p-1 rounded-lg z-30">
              <Typography className="text-xs text-gray-800">
                {FormatFileSize(selectedFile.size)}
              </Typography>
            </div>
            <div className="absolute top-1 right-1 bg-gray-300 pt-1 pr-1 pl-1 rounded-lg z-30">
              <Typography
                style={{
                  display: "inline-block",
                  maxWidth: "100%",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  direction: "rtl", // برای راست به چپ بودن متن
                }}
                className="text-xs text-gray-800"
              >
                <TextOverflow number={30}>{selectedFile?.name}</TextOverflow>
              </Typography>
            </div>
          </>
        ) : null}
        {fileType === "image" && preview ? (
          <Image
            src={preview}
            alt="preview"
            className="w-auto h-auto max-h-[300px] rounded-xl"
          />
        ) : fileType === "video" ? (
          <>
            <VideoThumbnail
              file={selectedFile}
              onThumbnailGenerated={setPreview}
            />
            <div className="relative w-full h-full">
              {preview ? (
                <Image
                  src={preview}
                  alt="video preview"
                  className="w-full h-full rounded-xl"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center"></div>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30"></div>
            </div>
          </>
        ) : (
          <FileThumbnail
            fileName={selectedFile?.name}
            fileSize={FormatFileSize(selectedFile.size)}
          />
        )}
      </div>
    </div>
  );
};

export default RenderFilePreview;
