import Typography from "../typography/Typography";
import { AlertTypes } from "../../types/components/AlertTypes";

const Alert: React.FC<AlertTypes> = (props) => {
  const { children, type = "secondary", title, className, ...rest } = props;

  return (
    <div className="w-full flex justify-center">
      <div
        className={`flex p-3 rounded-lg border-2 border-dashed w-full ${
          {
            secondary: "bg-secondary-50 border-secondary-600",
            primary: "bg-primary-100 border-primary-600",
          }[type]
        } 
      ${className ? className : ""}`}
        role="alert"
        {...rest}
      >
        <div className=" mx-4">
          {!!title ? (
            <Typography
              tag="h4"
              className={`max-sm:text-[12px]
                  sm:text-[15px]
                  md:mb-1
                  md:text-[18px]
                  lg:mb-3
                  ${
                    {
                      secondary: "text-secondary-800",
                      primary: "text-primary-800",
                    }[type]
                  } 
                  `}
            >
              {title}
            </Typography>
          ) : null}
          <div
            className={`text-sm font-semibold text-center ${
              {
                secondary: "text-secondary-600",
                primary: "text-primary-600",
              }[type]
            } `}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
