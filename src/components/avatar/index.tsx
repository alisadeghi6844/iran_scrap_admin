import React from "react";
import { AvatarTypes } from "../../types/components/AvatarTypes";
import Image from "../image";
import Typography from "../typography/Typography";
import TextOverflow from "../../utils/TextOverflow";
import CircleAnimateIcon from "../icon/CircleAnimateIcon";

const Avatar: React.FC<AvatarTypes> = (props) => {
  const {
    image,
    isTyping,
    title,
    variant,
    description,
    isOnline = false,
    size = "lg",
    ...rest
  } = props;

  const colors = [
    "linear-gradient(135deg, #FF6F61, #FFB88C)", // گرادینت اول
    "linear-gradient(135deg, #6DD5ED, #2193B0)", // گرادینت دوم
    "linear-gradient(135deg, #FF9A9E, #fad0c4)", // گرادینت سوم
    "linear-gradient(135deg, #FAD0C4, #FFD1A4)", // گرادینت چهارم
    "linear-gradient(135deg, #FFB88C, #FF6F61)", // گرادینت پنجم
    "linear-gradient(135deg, #84fab0, #8fd3f4)", // گرادینت ششم
    "linear-gradient(135deg, #FFC3A0, #FF677D)", // گرادینت هفتم
    "linear-gradient(135deg, #D9AFD9, #97D9E1)", // گرادینت هشتم
    "linear-gradient(135deg, #F6D365, #FDA085)", // گرادینت نهم
    "linear-gradient(135deg, #A18CD1, #FBC2EB)", // گرادینت دهم
    "linear-gradient(135deg, #FF758C, #FF7EB3)", // گرادینت یازدهم
  ];
  // تابعی برای تعیین رنگ بر اساس عنوان
  const getColorByTitle = (title: string) => {
    const index = title.charCodeAt(0) % colors.length; // استفاده از کاراکتر اول عنوان برای تعیین رنگ
    return colors[index];
  };

  return (
    <div className="flex gap-x-2 items-center">
      <div
        className={`${
          size === "lg"
            ? "w-[60px] h-[60px]"
            : size === "md"
            ? "w-[54px] h-[54px]"
            : "w-[60px] h-[60px]"
        } rounded-full relative`}
      >
        {image ? (
          <Image
            src={image}
            className={`
            rounded-full
            w-full h-full
            `}
          />
        ) : (
          <div
            className={`w-full h-full rounded-full flex items-center justify-center text-lg font-bold text-white`}
            style={{ background: getColorByTitle(title || "") }}
          >
            {title?.length ? title?.slice(0, 1) : null}
          </div>
        )}
        {isOnline && description?.length ? (
          <div className="absolute bottom-0 left-0">
            <CircleAnimateIcon />
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-y-1">
        <Typography
          className={`font-semibold ${
            variant === "secondary" ? "text-white" : "text-gray-900"
          } ${
            size === "lg"
              ? "text-lg"
              : size === "md"
              ? "text-[15px]"
              : "text-lg"
          }`}
        >
          <TextOverflow number={35}>{title ?? "_"}</TextOverflow>
        </Typography>
        <Typography
          className={`h-[20px] ${
            size === "lg"
              ? "text-[15px]"
              : size === "md"
              ? "text-[14px]"
              : "text-[15px]"
          } ${
            isTyping
              ? "text-gray-600"
              : description
              ? `${variant === "secondary" ? "text-white" : "text-gray-600"}`
              : isOnline
              ? "text-success-500"
              : "text-error-500"
          }`}
        >
          {isTyping ? (
            <div
              className={`flex items-center gap-x-2 ${
                variant === "secondary" ? "text-white" : "text-primary-500"
              }`}
            >
              <div> درحال نوشتن</div>
              <div className="flex gap-x-1">
                <div
                  className={`h-1 w-1 ${
                    variant === "secondary" ? "bg-white" : "bg-primary-500"
                  } rounded-full custom-bounce`}
                ></div>
                <div
                  className={`h-1 w-1 ${
                    variant === "secondary" ? "bg-white" : "bg-primary-500"
                  } rounded-full custom-bounce`}
                ></div>
                <div
                  className={`h-1 w-1 ${
                    variant === "secondary" ? "bg-white" : "bg-primary-500"
                  } rounded-full custom-bounce`}
                ></div>
              </div>
            </div>
          ) : (
            <TextOverflow number={30}>
              {description ? description : isOnline ? "آنلاین" : "آفلاین"}
            </TextOverflow>
          )}
        </Typography>
      </div>
    </div>
  );
};

export default Avatar;
