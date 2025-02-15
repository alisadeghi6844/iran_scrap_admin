import React from "react";
import FoodIcon1 from "../../../components/icon/custom/FoodIcon1";
import Typography from "../../../components/typography/Typography";
import FoodIcon2 from "../../../components/icon/custom/FoodIcon2";
import FoodIcon3 from "../../../components/icon/custom/FoodIcon3";
import FoodIcon4 from "../../../components/icon/custom/FoodIcon4";
import FoodIcon5 from "../../../components/icon/custom/FoodIcon5";
import Image from "../../../components/image";
import { Link } from "react-router-dom";
import FoodIcon6 from "../../../components/icon/custom/FoodIcon6";

const GuideFood = () => {
  return (
    <>
      <div className="mt-6 pb-16 flex flex-col gap-y-5 relative">
        <div className="flex items-center gap-x-2">
          <FoodIcon1 />
          <Typography>
            {" "}
            جدول زیر تاریخچه رزرو غذای شما و همچنین رزرو غذا برای روز های آتی
            است.
          </Typography>
        </div>
        <div className="flex items-center gap-x-2">
          <FoodIcon2 />
          <Typography>
            {" "}
            کارت های سبز رنگ به معنای رزرو شما در روزهای آتی است و بنفش به معنای
            رزرو در روز های گذشته .
          </Typography>
        </div>
        <div className="flex items-center gap-x-2">
          <FoodIcon3 />
          <Typography>
            {" "}
            ثبت غذا در روز های گذشته , روز جاری و روز های تعطیل مجاز نمیباشد.
          </Typography>
        </div>
        <div className="flex items-center gap-x-2">
          <FoodIcon4 />
          <Typography>
            {" "}
            انتخاب غذا از یک روز بعد از روز جاری تا {import.meta.env.VITE_APP_MAX_RESERVE_DATE - 1} روز آینده امکان پذیر
            میباشد .{" "}
          </Typography>
        </div>
        <div className="flex items-center gap-x-2">
          <FoodIcon5 />
          <Typography>
            {" "}
            پس از ثبت غذا تا یک روز قبل شما مجاز به ویرایش غذا میباشید.{" "}
          </Typography>
        </div>
        <div className="flex items-center gap-x-2">
          <FoodIcon6 />
          <Link to="/reserve" className="text-blue-500 underline font-bold">صفحه رزرو غذا</Link>
        </div>
       

        <Image
          className="absolute -left-4 -bottom-4 w-[190px] h-[180px]"
          src="/images/core/burger.png"
        />
      </div>
    </>
  );
};
export default GuideFood;
