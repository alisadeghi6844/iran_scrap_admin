import React from "react";
import Modal from "../../../components/modal";
import Button from "../../../components/button";
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

interface ProductRequestApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: ProductRequestItem | null;
  onApprove: (requestId: string) => void;
  loading: boolean;
}

const ProductRequestApprovalModal: React.FC<ProductRequestApprovalModalProps> = ({
  isOpen,
  onClose,
  request,
  onApprove,
  loading,
}) => {
  const handleApprove = () => {
    if (request?.id) {
      onApprove(request.id);
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

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      headerTitle="تایید درخواست محصول"
      size="lg"
    >
      <div className="p-6">
        <Typography className="text-lg font-semibold mb-4 text-center">
          آیا از تایید این درخواست اطمینان دارید؟
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
            variant="success"
            onClick={handleApprove}
            loading={loading}
          >
            تایید درخواست
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductRequestApprovalModal;