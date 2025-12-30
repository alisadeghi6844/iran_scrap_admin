import React from "react";
import Typography from "../../../../../components/typography/Typography";
import { ProductRequestDetailsDisplayData } from "../../ProductRequestDetailsModal.types";

interface CategoryInfoSectionProps {
  displayData: ProductRequestDetailsDisplayData;
}

const CategoryInfoSection: React.FC<CategoryInfoSectionProps> = ({
  displayData,
}) => {
  return (
    <div>
      <Typography className="text-lg font-bold mb-3">
        اطلاعات دسته‌بندی
      </Typography>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Typography className="text-sm text-gray-600">
              نام دسته‌بندی
            </Typography>
            <Typography className="font-bold">
              {displayData.category?.name || "_"}
            </Typography>
          </div>
          <div>
            <Typography className="text-sm text-gray-600">
              مسیر دسته‌بندی
            </Typography>
            <Typography className="font-bold">
              {displayData.category?.catRoute || "_"}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryInfoSection;


