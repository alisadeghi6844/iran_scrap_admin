import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import Modal from "../../../components/modal";
import Typography from "../../../components/typography/Typography";
import Input from "../../../components/input";
import Button from "../../../components/button";

import {
  GetProductRequestAdminByIdAction,
  UpdateProductRequestInvoiceAdminAction,
} from "../../../redux/actions/product-request-offer-admin/ProductRequestOfferAdminActions";
import {
  selectGetProductRequestAdminByIdLoading,
  selectGetProductRequestAdminByIdData,
  selectGetProductRequestAdminByIdError,
  selectUpdateProductRequestInvoiceAdminLoading,
  selectUpdateProductRequestInvoiceAdminData,
} from "../../../redux/slice/product-request-offer-admin/ProductRequestOfferAdminSlice";
import {
  convertPersianToGregorian_2,
  convertGregorianToPersian,
} from "../../../utils/MomentConvertor";
import moment from "jalali-moment";

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
    selectedShipping: {
      name: string;
      price: string | number;
    };
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
    extraImages: unknown[];
    isWelcomeComplete: boolean;
    lastLoginAt: number;
    permissions: unknown[];
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
    [key: string]: unknown;
  };
  winnerId?: string;
  __v: number;
}

interface ProductRequestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: ProductRequestItem | null;
  driverOnlyMode?: boolean;
}

