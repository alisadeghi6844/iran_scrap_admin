import React from "react";
import Typography from "../../../../../components/typography/Typography";

interface PaymentInfoSectionProps {
  order: any;
  getPaymentTypeText: (paymentType: string) => string;
}

const PaymentInfoSection: React.FC<PaymentInfoSectionProps> = ({
  order,
  getPaymentTypeText,
}) => {
  return (
    <div>
      <Typography className="text-lg font-bold mb-3">اطلاعات پرداخت</Typography>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Typography className="text-sm text-gray-600">نوع پرداخت</Typography>
            <Typography className="font-bold">
              {getPaymentTypeText(order.paymentType)}
            </Typography>
          </div>
          <div>
            <Typography className="text-sm text-gray-600">مبلغ قابل پرداخت</Typography>
            <Typography className="font-bold">
              {order.payingPrice?.toLocaleString()} تومان
            </Typography>
          </div>
          {order.installmentMonths > 0 && (
            <div>
              <Typography className="text-sm text-gray-600">تعداد اقساط</Typography>
              <Typography className="font-bold">{order.installmentMonths} ماه</Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentInfoSection;


