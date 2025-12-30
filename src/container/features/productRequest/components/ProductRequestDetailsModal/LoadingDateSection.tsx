import React from "react";
import Typography from "../../../../../components/typography/Typography";
import Input from "../../../../../components/input";
import Button from "../../../../../components/button";

interface LoadingDateSectionProps {
  status: string;
  editableLoadingDate: string;
  loadingDateError: string;
  updateLoading: boolean;
  onSaveLoadingDate: () => void;
  onLoadingDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoadingDateSection: React.FC<LoadingDateSectionProps> = ({
  status,
  editableLoadingDate,
  loadingDateError,
  updateLoading,
  onSaveLoadingDate,
  onLoadingDateChange,
}) => {
  const isEditable =
    status === "LOADING_ORDER" || status === "WAITING_UNLOADING";

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <Typography className="text-lg font-bold">تاریخ بارگیری</Typography>
        {isEditable && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onSaveLoadingDate}
            loading={updateLoading}
            disabled={
              updateLoading || !editableLoadingDate.trim() || !!loadingDateError
            }
          >
            ذخیره تاریخ بارگیری
          </Button>
        )}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              value={editableLoadingDate}
              onChange={onLoadingDateChange}
              size="md"
              errorMessage={loadingDateError}
              placeholder="مثال: 1403/09/15"
              helperText="تاریخ بارگیری محصول"
              disabled={!isEditable}
              readOnly={!isEditable}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingDateSection;


