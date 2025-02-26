import Typography from "../typography/Typography";

const Checkbox = (props:any) => {
  const {
    errorMessage,
    helperText,
    id,
    label,
    onChange: handleChange,
    required,
    value,
    defaultChecked,
    ...rest
  } = props;
  return (
    <div className="flex ">
      <div className="flex items-center h-5">
        <input
          value={value}
          checked={value}
          defaultChecked={defaultChecked ?? false}
          className="cursor-pointer w-4 h-4 accent-primary-500 bg-background-default rounded border-gray-300"
          id={id}
          onChange={(e) => {
            if (handleChange) {
              handleChange(e.target.checked);
            }
          }}
          type="checkbox"
          {...rest}
        />
      </div>
      <div className="mr-2 -mt-1">
        <label
          htmlFor={id}
          className="font-medium text-gray-700 text-[13px] dark:text-dark-text-secondary cursor-pointer"
        >
          {label}
          {required && <span className="text-error-500">*</span>}
        </label>
        <Typography
          id="helper-checkbox-text"
          className={`text-xs ${
            !!errorMessage ? "text-error-500" : "text-text-secondary"
          }`}
        >
          {errorMessage ?? helperText}
        </Typography>
      </div>
    </div>
  );
};

export default Checkbox;
