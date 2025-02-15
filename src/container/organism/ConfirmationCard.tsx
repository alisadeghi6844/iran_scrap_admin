import Button from "../../components/button";
import Spinner from "../../components/loading";
import Typography from "../../components/typography/Typography";
import { ConfirmationCardTypes } from "../../types/organism/ConfirmationCard";

const ConfirmationCard:React.FC<ConfirmationCardTypes> = (props) => {
  const {
    children,
    acceptButtonText,
    rejectButtonText,
    onAccept,
    onReject,
    helperText,
    className,
    isLoading,
    isDisable = false,
    ...rest
  } = props;
  return (
    <div
      className={`flex flex-col justify-center text-center items-center px-1 py-8 ${className}`}
    >
      <div className="flex justify-center items-center w-full" />
      {children}
      <div className="flex mt-8 gap-2">
        {rejectButtonText && (
          <Button
            variant="light"
            size="lg"
            className="bg-gray-100 dark:text-dark-background-paper"
            onClick={onReject}
          >
            {rejectButtonText}
          </Button>
        )}
        <Button
          variant="error"
          size="lg"
          disable={isDisable}
          endIcon={isLoading ? <Spinner className="mr-2" size="xs" /> : null}
          onClick={onAccept}
        >
          {acceptButtonText}
        </Button>
      </div>
      <Typography
        tag="span"
        className="text-sm text-error-500 absolute right-1/2 font-bold translate-x-1/2 bottom-3"
      >
        {helperText ?? null}
      </Typography>
    </div>
  );
};

export default ConfirmationCard;
