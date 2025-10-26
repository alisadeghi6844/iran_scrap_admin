import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import Modal from "../../../components/modal";
import Typography from "../../../components/typography/Typography";
import Input from "../../../components/input";
import Button from "../../../components/button";
import {
  getOrderStatusText,
  getOrderStatusLabel,
} from "../../../types/OrderStatus";
import { 
  UpdateProductRequestOfferAdminAction,
  GetProductRequestAdminByIdAction 
} from "../../../redux/actions/product-request-offer-admin/ProductRequestOfferAdminActions";
import {
  selectUpdateProductRequestOfferAdminLoading,
  selectUpdateProductRequestOfferAdminData,
  selectUpdateProductRequestOfferAdminError,
  selectGetProductRequestAdminByIdLoading,
  selectGetProductRequestAdminByIdData,
  selectGetProductRequestAdminByIdError,
} from "../../../redux/slice/product-request-offer-admin/ProductRequestOfferAdminSlice";

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
  const dispatch = useDispatch<AppDispatch>();
  const [requestDetails, setRequestDetails] = useState<any>(null);
  
  const loading = useSelector(selectGetProductRequestAdminByIdLoading);
  const requestData = useSelector(selectGetProductRequestAdminByIdData);
  const error = useSelector(selectGetProductRequestAdminByIdError);

  useEffect(() => {
    if (isOpen && (request?._id || request?.id)) {
      dispatch(GetProductRequestAdminByIdAction({ requestId: request._id || request.id }));
    }
  }, [isOpen, request?._id, request?.id, dispatch]);

  useEffect(() => {
    if (requestData) {
      setRequestDetails(requestData);
    }
  }, [requestData]);
  
  if (!request) {
    return null;
  }

  const displayData = requestDetails || request;



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
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-center">در حال بارگذاری...</div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Request Header */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Typography className="text-sm text-gray-600">
                  تاریخ ایجاد
                </Typography>
                <Typography className="font-bold">
                  {formatDate(displayData.createdAt)}
                </Typography>
              </div>
              <div>
                <Typography className="text-sm text-gray-600">وضعیت</Typography>
                <Typography className="font-bold">
                  {displayData?.statusTitle || displayData?.status || "_"}
                </Typography>
              </div>
              <div>
                <Typography className="text-sm text-gray-600">
                  آخرین بروزرسانی
                </Typography>
                <Typography className="font-bold">
                  {formatDate(displayData.updatedAt)}
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
                    {displayData.category?.name || "_"}
                  </Typography>
                </div>
                <div>
                  <Typography className="text-sm text-gray-600">
                    مسیر دسته‌بندی
                  </Typography>
                  <Typography className="font-bold">
                    {displayData.catRoute || "_"}
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          {/* Request Information */}
          <div>
            <Typography className="text-lg font-bold mb-3">
              اطلاعات درخواست
            </Typography>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Typography className="text-sm text-gray-600">
                    توضیحات درخواست
                  </Typography>
                  <Typography className="font-bold">
                    {displayData.description || "_"}
                  </Typography>
                </div>
                <div>
                  <Typography className="text-sm text-gray-600">مقدار</Typography>
                  <Typography className="font-bold">
                    {displayData.amount} {getAmountTypeText(displayData.amountType)}
                  </Typography>
                </div>
                <div>
                  <Typography className="text-sm text-gray-600">شهر</Typography>
                  <Typography className="font-bold">
                    {displayData.city || "_"}
                  </Typography>
                </div>
                <div>
                  <Typography className="text-sm text-gray-600">استان</Typography>
                  <Typography className="font-bold">
                    {displayData.province || "_"}
                  </Typography>
                </div>
                <div>
                  <Typography className="text-sm text-gray-600">آدرس</Typography>
                  <Typography className="font-bold">
                    {displayData.address || "_"}
                  </Typography>
                </div>
                <div>
                  <Typography className="text-sm text-gray-600">نوع درخواست</Typography>
                  <Typography className="font-bold">
                    {getRequestTypeText(displayData.requestType)}
                  </Typography>
                </div>
                <div>
                  <Typography className="text-sm text-gray-600">کد پستی</Typography>
                  <Typography className="font-bold">
                    {displayData.postalCode || "_"}
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          {/* Offer Information */}
          {displayData.invoiceId && (
            <div>
              <Typography className="text-lg font-bold mb-3">
                اطلاعات پیشنهاد
              </Typography>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Typography className="text-sm text-gray-600">
                      نوع پرداخت
                    </Typography>
                    <Typography className="font-bold">
                      {getPaymentTypeText(displayData.invoiceId.paymentType)}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-sm text-gray-600">
                      قیمت به ازای هر کیلوگرم
                    </Typography>
                    <Typography className="font-bold">
                      {displayData.invoiceId.price
                        ? displayData.invoiceId.price.toLocaleString() + " تومان"
                        : "_"}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-sm text-gray-600">
                      قیمت نهایی
                    </Typography>
                    <Typography className="font-bold">
                      {displayData.invoiceId.finalPrice
                        ? displayData.invoiceId.finalPrice.toLocaleString() + " تومان"
                        : "_"}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-sm text-gray-600">
                      مبلغ پرداختی
                    </Typography>
                    <Typography className="font-bold">
                      {displayData.invoiceId.payingPrice
                        ? displayData.invoiceId.payingPrice.toLocaleString() + " تومان"
                        : "_"}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-sm text-gray-600">
                      هزینه حمل و نقل
                    </Typography>
                    <Typography className="font-bold">
                      {displayData.invoiceId.shippingPrice
                        ? displayData.invoiceId.shippingPrice.toLocaleString() + " تومان"
                        : "_"}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-sm text-gray-600">
                      نحوه حمل و نقل
                    </Typography>
                    <Typography className="font-bold">
                      {displayData.invoiceId.selectedShipping === "provider"
                        ? "توسط تامین‌کننده"
                        : displayData.invoiceId.selectedShipping === "buyer"
                        ? "توسط خریدار"
                        : displayData.invoiceId.selectedShipping || "_"}
                    </Typography>
                  </div>
                  {displayData.invoiceId.paymentType === "INSTALLMENTS" && (
                    <div>
                      <Typography className="text-sm text-gray-600">
                        تعداد اقساط
                      </Typography>
                      <Typography className="font-bold">
                        {displayData.installmentMonths} ماه
                      </Typography>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

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
                    {getPaymentTypeText(displayData.paymentType)}
                  </Typography>
                </div>
                {displayData.paymentType === "INSTALLMENTS" && (
                  <div>
                    <Typography className="text-sm text-gray-600">
                      تعداد اقساط
                    </Typography>
                    <Typography className="font-bold">
                      {displayData.installmentMonths} ماه
                    </Typography>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* User Information */}
          <div>
            <Typography className="text-lg font-bold mb-3">
              اطلاعات کاربر
            </Typography>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Typography className="text-sm text-gray-600">
                    نام و نام خانوادگی
                  </Typography>
                  <Typography className="font-bold">
                    {displayData.user?.firstName && displayData.user?.lastName
                      ? `${displayData.user.firstName} ${displayData.user.lastName}`
                      : "_"}
                  </Typography>
                </div>
                <div>
                  <Typography className="text-sm text-gray-600">
                    شماره موبایل
                  </Typography>
                  <Typography className="font-bold">
                    {displayData.user?.mobile || "_"}
                  </Typography>
                </div>
                <div>
                  <Typography className="text-sm text-gray-600">
                    نوع کاربر
                  </Typography>
                  <Typography className="font-bold">
                    {displayData.user?.usertype === "Buyer" ? "خریدار" : displayData.user?.usertype || "_"}
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
                    تاریخ مورد انتظار
                  </Typography>
                  <Typography className="font-bold">
                    {formatDate(displayData.expectedDate)}
                  </Typography>
                </div>
                <div>
                  <Typography className="text-sm text-gray-600">
                    تاریخ انقضا
                  </Typography>
                  <Typography className="font-bold">
                    {formatDate(displayData.expireDate)}
                  </Typography>
                </div>
                <div>
                  <Typography className="text-sm text-gray-600">
                    آخرین بروزرسانی
                  </Typography>
                  <Typography className="font-bold">
                    {formatDate(displayData.updatedAt)}
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          {/* Winner Information */}
          {displayData.winner && (
            <div>
              <Typography className="text-lg font-bold mb-3">
                تامین‌کننده برنده
              </Typography>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Typography className="text-sm text-gray-600">
                      شناسه تامین‌کننده
                    </Typography>
                    <Typography className="font-bold">
                      {displayData.winner.id || "_"}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-sm text-gray-600">
                      شناسه درخواست
                    </Typography>
                    <Typography className="font-bold">
                      {displayData.winner.requestId || "_"}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cheques Section */}
          {displayData.invoiceId?.cheques && displayData.invoiceId.cheques.length > 0 && (
            <div>
              <Typography className="text-lg font-bold mb-3">چک‌ها</Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayData.invoiceId.cheques.map((cheque: any, index: number) => (
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
        </div>
      )}


    </Modal>
  );
};

export default ProductRequestDetailsModal;
