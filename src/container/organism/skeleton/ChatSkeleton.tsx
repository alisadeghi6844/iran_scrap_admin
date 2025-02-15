import Skeleton from "../../../components/skeleton/Skeleton";

const ChatSkeleton = () => {
  return (
    <div className="flex flex-col pb-4 justify-end w-full h-auto min-h-full pt-[100px] gap-y-2">
      <div className={`flex h-auto justify-start w-full`}>
        <div>
          <Skeleton width="w-[350px]" height="h-[50px]" bg="bg-gray-400" />
        </div>
      </div>
      <div className={`flex h-auto justify-end w-full`}>
        <div>
          <Skeleton width="w-[350px]" height="h-[50px]" bg="bg-gray-400" />
        </div>
      </div>
     
      <div className={`flex h-auto justify-start w-full`}>
        <div>
          <Skeleton width="w-[350px]" height="h-[50px]" bg="bg-gray-400" />
        </div>
      </div>
      
      <div className={`flex h-auto justify-end w-full`}>
        <div>
          <Skeleton width="w-[350px]" height="h-[50px]" bg="bg-gray-400" />
        </div>
      </div>
      <div className={`flex h-auto justify-start w-full`}>
        <div>
          <Skeleton width="w-[350px]" height="h-[50px]" bg="bg-gray-400" />
        </div>
      </div>
      <div className={`flex h-auto justify-end w-full`}>
        <div>
          <Skeleton width="w-[350px]" height="h-[50px]" bg="bg-gray-400" />
        </div>
      </div>
      <div className={`flex h-auto justify-start w-full`}>
        <div>
          <Skeleton width="w-[350px]" height="h-[50px]" bg="bg-gray-400" />
        </div>
      </div>
      <div className={`flex h-auto justify-end w-full`}>
        <div>
          <Skeleton width="w-[350px]" height="h-[50px]" bg="bg-gray-400" />
        </div>
      </div>
      <div className={`flex h-auto justify-start w-full`}>
        <div>
          <Skeleton width="w-[350px]" height="h-[50px]" bg="bg-gray-400" />
        </div>
      </div>
      <div className={`flex h-auto justify-end w-full`}>
        <div>
          <Skeleton width="w-[350px]" height="h-[50px]" bg="bg-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default ChatSkeleton;
