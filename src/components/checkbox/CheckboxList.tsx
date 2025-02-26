import Typography from "../typography/Typography";

const CheckboxList = (props:any) => {
  const { children, errorMessage, helperText, label, required, ...rest } =
    props;
  return (
    <div className="w-full" {...rest}>
      <label
        htmlFor={label}
        className="text-start text-text-primary dark:text-dark-text-secondary"
      >
        {label}
        {required && <span className="text-error-500">*</span>}
      </label>
      <ul className="items-start w-full text-text-primary bg-background-paper dark:bg-dark-background-paper rounded-lg sm:flex">
        {children}
      </ul>
      <Typography
        className={`text-xs ${
          !!errorMessage ? "text-error-500 " : "text-text-secondary"
        }`}
      >
        {!!errorMessage ? errorMessage : helperText}
      </Typography>
    </div>
  );
};

export default CheckboxList;
