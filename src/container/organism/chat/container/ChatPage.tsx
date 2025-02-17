import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import animation1 from "../../../../../public/lottie/Chat_Image.json";
import animation2 from "../../../../../public/lottie/Empty-chat.json";
import animation3 from "../../../../../public/lottie/Chat_Image_2.json";
import Typography from "../../../../components/typography/Typography";
import {
  selectGetSendMessageData,
  selectRemoveSendMessageData,
  selectRunFileDataData,
  selectSocketProgressUploadData,
} from "../../../../redux/slice/chat/socket/socketSlice";
import {
  selectGetContactByIdData,
  selectGetMessagesData,
  selectGetMessagesLoading,
} from "../../../../redux/slice/chat/users/UsersChatSlice";
import { getMessagesAction } from "../../../../redux/actions/chat/users/UsersChatActions";
import { renderMessages } from "../renderChat/RenderChat";
import { selectGetCurrentUserData } from "../../../../redux/slice/account/AccountSlice";
import { IoChevronDown } from "react-icons/io5";
import Button from "../../../../components/button";
import Spinner from "../../../../components/loading";
import FileRunner from "./FileRunner";

const userAnimations = [animation1, animation2, animation3];

const ChatPage = () => {
  const [searchParams] = useSearchParams();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const lastScrollHeightRef = useRef<number>(0);
  const lastScrollTopRef = useRef<number>(0);
  const dispatch: any = useDispatch();
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const currentUserData = useSelector(selectGetContactByIdData);
  const chatData = useSelector(selectGetSendMessageData);
  const chatRemoveData = useSelector(selectRemoveSendMessageData);
  const getMessagesData = useSelector(selectGetMessagesData);
  const getMessagesLoading = useSelector(selectGetMessagesLoading);
  const myData = useSelector(selectGetCurrentUserData);
  const runFileData = useSelector(selectRunFileDataData);

  const [data, setData] = useState<any>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const randomIndex = Math.floor(Math.random() * userAnimations.length);
  const animationData = userAnimations[randomIndex];

  const uploadProgress = useSelector(selectSocketProgressUploadData);

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [openFileModal, setOpenFileModal] = useState<any>(false);

  useEffect(() => {
    const userId = searchParams.get("userId");
    if (userId !== currentUserId) {
      setCurrentUserId(userId);
      setIsInitialLoad(true);
      setData([]);
    }
  }, [searchParams.get("userId")]);

  useEffect(() => {
    let mounted = true;

    const initializeChat = async () => {
      const userId = searchParams.get("userId");
      if (userId && mounted) {
        await dispatch(
          getMessagesAction({
            userId,
            pageSize: 20,
          })
        );
      }
    };

    initializeChat();

    return () => {
      mounted = false;
    };
  }, [currentUserId]);


  useEffect(() => {
    if (getMessagesData?.data) {
      setData((prevData: any) => {
        const uniqueMessages = getMessagesData.data.filter(
          (newMessage: any) =>
            !prevData.some((message: any) => message._id === newMessage._id) &&
            newMessage.isDeleted === false // فقط پیام‌های غیرحذف‌شده
        );
        const newData = [...prevData, ...uniqueMessages];
  
        if (isInitialLoad) {
          scrollToBottom();
          requestAnimationFrame(() => {
            if (scrollRef.current) {
              setTimeout(() => {
                setIsInitialLoad(false);
              }, 100);
            }
          });
        }
        return newData;
      });
  
      setHasMore(getMessagesData.page < getMessagesData.totalPages);
  
      if (!isInitialLoad) {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
          const currentScrollTop = scrollContainer.scrollTop;
          const currentScrollHeight = scrollContainer.scrollHeight;
  
          requestAnimationFrame(() => {
            const newScrollHeight = scrollContainer.scrollHeight;
            const scrollDiff = newScrollHeight - currentScrollHeight;
            scrollContainer.scrollTop = currentScrollTop + scrollDiff;
          });
        }
      }
    }
  }, [getMessagesData,chatRemoveData]);
  

  useEffect(() => {
    if (data.length > 0 && isInitialLoad) {
      requestAnimationFrame(() => {
        scrollToBottom();
        setTimeout(() => {
          setIsInitialLoad(false);
        }, 100);
      });
    }
  }, [data.length]);
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer && lastScrollHeightRef.current > 0) {
      const newScrollHeight = scrollContainer.scrollHeight;
      const scrollDiff = newScrollHeight - lastScrollHeightRef.current;

      if (scrollDiff > 0) {
        scrollContainer.scrollTop = lastScrollTopRef.current + scrollDiff + 15;
      }

      lastScrollHeightRef.current = 0;
      lastScrollTopRef.current = 0;
    }
  }, [data.length]);

  useEffect(() => {
    if (chatData) {
      setData((prevData: any) => {
        // بررسی وجود پیام در آرایه قبلی
        const existingMessageIndex = prevData.findIndex(
          (message: any) => message._id === chatData._id
        );

        if (existingMessageIndex === -1) {
          // اگر پیام جدید است، به ابتدای آرایه اضافه کنید
          return [chatData, ...prevData];
        } else {
          // اگر پیام از قبل وجود دارد، آن را جایگزین کنید
          const updatedData = [...prevData];
          updatedData[existingMessageIndex] = chatData;
          return updatedData;
        }
      });

      requestAnimationFrame(scrollToBottom);
    }
  }, [chatData]);

  const scrollToBottom = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      try {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "instant",
        });

        setShowScrollButton(false);
      } catch (error) {
        console.error("Scroll error:", error);
      }
    }
  }, [getMessagesData]);

  const fetchNextPage = async () => {
    if (getMessagesData?.page < getMessagesData?.totalPages && !isLoading) {
      setIsLoading(true);

      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
        lastScrollHeightRef.current = scrollContainer.scrollHeight;
        lastScrollTopRef.current = scrollContainer.scrollTop;
      }

      try {
        await dispatch(
          getMessagesAction({
            userId: searchParams.get("userId"),
            page: getMessagesData.page + 1,
            pageSize: 20,
          })
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleScroll = useCallback(
    (event: any) => {
      const container = event.target;
      const { scrollTop, scrollHeight, clientHeight } = container;

      // محاسبه فاصله از پایین
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

      // نمایش دکمه اسکرول اگر فاصله از پایین بیشتر از 100 پیکسل باشد
      setShowScrollButton(distanceFromBottom > 100);

      // چک کردن برای لود بیشتر پیام‌ها
      if (scrollTop < 50 && hasMore && !isLoading) {
        fetchNextPage();
      }
    },
    [hasMore, isLoading]
  );

  useEffect(() => {
    if (runFileData?.fileId?.length) {
      setOpenFileModal(true);
    } else {
      setOpenFileModal(false);
    }
  }, [runFileData?.fileId]);

  useEffect(() => {
    if (chatRemoveData.length > 0) {
      setData((prevData: any) => {
        const filteredData = prevData.filter(
          (item: any) => !chatRemoveData.some((removeItem: any) => removeItem.fileId === item._id)
        );
        return filteredData;
      });
    }
  }, [chatRemoveData]);

  return (
    <div className="h-full relative ">
      {!data.length && !getMessagesLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-[380px] h-[380px] flex flex-col justify-center items-center rounded-3xl bg-white bg-opacity-50 backdrop-blur-lg border p-4">
            <div className="text-center flex flex-col gap-y-2 mt-6">
              <Typography className="text-lg font-bold">
                هنوز پیامی در اینجا وجود ندارد ...
              </Typography>
              <Typography className="text-gray-600">
                برای ایجاد گفت و گو پیامی ارسال کنید.
              </Typography>
            </div>
            <Lottie
              animationData={animationData}
              loop={true}
              style={{ width: 320, height: 320 }}
            />
          </div>
        </div>
      ) : (
        <div className="h-full relative">
          <div
            ref={scrollContainerRef}
            className="h-full overflow-auto"
            style={{ scrollBehavior: "auto" }}
            onScroll={handleScroll}
          >
            <div className="flex flex-col-reverse min-h-full">
              <div
                ref={scrollRef}
                className={`w-full ${
                  isLoading ? "pt-[22px]" : "pt-[120px]"
                } px-4 pb-2 space-y-1`}
              >
                {data &&
                  renderMessages({
                    data,
                    currentUserData,
                    userId: searchParams.get("userId"),
                    myData,
                    uploadProgress,
                  })}
              </div>
              {isLoading && (
                <div className="pt-[115px] w-full flex justify-center items-center">
                  <Spinner />
                </div>
              )}
            </div>
          </div>

          {showScrollButton && (
            <Button
              className="w-12 h-12 fixed z-50 bottom-20 flex justify-center items-center -mr-3 bg-black rounded-full shadow-lg transition-all duration-300 hover:bg-gray-100"
              variant="secondary"
              circle
              size="auto"
              onClick={scrollToBottom}
            >
              <IoChevronDown className="text-3xl text-primary" />
            </Button>
          )}
        </div>
      )}
      <FileRunner openFileModal={openFileModal}/>
    </div>
  );
};

export default ChatPage;
