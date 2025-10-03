export enum OrderStatus {
  Pending = 'Pending', // در حال بررسی - وضعیت اولیه
  Rejected = 'Rejected', // رد شده توسط تامین کننده
  Accepted = 'Accepted', // پذیرفته شده توسط تامین کننده
  PayFailed = 'PayFailed', // پرداخت ناموفق
  Payed = 'Payed', // پرداخت موفق
  PaymentVerified = 'PaymentVerified', // تایید پرداخت
  PaymentDeclined = 'PaymentDeclined', // عدم تایید پرداخت
  Preparing = 'Preparing', // فعلا استفاده نشده
  Shipping = 'Shipping', // در حال ارسال
  Delivered = 'Delivered', // تحویل شده
}

export const getOrderStatusText = (status: string): string => {
  switch (status?.toLowerCase()) {
    case OrderStatus.Pending.toLowerCase():
      return "در انتظار تایید";
    case OrderStatus.Accepted.toLowerCase():
      return "تایید شده";
    case OrderStatus.Rejected.toLowerCase():
      return "رد شده";
    case OrderStatus.PayFailed.toLowerCase():
      return "پرداخت ناموفق";
    case OrderStatus.Payed.toLowerCase():
      return "پرداخت شده";
    case OrderStatus.PaymentVerified.toLowerCase():
      return "پرداخت تایید شده";
    case OrderStatus.PaymentDeclined.toLowerCase():
      return "پرداخت رد شده";
    case OrderStatus.Preparing.toLowerCase():
      return "در حال آماده‌سازی";
    case OrderStatus.Shipping.toLowerCase():
      return "در حال ارسال";
    case OrderStatus.Delivered.toLowerCase():
      return "تحویل داده شده";
    default:
      return status || "نامشخص";
  }
};

export const getOrderStatusColor = (status: string): string => {
  switch (status?.toLowerCase()) {
    case OrderStatus.Pending.toLowerCase():
      return "text-yellow-600";
    case OrderStatus.Accepted.toLowerCase():
      return "text-blue-600";
    case OrderStatus.Rejected.toLowerCase():
      return "text-red-600";
    case OrderStatus.PayFailed.toLowerCase():
      return "text-red-500";
    case OrderStatus.Payed.toLowerCase():
      return "text-green-600";
    case OrderStatus.PaymentVerified.toLowerCase():
      return "text-green-700";
    case OrderStatus.PaymentDeclined.toLowerCase():
      return "text-red-700";
    case OrderStatus.Preparing.toLowerCase():
      return "text-orange-600";
    case OrderStatus.Shipping.toLowerCase():
      return "text-purple-600";
    case OrderStatus.Delivered.toLowerCase():
      return "text-green-800";
    default:
      return "text-gray-600";
  }
};

export const orderStatusOptions = [
  {
    label: "در انتظار تایید",
    value: OrderStatus.Pending,
  },
  {
    label: "تایید شده",
    value: OrderStatus.Accepted,
  },
  {
    label: "رد شده",
    value: OrderStatus.Rejected,
  },
  {
    label: "پرداخت ناموفق",
    value: OrderStatus.PayFailed,
  },
  {
    label: "پرداخت شده",
    value: OrderStatus.Payed,
  },
  {
    label: "پرداخت تایید شده",
    value: OrderStatus.PaymentVerified,
  },
  {
    label: "پرداخت رد شده",
    value: OrderStatus.PaymentDeclined,
  },
  {
    label: "در حال آماده‌سازی",
    value: OrderStatus.Preparing,
  },
  {
    label: "در حال ارسال",
    value: OrderStatus.Shipping,
  },
  {
    label: "تحویل داده شده",
    value: OrderStatus.Delivered,
  },
];