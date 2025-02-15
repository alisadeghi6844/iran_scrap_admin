import React from "react";
import Skeleton from "../../../components/skeleton/Skeleton";

const ListSkeleton = () => {
  return (
    <div className="w-full mt-8 px-4">
      <div className="flex flex-col gap-5 w-full">
        {[1, 2, 3, 4, 5, 6,7,8].map((item) => (
          <div key={item} className="relative">
            <Skeleton height="h-[80px]" width="w-full" bg="bg-gray-100" />
            <div className="absolute top-2 right-2 flex items-center gap-x-4">
              <div>
                <Skeleton
                  height="h-[60px]"
                  width="w-[60px]"
                  rounded="rounded-full"
                  bg="bg-gray-400"
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <Skeleton
                  height="h-[15px]"
                  width="w-[100px]"
                  bg="bg-gray-300"
                />
                <Skeleton
                  height="h-[15px]"
                  width="w-[150px]"
                  bg="bg-gray-300"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ListSkeleton;
