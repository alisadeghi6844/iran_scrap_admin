import React, { useState } from "react";
import Modal from "../../../components/modal";
import Button from "../../../components/button";
import TextArea from "../../../components/textArea";
import Typography from "../../../components/typography/Typography";

interface ProductRequestItem {
  id: string;
  category: {
    name: string;
    code: string;
    parentId: string;
  };
  cheques: Array<{
    date: string;
    bank: string;
    no: string;
    sayyad: string;
  }>;
  comments: unknown[];
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

interface ProductRequestRejectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: ProductRequestItem | null;
  onReject: (requestId: string, reason: string) => void;
  loading: boolean;
}

const ProductRequestRejectionModal: React.FC<ProductRequestRejectionModalProps> = ({
  isOpen,
  onClose,
  request,
  onReject,
  loading,
}) => {
  const [reason, setReason] = useState("");

  const handleReject = () => {
    if (request?.id && reason.trim()) {
      onReject(request.id, reason.trim());
    }
  };

  const getAmountTypeText = (amountType: string) => {
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

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      headerTitle="رد درخواست محصول"
      size="lg"
    >
      <div className="p-6">
        <Typography className="text-lg font-semibold mb-4 text-center">
          دلیل رد درخواست را وارد کنید
        </Typography>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <Typography className="font-bold text-lg mb-3">
            اطلاعات درخواست
          </Typography>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-semibold">توضیحات پیشنهاد:</span> {request?.description || "_"}
            </div>
            <div>
              <span className="font-semibold">توضیحات درخواست:</span> {request?.request?.description || "_"}
            </div>
            <div>
              <span className="font-semibold">مقدار:</span> {request?.request?.amount || "_"} {getAmountTypeText(request?.request?.amountType || "")}
            </div>
            <div>
              <span className="font-semibold">قیمت نهایی:</span> {request?.finalPrice ? request.finalPrice.toLocaleString() + " تومان" : "_"}
            </div>
            <div>
              <span className="font-semibold">نوع پرداخت:</span> {getPaymentTypeText(request?.paymentType || "")}
            </div>
            <div>
              <span className="font-semibold">شهر:</span> {request?.request?.city || "_"}
            </div>
            <div>
              <span className="font-semibold">استان:</span> {request?.request?.province || "_"}
            </div>
            <div>
              <span className="font-semibold">تامین‌کننده:</span> {request?.provider?.mobile || "_"}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <TextArea
            label="دلیل رد درخواست"
            placeholder="لطفاً دلیل رد درخواست را به طور کامل توضیح دهید..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            required
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            انصراف
          </Button>
          <Button
            type="button"
            variant="error"
            onClick={handleReject}
            loading={loading}
            disabled={!reason.trim()}
          >
            رد درخواست
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductRequestRejectionModal;