export enum OrderStatus {
  REGISTERED = "REGISTERED",
  WAITING_FOR_OFFERS = "WAITING_FOR_OFFERS",
  LOADING_ORDER = "LOADING_ORDER",
  SEND_FINAL_OFFER_TO_BUYER = "SEND_FINAL_OFFER_TO_BUYER",
  CONFIRMATION_REQUEST_BY_BUYER = "CONFIRMATION_REQUEST_BY_BUYER",
  BUYER_FAILURE_APPROVE = "BUYER_FAILURE_APPROVE",
  BUYER_CANCELLATION = "BUYER_CANCELLATION",
  NOT_RECEIVING_ENOUGH_OFFERS = "NOT_RECEIVING_ENOUGH_OFFERS",
  CLOSED = "CLOSED",
  WAITING_UNLOADING = "WAITING_UNLOADING",
  BUYER_WAITINGFORPAY = "BUYER_WAITINGFORPAY",
  BUYER_WAITINGFORCHEK = "BUYER_WAITINGFORCHEK",
  BUYER_WAITFORFINANCE = "BUYER_WAITFORFINANCE",
  BUYER_CANCELPAY = "BUYER_CANCELPAY",
  BUYER_CANCEL_LOADING = "BUYER_CANCEL_LOADING",
  CONSIDERING_SUGGESTIONS = "CONSIDERING_SUGGESTIONS",
  RETURN_TO_BUYER_REQUEST = "RETURN_TO_BUYER_REQUEST",
}

export const getOrderStatusText = (status: string): string => {
  switch (status?.toLowerCase()) {
    case OrderStatus.REGISTERED.toLowerCase():
      return "ثبت درخواست";
    case OrderStatus.WAITING_FOR_OFFERS.toLowerCase():
      return "در انتظار دریافت پیشنهادات";
    case OrderStatus.LOADING_ORDER.toLowerCase():
      return "بارگیری سفارش";
    case OrderStatus.SEND_FINAL_OFFER_TO_BUYER.toLowerCase():
      return "ارسال پیشنهاد نهایی برای خریدار";
    case OrderStatus.CONFIRMATION_REQUEST_BY_BUYER.toLowerCase():
      return "تائید درخواست توسط خریدار";
    case OrderStatus.BUYER_FAILURE_APPROVE.toLowerCase():
      return "عدم تائید درخواست توسط خریدار";
    case OrderStatus.BUYER_CANCELLATION.toLowerCase():
      return "انصراف خریدار";
    case OrderStatus.NOT_RECEIVING_ENOUGH_OFFERS.toLowerCase():
      return "عدم دریافت پیشنهاد کافی";
    case OrderStatus.CLOSED.toLowerCase():
      return "تحویل داده شد";
    case OrderStatus.WAITING_UNLOADING.toLowerCase():
      return "در انتظار تخلیه و تحویل سفارش";
    case OrderStatus.BUYER_WAITINGFORPAY.toLowerCase():
      return "در انتظار پرداخت سفارش";
    case OrderStatus.BUYER_WAITINGFORCHEK.toLowerCase():
      return "در انتظار ثبت چک الکترونیک";
    case OrderStatus.BUYER_WAITFORFINANCE.toLowerCase():
      return "در انتظار تائید مالی";
    case OrderStatus.BUYER_CANCELPAY.toLowerCase():
      return "عدم پرداخت و لغو سفارش";
    case OrderStatus.BUYER_CANCEL_LOADING.toLowerCase():
      return "عدم بارگیری و لغو سفارش";
    case OrderStatus.CONSIDERING_SUGGESTIONS.toLowerCase():
      return "در حال بررسی پیشنهادات";
    case OrderStatus.RETURN_TO_BUYER_REQUEST.toLowerCase():
      return "بازگشت به درخواست خریدار";
    default:
      return status || "نامشخص";
  }
};

export const getOrderStatusLabel = (status: string): string => {
  const statusLabels: { [key: string]: string } = {
    [OrderStatus.REGISTERED]: "ثبت درخواست",
    [OrderStatus.WAITING_FOR_OFFERS]: "در انتظار دریافت پیشنهادات",
    [OrderStatus.LOADING_ORDER]: "بارگیری سفارش",
    [OrderStatus.SEND_FINAL_OFFER_TO_BUYER]: "ارسال پیشنهاد نهایی برای خریدار",
    [OrderStatus.CONFIRMATION_REQUEST_BY_BUYER]: "تائید درخواست توسط خریدار",
    [OrderStatus.BUYER_FAILURE_APPROVE]: "عدم تائید درخواست توسط خریدار",
    [OrderStatus.BUYER_CANCELLATION]: "انصراف خریدار",
    [OrderStatus.NOT_RECEIVING_ENOUGH_OFFERS]: "عدم دریافت پیشنهاد کافی",
    [OrderStatus.CLOSED]: "تحویل داده شد",
    [OrderStatus.WAITING_UNLOADING]: "در انتظار تخلیه و تحویل سفارش",
    [OrderStatus.BUYER_WAITINGFORPAY]: "در انتظار پرداخت سفارش",
    [OrderStatus.BUYER_WAITINGFORCHEK]: "در انتظار ثبت چک الکترونیک",
    [OrderStatus.BUYER_WAITFORFINANCE]: "در انتظار تائید مالی",
    [OrderStatus.BUYER_CANCELPAY]: "عدم پرداخت و لغو سفارش",
    [OrderStatus.BUYER_CANCEL_LOADING]: "عدم بارگیری و لغو سفارش",
    [OrderStatus.CONSIDERING_SUGGESTIONS]: "در حال بررسی پیشنهادات",
    [OrderStatus.RETURN_TO_BUYER_REQUEST]: "بازگشت به درخواست خریدار",
  };
  return statusLabels[status] || status;
};

