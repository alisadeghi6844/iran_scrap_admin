import React from "react";
import Modal from "../../../components/modal";

interface ProductRequestItem {
  id: string;
  providerIds: string[];
  description: string;
  categoryId: string;
  province: string;
  city: string;
  requestType: string;
  amount: number;
  amountType: string;
  paymentType: string;
  expectedDate: number;
  status: any;
  createdAt: number;
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
  if (!request) return null;

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

  const getRequestTypeText = (requestType: string) => {
    switch (requestType?.toUpperCase()) {
      case "NORMAL":
        return "عادی";
      case "URGENT":
        return "فوری";
      default:
        return requestType || "_";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="جزئیات درخواست محصول"
      size="lg"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              شناسه درخواست
            </label>
            <p className="text-sm text-gray-900">{request.id}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              نوع درخواست
            </label>
            <p className="text-sm text-gray-900">
              {getRequestTypeText(request.requestType)}
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            توضیحات
          </label>
          <p className="text-sm text-gray-900">{request.description || "_"}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              مقدار
            </label>
            <p className="text-sm text-gray-900">
              {request.amount
                ? `${request.amount} ${getAmountTypeText(request.amountType)}`
                : "_"}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              نوع پرداخت
            </label>
            <p className="text-sm text-gray-900">
              {getPaymentTypeText(request.paymentType)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              شهر
            </label>
            <p className="text-sm text-gray-900">{request.city || "_"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              استان
            </label>
            <p className="text-sm text-gray-900">{request.province || "_"}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تاریخ ایجاد
            </label>
            <p className="text-sm text-gray-900">{formatDate(request.createdAt)}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تاریخ مورد انتظار
            </label>
            <p className="text-sm text-gray-900">{formatDate(request.expectedDate)}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            وضعیت
          </label>
          <p className="text-sm text-gray-900">
            {JSON.stringify(request.status) || "_"}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            شناسه دسته‌بندی
          </label>
          <p className="text-sm text-gray-900">{request.categoryId || "_"}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            تامین‌کنندگان
          </label>
          <p className="text-sm text-gray-900">
            {request.providerIds?.length > 0
              ? request.providerIds.join(", ")
              : "هیچ تامین‌کننده‌ای تعیین نشده"}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ProductRequestDetailsModal;