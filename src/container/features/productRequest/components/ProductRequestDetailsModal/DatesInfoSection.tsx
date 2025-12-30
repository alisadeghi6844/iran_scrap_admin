import React from "react";
import Typography from "../../../../../components/typography/Typography";
import { ProductRequestDetailsDisplayData } from "../../ProductRequestDetailsModal.types";

interface DatesInfoSectionProps {
  displayData: ProductRequestDetailsDisplayData;
  formatDate: (timestamp?: number) => string;
}

const DatesInfoSection: React.FC<DatesInfoSectionProps> = ({
  displayData,
  formatDate,
}) => {
  return (
    <div>
      <Typography className="text-lg font-bold mb-3">اطلاعات تاریخ</Typography>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Typography className="text-sm text-gray-600">
              تاریخ مورد انتظار
            </Typography>
            <Typography className="font-bold">
              {formatDate(displayData.expectedDate)}
            </Typography>
          </div>
          <div>
            <Typography className="text-sm text-gray-600">تاریخ انقضا</Typography>
            <Typography className="font-bold">
              {formatDate(displayData.expireDate)}
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
    </div>
  );
};

export default DatesInfoSection;


