import React, { useEffect, useState } from "react";
import FoodImageCard from "../../organism/card/FoodImageCard";

// Import Swiper styles

import CategoryCards from "./CategoryCards";
import { useDispatch, useSelector } from "react-redux";
import { getAllClientFoodsAction } from "../../../redux/actions/foodReservation/management/foodShow/FoodShowAction";
import { convertPersianToGregorian } from "../../../utils/MomentConvertor";
import {
  selectGetAllClientFoodsData,
  selectGetAllClientFoodsLoading,
} from "../../../redux/slice/foodReservation/management/foodShow/FoodShowSlice";
import CollectionControls from "../../organism/CollectionControls";
import CardSkeleton from "../../organism/skeleton/CardSkeleton";
import { useSearchParams } from "react-router-dom";
import EmptyImage from "../../../components/image/EmptyImage";
import Modal from "../../../components/modal";
import Appetizer from "./Appetizer";
import { deleteClientFoodReserveAction } from "../../../redux/actions/foodReservation/management/foodReserve/FoodReserveAction";

interface FoodReserveTypes {
  currentWeekData?: any;
  time?: any;
}

const FoodReserve: React.FC<FoodReserveTypes> = (props) => {
  const { currentWeekData, time } = props;

  const foodData: any = useSelector(selectGetAllClientFoodsData);
  const foodLoading: any = useSelector(selectGetAllClientFoodsLoading);
  const [active, setActive] = useState<boolean>(false);
  const [openFood, setOpenFood] = useState<boolean>(false);

  const [data, setData] = useState<any>([]);
  const [selectedFood, setSelectedFood] = useState<any>({});

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch: any = useDispatch();

  useEffect(() => {
    if (currentWeekData) {
      const gregorian = convertPersianToGregorian(currentWeekData);
      dispatch(getAllClientFoodsAction({ date: gregorian }));
    }
  }, [currentWeekData]);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      const filterCategory = foodData?.data?.length
        ? foodData?.data[0]?.foodId.filter((item: any) =>
            item?.categoriesId?.some((c: any) => c._id === category)
          )
        : [];
      setData(filterCategory);
    } else {
      if (foodData?.data?.length) {
        setData(foodData?.data[0]?.foodId);
      } else {
        setData([]);
      }
    }
  }, [searchParams.get("category"), foodData]);

  useEffect(() => {
    // از تاریخ سرور به عنوان مبنای زمان حال استفاده می‌کنیم
    if (!time?.data) return; // اگر هنوز تاریخ از سرور نیامده، برگرد
    
    const serverCurrentTime = new Date(time.data);
    const currentDate = new Date(convertPersianToGregorian(currentWeekData));
    const givenDate = new Date(time.data); // همان تاریخ سرور

    const isSameDay =
        currentDate.getDate() === givenDate.getDate() &&
        currentDate.getMonth() === givenDate.getMonth() &&
        currentDate.getFullYear() === givenDate.getFullYear();

    const isYesterday = 
        new Date(currentDate.setHours(0,0,0,0)).getTime() - 
        new Date(givenDate.setHours(0,0,0,0)).getTime() === 86400000;

    // از ساعت سرور برای مقایسه استفاده می‌کنیم
    const shouldBeDisabled = isSameDay || (isYesterday && serverCurrentTime.getHours() >= import.meta.env.VITE_APP_BEFORE_DAY_HOURS);
    
    setActive(!shouldBeDisabled);

}, [time, currentWeekData]);




  const handleSelectFood = (item: any) => {
    setOpenFood(true);
    setSelectedFood(item);
  };

  useEffect(() => {
    setOpenFood(false);
  }, [data]);

  const handleRemoveFood = (item: any) => {
    dispatch(
      deleteClientFoodReserveAction({
        credentials: item._id,
        date:foodData?.data[0]?.date,
        query: convertPersianToGregorian(currentWeekData),
      })
    );
  };

  return (
    <div className="mt-6 px-12">
      <CategoryCards />
      <CollectionControls hasBox={false}>
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          {foodLoading ? (
            <CardSkeleton />
          ) : (
            <>
              {data?.length ? (
                data?.map((item: any) => (
                  <div className="col-span-4">
                    <FoodImageCard
                      selectFood={item?.reserved}
                      handleSelectFood={() =>
                        item?.reserved
                          ? handleRemoveFood(item)
                          : handleSelectFood(item)
                      }
                      active={active}
                      restaurant={item?.restaurantId?.name}
                      categories={item?.categoriesId}
                      base64
                      title={
                        item?.reserved ? `${item?.title} ${item?.appetizer?.title?` + ${item?.appetizer?.title}`:""}` ?? "_" : item?.title ?? "_"
                      }
                      image={item?.image?.length ? item?.image[0]?.file : null}
                      description={item?.description ?? "_"}
                    />
                  </div>
                ))
              ) : (
                <div className="mt-6 col-span-12 w-full flex items-center justify-center">
                  <EmptyImage />
                </div>
              )}
            </>
          )}
        </div>
      </CollectionControls>
      <Modal size="2xl" open={openFood} onClose={() => setOpenFood(false)}>
        <Appetizer selectedFood={selectedFood} time={currentWeekData} />
      </Modal>
    </div>
  );
};
export default FoodReserve;
