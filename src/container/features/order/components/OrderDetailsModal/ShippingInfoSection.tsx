import React from "react";
import Typography from "../../../../../components/typography/Typography";

interface ShippingInfoSectionProps {
  order: any;
}

const ShippingInfoSection: React.FC<ShippingInfoSectionProps> = ({ order }) => {
  return (
    <div>
      <Typography className="text-lg font-bold mb-3">اطلاعات ارسال</Typography>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Typography className="text-sm text-gray-600">شهر</Typography>
            <Typography className="font-bold">{order.city}</Typography>
          </div>
          <div>
            <Typography className="text-sm text-gray-600">استان</Typography>
            <Typography className="font-bold">{order.province}</Typography>
          </div>
          <div>
            <Typography className="text-sm text-gray-600">هزینه ارسال</Typography>
            <Typography className="font-bold">
              {order.shippingPrice?.toLocaleString()} تومان
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfoSection;


