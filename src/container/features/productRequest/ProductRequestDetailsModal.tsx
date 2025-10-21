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
import { UpdateProductRequestOfferAdminAction } from "../../../redux/actions/product-request-offer-admin/ProductRequestOfferAdminActions";
import {
  selectUpdateProductRequestOfferAdminLoading,
  selectUpdateProductRequestOfferAdminData,
  selectUpdateProductRequestOfferAdminError,
} from "../../../redux/slice/product-request-offer-admin/ProductRequestOfferAdminSlice";

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
  driver?: {
    billNumber: string;
    licensePlate: string;
    vehicleName: string;
    driverName: string;
    driverPhone: string;
  };
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
  const dispatch = useDispatch<AppDispatch>();
  const [editableCheques, setEditableCheques] = useState(request?.cheques || []);
  const [editableDriver, setEditableDriver] = useState(request?.driver || null);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [driverValidationErrors, setDriverValidationErrors] = useState<{[key: string]: string}>({});
  
  const updateLoading = useSelector(selectUpdateProductRequestOfferAdminLoading);
  const updateData = useSelector(selectUpdateProductRequestOfferAdminData);
  const updateError = useSelector(selectUpdateProductRequestOfferAdminError);

  useEffect(() => {
    if (request?.cheques) {
      setEditableCheques(request.cheques);
    }
    if (request?.driver) {
      setEditableDriver(request.driver);
    }
  }, [request?.cheques, request?.driver]);

  useEffect(() => {
    if (updateData) {
      onClose();
    }
  }, [updateData, onClose]);
  
  if (!request) {
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

  const handleDriverChange = (field: string, value: string) => {
    if (editableDriver) {
      setEditableDriver({
        ...editableDriver,
        [field]: value,
      });
      
      // Clear validation error for this field
      if (driverValidationErrors[field]) {
        const newErrors = { ...driverValidationErrors };
        delete newErrors[field];
        setDriverValidationErrors(newErrors);
      }
    }
  };

  const validateDriver = () => {
    const errors: {[key: string]: string} = {};
    
    if (editableDriver) {
      if (!editableDriver.billNumber?.trim()) {
        errors.billNumber = "شماره بارنامه الزامی است";
      }
      if (!editableDriver.licensePlate?.trim()) {
        errors.licensePlate = "شماره پلاک الزامی است";
      }
      if (!editableDriver.vehicleName?.trim()) {
        errors.vehicleName = "نام وسیله نقلیه الزامی است";
      }
      if (!editableDriver.driverName?.trim()) {
        errors.driverName = "نام راننده الزامی است";
      }
      if (!editableDriver.driverPhone?.trim()) {
        errors.driverPhone = "شماره تلفن راننده الزامی است";
      } else if (!/^09\d{9}$/.test(editableDriver.driverPhone)) {
        errors.driverPhone = "شماره تلفن باید با 09 شروع شده و 11 رقم باشد";
      }
    }
    
    setDriverValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveCheques = () => {
    if (validateCheques()) {
      dispatch(UpdateProductRequestOfferAdminAction({
        offerId: request.id,
        data: {
          cheques: editableCheques
        }
      }));
    }
  };

  const handleSaveDriver = () => {
    if (validateDriver()) {
      dispatch(UpdateProductRequestOfferAdminAction({
        offerId: request.id,
        data: {
          driver: editableDriver
        }
      }));
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
                  قیمت به ازای هر کیلوگرم
                </Typography>
                <Typography className="font-bold">
                  {request.price
                    ? request.price.toLocaleString() + " تومان"
                    : "_"}
                </Typography>
              </div>
              <div>
                <Typography className="text-sm text-gray-600">
                  قیمت نهایی (مقدار × قیمت هر کیلوگرم)
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
          <div className="flex justify-between items-center mb-3">
            <Typography className="text-lg font-bold">چک‌ها</Typography>
            {editableCheques && editableCheques.length > 0 && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveCheques}
                loading={updateLoading}
                disabled={updateLoading}
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

        {/* Driver Section */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <Typography className="text-lg font-bold">اطلاعات راننده</Typography>
            {editableDriver && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveDriver}
                loading={updateLoading}
                disabled={updateLoading}
              >
                ویرایش اطلاعات راننده
              </Button>
            )}
          </div>
          {editableDriver ? (
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    label="شماره بارنامه"
                    value={editableDriver.billNumber}
                    onChange={(e) => handleDriverChange('billNumber', e.target.value)}
                    size="md"
                    errorMessage={driverValidationErrors.billNumber}
                    required
                  />
                </div>
                <div>
                  <Input
                    label="شماره پلاک"
                    value={editableDriver.licensePlate}
                    onChange={(e) => handleDriverChange('licensePlate', e.target.value)}
                    size="md"
                    errorMessage={driverValidationErrors.licensePlate}
                    required
                  />
                </div>
                <div>
                  <Input
                    label="نام وسیله نقلیه"
                    value={editableDriver.vehicleName}
                    onChange={(e) => handleDriverChange('vehicleName', e.target.value)}
                    size="md"
                    errorMessage={driverValidationErrors.vehicleName}
                    required
                  />
                </div>
                <div>
                  <Input
                    label="نام راننده"
                    value={editableDriver.driverName}
                    onChange={(e) => handleDriverChange('driverName', e.target.value)}
                    size="md"
                    errorMessage={driverValidationErrors.driverName}
                    required
                  />
                </div>
                <div>
                  <Input
                    label="شماره تلفن راننده"
                    value={editableDriver.driverPhone}
                    onChange={(e) => handleDriverChange('driverPhone', e.target.value)}
                    size="md"
                    errorMessage={driverValidationErrors.driverPhone}
                    helperText="مثال: 09123456789"
                    required
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Typography className="text-gray-500">اطلاعات راننده موجود نیست</Typography>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ProductRequestDetailsModal;
