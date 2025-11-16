import React from "react";
import Modal from "../../../components/modal";
import { convertToJalali } from "../../../utils/MomentConvertor";
import { REQUEST_STATUS } from "../../../utils/constants";

interface RequestDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: unknown;
}

const RequestDetailModal: React.FC<RequestDetailModalProps> = ({
  isOpen,
  onClose,
  request,
}) => {
  if (!request) return null;

  const formatPaymentType = (paymentType: string) => {
    switch (paymentType) {
      case "INSTALLMENTS":
        return "مدت دار";
      case "CASH_AND_INSTALLMENTS":
        return "نقد و مدت دار";
      case "CASH":
        return "نقد";
      default:
        return paymentType || "_";
    }
  };

  const formatAmount = (amount: number, amountType: string) => {
    const typeMap: { [key: string]: string } = {
      KILOGRAM: "کیلوگرم",
      TON: "تن",
      GRAM: "گرم",
    };
    return `${amount} ${typeMap[amountType] || amountType}`;
  };

  const getStatusTitle = (statusCode: string) => {
    const statusKey = Object.keys(REQUEST_STATUS).find(
      key => REQUEST_STATUS[key as keyof typeof REQUEST_STATUS].code === statusCode
    );
    return statusKey ? REQUEST_STATUS[statusKey as keyof typeof REQUEST_STATUS].title : statusCode;
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      headerTitle="جزئیات درخواست"
      size="2xl"
    >
      <div className="p-6 space-y-6">
        {/* اطلاعات درخواست کننده */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            اطلاعات درخواست کننده
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-gray-600">نام:</span>
              <span className="mr-2">
                {request.user?.agentName || 
                 (request.user?.firstName 
                   ? `${request.user.firstName} ${request.user.lastName}` 
                   : "_")}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-600">شماره تماس:</span>
              <span className="mr-2">{request.user?.mobile || "_"}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">نام شرکت:</span>
              <span className="mr-2">{request.user?.companyName || "_"}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">کد درخواست:</span>
              <span className="mr-2">{request.code || "_"}</span>
            </div>
          </div>
        </div>

        {/* اطلاعات محصول */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            اطلاعات محصول
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-gray-600">دسته بندی:</span>
              <span className="mr-2">{request.category?.name || "_"}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">مسیر دسته بندی:</span>
              <span className="mr-2">{request?.category.catRoute || "_"}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">مقدار درخواستی:</span>
              <span className="mr-2">
                {request.amount 
                  ? formatAmount(request.amount, request.amountType)
                  : "_"}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-600">نوع درخواست:</span>
              <span className="mr-2">
                {request.requestType === "NORMAL" ? "عادی" : request.requestType || "_"}
              </span>
            </div>
          </div>
        </div>

        {/* اطلاعات مکانی */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            اطلاعات مکانی
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-gray-600">استان:</span>
              <span className="mr-2">{request.province || "_"}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">شهر:</span>
              <span className="mr-2">{request.city || "_"}</span>
            </div>
            <div className="md:col-span-2">
              <span className="font-medium text-gray-600">آدرس:</span>
              <span className="mr-2">{request.address || "_"}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">کد پستی:</span>
              <span className="mr-2">{request.postalCode || "_"}</span>
            </div>
          </div>
        </div>

        {/* اطلاعات پرداخت */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            اطلاعات پرداخت
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-gray-600">نوع پرداخت:</span>
              <span className="mr-2">{formatPaymentType(request.paymentType)}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">تعداد اقساط:</span>
              <span className="mr-2">{request.installmentMonths || "_"}</span>
            </div>
          </div>
        </div>

        {/* اطلاعات زمانی */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            اطلاعات زمانی
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-gray-600">تاریخ ثبت:</span>
              <span className="mr-2">
                {request.createdAt ? convertToJalali(request.createdAt) : "_"}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-600">تاریخ انقضا:</span>
              <span className="mr-2">
                {request.expireDate ? convertToJalali(request.expireDate) : "_"}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-600">تاریخ مورد انتظار:</span>
              <span className="mr-2">
                {request.expectedDate ? convertToJalali(request.expectedDate) : "_"}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-600">آخرین بروزرسانی:</span>
              <span className="mr-2">
                {request.updatedAt ? convertToJalali(request.updatedAt) : "_"}
              </span>
            </div>
          </div>
        </div>

        {/* وضعیت */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            وضعیت درخواست
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <span className="font-medium text-gray-600">وضعیت:</span>
              <span className="mr-2">{getStatusTitle(request.status) || request.statusTitle || "_"}</span>
            </div>
          </div>
        </div>

        {/* توضیحات */}
        {request.description && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              توضیحات
            </h3>
            <p className="text-gray-700">{request.description}</p>
          </div>
        )}

        {/* اطلاعات تامین کنندگان */}
        {request.providerIds && request.providerIds.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              تامین کنندگان
            </h3>
            <div>
              <span className="font-medium text-gray-600">تعداد تامین کنندگان:</span>
              <span className="mr-2">{request.providerIds.length}</span>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default RequestDetailModal;