import { Tooltip } from "react-tooltip";
import Typography from "../../../components/typography/Typography";
import TextOverflow from "../../../utils/TextOverflow";

const NotificationItem = ()=>{
    return(
        <div className="w-full h-[58px] bg-success-50 relative">
            <div className="bg-success-500 rounded-l-xl h-full w-[10px] top-0 right-0 absolute"></div>
            <div className="py-1 px-6 flex justify-between">
                <div>
                    <Typography className="text-md font-bold text-gray-600">فرم نظر سنجی شما ثبت شد</Typography>
                    <Typography className="text-sm text-gray-400 mt-1" tag="p">
                  <TextOverflow number={80}>
                  فرم نظرسنجی شما در تاریخ جمعه ۱۴ خرداد ۱۴۰۲ توسط کاربر مورد نظر تایید شده.
                  </TextOverflow>
                       
                    </Typography>
                </div>
                <Typography className="text-xs mt-1 font-bold text-gray-600">جمعه ۱۴ خرداد ۱۴۰۲</Typography>
            </div>
        </div>
    )
}

export default NotificationItem;