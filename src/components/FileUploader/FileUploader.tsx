import React, { useEffect, useState, useCallback } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";

// Plugins
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { FileUploaderTypes } from "../../types/components/FileUploaderTypes";
import { Base64ToFile } from "../../utils/Conversions";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
);

const FileUploader: React.FC<FileUploaderTypes> = ({
  name,
  allowMultiple = false,
  acceptedFileTypes,
  imageValidateSizeMaxWidth,
  imageValidateSizeMinWidth,
  imageValidateSizeMaxHeight,
  editImageFile,
  imageValidateSizeMinHeight,
  mode,
  setUploaderData,
  clear = false,
  onreorderfiles,
  maxSize = 1000000,
  errorLabel,
  ...rest
}) => {
  const [files, setFiles] = useState<any>([]);

  useEffect(() => {
    if (editImageFile && editImageFile.length > 0) {
      console.log("editImageFile",editImageFile)
      const newFiles = editImageFile.map((item: any) => {
        if (typeof item.file === "string") {
          // اگر فایل base64 است، آن را به File تبدیل کنید
          const base64String = `data:${item?.contentType};base64,${item?.file}`;
          return Base64ToFile(base64String, item?.fileName);
        }
        // در غیر این صورت، خود فایل را برگردانید
        return item.file;
      });
      setFiles(mode === "update" ? newFiles : []);
    } else {
      setFiles([]); // اگر هیچ فایلی وجود نداشت، آرایه فایل‌ها را خالی کنید
    }
  }, [editImageFile, mode]);

  useEffect(() => {
    if (setUploaderData) {
      setUploaderData(files);
    }
  }, [files, setUploaderData]);

  useEffect(() => {
    if (clear) {
      setFiles([]);
    }
  }, [clear]);

  const handleUpdateFiles = useCallback((items: any[]) => {
    setFiles(items.map((data: any) => data.file));
  }, []);

  return (
    <FilePond
      allowMultiple={allowMultiple}
      maxFiles={8}
      allowRecorder
      files={files}
      allowImageEditor
      imageEditorAllowEdit
      imageEditorWriteImage
      imageValidateSizeMaxWidth={imageValidateSizeMaxWidth}
      imageValidateSizeMinWidth={imageValidateSizeMinWidth}
      imageValidateSizeMaxHeight={imageValidateSizeMaxHeight}
      imageValidateSizeMinHeight={imageValidateSizeMinHeight}
      imageValidateSizeLabelExpectedMinSize={`حداقل سایز فایل بارگذاری شده باید ${imageValidateSizeMaxHeight} * ${imageValidateSizeMaxWidth} باشد`}
      imageValidateSizeLabelExpectedMaxSize={`حداکثر سایز فایل بارگذاری شده باید ${imageValidateSizeMaxHeight} * ${imageValidateSizeMaxWidth} باشد`}
      onupdatefiles={(item) => {
        setFiles(item.map((data) => data.file));
      }}
      labelIdle={`
     فایل خود را در این قسمت بارگذاری کنید
    `}
      allowReorder
      allowFileTypeValidation
      acceptedFileTypes={acceptedFileTypes}
      maxFileSize={maxSize}
      allowImageValidateSize
      labelInvalidField={errorLabel}
      imagePreviewHeight={170}
      imageCropAspectRation="1:1"
      styleLoadIndicatorPosition="center bottom"
      styleProgressIndicatorPosition="right bottom"
      styleButtonProcessItemPosition="right bottom"
      onreorderfiles={onreorderfiles}
      {...rest}
    />
  );
};

export default React.memo(FileUploader);
