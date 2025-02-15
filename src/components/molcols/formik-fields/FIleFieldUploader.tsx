import React, { useCallback } from "react";
import { useField, FieldHookConfig } from "formik";
import Typography from "../../typography/Typography";
import FileUploader from "../../FileUploader/FileUploader";

interface FileFieldUploaderProps extends FieldHookConfig<any> {
  label?: string;
  required?: boolean;
  [key: string]: any;
}

const FileFieldUploader: React.FC<FileFieldUploaderProps> = (props) => {
  const { label, required, ...rest } = props;
  const [{ error }, { value }, { setValue }] = useField(rest);

  const handleSetUploaderData = useCallback(
    (files: File[]) => {
      if (JSON.stringify(files) !== JSON.stringify(value)) {
        setValue(files);
      }
    },
    [setValue, value]
  );

  return (
    <>
      <Typography className="mb-2">{label ?? null}</Typography>
      <FileUploader
        errorMessage={error}
        required={required}
        label={label}
        {...rest}
        setUploaderData={handleSetUploaderData}
      />
    </>
  );
};

export default FileFieldUploader;
