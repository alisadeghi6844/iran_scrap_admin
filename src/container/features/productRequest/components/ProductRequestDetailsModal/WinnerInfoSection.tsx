import React from "react";
import Typography from "../../../../../components/typography/Typography";
import { ProductRequestDetailsDisplayData } from "../../ProductRequestDetailsModal.types";

interface WinnerInfoSectionProps {
  displayData: ProductRequestDetailsDisplayData;
  formatDate: (timestamp?: number) => string;
  getPaymentTypeText: (paymentType: string) => string;
}

const WinnerInfoSection: React.FC<WinnerInfoSectionProps> = ({
  displayData,
  formatDate,
  getPaymentTypeText,
}) => {
  if (!displayData.winner) return null;

  return (
    <div>
      <Typography className="text-lg font-bold mb-3">تامین‌کننده برنده</Typography>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Typography className="text-sm text-gray-600">وضعیت</Typography>
            <Typography className="font-bold">
              {displayData.winner?.status === "BUYER_CONFIRMED"
                ? "تایید شده توسط خریدار"
                : displayData.winner?.status || "_"}
            </Typography>
          </div>
          <div>
            <Typography className="text-sm text-gray-600">قیمت واحد</Typography>
            <Typography className="font-bold">
              {displayData.winner?.price
                ? displayData.winner.price.toLocaleString() + " تومان"
                : "_"}
            </Typography>
          </div>
          <div>
            <Typography className="text-sm text-gray-600">قیمت کل</Typography>
            <Typography className="font-bold">
              {displayData.winner?.totalprice
                ? displayData.winner.totalprice.toLocaleString() + " تومان"
                : "_"}
            </Typography>
          </div>
          <div>
            <Typography className="text-sm text-gray-600">
              هزینه حمل و نقل
            </Typography>
            <Typography className="font-bold">
              {displayData.winner?.shippingPrice
                ? displayData.winner.shippingPrice.toLocaleString() + " تومان"
                : "_"}
            </Typography>
          </div>
          <div>
            <Typography className="text-sm text-gray-600">نوع پرداخت</Typography>
            <Typography className="font-bold">
              {getPaymentTypeText(displayData.winner?.paymentType)}
            </Typography>
          </div>
          {displayData.winner?.paymentType === "INSTALLMENTS" && (
            <div>
              <Typography className="text-sm text-gray-600">تعداد اقساط</Typography>
              <Typography className="font-bold">
                {displayData.winner?.installmentMonths} ماه
              </Typography>
            </div>
          )}
          <div>
            <Typography className="text-sm text-gray-600">توضیحات</Typography>
            <Typography className="font-bold">
              {displayData.winner?.description || "_"}
            </Typography>
          </div>
          <div>
            <Typography className="text-sm text-gray-600">تاریخ ایجاد</Typography>
            <Typography className="font-bold">
              {formatDate(displayData.winner?.createdAt)}
            </Typography>
          </div>
          <div>
            <Typography className="text-sm text-gray-600">تاریخ تایید</Typography>
            <Typography className="font-bold">
              {formatDate(displayData.winner?.confirmDate)}
            </Typography>
          </div>
          <div>
            <Typography className="text-sm text-gray-600">تاریخ انقضا</Typography>
            <Typography className="font-bold">
              {formatDate(displayData.winner?.expireDate)}
            </Typography>
          </div>

          <div>
            <Typography className="text-sm text-gray-600">
              آخرین بروزرسانی
            </Typography>
            <Typography className="font-bold">
              {formatDate(displayData.winner?.updatedAt)}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerInfoSection;


