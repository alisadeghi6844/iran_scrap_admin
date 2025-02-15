import React, { useState } from "react";
import { useField } from "formik";
import Input from "../../input/index";
import { useFormikContext } from "formik";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";

interface InputPasswordFieldTypes{
  label?:string;
  required?:boolean
}

const InputPasswordField:React.FC<InputPasswordFieldTypes> = (props) => {
  const { label, required, ...rest } = props;

  const [field, { error }] = useField(rest);
  const { setFieldTouched, touched } = useFormikContext();

  const [showPassword, setShowPassword] = useState(false);
  const showPasswordHandler = () => {
    setShowPassword((p) => !p);
  };

  return (
    <label htmlFor={field.name} className="relative block">
      <Input
        errorMessage={touched[field.name] && error}
        required={required}
        label={label}
        type={showPassword ? "text" : "password"}
        value={field?.value ? field?.value : ""}
        onBlur={() => setFieldTouched(field.name)}
        {...rest}
        {...field}
      />
      <div onClick={showPasswordHandler}>
        {showPassword ? (
          <BsFillEyeSlashFill className="absolute left-4 top-[12px] text-xl cursor-pointer text-gray-500" />
        ) : (
          <BsFillEyeFill className="absolute left-4 top-[12px] text-xl cursor-pointer text-gray-500" />
        )}
      </div>
    </label>
  );
};

export default InputPasswordField;
