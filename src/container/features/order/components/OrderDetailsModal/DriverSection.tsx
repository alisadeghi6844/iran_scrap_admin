import React from "react";
import Button from "../../../../../components/button";
import Input from "../../../../../components/input";
import Typography from "../../../../../components/typography/Typography";

interface DriverSectionProps {
  editableDriver: any;
  driverValidationErrors: { [key: string]: string };
  updateLoading: any;
  onSaveDriver: () => void;
  onDriverChange: (field: string, value: string) => void;
}

const DriverSection: React.FC<DriverSectionProps> = ({
  editableDriver,
  driverValidationErrors,
  updateLoading,
  onSaveDriver,
  onDriverChange,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <Typography className="text-lg font-bold">اطلاعات راننده</Typography>
        {editableDriver && (
          <Button
            variant="primary"
            size="sm"
            onClick={onSaveDriver}
            loading={updateLoading}
            disabled={updateLoading}
          >
            ویرایش اطلاعات راننده
          </Button>
        )}
      </div>

      {editableDriver ? (
        <div className="bg-gray-50 p-4 rounded-lg border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="شماره بارنامه"
                value={editableDriver.billNumber}
                onChange={(e) => onDriverChange("billNumber", e.target.value)}
                size="md"
                errorMessage={driverValidationErrors.billNumber}
                required
              />
            </div>
            <div>
              <Input
                label="شماره پلاک"
                value={editableDriver.licensePlate}
                onChange={(e) => onDriverChange("licensePlate", e.target.value)}
                size="md"
                errorMessage={driverValidationErrors.licensePlate}
                required
              />
            </div>
            <div>
              <Input
                label="نام وسیله نقلیه"
                value={editableDriver.vehicleName}
                onChange={(e) => onDriverChange("vehicleName", e.target.value)}
                size="md"
                errorMessage={driverValidationErrors.vehicleName}
                required
              />
            </div>
            <div>
              <Input
                label="نام راننده"
                value={editableDriver.driverName}
                onChange={(e) => onDriverChange("driverName", e.target.value)}
                size="md"
                errorMessage={driverValidationErrors.driverName}
                required
              />
            </div>
            <div>
              <Input
                label="شماره تلفن راننده"
                value={editableDriver.driverPhone}
                onChange={(e) => onDriverChange("driverPhone", e.target.value)}
                size="md"
                errorMessage={driverValidationErrors.driverPhone}
                helperText="مثال: 09123456789"
                required
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <Typography className="text-gray-500">اطلاعات راننده موجود نیست</Typography>
        </div>
      )}
    </div>
  );
};

export default DriverSection;


