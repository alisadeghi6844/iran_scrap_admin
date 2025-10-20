import React from "react";
import Modal from "../../../components/modal";
import Typography from "../../../components/typography/Typography";
import { getOrderStatusText, getOrderStatusColor } from "../../../types/OrderStatus";

interface OrderItem {
  id: string;
  buyerId: string;
  providerId: string;
  product: {
    id: string;
    name?: string;
    categoryId: string;
    inventoryType: string;
  };
  quantity: number;
  price: number;
  finalPrice: number;
  payingPrice: number;
  paymentType: string;
  installmentMonths: number;
  status: string;
  city: string;
  province: string;
  createdAt: number;
  updatedAt: number;
  cheques?: Array<{
    date: string;
    bank: string;
    no: string;
    sayyad: string;
  }>;
  shippings: {
    digifarm: number;
    provider: number;
  };
  shippingPrice: number;
}

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
  console.log("OrderDetailsModal rendered with isOpen:", isOpen, "order:", order);
  if (!order) {
    console.log("OrderDetailsModal: No order provided, returning null");
    return null;
  }

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



  console.log("OrderDetailsModal: About to render Modal with open:", isOpen);
  
  return (
    <Modal open={isOpen} onClose={onClose} size="xl" headerTitle="جزئیات سفارش">
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
            <div>
              <Typography className="text-sm text-gray-600">وضعیت</Typography>
              <Typography className={`font-bold ${getOrderStatusColor(order.status)}`}>
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
                <Typography className="text-sm text-gray-600">مقدار</Typography>
                <Typography className="font-bold">
                  {order.quantity}{" "}
                  {getInventoryUnit(order.product?.inventoryType)}
                </Typography>
              </div>
              <div>
                <Typography className="text-sm text-gray-600">
                  قیمت واحد
                </Typography>
                <Typography className="font-bold">
                  {order.price?.toLocaleString()} تومان
                </Typography>
              </div>
              <div>
                <Typography className="text-sm text-gray-600">
                  قیمت نهایی
                </Typography>
                <Typography className="font-bold">
                  {order.finalPrice?.toLocaleString()} تومان
                </Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div>
          <Typography className="text-lg font-bold mb-3">
            اطلاعات پرداخت
          </Typography>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Typography className="text-sm text-gray-600">
                  نوع پرداخت
                </Typography>
                <Typography className="font-bold">
                  {getPaymentTypeText(order.paymentType)}
                </Typography>
              </div>
              <div>
                <Typography className="text-sm text-gray-600">
                  مبلغ قابل پرداخت
                </Typography>
                <Typography className="font-bold">
                  {order.payingPrice?.toLocaleString()} تومان
                </Typography>
              </div>
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

        {/* Shipping Information */}
        <div>
          <Typography className="text-lg font-bold mb-3">
            اطلاعات ارسال
          </Typography>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Typography className="text-sm text-gray-600">شهر</Typography>
                <Typography className="font-bold">{order.city}</Typography>
              </div>
              <div>
                <Typography className="text-sm text-gray-600">استان</Typography>
                <Typography className="font-bold">{order.province}</Typography>
              </div>
              <div>
                <Typography className="text-sm text-gray-600">
                  هزینه ارسال
                </Typography>
                <Typography className="font-bold">
                  {order.shippingPrice?.toLocaleString()} تومان
                </Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Cheques Section */}
        <div>
          <Typography className="text-lg font-bold mb-3">چک‌ها</Typography>
          {order.cheques && order.cheques.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {order.cheques.map((cheque, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                  <div className="space-y-2">
                    <div>
                      <Typography className="text-sm text-gray-600">
                        بانک
                      </Typography>
                      <Typography className="font-bold">
                        {cheque.bank}
                      </Typography>
                    </div>
                    <div>
                      <Typography className="text-sm text-gray-600">
                        شماره چک
                      </Typography>
                      <Typography className="font-bold">{cheque.no}</Typography>
                    </div>
                    <div>
                      <Typography className="text-sm text-gray-600">
                        شماره صیاد
                      </Typography>
                      <Typography className="font-bold">
                        {cheque.sayyad}
                      </Typography>
                    </div>
                    <div>
                      <Typography className="text-sm text-gray-600">
                        تاریخ
                      </Typography>
                      <Typography className="font-bold">
                        {cheque.date}
                      </Typography>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Typography className="text-gray-500">چکی موجود نیست</Typography>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;
