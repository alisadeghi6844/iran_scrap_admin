import React from 'react';
import { FaArrowUpLong } from "react-icons/fa6";
import { FaArrowDownLong } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa"; // اضافه کردن آیکون بدون تغییر

const PriceStatus = (props:any) => {
    const { status, number, ...rest } = props;
    
    return (
        <div className={`${status === "up" ? "text-success-500" : status === "down" ? "text-error-500" : "text-gray-500"} flex items-center gap-x-1`}>
            {status === "up" ? <FaArrowUpLong /> : status === "down" ? <FaArrowDownLong /> : <FaMinus />} {/* آیکون بدون تغییر */}
            <div>
                {number ? `${number}% ${status === "up" ? "+" : status === "down" ? "-" : ""}` : 0}
            </div>
        </div>
    );
};

export default PriceStatus;
