import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ChatHeader from "../../../organism/chat/container/ChatHeader";
import { useDispatch, useSelector } from "react-redux";
import { getContactByIdAction } from "../../../../redux/actions/chat/users/UsersChatActions";
import {
  selectGetContactByIdData,
  selectGetContactByIdLoading,
} from "../../../../redux/slice/chat/users/UsersChatSlice";

const ChatHeaderFeature = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [userData, setUserData] = useState<any>({});

  const getUserData = useSelector(selectGetContactByIdData);
  const getUserLoading = useSelector(selectGetContactByIdLoading);

  const dispatch: any = useDispatch();

  useEffect(() => {
    if (searchParams.get("userId")?.length) {
      dispatch(
        getContactByIdAction({
         userId: searchParams.get("userId") 
        })
      );
    }
  }, [searchParams.get("userId")]);

  useEffect(() => {
    setUserData(getUserData?.data);
  }, [getUserData]);

  return (
    <>
      <ChatHeader loading={getUserLoading} userData={userData} />
    </> 
  );
};

export default ChatHeaderFeature;
