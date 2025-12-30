import { getOrderStatusColor, getOrderStatusText } from "../../../types/OrderStatus";
import { ProductRequestItem } from "./ProductRequestsTable.types";

export const statusOptions = [
  { value: "PENDING", label: "در انتظار" },
  { value: "APPROVED", label: "تایید شده" },
  { value: "REJECTED", label: "رد شده" },
  { value: "COMPLETED", label: "تکمیل شده" },
  { value: "BUYER_WAITFORFINANCE", label: "در انتظار تایید مالی" },
  { value: "WAITING_UNLOADING", label: "در انتظار تخلیه" },
];

export const paymentTypeOptions = [
  { value: "CASH", label: "نقدی" },
  { value: "INSTALLMENTS", label: "مدت دار" },
  { value: "CASH_AND_INSTALLMENTS", label: "نقدی و مدت دار" },
];

export const formatDate = (timestamp: number) => {
  if (!timestamp) return "_";
  const date = new Date(timestamp);
  return date.toLocaleDateString("fa-IR");
};

export const getPaymentTypeText = (paymentType: string) => {
  switch (paymentType?.toUpperCase()) {
    case "CASH":
      return "نقدی";
    case "INSTALLMENTS":
      return "مدت دار";
    case "CASH_AND_INSTALLMENTS":
      return "نقدی و مدت دار";
    default:
      return paymentType || "_";
  }
};

export const getAmountTypeText = (amountType: string) => {
  switch (amountType?.toUpperCase()) {
    case "KILOGRAM":
      return "کیلوگرم";
    case "GRAM":
      return "گرم";
    case "LITER":
      return "لیتر";
    case "PIECE":
      return "عدد";
    default:
      return amountType || "_";
  }
};

export const getStatusDisplay = (row: ProductRequestItem) => {
  let statusText;
  let statusValue;

  if (row?.statusTitle) {
    statusValue = row.status || "";
    statusText = row.statusTitle;
  } else if (row?.status) {
    statusValue = row.status;
    statusText = getOrderStatusText(statusValue);
  } else {
    statusValue = "";
    statusText = "_";
  }

  const colorClass = getOrderStatusColor(statusValue);

  return {
    text: statusText,
    className: `px-2 py-1 rounded text-sm bg-opacity-20 ${colorClass
      .replace("text-", "bg-")
      .replace("-600", "-100")
      .replace("-500", "-100")
      .replace("-700", "-100")
      .replace("-800", "-100")} ${colorClass}`,
  };
};


