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
  onDelivery: (orderId: string, unloadingDate: string) => void;
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
  const [unloadingDate, setUnloadingDate] = useState("");
  const [dateError, setDateError] = useState("");

  // Check if order status is delivered
  const isDelivered = order?.status?.toLowerCase() === "delivered";

  // Clear input when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setUnloadingDate("");
      setDateError("");
    }
  }, [isOpen]);

  // Initialize unloadingDate from order if available (only for delivered orders)
  React.useEffect(() => {
    if (order?.unloadingDate && isDelivered) {
      // Convert ISO date to Persian format for display
      const date = new Date(order.unloadingDate);
      const persianDate = date.toLocaleDateString("fa-IR");
      setUnloadingDate(persianDate);
    }
  }, [order?.unloadingDate, isDelivered]);

  // Persian date validation
  const validatePersianDate = (date: string): boolean => {
    const persianDateRegex =
      /^14\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/;
    return persianDateRegex.test(date);
  };

  // Convert Persian date to Gregorian ISO string
  const convertPersianToISO = (persianDate: string): string => {
    const [jYear, jMonth, jDay] = persianDate.split("/").map(Number);

    // Persian to Gregorian conversion algorithm
    const jalaliToGregorian = (jy: number, jm: number, jd: number) => {
      const jy0 = jy <= 979 ? 1 : 0;
      const jy1 = jy0 === 1 ? jy + 1595 : jy - 979;
      const jp =
        jy0 === 1
          ? 0
          : 365 * jy1 +
            Math.floor(jy1 / 33) * 8 +
            Math.floor(((jy1 % 33) + 3) / 4);

      let jm0 = 0;
      for (let i = 0; i < jm; ++i) {
        jm0 += i < 6 ? 31 : 30;
      }

      const jd1 = jp + jm0 + jd - 1;

      let gy = jy0 === 1 ? 621 : 1600;
      gy += 400 * Math.floor(jd1 / 146097);
      let jd2 = jd1 % 146097;

      if (jd2 >= 36525) {
        jd2--;
        gy += 100 * Math.floor(jd2 / 36524);
        jd2 %= 36524;
        if (jd2 >= 365) jd2++;
      }

      gy += 4 * Math.floor(jd2 / 1461);
      jd2 %= 1461;

      if (jd2 >= 366) {
        jd2--;
        gy += Math.floor(jd2 / 365);
        jd2 = jd2 % 365;
      }

      const gd = jd2 + 1;

      const sal_a = [
        0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365,
      ];
      let gm;

      if (gd <= 79) {
        const leap = (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0 ? 1 : 0;
        const sal_b = [
          0,
          31,
          29 + leap,
          31,
          30,
          31,
          30,
          31,
          31,
          30,
          31,
          30,
          31,
        ];
        for (gm = 0; gm < 13 && gd > sal_b[gm]; gm++) {
          // empty
        }
        if (gm > 1) {
          return [gy, gm, gd - sal_b[gm - 1]];
        } else {
          return [gy, gm, gd];
        }
      } else {
        for (gm = 0; gm < 13 && gd > sal_a[gm]; gm++) {
          // empty
        }
        return [gy, gm, gd - sal_a[gm - 1]];
      }
    };

    const [gYear, gMonth, gDay] = jalaliToGregorian(jYear, jMonth - 1, jDay);

    // Create date object and return ISO string
    const date = new Date(gYear, gMonth - 1, gDay);
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
                تاریخ تخلیه (شمسی) *
              </label>
              <Input
                type="text"
                value={unloadingDate}
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
              disabled={loading || !unloadingDate.trim() || !!dateError}
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
