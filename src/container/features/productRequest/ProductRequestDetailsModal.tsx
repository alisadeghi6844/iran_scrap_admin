import React from "react";
import Modal from "../../../components/modal";
import Typography from "../../../components/typography/Typography";
import {
  getOrderStatusText,
  getOrderStatusLabel,
} from "../../../types/OrderStatus";

interface ProductRequestItem {
  id: string;
  category: {
    name: string;
    code: string;
    parentId: string;
    icon: string | null;
    image: string;
  };
  cheques: Array<{
    date: string;
    bank: string;
    no: string;
    sayyad: string;
  }>;
  comments: string[];
  createdAt: number;
  deliveryTime: number;
  description: string;
  expireDate: number;
  finalPrice: number;
  image: string | null;
  installmentMonths: number;
  payingPrice: number;
  paymentType: string;
  price: number;
  provider: {
    mobile: string;
    profileImg: string | null;
  };
  providerId: string;
  request: {
    description: string;
    categoryId: string;
    amount: number;
    amountType: string;
    city: string;
    province: string;
  };
  requestId: string;
  shippingPrice: number;
  shippings: string;
  state: string;
  status: string;
  statusFa: string;
  updatedAt: number;
}

interface ProductRequestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: ProductRequestItem | null;
}

const ProductRequestDetailsModal: React.FC<ProductRequestDetailsModalProps> = ({
  isOpen,
  onClose,
  request,
}) => {
  if (!request) {
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
        return "اقساطی";
      case "CREDIT":
        return "اعتباری";
      default:
        return paymentType || "_";
    }
  };

  const getAmountTypeText = (amountType: string) => {
    switch (amountType?.toUpperCase()) {
      case "KILOGRAM":
        return "کیلوگرم";
      case "TON":
        return "تن";
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

  const getShippingText = (shippings: string) => {
    switch (shippings?.toLowerCase()) {
      case "provider":
        return "توسط تامین‌کننده";
      case "buyer":
        return "توسط خریدار";
      default:
        return shippings || "_";
    }
  };

  console.log(
    "ProductRequestDetailsModal: About to render Modal with open:",
    isOpen
  );

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size="xl"
      headerTitle="جزئیات درخواست محصول"
    >
      <div className="space-y-6">
        {/* Request Header */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Typography className="text-sm text-gray-600">
                تاریخ ایجاد
              </Typography>
              <Typography className="font-bold">
                {formatDate(request.createdAt)}
              </Typography>
            </div>
            <div>
              <Typography className="text-sm text-gray-600">وضعیت</Typography>
              <Typography className="font-bold">
                {request?.statusFa ||
                  (request?.state
                    ? getOrderStatusText(request.state)
                    : request?.status
                    ? getOrderStatusLabel(request.status)
                    : "_")}
              </Typography>
            </div>
            <div>
              <Typography className="text-sm text-gray-600">
                آخرین بروزرسانی
              </Typography>
              <Typography className="font-bold">
                {formatDate(request.updatedAt)}
              </Typography>
            </div>
          </div>
        </div>

        {/* Category Information */}
        <div>
          <Typography className="text-lg font-bold mb-3">
            اطلاعات دسته‌بندی
          </Typography>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Typography className="text-sm text-gray-600">
                  نام دسته‌بندی
                </Typography>
                <Typography className="font-bold">
                  {request.category?.name || "_"}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Request Information */}
        <div>
          <Typography className="text-lg font-bold mb-3">
            اطلاعات درخواست اصلی
          </Typography>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Typography className="text-sm text-gray-600">
                  توضیحات درخواست
                </Typography>
                <Typography className="font-bold">
                  {request.request?.description || "_"}
                </Typography>
              </div>
              <div>
                <Typography className="text-sm text-gray-600">مقدار</Typography>
                <Typography className="font-bold">
                  {request.request?.amount}{" "}
                  {getAmountTypeText(request.request?.amountType)}
                </Typography>
              </div>
              <div>
                <Typography className="text-sm text-gray-600">شهر</Typography>
                <Typography className="font-bold">
                  {request.request?.city || "_"}
                </Typography>
              </div>
              <div>
                <Typography className="text-sm text-gray-600">استان</Typography>
                <Typography className="font-bold">
                  {request.request?.province || "_"}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Offer Information */}
        <div>
          <Typography className="text-lg font-bold mb-3">
            اطلاعات پیشنهاد
          </Typography>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Typography className="text-sm text-gray-600">
                  توضیحات پیشنهاد
                </Typography>
                <Typography className="font-bold">
                  {request.description || "_"}
                </Typography>
              </div>
              <div>
                <Typography className="text-sm text-gray-600">
                  نوع پرداخت
                </Typography>
                <Typography className="font-bold">
                  {getPaymentTypeText(request.paymentType)}
                </Typography>
              </div>
              <div>
                <Typography className="text-sm text-gray-600">
                  قیمت به ازای هر تن
                </Typography>
                <Typography className="font-bold">
                  {request.price
                    ? request.price.toLocaleString() + " تومان"
                    : "_"}
                </Typography>
              </div>
              <div>
                <Typography className="text-sm text-gray-600">
                  قیمت نهایی (مقدار × قیمت هر تن)
                </Typography>
                <Typography className="font-bold">
                  {request.finalPrice
                    ? request.finalPrice.toLocaleString() + " تومان"
                    : "_"}
                </Typography>
              </div>
              <div>
                <Typography className="text-sm text-gray-600">
                  مبلغ پرداختی
                </Typography>
                <Typography className="font-bold">
                  {request.payingPrice
                    ? request.payingPrice.toLocaleString() + " تومان"
                    : "_"}
                </Typography>
              </div>
              <div>
                <Typography className="text-sm text-gray-600">
                  هزینه حمل و نقل (جداگانه)
                </Typography>
                <Typography className="font-bold">
                  {request.shippingPrice
                    ? request.shippingPrice.toLocaleString() + " تومان"
                    : "_"}
                </Typography>
              </div>
              <div>
                <Typography className="text-sm text-gray-600">
                  نحوه حمل و نقل
                </Typography>
                <Typography className="font-bold">
                  {getShippingText(request.shippings)}
                </Typography>
              </div>
              {request.paymentType === "INSTALLMENTS" && (
                <div>
                  <Typography className="text-sm text-gray-600">
                    تعداد اقساط
                  </Typography>
                  <Typography className="font-bold">
                    {request.installmentMonths} ماه
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Provider Information */}
        <div>
          <Typography className="text-lg font-bold mb-3">
            اطلاعات تامین‌کننده
          </Typography>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Typography className="text-sm text-gray-600">
                  شماره موبایل
                </Typography>
                <Typography className="font-bold">
                  {request.provider?.mobile || "_"}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Dates Information */}
        <div>
          <Typography className="text-lg font-bold mb-3">
            اطلاعات تاریخ
          </Typography>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Typography className="text-sm text-gray-600">
                  تاریخ تحویل
                </Typography>
                <Typography className="font-bold">
                  {formatDate(request.deliveryTime)}
                </Typography>
              </div>
              <div>
                <Typography className="text-sm text-gray-600">
                  تاریخ انقضا
                </Typography>
                <Typography className="font-bold">
                  {formatDate(request.expireDate)}
                </Typography>
              </div>
              <div>
                <Typography className="text-sm text-gray-600">
                  آخرین بروزرسانی
                </Typography>
                <Typography className="font-bold">
                  {formatDate(request.updatedAt)}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Cheques Section */}
        <div>
          <Typography className="text-lg font-bold mb-3">چک‌ها</Typography>
          {request.cheques && request.cheques.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {request.cheques.map((cheque, index) => (
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

export default ProductRequestDetailsModal;
