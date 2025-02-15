import { lazy, useEffect, useState } from "react";
import FoodCard from "../../../container/organism/card/FoodCard.tsx";
import Notifications from "../../../container/organism/card/Notifications.tsx";
import FoodReserveTable from "../../../container/organism/calander/table/FoodReserveTable.tsx";
import FoodStatusTable from "../../../container/features/reservationFood/FoodStatus/FoodStatusTable.tsx";
import Modal from "../../../components/modal/index.tsx";
import HttpServises from "../../../api/HttpServises.ts";
import { BASE_URL } from "../../../api/config.ts";
import { GET_ALL_CLIENT_FOODS_POINT } from "../../../redux/api/foodReservation/management/foodShow/FoodShowApi.ts";
import { useSelector } from "react-redux";
import { selectGetTimeData } from "../../../redux/slice/time/TimeSlice.ts";

const GuideFood = lazy(
  () =>
    import(
      /* webpackChunkName: "food-reservation" */ "../../../container/features/reservationFood/GuideFood.tsx"
    )
);

const FooReservationHomePage = () => {
  const [infoModal, setInfoModal] = useState<boolean>(false);

  const [foodData, setFoodData] = useState<any>([]);

  const getDate: any = useSelector(selectGetTimeData);

  useEffect(() => {
    getFoodData();
  }, []);

  const getFoodData = async () => {
    setFoodData([]);
    if (getDate?.data) {
      // استخراج تاریخ و تغییر فرمت
      const dateOnly = getDate.data.split("T")[0].replace(/-/g, "/"); // تبدیل - به /
      try {
        const data = await HttpServises.get(
          `${BASE_URL}${GET_ALL_CLIENT_FOODS_POINT}?date=${dateOnly}`
        );
        setFoodData(data?.data);
      } catch (e) {
        console.log("error", e);
      }
    } else {
      console.log("No date available");
    }
  };

  return (
    <>
      <div className="px-6">
        <FoodStatusTable />
        <div className="mt-8 grid grid-cols-2 gap-x-8">
          <div className="col-span-1">
            <FoodCard
              subTitle={
                foodData?.data?.length
                  ? foodData?.data[0]?.foodId?.length
                    ? foodData?.data[0]?.foodId[0].restaurantId?.name
                    : "رستوران یافت نشد"
                  : "رستوران یافت نشد"
              }
              text={
                foodData?.data?.length
                  ? foodData?.data[0]?.foodId?.map(
                      (item: any, index: any) =>
                        `${item.title} ${
                          index + 1 < foodData?.data[0]?.foodId?.length
                            ? "-"
                            : ""
                        } `
                    )
                  : "غذا یافت نشد !!"
              }
            />
          </div>
          <div className="col-span-1">
            <Notifications />
          </div>
        </div>

        <div className="mt-10">
          <FoodReserveTable setInfoModal={(e: any) => setInfoModal(e)} />
        </div>
      </div>
      <Modal
        open={infoModal}
        onClose={() => setInfoModal(false)}
        size="lg"
        headerTitle="راهنمای رزرو غذا"
      >
        <GuideFood />
      </Modal>
    </>
  );
};

export default FooReservationHomePage;
