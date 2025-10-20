import React, { useState } from "react";
import Modal from "../../../components/modal";
import Typography from "../../../components/typography/Typography";
import Input from "../../../components/input";
import Button from "../../../components/button";
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
  const [editableCheques, setEditableCheques] = useState(order?.cheques || []);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  
  console.log("OrderDetailsModal rendered with isOpen:", isOpen, "order:", order);
  if (!order) {
    console.log("OrderDetailsModal: No order provided, returning null");
    return null;
  }

  const handleChequeChange = (index: number, field: string, value: string) => {
    const updatedCheques = [...editableCheques];
    updatedCheques[index] = {
      ...updatedCheques[index],
      [field]: value,
    };
    setEditableCheques(updatedCheques);
    
    // Clear validation error for this field
    const errorKey = `${index}-${field}`;
    if (validationErrors[errorKey]) {
      const newErrors = { ...validationErrors };
      delete newErrors[errorKey];
      setValidationErrors(newErrors);
    }
  };

  const validateCheques = () => {
    const errors: {[key: string]: string} = {};
    
    editableCheques.forEach((cheque, index) => {
      if (!cheque.bank?.trim()) {
        errors[`${index}-bank`] = "نام بانک الزامی است";
      }
      if (!cheque.no?.trim()) {
        errors[`${index}-no`] = "شماره چک الزامی است";
      }
      if (!cheque.sayyad?.trim()) {
        errors[`${index}-sayyad`] = "شماره صیاد الزامی است";
      } else if (cheque.sayyad.length !== 16) {
        errors[`${index}-sayyad`] = "شماره صیاد باید 16 رقم باشد";
      }
      if (!cheque.date?.trim()) {
        errors[`${index}-date`] = "تاریخ الزامی است";
      }
    });
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveCheques = () => {
    if (validateCheques()) {
      // Here you can add API call to save cheques
      console.log("Saving cheques:", editableCheques);
      alert("چک‌ها با موفقیت ذخیره شدند");
    }
  };

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
          <div className="flex justify-between items-center mb-3">
            <Typography className="text-lg font-bold">چک‌ها</Typography>
            {editableCheques && editableCheques.length > 0 && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveCheques}
              >
                ویرایش چک‌ها
              </Button>
            )}
          </div>
          {editableCheques && editableCheques.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {editableCheques.map((cheque, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                  <div className="space-y-4">
                    <div>
                      <Input
                        label="بانک"
                        value={cheque.bank}
                        onChange={(e) => handleChequeChange(index, 'bank', e.target.value)}
                        size="md"
                        errorMessage={validationErrors[`${index}-bank`]}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        label="شماره چک"
                        value={cheque.no}
                        onChange={(e) => handleChequeChange(index, 'no', e.target.value)}
                        size="md"
                        errorMessage={validationErrors[`${index}-no`]}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        label="شماره صیاد"
                        value={cheque.sayyad}
                        onChange={(e) => handleChequeChange(index, 'sayyad', e.target.value)}
                        size="md"
                        errorMessage={validationErrors[`${index}-sayyad`]}
                        helperText="باید 16 رقم باشد"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        label="تاریخ"
                        value={cheque.date}
                        onChange={(e) => handleChequeChange(index, 'date', e.target.value)}
                        size="md"
                        errorMessage={validationErrors[`${index}-date`]}
                        required
                      />
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
