import React from "react";
import { useField } from "formik";
import TiptapEditor from "../../tiptap/TiptapEditor";

interface TiptapFieldProps {
  name: string;
  label?: string;
  required?: boolean;
  helperText?: string;
}

const TiptapField: React.FC<TiptapFieldProps> = (props) => {
  const { label, required, ...rest } = props;
  const [field, { error }, { setValue }] = useField(rest);

  return (
    <TiptapEditor
      errorMessage={error}
      required={required}
      label={label}
      value={field.value}
      onChange={(val) => setValue(val)}
      {...rest}
    />
  );
};

export default TiptapField;
