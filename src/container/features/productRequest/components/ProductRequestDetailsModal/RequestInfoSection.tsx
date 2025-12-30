import React from "react";
import Typography from "../../../../../components/typography/Typography";
import { ProductRequestDetailsDisplayData } from "../../ProductRequestDetailsModal.types";

interface RequestInfoSectionProps {
  displayData: ProductRequestDetailsDisplayData;
  getAmountTypeText: (amountType: string) => string;
  getRequestTypeText: (requestType: string) => string;
}

const RequestInfoSection: React.FC<RequestInfoSectionProps> = ({
  displayData,
  getAmountTypeText,
  getRequestTypeText,
}) => {
  return (
    <div>
      <Typography className="text-lg font-bold mb-3">اطلاعات درخواست</Typography>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Typography className="text-sm text-gray-600">
              توضیحات درخواست
            </Typography>
            <Typography className="font-bold">
              {displayData.description || "_"}
            </Typography>
          </div>
          <div>
            <Typography className="text-sm text-gray-600">مقدار</Typography>
            <Typography className="font-bold">
              {displayData.amount} {getAmountTypeText(displayData.amountType)}
            </Typography>
          </div>
          <div>
            <Typography className="text-sm text-gray-600">شهر</Typography>
            <Typography className="font-bold">{displayData.city || "_"}</Typography>
          </div>
          <div>
            <Typography className="text-sm text-gray-600">استان</Typography>
            <Typography className="font-bold">
              {displayData.province || "_"}
            </Typography>
          </div>
          <div>
            <Typography className="text-sm text-gray-600">آدرس</Typography>
            <Typography className="font-bold">
              {displayData.address || "_"}
            </Typography>
          </div>
          <div>
            <Typography className="text-sm text-gray-600">نوع درخواست</Typography>
            <Typography className="font-bold">
              {getRequestTypeText(displayData.requestType)}
            </Typography>
          </div>
          <div>
            <Typography className="text-sm text-gray-600">کد پستی</Typography>
            <Typography className="font-bold">
              {displayData.postalCode || "_"}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestInfoSection;


