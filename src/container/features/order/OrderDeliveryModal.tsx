import React, { useState } from "react";
import Modal from "../../../components/modal";
import Button from "../../../components/button";
import Input from "../../../components/input";

interface OrderDeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  onDelivery: (orderId: string, unloadingDate: string) => void;
  loading: boolean;
}

const OrderDeliveryModal: React.FC<OrderDeliveryModalProps> = ({
  isOpen,
  onClose,
  orderId,
  onDelivery,
  loading,
}) => {
  const [unloadingDate, setUnloadingDate] = useState("");
  const [dateError, setDateError] = useState("");

  // Persian date validation
  const validatePersianDate = (date: string): boolean => {
    const persianDateRegex =
      /^14\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/;
    return persianDateRegex.test(date);
  };

  // Convert Persian date to Gregorian ISO string
  const convertPersianToISO = (persianDate: string): string => {
    const [year, month, day] = persianDate.split("/").map(Number);

    // Simple Persian to Gregorian conversion (approximate)
    // This is a basic conversion - for production use a proper library like moment-jalaali
    const gregorianYear = year - 621;
    const gregorianMonth = month;
    const gregorianDay = day;

    // Create date object and return ISO string
    const date = new Date(gregorianYear, gregorianMonth - 1, gregorianDay);
    return date.toISOString();
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUnloadingDate(value);

    if (value && !validatePersianDate(value)) {
      setDateError("فرمت تاریخ صحیح نیست. مثال: 1403/09/15");
    } else {
      setDateError("");
    }
  };

  const handleSubmit = () => {
    if (!unloadingDate.trim() || !validatePersianDate(unloadingDate)) {
      return;
    }

    // Convert Persian date to ISO format before sending
    const isoDate = convertPersianToISO(unloadingDate);
    onDelivery(orderId, isoDate);
  };

  const handleClose = () => {
    setUnloadingDate("");
    setDateError("");
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      headerTitle="تحویل سفارش"
      size="lg"
    >
      <div className="space-y-6 p-4">
        <div className="space-y-4">
          <div className="text-sm text-gray-600 mb-4">
            لطفاً تاریخ تخلیه سفارش را انتخاب کنید:
          </div>

          <div className="mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تاریخ تخلیه (شمسی) *
              </label>
              <Input
                type="text"
                value={unloadingDate}
                onChange={handleDateChange}
                placeholder="مثال: 1403/09/15"
                className={`w-full ${dateError ? "border-red-500" : ""}`}
                disabled={loading}
                dir="ltr"
              />
              {dateError && (
                <div className="text-xs text-red-500 mt-1">{dateError}</div>
              )}
              <div className="text-xs text-gray-500 mt-1">
                فرمت: سال/ماه/روز (مثال: 1403/09/15)
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={loading}
            size="md"
          >
            انصراف
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={handleSubmit}
            disabled={loading || !unloadingDate.trim() || !!dateError}
            loading={loading}
            size="md"
          >
            تحویل داده شد
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDeliveryModal;
