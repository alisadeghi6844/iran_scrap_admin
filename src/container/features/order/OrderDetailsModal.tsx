import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import Modal from "../../../components/modal";
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
import OrderHeaderSection from "./components/OrderDetailsModal/OrderHeaderSection";
import ProductInfoSection from "./components/OrderDetailsModal/ProductInfoSection";
import PaymentInfoSection from "./components/OrderDetailsModal/PaymentInfoSection";
import ShippingInfoSection from "./components/OrderDetailsModal/ShippingInfoSection";
import ChequesSection from "./components/OrderDetailsModal/ChequesSection";
import LoadingDateSection from "./components/OrderDetailsModal/LoadingDateSection";
import UnloadingDateSection from "./components/OrderDetailsModal/UnloadingDateSection";
import DriverSection from "./components/OrderDetailsModal/DriverSection";

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
    iranscrap: number;
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
        <OrderHeaderSection
          order={order}
          formatDate={formatDate}
          getOrderStatusColor={getOrderStatusColor}
          getOrderStatusText={getOrderStatusText}
        />

        <ProductInfoSection order={order} getInventoryUnit={getInventoryUnit} />

        <PaymentInfoSection order={order} getPaymentTypeText={getPaymentTypeText} />

        <ShippingInfoSection order={order} />

        <ChequesSection
          editableCheques={editableCheques}
          validationErrors={validationErrors}
          updateLoading={updateLoading}
          onSaveCheques={handleSaveCheques}
          onChequeChange={handleChequeChange}
        />

        {order.loadingDate && (
          <LoadingDateSection
            editableLoadingDate={editableLoadingDate}
            loadingDateError={loadingDateError}
            updateLoading={updateLoading}
            onSaveLoadingDate={handleSaveLoadingDate}
            onLoadingDateChange={handleLoadingDateChange}
          />
        )}

        {order.status === "DELIVERED" && order.unloadingDate && (
          <UnloadingDateSection
            unloadingDate={order.unloadingDate}
            convertGregorianToPersianLocal={convertGregorianToPersianLocal}
          />
        )}

        <DriverSection
          editableDriver={editableDriver}
          driverValidationErrors={driverValidationErrors}
          updateLoading={updateLoading}
          onSaveDriver={handleSaveDriver}
          onDriverChange={handleDriverChange}
        />
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;
