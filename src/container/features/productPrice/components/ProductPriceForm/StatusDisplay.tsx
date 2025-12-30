import React from "react";
import Typography from "../../../../../components/typography/Typography";
import { useFormikContext } from "formik";

// Enhanced Status Display Component (extracted from ProductPriceForm without logic/UI changes)
const StatusDisplay = () => {
  const { values } = useFormikContext<any>();

  const calculateStatus = () => {
    const sellPrice = Number(values.SellPrice) || 0;
    const constant = Number(values.Constant) || 0;

    // فرمول: S = (قیمت ثابت) / (قیمت فروش)
    const S = sellPrice > 0 ? constant / sellPrice : 0;

    // تعیین وضعیت بر اساس فرمول جدید
    if (S >= 0.12)
      return {
        label: "سوپر الماسی",
        color: "text-purple-600",
        bgColor: "bg-purple-100",
        borderColor: "border-purple-300",
        icon: "💎",
        value: S,
      };
    if (S >= 0.08)
      return {
        label: "الماسی",
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        borderColor: "border-blue-300",
        icon: "💍",
        value: S,
      };
    if (S >= 0.05)
      return {
        label: "طلایی",
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
        borderColor: "border-yellow-300",
        icon: "🥇",
        value: S,
      };
    if (S >= 0.03)
      return {
        label: "نقره‌ای",
        color: "text-gray-600",
        bgColor: "bg-gray-100",
        borderColor: "border-gray-300",
        icon: "🥈",
        value: S,
      };
    return {
      label: "برنزی",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      borderColor: "border-orange-300",
      icon: "🥉",
      value: S,
    };
  };

  const status = calculateStatus();
  const sellPrice = Number(values.SellPrice) || 0;
  const constant = Number(values.Constant) || 0;

  return (
    <div
      className={`p-4 rounded-xl border-2 ${status.borderColor} ${status.bgColor} transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-3">
        <Typography className="text-sm font-medium text-gray-700">
          وضعیت محصول
        </Typography>
        <span className="text-2xl">{status.icon}</span>
      </div>

      <div className="space-y-2">
        <Typography className={`text-xl font-bold ${status.color}`}>
          {status.label}
        </Typography>

        {(!sellPrice || !constant) && (
          <Typography className="text-sm text-gray-500 italic">
            برای محاسبه وضعیت، قیمت فروش و ثابت را وارد کنید
          </Typography>
        )}
      </div>
    </div>
  );
};

export default StatusDisplay;


