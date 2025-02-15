import React from "react";

import SingleSelect from "./SingleSelect";
import { useField } from "formik";
import { components } from "react-select";
import { IconOptions } from "./IconOptions";

const IconSelectBox = (props) => {
  const { name, required, handleChangeSelect, ...rest } = props;
  const [field, { error }, { setValue }] = useField(props);

  const options = IconOptions;
  const { Option } = components;
  const IconOption = (props) => (
    <Option {...props} className="p-2">
      <div className="flex items-center gap-x-2">
        <props.data.icon size={18} />
        <span className="text-md">{props.data.label}</span>
      </div>
    </Option>
  );

  return (
    <>
      <SingleSelect
        options={options}
        onChange={(e) => {
          handleChangeSelect && handleChangeSelect(e);
          setValue(e);
        }}
        errorMessage={error}
        required={required}
        value={field.value}
        {...props}
        {...rest}
        components={{ Option: IconOption }}
      />

      {/*  todo: this is render icon code */}
      {/*<div className="selected-icon">*/}
      {/*  <h3>Selected Icon:</h3>*/}
      {/*  <div className="icon-preview">*/}
      {/*    {" "}*/}
      {/*      {selectedIcon && React.createElement(window[selectedIcon.value], { size: 50 })}*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
};
export default IconSelectBox;
