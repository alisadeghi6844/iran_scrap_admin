import React, { useEffect, useRef } from "react";
import Typography from "../../../components/typography/Typography";
import FoodCategoryCard from "../../organism/card/FoodCategoryCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllFoodCategoryAction } from "../../../redux/actions/foodReservation/management/category/CategoriesAction";
import {
  selectGetAllFoodCategoryData,
  selectGetAllFoodCategoryLoading,
} from "../../../redux/slice/foodReservation/management/category/CategoriesSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaChevronLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronRight } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import Skeleton from "../../../components/skeleton/Skeleton";

const CategoryCards = () => {
  const dispatch: any = useDispatch();

  const swiperRef: any = useRef(null); // مرجع به اسلایدر

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };
  const categoryData: any = useSelector(selectGetAllFoodCategoryData);
  const categoryLoading: boolean = useSelector(selectGetAllFoodCategoryLoading);

  const categoryShowItems: number = 5;

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(getAllFoodCategoryAction({ pageSize: 1000 }));
  }, []);

  const handleClickCategory = (item: any) => {
    setSearchParams((params) => {
      if (item?._id === searchParams.get("category")) {
        params.set("category", "");
      } else {
        params.set("category", item?._id);
      }

      return params;
    });
  };

  useEffect(() => {}, [searchParams.get("category")]);

  return (
    <div>
      <Typography className="font-bold text-xl text-gray-700">
        دسته بندی
      </Typography>
      {categoryLoading ? (
        <div className="flex gap-x-8 items-center w-full">
          <Skeleton height="h-[100px]" className="my-3" />
          <Skeleton height="h-[100px]" className="my-3" />
          <Skeleton height="h-[100px]" className="my-3" />
          <Skeleton height="h-[100px]" className="my-3" />
          <Skeleton height="h-[100px]" className="my-3" />
        </div>
      ) : (
        <div className="relative">
          <Swiper
            ref={swiperRef}
            slidesPerView={categoryShowItems}
            loop={false}
            className="mySwiper !p-6"
            spaceBetween={16}
          >
            {categoryData?.data?.length
              ? categoryData?.data?.map((item: any) => (
                  <SwiperSlide
                    key={item?._id}
                    onClick={() => handleClickCategory(item)}
                  >
                    <FoodCategoryCard
                      active={searchParams.get("category") == item?._id}
                      base64={true}
                      title={item?.name ?? "_"}
                      image={item?.image?.length ? item?.image[0]?.file : null}
                    />
                  </SwiperSlide>
                ))
              : null}
          </Swiper>
          {categoryData?.data?.length > categoryShowItems ? (
            <>
              <button
                onClick={handlePrev}
                className="absolute -right-6 z-20 cursor-pointer top-1/2 transform -translate-y-1/2 "
              >
                <FaChevronRight className="text-3xl text-primary-500" />
              </button>
              <button
                onClick={handleNext}
                className="absolute -left-6 z-20 cursor-pointer top-1/2 transform -translate-y-1/2 "
              >
                <FaChevronLeft className="text-3xl text-primary-500" />
              </button>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default CategoryCards;
