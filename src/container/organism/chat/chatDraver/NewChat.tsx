import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getPersianTimeFromNow } from "../../../../utils/MomentConvertor";
import ListSkeleton from "../../skeleton/ListSkeleton";
import UserDraverCard from "../card/UserDraverCard";

interface NewChatTypes {
  data: any[];
  loading: boolean;
  fetchNextPage: () => void; // تابعی برای بارگذاری صفحه بعدی
  hasMore: boolean; // برای بررسی وجود داده‌های بیشتر
}

const NewChat: React.FC<NewChatTypes> = ({
  data,
  loading,
  fetchNextPage,
  hasMore,
}) => {
  return (
    <InfiniteScroll
      height="850px"
      dataLength={data.length}
      next={hasMore ? fetchNextPage : undefined} // فقط اگر صفحه بعدی وجود دارد
      hasMore={hasMore}
      loader={loading ? <ListSkeleton /> : null} // نمایش لودینگ در صورت بارگذاری
    >
      <div className="pt-8 pb-24 px-2">
        {data.map((item: any) => (
          <UserDraverCard
            key={item?._id}
            date={null}
            image={
              item?.user[0]?.image?.length ? item?.user[0]?.image?.file : null
            }
            id={item?.user[0]?._id}
            title={`${item?.user[0]?.firstName} ${item?.user[0]?.lastName}`}
            isOnline={item?.status === "online"}
            description={`${
              item?.status === "online"
                ? ""
                : `آخرین بازدید ${
                    getPersianTimeFromNow(item?.lastSeen).timeFromNow
                  }`
            }`}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default NewChat;
