import React from "react";
import Button from "../../../../../components/button";
import Input from "../../../../../components/input";
import Typography from "../../../../../components/typography/Typography";

interface LoadingDateSectionProps {
  editableLoadingDate: string;
  loadingDateError: string;
  updateLoading: any;
  onSaveLoadingDate: () => void;
  onLoadingDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoadingDateSection: React.FC<LoadingDateSectionProps> = ({
  editableLoadingDate,
  loadingDateError,
  updateLoading,
  onSaveLoadingDate,
  onLoadingDateChange,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <Typography className="text-lg font-bold">تاریخ بارگیری</Typography>
        <Button
          variant="secondary"
          size="sm"
          onClick={onSaveLoadingDate}
          loading={updateLoading}
          disabled={updateLoading || !editableLoadingDate.trim() || !!loadingDateError}
        >
          ذخیره تاریخ بارگیری
        </Button>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="تاریخ بارگیری"
              value={editableLoadingDate}
              onChange={onLoadingDateChange}
              size="md"
              errorMessage={loadingDateError}
              placeholder="مثال: 1403/09/15"
              helperText="تاریخ بارگیری محصول"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingDateSection;


