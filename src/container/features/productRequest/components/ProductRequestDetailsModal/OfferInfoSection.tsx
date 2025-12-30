import React from "react";
import Typography from "../../../../../components/typography/Typography";
import { ProductRequestDetailsDisplayData } from "../../ProductRequestDetailsModal.types";

interface OfferInfoSectionProps {
  displayData: ProductRequestDetailsDisplayData;
  getPaymentTypeText: (paymentType: string) => string;
}

const OfferInfoSection: React.FC<OfferInfoSectionProps> = ({
  displayData,
  getPaymentTypeText,
}) => {
  if (!displayData.invoiceId) return null;

  return (
    <div>
      <Typography className="text-lg font-bold mb-3">اطلاعات پیشنهاد</Typography>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Typography className="text-sm text-gray-600">نوع پرداخت</Typography>
            <Typography className="font-bold">
              {getPaymentTypeText(displayData.invoiceId?.paymentType)}
            </Typography>
          </div>
          <div>
            <Typography className="text-sm text-gray-600">
              قیمت به ازای هر کیلوگرم
            </Typography>
            <Typography className="font-bold">
              {displayData.invoiceId?.price
                ? displayData.invoiceId.price.toLocaleString() + " تومان"
                : "_"}
            </Typography>
          </div>
          <div>
            <Typography className="text-sm text-gray-600">قیمت نهایی</Typography>
            <Typography className="font-bold">
              {displayData.invoiceId?.finalPrice
                ? displayData.invoiceId.finalPrice.toLocaleString() + " تومان"
                : "_"}
            </Typography>
          </div>
          <div>
            <Typography className="text-sm text-gray-600">مبلغ پرداختی</Typography>
            <Typography className="font-bold">
              {displayData.invoiceId?.payingPrice
                ? displayData.invoiceId.payingPrice.toLocaleString() + " تومان"
                : "_"}
            </Typography>
          </div>
          <div>
            <Typography className="text-sm text-gray-600">
              هزینه حمل و نقل
            </Typography>
            <Typography className="font-bold">
              {displayData.invoiceId?.shippingPrice
                ? displayData.invoiceId.shippingPrice.toLocaleString() + " تومان"
                : "_"}
            </Typography>
          </div>
          <div>
            <Typography className="text-sm text-gray-600">نحوه حمل و نقل</Typography>
            <Typography className="font-bold">
              {displayData.invoiceId?.selectedShipping?.name === "provider"
                ? "توسط تامین‌کننده"
                : displayData.invoiceId?.selectedShipping?.name === "buyer"
                ? "توسط خریدار"
                : displayData.invoiceId?.selectedShipping?.name || "_"}
            </Typography>
          </div>
          {displayData.invoiceId?.paymentType === "INSTALLMENTS" && (
            <div>
              <Typography className="text-sm text-gray-600">تعداد اقساط</Typography>
              <Typography className="font-bold">
                {displayData.installmentMonths} ماه
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfferInfoSection;


