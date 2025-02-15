import { useEffect, useState } from "react";
import Image from "../../../../components/image";
import { getFileExtension } from "../../../../utils/FileType";
import Typography from "../../../../components/typography/Typography";
import TextOverflow from "../../../../utils/TextOverflow";
import { Tooltip } from "react-tooltip";

interface FileThumbnialTypes {
  fileName?: string;
  fileSize?: any;
  status?: any;
  boxImage?: boolean;
  itemBox?: any;
  handleClickFile?: any;
}

const FileThumbnail: React.FC<FileThumbnialTypes> = (props) => {
  const {
    fileName,
    fileSize,
    handleClickFile,
    boxImage = false,
    itemBox,
    status = "download",
  } = props;

  const [fileTypeState, setFileTypeState] = useState("");

  useEffect(() => {
    const getFileType = async () => {
      if (fileName) {
        const fileType: any = await getFileExtension(fileName);
        setFileTypeState(fileType);
      }
    };

    getFileType();
  }, [fileName]);
  return (
    <div
      className="flex w-full items-center gap-x-3 cursor-pointer"
      onClick={() => {
       handleClickFile();
      }}
    >
      {/* {boxImage ? (
        <>
          <div className="w-[90px] bg-primary-500 h-[70px] rounded-lg flex flex-col justify-center items-center">
            <div className="-mt-2">{itemBox}</div>
          </div>
        </>
      ) : ( */}
      <Image
        src={`/images/office/${
          fileTypeState === "zip"
            ? "zip"
            : fileTypeState === "pdf"
            ? "pdf-file"
            : fileTypeState === "rar"
            ? "zip"
            : fileTypeState === "ppt"
            ? "powerpoint"
            : fileTypeState === "pptx"
            ? "powerpoint"
            : fileTypeState === "xls" || fileTypeState === "xlsx"
            ? "excel"
            : fileTypeState === "doc" || fileTypeState === "docx"
            ? "word"
            : "file"
        }.png`}
        className="w-[48px] h-[48px] rounded"
      />
      {/* )} */}

      <div className="flex flex-col h-full w-full gap-y-1">
        <Typography
          data-tooltip-id="file_name"
          data-tooltip-content={fileName}
          style={{
            display: "inline-block",
            maxWidth: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            direction: "rtl", // برای راست به چپ بودن متن
          }}
          className="text-sm font-bold"
        >
          <TextOverflow number={40}>{fileName}</TextOverflow>
        </Typography>
        <Tooltip id="file_name" />
        <Typography className="text-xs text-gray-800">{fileSize}</Typography>
      </div>
      {boxImage ? <div className="mx-1">{itemBox}</div> : null}
    </div>
  );
};

export default FileThumbnail;
