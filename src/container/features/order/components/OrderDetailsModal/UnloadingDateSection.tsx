import React from "react";
import Typography from "../../../../../components/typography/Typography";

interface UnloadingDateSectionProps {
  unloadingDate: any;
  convertGregorianToPersianLocal: (gregorianDate: Date) => string;
}

const UnloadingDateSection: React.FC<UnloadingDateSectionProps> = ({
  unloadingDate,
  convertGregorianToPersianLocal,
}) => {
  return (
    <div>
      <Typography className="text-lg font-bold mb-3">تاریخ تخلیه</Typography>
      <div className="bg-gray-50 p-4 rounded-lg">
        <Typography className="font-bold">
          {convertGregorianToPersianLocal(new Date(unloadingDate))}
        </Typography>
      </div>
    </div>
  );
};

export default UnloadingDateSection;


