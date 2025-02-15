import Typography from "../../../components/typography/Typography";
import { useSelector } from "react-redux";
import { selectGetTimeData } from "../../../redux/slice/time/TimeSlice";
import { useEffect, useState } from "react";
import moment from "jalali-moment";

const Notifications = () => {
  const getDate: any = useSelector(selectGetTimeData);
  const [formattedJalaliDate, setFormattedJalaliDate] = useState("");

  useEffect(() => {
    if (getDate?.data) {
      const jalaliDate = moment(getDate.data)
        .locale("fa")
        .format("dddd jD jMMMM jYYYY");
      setFormattedJalaliDate(jalaliDate);
    }
  }, [getDate]);

  return (
    <div
      style={{
        boxShadow: "0px 0px 12.6px 0px #00000040",
      }}
      className="min-h-[170px] rounded-lg bg-white w-full px-4 py-3"
    >
      <div className="border-b border-gray-400 pb-3 flex items-center gap-x-3">
        <Typography className="font-bold text-lg" tag="h2">
          اطلاعیه ها
        </Typography>
        <Typography className="text-xs text-gray-600" tag="p">
          {formattedJalaliDate}
        </Typography>
      </div>
      <div className="mt-4">
        <div className="p-4 flex items-center justify-center text-xl rounded-xl border-2 border-dashed border-primary-500 bg-primary-100 text-primary-500 font-bold">
          در این تاریخ اطلاعیه وجود ندارد
        </div>
        {/* <NotificationItem/> */}
      </div>
      {/* <div className="flex justify-end mt-2">
          <Button size="xs" circle endIcon={<ArrowLeftIcon/>}>مشاهده همه</Button>
        </div> */}
    </div>
  );
};

export default Notifications;
