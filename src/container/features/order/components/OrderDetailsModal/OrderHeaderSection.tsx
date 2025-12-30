import React from "react";
import Typography from "../../../../../components/typography/Typography";

interface OrderHeaderSectionProps {
  order: any;
  formatDate: (timestamp: any) => string;
  getOrderStatusColor: (status: string) => string;
  getOrderStatusText: (status: string) => string;
}

const OrderHeaderSection: React.FC<OrderHeaderSectionProps> = ({
  order,
  formatDate,
  getOrderStatusColor,
  getOrderStatusText,
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Typography className="text-sm text-gray-600">تاریخ ایجاد</Typography>
          <Typography className="font-bold">{formatDate(order.createdAt)}</Typography>
        </div>
        {order?.status === "CLOSED" ? (
          <div>
            <Typography className="text-sm text-gray-600">تاریخ تخلیه</Typography>
            <Typography className="font-bold">
              {formatDate(order.unloadingDate)}
            </Typography>
          </div>
        ) : null}
        <div>
          <Typography className="text-sm text-gray-600">وضعیت</Typography>
          <Typography className={`font-bold ${getOrderStatusColor(order.status)}`}>
            {getOrderStatusText(order.status)}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default OrderHeaderSection;


