import React from "react";
import Typography from "../../../../../components/typography/Typography";
import { ProductRequestDetailsDisplayData } from "../../ProductRequestDetailsModal.types";

interface UserInfoSectionProps {
  displayData: ProductRequestDetailsDisplayData;
}

const UserInfoSection: React.FC<UserInfoSectionProps> = ({ displayData }) => {
  return (
    <div>
      <Typography className="text-lg font-bold mb-3">اطلاعات کاربر</Typography>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Typography className="text-sm text-gray-600">
              نام و نام خانوادگی
            </Typography>
            <Typography className="font-bold">
              {displayData.user?.firstName && displayData.user?.lastName
                ? `${displayData.user.firstName} ${displayData.user.lastName}`
                : "_"}
            </Typography>
          </div>
          <div>
            <Typography className="text-sm text-gray-600">شماره موبایل</Typography>
            <Typography className="font-bold">{displayData.user?.mobile || "_"}</Typography>
          </div>
          <div>
            <Typography className="text-sm text-gray-600">نوع کاربر</Typography>
            <Typography className="font-bold">
              {displayData.user?.usertype === "Buyer"
                ? "خریدار"
                : displayData.user?.usertype || "_"}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoSection;


