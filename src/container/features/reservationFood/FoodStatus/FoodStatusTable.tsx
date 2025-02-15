import { useDispatch, useSelector } from "react-redux";
import StatusFoodCard from "../../../organism/card/StatusFoodCard";
import { useEffect, useState } from "react";
import { getAllClientFoodReserveAction } from "../../../../redux/actions/foodReservation/management/foodReserve/FoodReserveAction";
import {
  selectGetAllClientFoodReserveData,
  selectGetAllClientFoodReserveLoading,
} from "../../../../redux/slice/foodReservation/management/foodReserve/FoodReserveSlice";
import { selectGetTimeData } from "../../../../redux/slice/time/TimeSlice";
import DigitalClock from "../../../organism/calander/DigitalClock";
import Skeleton from "../../../../components/skeleton/Skeleton";

const FoodStatusTable = () => {
  const dispatch: any = useDispatch();

  const [reserved, setReserved] = useState<number>(0);
  const [reserving, setReserving] = useState<number>(0);

  const getDate: any = useSelector(selectGetTimeData);
  const data = useSelector(selectGetAllClientFoodReserveData);
  const loading = useSelector(selectGetAllClientFoodReserveLoading);

  useEffect(() => {
    dispatch(getAllClientFoodReserveAction());
  }, []);

  useEffect(() => {
    if (data?.data?.length) {
      const today = new Date(getDate?.data);
      const todayStart = new Date(today.setHours(23, 59, 59, 59));

      const pastOrToday = data.data.filter((item: any) => {
        const itemDate = new Date(item.date);
        return itemDate <= todayStart;
      });

      const future = data.data.filter((item: any) => {
        const itemDate = new Date(item.date);
        return itemDate > todayStart;
      });

      setReserved(pastOrToday.length);
      setReserving(future.length);
    }
  }, [data, getDate]);

  return (
    <>
      <div className="grid grid-cols-12 gap-x-8 pt-[106px]">
        {loading ? (
          <>
            <div className="col-span-3">
              <Skeleton height="h-[105px]" width="w-full" className="my-3" />
            </div>
            <div className="col-span-3">
              <Skeleton height="h-[105px]" width="w-full" className="my-3" />
            </div>{" "}
            <div className="col-span-3">
              <Skeleton height="h-[105px]" width="w-full" className="my-3" />
            </div>{" "}
            <div className="col-span-3">
              <Skeleton height="h-[105px]" width="w-full" className="my-3" />
            </div>
          </>
        ) : (
          <>
            <div className="col-span-3">
              <StatusFoodCard
                number={reserved}
                title="صرف شده"
                variant="primary"
              />
            </div>
            <div className="col-span-3">
              <StatusFoodCard
                number={reserving}
                title="رزرو شده"
                variant="success"
              />
            </div>
            <div className="col-span-3">
              <StatusFoodCard
                number={reserving + reserved}
                title="کل رزرو شده ها"
                variant="warning"
              />
            </div>
            <div className="col-span-3">
              <DigitalClock />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FoodStatusTable;
