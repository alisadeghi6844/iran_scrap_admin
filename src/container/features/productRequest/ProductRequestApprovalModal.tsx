import React from "react";
import Modal from "../../../components/modal";
import Button from "../../../components/button";
import Typography from "../../../components/typography/Typography";

interface ProductRequestItem {
  _id: string;
  id?: string;
  address: string;
  amount: number;
  amountType: string;
  category: {
    _id: string;
    name: string;
    code: string;
    image: string;
  };
  catRoute: string;
  categoryId: {
    id: string;
    name: string;
    code: string;
    isLast: boolean;
    catRoute: string;
    createdAt: number;
    image: string;
    parentId: string;
    updatedAt: number;
  };
  city: string;
  createdAt: number;
  description: string;
  expectedDate: number;
  expireDate: number;
  installmentMonths: number;
  invoiceId?: {
    id: string;
    offerId: string;
    code: string;
    cheques: Array<{
      date: string;
      bank: string;
      no: string;
      sayyad: string;
    }>;
    comments: string[];
    createdAt: number;
    finalPrice: number;
    payingPrice: number;
    paymentType: string;
    price: number;
    selectedShipping: string;
    shippingPrice: number;
    totalprice: number;
    updatedAt: number;
  };
  paymentType: string;
  postalCode: string;
  providerIds: Array<{
    id: string;
    mobile: string;
    phone?: string;
    companyName?: string;
    agentName?: string;
    agentPhone?: string;
    firstName?: string;
    lastName?: string;
  }>;
  province: string;
  requestType: string;
  status: string;
  statusTitle: string;
  updatedAt: number;
  user: {
    id: string;
    mobile: string;
    firstName: string;
    lastName: string;
    authCode: string;
    authCodeExpireTime: number;
    createdAt: number;
    extraImages: any[];
    isWelcomeComplete: boolean;
    lastLoginAt: number;
    permissions: any[];
    productCategories: string[];
    roles: string[];
    updatedAt: number;
    updatedBy: string;
    updatedFields: string;
    userSort: string;
    usertype: string;
  };
  userId: {
    id: string;
    mobile: string;
    firstName: string;
    lastName: string;
    authCode: string;
    authCodeExpireTime: number;
    createdAt: number;
    extraImages: any[];
    isWelcomeComplete: boolean;
    lastLoginAt: number;
    permissions: any[];
    productCategories: string[];
    roles: string[];
    updatedAt: number;
    updatedBy: string;
    updatedFields: string;
    userSort: string;
    usertype: string;
  };
  winner?: {
    id: string;
    requestId: string;
    [key: string]: any;
  };
  winnerId?: string;
  __v: number;
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
    if (request?._id || request?.id) {
      onApprove(request._id || request.id || "");
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
              <span className="font-semibold">توضیحات درخواست:</span> {request?.description || "_"}
            </div>
            <div>
              <span className="font-semibold">دسته‌بندی:</span> {request?.category?.name || "_"}
            </div>
            <div>
              <span className="font-semibold">مقدار:</span> {request?.amount || "_"} {getAmountTypeText(request?.amountType || "")}
            </div>
            <div>
              <span className="font-semibold">قیمت نهایی:</span> {request?.winner?.totalprice ? request.winner.totalprice.toLocaleString() + " تومان" : "_"}
            </div>
            <div>
              <span className="font-semibold">نوع پرداخت:</span> {getPaymentTypeText(request?.paymentType || "")}
            </div>
            <div>
              <span className="font-semibold">شهر:</span> {request?.city || "_"}
            </div>
            <div>
              <span className="font-semibold">استان:</span> {request?.province || "_"}
            </div>
            <div>
              <span className="font-semibold">کاربر:</span> {request?.user?.firstName && request?.user?.lastName ? `${request.user.firstName} ${request.user.lastName}` : request?.user?.mobile || "_"}
            </div>
            <div>
              <span className="font-semibold">آدرس:</span> {request?.address || "_"}
            </div>
            <div>
              <span className="font-semibold">کد پستی:</span> {request?.postalCode || "_"}
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