import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewChat from "../../../organism/chat/chatDraver/NewChat";
import { getAllUsersChatAction } from "../../../../redux/actions/chat/users/UsersChatActions";
import {
  selectGetAllUsersChatData,
  selectGetAllUsersChatLoading,
} from "../../../../redux/slice/chat/users/UsersChatSlice";
import useDebounce from "../../../../hooks/UseDebounce";

interface NewChatFeatureTypes {
  draverStatus?: any;
  searchValue?: string;
}

const NewChatFeature: React.FC<NewChatFeatureTypes> = (props) => {
  const { draverStatus, searchValue } = props;
  const userData = useSelector(selectGetAllUsersChatData);
  const dataLoading = useSelector(selectGetAllUsersChatLoading);
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);

  const fetchNextPage = () => {
    if (userData?.page < userData?.totalPages) {
      dispatch(getAllUsersChatAction({ page: Number(userData?.page) + 1 }));
    }
  };

  useEffect(() => {
    dispatch(getAllUsersChatAction({ pageSize: 10 }));
  }, [dispatch]);

  useEffect(() => {
    if (draverStatus === "currentChats") {
      setData([]);
    }
  }, [draverStatus]);

  useEffect(() => {
    if (userData?.data?.length) {
      setData((prev: any) => {
        const updatedData = [...prev];
        const existingIds = new Set(updatedData.map((item) => item._id));
        const newData = userData.data.filter(
          (item: any) => !existingIds.has(item._id)
        );
        updatedData.push(...newData);
        return updatedData;
      });
    }
  }, [userData]);

  useDebounce(
    () => {
      handleFilterContacts(searchValue);
    },
    [searchValue],
    1000
  );

  const handleFilterContacts = (item: any) => {
    setData([]);
    // ارسال درخواست با مقدار خالی اگر item خالی باشد
    dispatch(getAllUsersChatAction({ search: item || "", pageSize: 10 }));
  };

  return (
    <div className="scroll-container" style={{ height: "calc(100vh - 60px)" }}>
      <div className="space-y-2">
        <NewChat
          loading={dataLoading}
          data={data}
          fetchNextPage={fetchNextPage}
          hasMore={userData?.page < userData?.totalPages}
        />
      </div>
    </div>
  );
};

export default NewChatFeature;
