import Skeleton from "../../../components/skeleton/Skeleton";

const TableSkeleton = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <Skeleton height="h-[30px]" className="my-3" />
      <Skeleton height="h-[30px]" className="my-3" />
      <Skeleton height="h-[30px]" className="my-3" />
      <Skeleton height="h-[30px]" className="my-3" />
      <Skeleton height="h-[30px]" className="my-3" />
    </div>
  );
};
export default TableSkeleton;
