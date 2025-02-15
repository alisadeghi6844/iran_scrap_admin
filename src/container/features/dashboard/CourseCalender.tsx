import React, { useState, useEffect } from "react";
import {CourseCalenderTypes} from "../../../types/features/CourseCalenderTypes";
import {convertPersianToGregorian} from "../../../utils/MomentConvertor";
import WeeklyCalender from "../../../components/calender/WeeklyCalender";
import moment from "jalali-moment";
import Typography from "../../../components/typography/Typography";
import Box from "../../../components/box";
import Button from "../../../components/button";
import {LuRefreshCw} from "react-icons/lu";
import Alert from "../../../components/alert";
import {Tooltip} from "react-tooltip";
import { PiBarricadeDuotone } from "react-icons/pi";


const CourseCalender:React.FC<CourseCalenderTypes> = (props) => {
  const { setMomentDate, ...rest } = props;
  const [selectedDay, setSelectedDay] = useState<any|null>(
      moment().locale("fa").add(0, "days").format("L")
  );

  useEffect(() => {
    if (selectedDay?.length) {
        const gregorian: string = convertPersianToGregorian(selectedDay);
        if (setMomentDate) {
            setMomentDate(gregorian);
        }
    }
  }, [selectedDay]);

    return (
        <>
            {/*<WeeklyCalender*/}
            {/*  {...rest}*/}
            {/*  value={selectedDay}*/}
            {/*  onChange={(e) => {*/}
            {/*    setSelectedDay(e);*/}
            {/*  }}*/}
            {/*/>*/}

            <Box
                className={`pt-5
               pb-5
             relative`}
            >
                <div className="flex px-5 items-center justify-between pb-5 border-b-2 border-gray-200">
                    <Typography className="text-xl font-bold text-gray-700">
                        لیست کارکرد ماهانه
                    </Typography>
                    <Button
                        data-tooltip-id="refresh" data-tooltip-content="تازه سازی"
                        variant="outline-primary"
                        size="sm"
                    >
                        <LuRefreshCw className="text-xl"/>
                    </Button>
                    <Tooltip id="refresh"/>
                </div>
                <div className="mt-4">
                    <div className="px-5">
                        <Alert type="primary">
                            کاربر گرامی جهت مشاهده لیست کارکرد ها ، ماه مورد نظر خود را انتخاب
                            کنید .
                        </Alert>
                        <div className="mt-4 pb-4 border-b-2 border-gray-200">
                            <WeeklyCalender
                                {...rest}
                                value={selectedDay}
                                onChange={(e:any) => {
                                    setSelectedDay(e);
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <PiBarricadeDuotone/>
                        <Typography>شما در این ماه دارای 4:36 ساعت کسر کار میباشید</Typography>
                    </div>
                </div>
            </Box>
        </>
    );
};

export default CourseCalender;
