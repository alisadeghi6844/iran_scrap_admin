import React from "react";
import Typography from "../../../../../components/typography/Typography";
import { ProductRequestDetailsDisplayData } from "../../ProductRequestDetailsModal.types";

interface RequestHeaderSectionProps {
  displayData: ProductRequestDetailsDisplayData;
  formatDate: (timestamp?: number) => string;
}

const RequestHeaderSection: React.FC<RequestHeaderSectionProps> = ({
  displayData,
  formatDate,
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Typography className="text-sm text-gray-600">تاریخ ایجاد</Typography>
          <Typography className="font-bold">
            {formatDate(displayData.createdAt)}
          </Typography>
        </div>
        <div>
          <Typography className="text-sm text-gray-600">وضعیت</Typography>
          <Typography className="font-bold">
            {displayData?.statusTitle || displayData?.status || "_"}
          </Typography>
        </div>
        <div>
          <Typography className="text-sm text-gray-600">
            آخرین بروزرسانی
          </Typography>
          <Typography className="font-bold">
            {formatDate(displayData.updatedAt)}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default RequestHeaderSection;


