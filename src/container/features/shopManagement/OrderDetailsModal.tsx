import React from "react";
import Modal from "../../../components/modal";
import Typography from "../../../components/typography/Typography";
import Button from "../../../components/button";
import {
  getOrderStatusText,
  getOrderStatusColor,
} from "../../../types/OrderStatus";
import { OrderItem } from "../../../types/OrderItem";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderItem | null;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  if (!order) return null;

  const formatDate = (timestamp: number) => {
    if (!timestamp) return "_";
    const date = new Date(timestamp);
    return date.toLocaleDateString("fa-IR");
  };

  const getPaymentTypeText = (paymentType: string) => {
    switch (paymentType?.toUpperCase()) {
      case "CASH":
        return "نقدی";
      case "INSTALLMENTS":
        return "مدت دار";
      case "CASH_AND_INSTALLMENTS":
        return "نقدی و مدت دار";
      case "CREDIT":
        return "اعتباری";
      default:
        return paymentType || "_";
    }
  };

  const getInventoryUnit = (inventoryType: string) => {
    switch (inventoryType?.toUpperCase()) {
      case "KILOGRAM":
      case "KG":
        return "کیلوگرم";
      case "GRAM":
        return "گرم";
      case "LITER":
        return "لیتر";
      case "PIECE":
        return "عدد";
      default:
        return "";
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      headerTitle="جزئیات سفارش"
      size="xl"
    >
      <div className="space-y-6">
        {/* Order Header */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Typography className="text-sm text-gray-600">
                تاریخ ایجاد
              </Typography>
              <Typography className="font-bold">
                {formatDate(order.createdAt)}
              </Typography>
            </div>
            {order?.status === "CLOSED" && order.unloadingDate && (
              <div>
                <Typography className="text-sm text-gray-600">
                  تاریخ تخلیه
                </Typography>
                <Typography className="font-bold">
                  {new Date(order.unloadingDate).toLocaleDateString("fa-IR")}
                </Typography>
              </div>
            )}
            <div>
              <Typography className="text-sm text-gray-600">وضعیت</Typography>
              <Typography
                className={`font-bold ${getOrderStatusColor(order.status)}`}
              >
                {getOrderStatusText(order.status)}
              </Typography>
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div>
          <Typography className="text-lg font-bold mb-3">
            اطلاعات محصول
          </Typography>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Typography className="text-sm text-gray-600">
                  نام محصول
                </Typography>
                <Typography className="font-bold">
                  {order.product?.name || "_"}
                </Typography>
              </div>
              <div>
                <Typography className="text-sm text-gray-600">دسته‌بندی</Typography>
                <Typography className="font-bold">
                  {order.category?.name || order.product?.category?.name || "_"}
                </Typography>
              </div>
              <div>
                <Typography className="text-sm text-gray-600">مقدار</Typography>
                <Typography className="font-bold">
                  {order.quantity}{" "}
                  {getInventoryUnit(order.product?.inventoryType)}
                </Typography>
              </div>
              {order.price && order.price > 0 && (
                <div>
                  <Typography className="text-sm text-gray-600">
                    قیمت واحد
                  </Typography>
                  <Typography className="font-bold">
                    {order.price.toLocaleString()} تومان
                  </Typography>
                </div>
              )}
              {order.finalPrice && order.finalPrice > 0 && (
                <div>
                  <Typography className="text-sm text-gray-600">
                    قیمت نهایی
                  </Typography>
                  <Typography className="font-bold">
                    {order.finalPrice.toLocaleString()} تومان
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Provider Information */}
        <div>
          <Typography className="text-lg font-bold mb-3">
            اطلاعات تامین کننده
          </Typography>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Typography className="text-sm text-gray-600">
                  نام تامین کننده
                </Typography>
                <Typography className="font-bold">
                  {typeof order?.providerId === 'object' && order?.providerId?.firstName && order?.providerId?.lastName
                    ? `${order.providerId.firstName} ${order.providerId.lastName}`
                    : typeof order?.providerId === 'object' && (order?.providerId?.mobile || order?.providerId?.companyName)
                    ? (order?.providerId?.mobile || order?.providerId?.companyName)
                    : order?.provider?.firstName && order?.provider?.lastName
                    ? `${order.provider.firstName} ${order.provider.lastName}`
                    : order?.provider?.mobile || order?.provider?.companyName || "_"}
                </Typography>
              </div>
              <div>
                <Typography className="text-sm text-gray-600">آدرس</Typography>
                <Typography className="font-bold">
                  {order.province && order.city ? `${order.province}, ${order.city}` : "_"}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        {(order.paymentType || (order.payingPrice && order.payingPrice > 0) || order.installmentMonths > 0) && (
          <div>
            <Typography className="text-lg font-bold mb-3">
              اطلاعات پرداخت
            </Typography>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {order.paymentType && (
                  <div>
                    <Typography className="text-sm text-gray-600">
                      نوع پرداخت
                    </Typography>
                    <Typography className="font-bold">
                      {getPaymentTypeText(order.paymentType)}
                    </Typography>
                  </div>
                )}
                {order.payingPrice && order.payingPrice > 0 && (
                  <div>
                    <Typography className="text-sm text-gray-600">
                      مبلغ قابل پرداخت
                    </Typography>
                    <Typography className="font-bold">
                      {order.payingPrice.toLocaleString()} تومان
                    </Typography>
                  </div>
                )}
                {order.installmentMonths > 0 && (
                  <div>
                    <Typography className="text-sm text-gray-600">
                      تعداد اقساط
                    </Typography>
                    <Typography className="font-bold">
                      {order.installmentMonths} ماه
                    </Typography>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Shipping Information */}
        {(order.city || order.province || (order.shippingPrice && order.shippingPrice > 0)) && (
          <div>
            <Typography className="text-lg font-bold mb-3">
              اطلاعات ارسال
            </Typography>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {order.city && (
                  <div>
                    <Typography className="text-sm text-gray-600">شهر</Typography>
                    <Typography className="font-bold">{order.city}</Typography>
                  </div>
                )}
                {order.province && (
                  <div>
                    <Typography className="text-sm text-gray-600">استان</Typography>
                    <Typography className="font-bold">{order.province}</Typography>
                  </div>
                )}
                {order.shippingPrice && order.shippingPrice > 0 && (
                  <div>
                    <Typography className="text-sm text-gray-600">
                      هزینه ارسال
                    </Typography>
                    <Typography className="font-bold">
                      {order.shippingPrice.toLocaleString()} تومان
                    </Typography>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Cheques Section - Read Only */}
        {order.cheques && order.cheques.length > 0 && (
          <div>
            <Typography className="text-lg font-bold mb-3">چک‌ها</Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {order.cheques.map((cheque, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                  <div className="space-y-2">
                    <div>
                      <Typography className="text-sm text-gray-600">بانک</Typography>
                      <Typography className="font-bold">{cheque.bank || "_"}</Typography>
                    </div>
                    <div>
                      <Typography className="text-sm text-gray-600">شماره چک</Typography>
                      <Typography className="font-bold">{cheque.no || "_"}</Typography>
                    </div>
                    <div>
                      <Typography className="text-sm text-gray-600">شماره صیاد</Typography>
                      <Typography className="font-bold">{cheque.sayyad || "_"}</Typography>
                    </div>
                    <div>
                      <Typography className="text-sm text-gray-600">تاریخ</Typography>
                      <Typography className="font-bold">{cheque.date || "_"}</Typography>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading Date - Read Only */}
        {order.loadingDate && (
          <div>
            <Typography className="text-lg font-bold mb-3">تاریخ بارگیری</Typography>
            <div className="bg-gray-50 p-4 rounded-lg">
              <Typography className="font-bold">
                {new Date(order.loadingDate).toLocaleDateString("fa-IR")}
              </Typography>
            </div>
          </div>
        )}

        {/* Driver Information - Read Only */}
        {order.driver && (
          <div>
            <Typography className="text-lg font-bold mb-3">
              اطلاعات راننده
            </Typography>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Typography className="text-sm text-gray-600">شماره بارنامه</Typography>
                  <Typography className="font-bold">{order.driver.billNumber || "_"}</Typography>
                </div>
                <div>
                  <Typography className="text-sm text-gray-600">شماره پلاک</Typography>
                  <Typography className="font-bold">{order.driver.licensePlate || "_"}</Typography>
                </div>
                <div>
                  <Typography className="text-sm text-gray-600">نام وسیله نقلیه</Typography>
                  <Typography className="font-bold">{order.driver.vehicleName || "_"}</Typography>
                </div>
                <div>
                  <Typography className="text-sm text-gray-600">نام راننده</Typography>
                  <Typography className="font-bold">{order.driver.driverName || "_"}</Typography>
                </div>
                <div>
                  <Typography className="text-sm text-gray-600">شماره تلفن راننده</Typography>
                  <Typography className="font-bold">{order.driver.driverPhone || "_"}</Typography>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            بستن
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;