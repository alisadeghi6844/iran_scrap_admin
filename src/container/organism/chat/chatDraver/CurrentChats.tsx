import UserDraverCard from "../card/UserDraverCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Typography from "../../../../components/typography/Typography";
import Badge from "../../../../components/badge/Badge";
import { formatDate } from "../../../../utils/MomentConvertor";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSocketOnlineContactUserData } from "../../../../redux/slice/chat/socket/socketSlice";
import { useEffect, useState } from "react";

interface TypingUser {
  userId: string;
}

interface ChatData {
  contactInfo: {
    _id: string;
    firstName: string;
    lastName: string;
    image?: string[];
  };
  lastMessage: string;
  lastMessageTime: string;
}

interface CurrentChatsType {
  currentChatData?: ChatData[];
  isTypingUsers?: TypingUser[];
}

const CurrentChats: React.FC<CurrentChatsType> = (props) => {
  const { currentChatData, isTypingUsers } = props;
  const [tabValue, setTabValue] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const onlineUsers = useSelector(selectSocketOnlineContactUserData);

  const tabsData = [
    {
      label: "تمام گفت و گو ها",
      id: 1,
      notif: "0",
    },
    {
      label: "خصوصی",
      id: 2,
      notif: "5",
    },
    {
      label: "گروه ها",
      id: 3,
      notif: "10",
    },
    {
      label: "کانال ها ",
      id: 4,
      notif: "1",
    },
    {
      label: "دانشگاه",
      id: 5,
      notif: "2",
    },
    {
      label: "فیلم و سریال",
      id: 6,
      notif: "0",
    },
  ];

  return (
    <div>
      <div
        className="mt-4"
        style={{
          boxShadow: "0 2px 2px rgb(114, 114, 114, 0.169)",
        }}
      >
        <div className="px-4">
          <Swiper slidesPerView={"auto"} spaceBetween={0} className="mySwiper">
            {tabsData?.length
              ? tabsData?.map((item: any, index: any) => (
                  <SwiperSlide
                    key={item?.id}
                    className="!w-auto relative"
                    onClick={() => setTabValue(index)}
                  >
                    <div className="px-5 py-3 rounded-t-lg hover:bg-gray-100 transition-all cursor-pointer flex items-center gap-x-2">
                      {item?.notif && item?.notif > 0 ? (
                        <Badge number={item.notif} />
                      ) : null}
                      <Typography className="text-gray-600 font-semibold">
                        {item?.label}
                      </Typography>
                    </div>
                    <div
                      className={`${
                        tabValue === index ? "w-full" : "w-0"
                      } transition-all h-1 absolute bottom-0 right-0 rounded-lg bg-primary-500`}
                    ></div>
                  </SwiperSlide>
                ))
              : null}
          </Swiper>
        </div>
      </div>
      <div className="px-2 mt-4">
        {currentChatData?.map((item: ChatData) => {
          const isTyping = isTypingUsers?.some(
            (typingUser) => typingUser.userId === item?.contactInfo?._id
          );

          // چک کردن آنلاین بودن کاربر
          const isUserOnline = onlineUsers?.onlineContactUsers?.some(
            (user:any) => user._id === item?.contactInfo?._id
          );

          return (
            <UserDraverCard
              key={item.contactInfo._id}
              active={
                searchParams.get("userId")
                  ? searchParams.get("userId") === item?.contactInfo?._id
                  : null
              }
              notif={21}
              id={item?.contactInfo?._id}
              image={item?.contactInfo?.image?.length ?? null}
              title={
                item?.contactInfo?.firstName + " " + item?.contactInfo?.lastName
              }
              date={formatDate(item?.lastMessageTime)}
              isOnline={isUserOnline}
              isTyping={isTyping}
              description={item?.lastMessage}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CurrentChats;