const ProductRequestDetailsModal: React.FC<ProductRequestDetailsModalProps> = ({
  isOpen,
  onClose,
  request,
  driverOnlyMode = false,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [requestDetails, setRequestDetails] = useState<unknown>(null);
  const [editableCheques, setEditableCheques] = useState<
    Array<{ date: string; bank: string; no: string; sayyad: string }>
  >([]);
  const [editableDriver, setEditableDriver] = useState<{
    billNumber: string;
    licensePlate: string;
    vehicleName: string;
    driverName: string;
    driverPhone: string;
  } | null>(null);
  const [editableLoadingDate, setEditableLoadingDate] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const [driverValidationErrors, setDriverValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const [loadingDateError, setLoadingDateError] = useState<string>("");

  const loading = useSelector(selectGetProductRequestAdminByIdLoading);
  const requestData = useSelector(selectGetProductRequestAdminByIdData);
  const error = useSelector(selectGetProductRequestAdminByIdError);
  const updateLoading = useSelector(
    selectUpdateProductRequestInvoiceAdminLoading
  );
  const updateData = useSelector(selectUpdateProductRequestInvoiceAdminData);

  // Reset all states when modal opens or request changes
  useEffect(() => {
    if (isOpen && (request?._id || request?.id)) {
      // Reset all editable states
      setEditableCheques([]);
      setEditableDriver(null);
      setEditableLoadingDate("");
      setValidationErrors({});
      setDriverValidationErrors({});
      setLoadingDateError("");
      setRequestDetails(null);

      dispatch(
        GetProductRequestAdminByIdAction({
          requestId: request._id || request.id,
        })
      );
    }
  }, [isOpen, request?._id, request?.id, dispatch]);

  // Reset states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setEditableCheques([]);
      setEditableDriver(null);
      setEditableLoadingDate("");
      setValidationErrors({});
      setDriverValidationErrors({});
      setLoadingDateError("");
      setRequestDetails(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (requestData && isOpen) {
      setRequestDetails(requestData);
      // Initialize editable fields from invoice data
      if (requestData.invoiceId) {
        setEditableCheques(requestData.invoiceId.cheques || []);
        setEditableDriver(requestData.invoiceId.driver || null);
        // Initialize loadingDate from invoice if exists
        if (requestData.invoiceId.loadingDate) {
          const date = new Date(requestData.invoiceId.loadingDate);
          const persianDate = convertGregorianToPersianLocal(date);
          setEditableLoadingDate(persianDate);
        } else {
          setEditableLoadingDate("");
        }
      } else {
        // If no invoiceId, reset editable fields
        setEditableCheques([]);
        setEditableDriver(null);
        setEditableLoadingDate("");
      }

      // In driverOnlyMode, always ensure we have an editable driver object
      if (driverOnlyMode) {
        setEditableDriver({
          billNumber: requestData.invoiceId?.driver?.billNumber || "",
          licensePlate: requestData.invoiceId?.driver?.licensePlate || "",
          vehicleName: requestData.invoiceId?.driver?.vehicleName || "",
          driverName: requestData.invoiceId?.driver?.driverName || "",
          driverPhone: requestData.invoiceId?.driver?.driverPhone || "",
        });
      }
    }
  }, [requestData, isOpen, driverOnlyMode]);

  // Handle successful update response
  useEffect(() => {
    if (updateData?.status === 200 || updateData?.status === 201) {
      // Refresh the request details after successful update
      if (request?._id || request?.id) {
        dispatch(
          GetProductRequestAdminByIdAction({
            requestId: request._id || request.id,
          })
        );
      }
    }
  }, [updateData, request, dispatch]);

  // Convert Gregorian date to Persian format using jalali-moment
  const convertGregorianToPersianLocal = (gregorianDate: Date): string => {
    try {
      // Use the utility function to convert Gregorian to Persian
      const isoString = gregorianDate.toISOString();
      return convertGregorianToPersian(isoString);
    } catch (error) {
      console.error("Error converting Gregorian date to Persian:", error);
      // Fallback to current Persian date if conversion fails
      return moment().locale("fa").format("jYYYY/jMM/jDD");
    }
  };

  // Persian date validation
  const validatePersianDate = (date: string): boolean => {
    const persianDateRegex =
      /^14\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/;
    return persianDateRegex.test(date);
  };

  // Convert Persian date to Gregorian ISO string using jalali-moment
  const convertPersianToISO = (persianDate: string): string => {
    try {
      // Use the utility function to convert Persian to Gregorian
      const gregorianDate = convertPersianToGregorian_2(persianDate);
      // Convert to ISO format
      return moment(gregorianDate, "YYYY-MM-DD").toISOString();
    } catch (error) {
      console.error("Error converting Persian date to ISO:", error);
      // Fallback to current date if conversion fails
      return new Date().toISOString();
    }
  };

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
    const errors: { [key: string]: string } = {};

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

  const handleLoadingDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditableLoadingDate(value);

    if (value && !validatePersianDate(value)) {
      setLoadingDateError("فرمت تاریخ صحیح نیست. مثال: 1403/09/15");
    } else {
      setLoadingDateError("");
    }
  };

  const validateDriver = () => {
    const errors: { [key: string]: string } = {};

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
      dispatch(
        UpdateProductRequestInvoiceAdminAction({
          requestId: request?._id || request?.id || "",
          data: {
            cheques: editableCheques,
          },
        })
      );
    }
  };

  const handleSaveDriver = () => {
    if (validateDriver()) {
      dispatch(
        UpdateProductRequestInvoiceAdminAction({
          requestId: request?._id || request?.id || "",
          data: {
            driver: editableDriver,
          },
        })
      );
    }
  };

  const handleSaveLoadingDate = () => {
    if (!editableLoadingDate.trim()) {
      setLoadingDateError("تاریخ بارگیری الزامی است");
      return;
    }

    if (!validatePersianDate(editableLoadingDate)) {
      setLoadingDateError("فرمت تاریخ صحیح نیست. مثال: 1403/09/15");
      return;
    }

    // Convert Persian date to ISO format before sending
    const isoDate = convertPersianToISO(editableLoadingDate);

    dispatch(
      UpdateProductRequestInvoiceAdminAction({
        requestId: request?._id || request?.id || "",
        data: {
          loadingDate: isoDate,
        },
      })
    );
  };

  if (!request) {
    return null;
  }

  const displayData = (requestDetails as unknown) || request;

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
      size={driverOnlyMode ? "lg" : "xl"}
      headerTitle={driverOnlyMode ? "ویرایش اطلاعات راننده" : "جزئیات درخواست محصول"}
    >
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-center">در حال بارگذاری...</div>
        </div>
      ) : (
        <div className="space-y-6">
          {driverOnlyMode ? (
            /* Driver Only Mode - Show only driver section */
            <div>
              <div className="flex justify-between items-center mb-3">
                <Typography className="text-lg font-bold">
                  اطلاعات راننده
                </Typography>
                {editableDriver && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSaveDriver}
                    loading={updateLoading}
                    disabled={updateLoading}
                  >
                    ذخیره اطلاعات راننده
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
                        onChange={(e) =>
                          handleDriverChange("billNumber", e.target.value)
                        }
                        size="md"
                        errorMessage={driverValidationErrors.billNumber}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        label="شماره پلاک"
                        value={editableDriver.licensePlate}
                        onChange={(e) =>
                          handleDriverChange("licensePlate", e.target.value)
                        }
                        size="md"
                        errorMessage={driverValidationErrors.licensePlate}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        label="نام وسیله نقلیه"
                        value={editableDriver.vehicleName}
                        onChange={(e) =>
                          handleDriverChange("vehicleName", e.target.value)
                        }
                        size="md"
                        errorMessage={driverValidationErrors.vehicleName}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        label="نام راننده"
                        value={editableDriver.driverName}
                        onChange={(e) =>
                          handleDriverChange("driverName", e.target.value)
                        }
                        size="md"
                        errorMessage={driverValidationErrors.driverName}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        label="شماره تلفن راننده"
                        value={editableDriver.driverPhone}
                        onChange={(e) =>
                          handleDriverChange("driverPhone", e.target.value)
                        }
                        size="md"
                        errorMessage={driverValidationErrors.driverPhone}
                        required
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <Typography className="text-gray-500">
                    اطلاعات راننده موجود نیست
                  </Typography>
                </div>
              )}
            </div>
          ) : (
            <>
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
                    {displayData.category?.catRoute || "_"}
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
                  <Typography className="text-sm text-gray-600">
                    مقدار
                  </Typography>
                  <Typography className="font-bold">
                    {displayData.amount}{" "}
                    {getAmountTypeText(displayData.amountType)}
                  </Typography>
                </div>
                <div>
                  <Typography className="text-sm text-gray-600">شهر</Typography>
                  <Typography className="font-bold">
                    {displayData.city || "_"}
                  </Typography>
                </div>
                <div>
                  <Typography className="text-sm text-gray-600">
                    استان
                  </Typography>
                  <Typography className="font-bold">
                    {displayData.province || "_"}
                  </Typography>
                </div>
                <div>
                  <Typography className="text-sm text-gray-600">
                    آدرس
                  </Typography>
                  <Typography className="font-bold">
                    {displayData.address || "_"}
                  </Typography>
                </div>
                <div>
                  <Typography className="text-sm text-gray-600">
                    نوع درخواست
                  </Typography>
                  <Typography className="font-bold">
                    {getRequestTypeText(displayData.requestType)}
                  </Typography>
                </div>
                <div>
                  <Typography className="text-sm text-gray-600">
                    کد پستی
                  </Typography>
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
                      {getPaymentTypeText(displayData.invoiceId?.paymentType)}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-sm text-gray-600">
                      قیمت به ازای هر کیلوگرم
                    </Typography>
                    <Typography className="font-bold">
                      {displayData.invoiceId?.price
                        ? displayData.invoiceId.price.toLocaleString() +
                          " تومان"
                        : "_"}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-sm text-gray-600">
                      قیمت نهایی
                    </Typography>
                    <Typography className="font-bold">
                      {displayData.invoiceId?.finalPrice
                        ? displayData.invoiceId.finalPrice.toLocaleString() +
                          " تومان"
                        : "_"}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-sm text-gray-600">
                      مبلغ پرداختی
                    </Typography>
                    <Typography className="font-bold">
                      {displayData.invoiceId?.payingPrice
                        ? displayData.invoiceId.payingPrice.toLocaleString() +
                          " تومان"
                        : "_"}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-sm text-gray-600">
                      هزینه حمل و نقل
                    </Typography>
                    <Typography className="font-bold">
                      {displayData.invoiceId?.shippingPrice
                        ? displayData.invoiceId.shippingPrice.toLocaleString() +
                          " تومان"
                        : "_"}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-sm text-gray-600">
                      نحوه حمل و نقل
                    </Typography>
                    <Typography className="font-bold">
                      {displayData.invoiceId?.selectedShipping?.name ===
                      "provider"
                        ? "توسط تامین‌کننده"
                        : displayData.invoiceId?.selectedShipping?.name ===
                          "buyer"
                        ? "توسط خریدار"
                        : displayData.invoiceId?.selectedShipping?.name || "_"}
                    </Typography>
                  </div>
                  {displayData.invoiceId?.paymentType === "INSTALLMENTS" && (
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
                    {displayData.user?.usertype === "Buyer"
                      ? "خریدار"
                      : displayData.user?.usertype || "_"}
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
                      وضعیت
                    </Typography>
                    <Typography className="font-bold">
                      {displayData.winner?.status === "BUYER_CONFIRMED"
                        ? "تایید شده توسط خریدار"
                        : displayData.winner?.status || "_"}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-sm text-gray-600">
                      قیمت واحد
                    </Typography>
                    <Typography className="font-bold">
                      {displayData.winner?.price
                        ? displayData.winner.price.toLocaleString() + " تومان"
                        : "_"}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-sm text-gray-600">
                      قیمت کل
                    </Typography>
                    <Typography className="font-bold">
                      {displayData.winner?.totalprice
                        ? displayData.winner.totalprice.toLocaleString() +
                          " تومان"
                        : "_"}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-sm text-gray-600">
                      هزینه حمل و نقل
                    </Typography>
                    <Typography className="font-bold">
                      {displayData.winner?.shippingPrice
                        ? displayData.winner.shippingPrice.toLocaleString() +
                          " تومان"
                        : "_"}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-sm text-gray-600">
                      نوع پرداخت
                    </Typography>
                    <Typography className="font-bold">
                      {getPaymentTypeText(displayData.winner?.paymentType)}
                    </Typography>
                  </div>
                  {displayData.winner?.paymentType === "INSTALLMENTS" && (
                    <div>
                      <Typography className="text-sm text-gray-600">
                        تعداد اقساط
                      </Typography>
                      <Typography className="font-bold">
                        {displayData.winner?.installmentMonths} ماه
                      </Typography>
                    </div>
                  )}
                  <div>
                    <Typography className="text-sm text-gray-600">
                      توضیحات
                    </Typography>
                    <Typography className="font-bold">
                      {displayData.winner?.description || "_"}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-sm text-gray-600">
                      تاریخ ایجاد
                    </Typography>
                    <Typography className="font-bold">
                      {formatDate(displayData.winner?.createdAt)}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-sm text-gray-600">
                      تاریخ تایید
                    </Typography>
                    <Typography className="font-bold">
                      {formatDate(displayData.winner?.confirmDate)}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-sm text-gray-600">
                      تاریخ انقضا
                    </Typography>
                    <Typography className="font-bold">
                      {formatDate(displayData.winner?.expireDate)}
                    </Typography>
                  </div>
                 
                  <div>
                    <Typography className="text-sm text-gray-600">
                      آخرین بروزرسانی
                    </Typography>
                    <Typography className="font-bold">
                      {formatDate(displayData.winner?.updatedAt)}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          )}

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
                          onChange={(e) =>
                            handleChequeChange(index, "bank", e.target.value)
                          }
                          size="md"
                          errorMessage={validationErrors[`${index}-bank`]}
                          required
                        />
                      </div>
                      <div>
                        <Input
                          label="شماره چک"
                          value={cheque.no}
                          onChange={(e) =>
                            handleChequeChange(index, "no", e.target.value)
                          }
                          size="md"
                          errorMessage={validationErrors[`${index}-no`]}
                          required
                        />
                      </div>
                      <div>
                        <Input
                          label="شماره صیاد"
                          value={cheque.sayyad}
                          onChange={(e) =>
                            handleChequeChange(index, "sayyad", e.target.value)
                          }
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
                          onChange={(e) =>
                            handleChequeChange(index, "date", e.target.value)
                          }
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
                <Typography className="text-gray-500">
                  چکی موجود نیست
                </Typography>
              </div>
            )}
          </div>

          {/* Loading Date Section - Only editable in LOADING_ORDER and WAITING_UNLOADING status */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <Typography className="text-lg font-bold">
                تاریخ بارگیری
              </Typography>
              {(displayData.status === "LOADING_ORDER" ||
                displayData.status === "WAITING_UNLOADING") && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleSaveLoadingDate}
                  loading={updateLoading}
                  disabled={
                    updateLoading ||
                    !editableLoadingDate.trim() ||
                    !!loadingDateError
                  }
                >
                  ذخیره تاریخ بارگیری
                </Button>
              )}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    value={editableLoadingDate}
                    onChange={handleLoadingDateChange}
                    size="md"
                    errorMessage={loadingDateError}
                    placeholder="مثال: 1403/09/15"
                    helperText="تاریخ بارگیری محصول"
                    disabled={
                      !(
                        displayData.status === "LOADING_ORDER" ||
                        displayData.status === "WAITING_UNLOADING"
                      )
                    }
                    readOnly={
                      !(
                        displayData.status === "LOADING_ORDER" ||
                        displayData.status === "WAITING_UNLOADING"
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Driver Section */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <Typography className="text-lg font-bold">
                اطلاعات راننده
              </Typography>
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
                      onChange={(e) =>
                        handleDriverChange("billNumber", e.target.value)
                      }
                      size="md"
                      errorMessage={driverValidationErrors.billNumber}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      label="شماره پلاک"
                      value={editableDriver.licensePlate}
                      onChange={(e) =>
                        handleDriverChange("licensePlate", e.target.value)
                      }
                      size="md"
                      errorMessage={driverValidationErrors.licensePlate}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      label="نام وسیله نقلیه"
                      value={editableDriver.vehicleName}
                      onChange={(e) =>
                        handleDriverChange("vehicleName", e.target.value)
                      }
                      size="md"
                      errorMessage={driverValidationErrors.vehicleName}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      label="نام راننده"
                      value={editableDriver.driverName}
                      onChange={(e) =>
                        handleDriverChange("driverName", e.target.value)
                      }
                      size="md"
                      errorMessage={driverValidationErrors.driverName}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      label="شماره تلفن راننده"
                      value={editableDriver.driverPhone}
                      onChange={(e) =>
                        handleDriverChange("driverPhone", e.target.value)
                      }
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
                <Typography className="text-gray-500">
                  اطلاعات راننده موجود نیست
                </Typography>
              </div>
            )}
          </div>
          </>
          )}
        </div>
      )}
    </Modal>
  );
};

export default ProductRequestDetailsModal;
