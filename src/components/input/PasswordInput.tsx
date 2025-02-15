import React, { forwardRef, useEffect, useState } from "react";
import { useField } from "formik";
import { InputFieldsTypes } from "../../types/components/molcols/InputFieldsTypes";
import Input from ".";
import PasswordStrengthBar from "react-password-strength-bar";

const PasswordInput = forwardRef<HTMLInputElement, InputFieldsTypes>(
  (props, ref) => {
    const { label, required, onInputChange, ...rest } = props;
    const [field,value, { error }] = useField(rest);
    const [passwordData, setPasswordData] = useState<any>("");

    useEffect(()=>{
        setPasswordData(value?.value)
    },[value]);

    return (
      <>
        <Input
          ref={ref} // انتقال ref به Input
          errorMessage={error}
          required={required}
          label={label}
          {...field}
          {...rest}
        />
        <PasswordStrengthBar password={passwordData} />
      </>
    );
  }
);

export default PasswordInput;
