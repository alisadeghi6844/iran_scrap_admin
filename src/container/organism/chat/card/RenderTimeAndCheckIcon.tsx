import { FiCheck } from "react-icons/fi";

const RenderTimeAndCheckIcon = ({
  isCurrentUser,
  time,
  contentType,
  message,
}: {
  isCurrentUser: any;
  time: any;
  contentType?: any;
  message?: any;
}) => {
  const timePositionClass = isCurrentUser ? "left-2" : "right-2";
  const checkIconClass2 = isCurrentUser ? "right-2 text-primary-600" : "hidden";

  const timeClass = `${
    (contentType === "video" || contentType === "image") && !message
      ? `bg-gray-700 rounded-lg px-1 py-[1px]  text-white`
      : ` ${isCurrentUser ? "text-primary-600" : "text-gray-600"}`
  } absolute text-[12.5px] flex items-center ${timePositionClass} bottom-[5px]`;

  const checkIconClass: string = `${
    (contentType === "video" || contentType === "image") && !message
      ? `bg-gray-700 rounded-lg px-1 py-[1px]  text-white`
      : ` ${isCurrentUser ? "text-primary-600" : "text-gray-600"}`
  } absolute text-[18px] flex items-center ${checkIconClass2} bottom-[4px]`;

  return (
    <>
      <div className={timeClass}>
        <div>{time}</div>
      </div>
      <div className={checkIconClass}>
        <FiCheck />
      </div>
    </>
  );
};

export default RenderTimeAndCheckIcon;
