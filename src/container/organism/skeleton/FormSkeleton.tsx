import React from "react";
import Skeleton from "../../../components/skeleton/Skeleton";

const FormSkeleton = () => {
  return (
    <div className="w-full mt-8">
    <div className="flex gap-6 w-full">
      <Skeleton height="h-[30px]" width="w-full" className="my-3" />
      <Skeleton height="h-[30px]" width="w-full" className="my-3" />
    </div> 
    <div className="flex gap-6 w-full">
      <Skeleton height="h-[30px]" width="w-full" className="my-3" />
      <Skeleton height="h-[30px]" width="w-full" className="my-3" />
    </div>
    <div className="flex gap-6 w-full">
      <Skeleton height="h-[30px]" width="w-full" className="my-3" />
      <Skeleton height="h-[30px]" width="w-full" className="my-3" />
    </div>
    <div className="flex gap-6 w-full">
      <Skeleton height="h-[30px]" width="w-full" className="my-3" />
      <Skeleton height="h-[30px]" width="w-full" className="my-3" />
    </div>
    <div className="flex w-full justify-end flex-row-reverse">
    <Skeleton height="h-[40px]" width="w-[80px]" className="my-3" />
    </div>
    </div>
  );
};
export default FormSkeleton;
