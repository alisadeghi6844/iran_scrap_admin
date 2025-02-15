import React from "react";
import Skeleton from "../../../components/skeleton/Skeleton";

const CardSkeleton = () => {
  return (
    <>
      <div className="col-span-3">
        <Skeleton height="h-[300px]" className="my-3" />
      </div>
      <div className="col-span-3">
        <Skeleton height="h-[300px]" className="my-3" />
      </div>
      <div className="col-span-3">
        <Skeleton height="h-[300px]" className="my-3" />
      </div>
      <div className="col-span-3">
        <Skeleton height="h-[300px]" className="my-3" />
      </div>
      <div className="col-span-3">
        <Skeleton height="h-[300px]"/>
      </div>
      <div className="col-span-3">
        <Skeleton height="h-[300px]" />
      </div>
      <div className="col-span-3">
        <Skeleton height="h-[300px]" />
      </div>
      <div className="col-span-3">
        <Skeleton height="h-[300px]" />
      </div>
    </>
  );
};
export default CardSkeleton;
