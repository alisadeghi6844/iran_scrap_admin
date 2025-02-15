import React from "react";
import Avatar from "../../../../components/avatar";
import Badge from "../../../../components/badge/Badge";
import { useSearchParams } from "react-router-dom";

interface UserDraverCardProps {
  title?: string;
  image?: any;
  description?: string;
  notif?: any;
  id?: any;
  isTyping?:any;
  isOnline?: boolean;
  date?: any;
  active?:any;
  [key: string]: any; // برای سایر props
}

const UserDraverCard: React.FC<UserDraverCardProps> = (props) => {
  const {
    title,
    image,
    active,
    isTyping,
    id,
    date,
    description,
    isOnline = false,
    notif,
    ...rest
  } = props;

  const [searchParams, setSearchParams] = useSearchParams();

  const handleClickChat = () => {
    setSearchParams({ userId: id });
  };

  return (
    <div
      className={`flex justify-between items-center px-2 py-3 rounded-xl cursor-pointer transition-all ${active?"bg-primary-500":"bg-transparent hover:bg-gray-100"} `}
      onClick={handleClickChat}
      {...rest}
    >
      <Avatar
      isTyping={isTyping}
      variant={active?"secondary":null}
        image={image}
        title={title}
        description={description}
        isOnline={isOnline}
      />
      <div className="flex flex-col justify-between items-end h-full gap-y-2">
        <div className={`text-[13px]  ${active?"text-white":"text-gray-500"}`}>{date}</div>
        <div>
          {notif && notif > 0 ? (
            <Badge size="md" variant={active?"secondary":"primary"} number={notif < 99 ? notif : "+99"} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default UserDraverCard;
