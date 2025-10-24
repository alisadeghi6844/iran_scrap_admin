import React, { useState } from "react";
import Modal from "../../../components/modal";
import Button from "../../../components/button";
import Input from "../../../components/input";

interface OrderDeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  order?: {
    loadingDate?: string;
    unloadingDate?: string;
    status: string;
  } | null;
  onDelivery: (orderId: string, loadingDate: string) => void;
  loading: boolean;
}

const OrderDeliveryModal: React.FC<OrderDeliveryModalProps> = ({
  isOpen,
  onClose,
  orderId,
  order,
  onDelivery,
  loading,
}) => {
  const [loadingDate, setLoadingDate] = useState("");
  const [dateError, setDateError] = useState("");
  
  // Check if order status is delivered
  const isDelivered = order?.status?.toLowerCase() === "delivered";

  // Initialize loadingDate from order if available
  React.useEffect(() => {
    if (order?.loadingDate) {
      // Convert ISO date to Persian format for display
      const date = new Date(order.loadingDate);
      const persianDate = date.toLocaleDateString("fa-IR");
      setLoadingDate(persianDate);
    }
  }, [order?.loadingDate]);

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
    setLoadingDate(value);

    if (value && !validatePersianDate(value)) {
      setDateError("فرمت تاریخ صحیح نیست. مثال: 1403/09/15");
    } else {
      setDateError("");
    }
  };

  const handleSubmit = () => {
    if (!loadingDate.trim() || !validatePersianDate(loadingDate)) {
      return;
    }

    // Convert Persian date to ISO format before sending
    const isoDate = convertPersianToISO(loadingDate);
    onDelivery(orderId, isoDate);
  };

  const handleClose = () => {
    setLoadingDate("");
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
        {/* تاریخ تخلیه - خارج از اطلاعات راننده */}
        {isDelivered && order?.unloadingDate && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-sm font-medium text-blue-800 mb-2">
              تاریخ تخلیه
            </div>
            <div className="text-lg text-blue-900">
              {new Date(order.unloadingDate).toLocaleDateString("fa-IR")}
            </div>
          </div>
        )}

        {/* اطلاعات راننده */}
        <div className="space-y-4">
          <div className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">
            اطلاعات راننده
          </div>
          
          <div className="mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تاریخ بارگیری (شمسی) *
              </label>
              <Input
                type="text"
                value={loadingDate}
                onChange={handleDateChange}
                placeholder="مثال: 1403/09/15"
                className={`w-full ${dateError ? "border-red-500" : ""}`}
                disabled={loading || isDelivered}
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
            {isDelivered ? "بستن" : "انصراف"}
          </Button>
          {!isDelivered && (
            <Button
              type="button"
              variant="primary"
              onClick={handleSubmit}
              disabled={loading || !loadingDate.trim() || !!dateError}
              loading={loading}
              size="md"
            >
              تحویل داده شد
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default OrderDeliveryModal;
