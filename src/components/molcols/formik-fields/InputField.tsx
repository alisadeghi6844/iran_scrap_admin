import React, { forwardRef } from "react";
import { useField } from "formik";
import { InputFieldsTypes } from "../../../types/components/molcols/InputFieldsTypes";
import Input from "../../input";

const InputField = forwardRef<HTMLInputElement, InputFieldsTypes>(
  (props, ref) => {
    const { label, required, onInputChange, ...rest } = props;
    const [field, { error }] = useField(rest);

    return (
      <Input
        ref={ref} // انتقال ref به Input
        errorMessage={error}
        required={required}
        label={label}
        {...field}
        {...rest}
      />
    );
  }
);

export default InputField;
