import React from "react";
import { useField } from "formik";
import TextArea from "../../textArea";
import { TextAreaFieldTypes } from "../../../types/components/molcols/TextAreaFieldTypes";

const TextAreaField: React.FC<TextAreaFieldTypes> = (props) => {
  const { label, required, ...rest } = props;
  const [field, { error }, { setValue }] = useField(rest);

  return (
    <TextArea
      errorMessage={error}
      required={required}
      label={label}
      {...field}
      {...rest}
      value={field.value}
      onChange={(e:any) => setValue(e)}
    />
  );
};

export default TextAreaField;
