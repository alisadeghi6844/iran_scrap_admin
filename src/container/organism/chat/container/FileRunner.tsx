import { useDispatch, useSelector } from "react-redux";
import VideoPlayer from "../../VideoPlayer/VideoPlayer";
import { runFileDataAction } from "../../../../redux/actions/chat/socket/DownloadActions";
import FileControllers from "../../file/FileControllers";
import { useState } from "react";
import { getFileFromDatabase } from "../../../../DB";
import { selectRunFileDataData } from "../../../../redux/slice/chat/socket/socketSlice";
import { detectFileType } from "../../../../utils/DetectFileType";
import ImageRunner from "../../file/ImageRunner";

const FileRunner = (props: any) => {
  const { openFileModal } = props;

  const [zoomFile, setZoomFile] = useState(false);

  const runFileData = useSelector(selectRunFileDataData);

  const dispatch: any = useDispatch();

  const handleDownloadFile = async () => {
    try {
      if (!runFileData?.fileId) {
        throw new Error("شناسه فایل نامعتبر است");
      }

      const fileBlob = await getFileFromDatabase(runFileData.fileId);
      const detectedMimeType = await detectFileType(fileBlob);

      // ایجاد Blob جدید با MIME type تشخیص داده شده
      const typedBlob = new Blob([fileBlob], { type: detectedMimeType });

      const downloadUrl = URL.createObjectURL(typedBlob);
      const link = document.createElement("a");

      link.href = downloadUrl;
      link.download = runFileData?.fileName || `downloaded-file-${Date.now()}`;

      // تنظیم نوع فایل در ویژگی type (اختیاری)
      link.type = detectedMimeType;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("خطا در دانلود فایل:", error);
    }
  };

  return (
    <>
      {openFileModal ? (
        <FileControllers
          handleDownloadFile={() => handleDownloadFile()}
          setZoomFile={(e: any) => setZoomFile(e)}
        />
      ) : null}
      <div
        className={`fixed top-0 right-0 z-50 w-full h-full bg-black bg-opacity-90 ${
          openFileModal ? "block" : "hidden"
        }`}
        onClick={(e: any) => {
          if (e.target === e.currentTarget) {
            dispatch(runFileDataAction({}));
          }
        }}
      >
        <div
          className={`${
            zoomFile ? "scale-y-[1.5] scale-x-[1.7]" : "scale-100"
          } max-h-[80vh] max-w-[90%] w-auto h-auto min-w-[30%] min-h-[30%] flex items-center justify-center z-[999] top-1/2 right-1/2 fixed -translate-y-1/2 translate-x-1/2 transition-all duration-300`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {runFileData?.type === "video" ? (
            <>
              <VideoPlayer openFileModal={openFileModal} />
            </>
          ) : runFileData?.type === "image" ? (
            <>
              <ImageRunner />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default FileRunner;
