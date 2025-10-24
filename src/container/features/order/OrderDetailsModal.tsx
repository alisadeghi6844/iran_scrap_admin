import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import Modal from "../../../components/modal";
import Typography from "../../../components/typography/Typography";
import Input from "../../../components/input";
import Button from "../../../components/button";
import {
  getOrderStatusText,
  getOrderStatusColor,
} from "../../../types/OrderStatus";
import { UpdateOrderAdminAction } from "../../../redux/actions/order/OrderActions";
import {
  selectUpdateOrderAdminLoading,
} from "../../../redux/slice/order/orderSlice";
import {
  convertPersianToGregorian_2,
  convertGregorianToPersian,
} from "../../../utils/MomentConvertor";
import moment from "jalali-moment";

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
  loadingDate?: string;
  unloadingDate?: string;
  cheques?: Array<{
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
  const dispatch = useDispatch<AppDispatch>();
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

  const updateLoading = useSelector(selectUpdateOrderAdminLoading);

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

  useEffect(() => {
    if (order) {
      setEditableCheques(order.cheques || []);
      setEditableDriver(order.driver || null);
      // Initialize loadingDate from DTO if exists
      if (order.loadingDate) {
        const date = new Date(order.loadingDate);
        const persianDate = convertGregorianToPersianLocal(date);
        setEditableLoadingDate(persianDate);
      } else {
        setEditableLoadingDate("");
      }
    }
  }, [order]);

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

  console.log(
    "OrderDetailsModal rendered with isOpen:",
    isOpen,
    "order:",
    order
  );
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
        UpdateOrderAdminAction({
          orderId: order.id,
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
        UpdateOrderAdminAction({
          orderId: order.id,
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
      UpdateOrderAdminAction({
        orderId: order.id,
        data: {
          loadingDate: isoDate,
        },
      })
    );
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
            {order?.status==="CLOSED"?(<div>
              <Typography className="text-sm text-gray-600">
             تاریخ تخلیه
              </Typography>
              <Typography className="font-bold">
                {formatDate(order.unloadingDate)}
              </Typography>
            </div>):null}
            <div>
              <Typography className="text-sm text-gray-600">وضعیت</Typography>
              <Typography
                className={`font-bold ${getOrderStatusColor(order.status)}`}
              >
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
              <Typography className="text-gray-500">چکی موجود نیست</Typography>
            </div>
          )}
        </div>

        {/* Loading Date Section - Only show if loadingDate exists in DTO */}
        {order.loadingDate && (
          <div>
            <div className="flex justify-between items-center mb-3">
              <Typography className="text-lg font-bold">تاریخ بارگیری</Typography>
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
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    label="تاریخ بارگیری"
                    value={editableLoadingDate}
                    onChange={handleLoadingDateChange}
                    size="md"
                    errorMessage={loadingDateError}
                    placeholder="مثال: 1403/09/15"
                    helperText="تاریخ بارگیری محصول"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Unloading Date Display (only when status is delivered) */}
        {order.status === "DELIVERED" && order.unloadingDate && (
          <div>
            <Typography className="text-lg font-bold mb-3">
              تاریخ تخلیه
            </Typography>
            <div className="bg-gray-50 p-4 rounded-lg">
              <Typography className="font-bold">
                {convertGregorianToPersianLocal(new Date(order.unloadingDate))}
              </Typography>
            </div>
          </div>
        )}

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
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;