export const getOrderStatusColor = (status: string): string => {
  switch (status?.toLowerCase()) {
    case OrderStatus.REGISTERED.toLowerCase():
      return "text-blue-600";
    case OrderStatus.WAITING_FOR_OFFERS.toLowerCase():
      return "text-yellow-600";
    case OrderStatus.LOADING_ORDER.toLowerCase():
      return "text-blue-700";
    case OrderStatus.SEND_FINAL_OFFER_TO_BUYER.toLowerCase():
      return "text-purple-600";
    case OrderStatus.CONFIRMATION_REQUEST_BY_BUYER.toLowerCase():
      return "text-secondary-600";
    case OrderStatus.BUYER_FAILURE_APPROVE.toLowerCase():
      return "text-red-600";
    case OrderStatus.BUYER_CANCELLATION.toLowerCase():
      return "text-red-500";
    case OrderStatus.NOT_RECEIVING_ENOUGH_OFFERS.toLowerCase():
      return "text-red-600";
    case OrderStatus.CLOSED.toLowerCase():
      return "text-secondary-800";
    case OrderStatus.WAITING_UNLOADING.toLowerCase():
      return "text-indigo-600";
    case OrderStatus.BUYER_WAITINGFORPAY.toLowerCase():
      return "text-orange-500";
    case OrderStatus.BUYER_WAITINGFORCHEK.toLowerCase():
      return "text-purple-600";
    case OrderStatus.BUYER_WAITFORFINANCE.toLowerCase():
      return "text-orange-600";
    case OrderStatus.BUYER_CANCELPAY.toLowerCase():
      return "text-red-400";
    case OrderStatus.BUYER_CANCEL_LOADING.toLowerCase():
      return "text-red-500";
    case OrderStatus.CONSIDERING_SUGGESTIONS.toLowerCase():
      return "text-yellow-500";
    case OrderStatus.RETURN_TO_BUYER_REQUEST.toLowerCase():
      return "text-blue-500";
    default:
      return "text-gray-600";
  }
};

export const orderStatusOptions = [
  {
    label: "ثبت درخواست",
    value: OrderStatus.REGISTERED,
  },
  {
    label: "در انتظار دریافت پیشنهادات",
    value: OrderStatus.WAITING_FOR_OFFERS,
  },
  {
    label: "بارگیری سفارش",
    value: OrderStatus.LOADING_ORDER,
  },
  {
    label: "ارسال پیشنهاد نهایی برای خریدار",
    value: OrderStatus.SEND_FINAL_OFFER_TO_BUYER,
  },
  {
    label: "تائید درخواست توسط خریدار",
    value: OrderStatus.CONFIRMATION_REQUEST_BY_BUYER,
  },
  {
    label: "عدم تائید درخواست توسط خریدار",
    value: OrderStatus.BUYER_FAILURE_APPROVE,
  },
  {
    label: "انصراف خریدار",
    value: OrderStatus.BUYER_CANCELLATION,
  },
  {
    label: "عدم دریافت پیشنهاد کافی",
    value: OrderStatus.NOT_RECEIVING_ENOUGH_OFFERS,
  },
  {
    label: "تحویل داده شد",
    value: OrderStatus.CLOSED,
  },
  {
    label: "در انتظار تخلیه و تحویل سفارش",
    value: OrderStatus.WAITING_UNLOADING,
  },
  {
    label: "در انتظار پرداخت سفارش",
    value: OrderStatus.BUYER_WAITINGFORPAY,
  },
  {
    label: "در انتظار ثبت چک الکترونیک",
    value: OrderStatus.BUYER_WAITINGFORCHEK,
  },
  {
    label: "در انتظار تائید مالی",
    value: OrderStatus.BUYER_WAITFORFINANCE,
  },
  {
    label: "عدم پرداخت و لغو سفارش",
    value: OrderStatus.BUYER_CANCELPAY,
  },
  {
    label: "عدم بارگیری و لغو سفارش",
    value: OrderStatus.BUYER_CANCEL_LOADING,
  },
  {
    label: "در حال بررسی پیشنهادات",
    value: OrderStatus.CONSIDERING_SUGGESTIONS,
  },
  {
    label: "بازگشت به درخواست خریدار",
    value: OrderStatus.RETURN_TO_BUYER_REQUEST,
  },
];
