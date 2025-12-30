import React, { useEffect, useState } from "react";
import moment from "jalali-moment";
import {
  convertGregorianToPersian,
  convertPersianToGregorian_2,
} from "../../../../utils/MomentConvertor";
import { UpdateProductRequestInvoiceAdminAction } from "../../../../redux/actions/product-request-offer-admin/ProductRequestOfferAdminActions";

interface UseProductRequestInvoiceEditorParams {
  dispatch: any;
  isOpen: boolean;
  driverOnlyMode: boolean;
  requestId: string;
  requestData: any;
}

// Extracted from ProductRequestDetailsModal without behavior/UI changes.
export function useProductRequestInvoiceEditor(params: UseProductRequestInvoiceEditorParams) {
  const { dispatch, isOpen, driverOnlyMode, requestId, requestData } = params;

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
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [driverValidationErrors, setDriverValidationErrors] = useState<{ [key: string]: string }>({});
  const [loadingDateError, setLoadingDateError] = useState<string>("");

  const resetEditorState = React.useCallback(() => {
    setEditableCheques([]);
    setEditableDriver(null);
    setEditableLoadingDate("");
    setValidationErrors({});
    setDriverValidationErrors({});
    setLoadingDateError("");
  }, []);

  // Convert Gregorian date to Persian format using jalali-moment
  const convertGregorianToPersianLocal = React.useCallback((gregorianDate: Date): string => {
    try {
      const isoString = gregorianDate.toISOString();
      return convertGregorianToPersian(isoString);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error converting Gregorian date to Persian:", error);
      return moment().locale("fa").format("jYYYY/jMM/jDD");
    }
  }, []);

  // Persian date validation
  const validatePersianDate = React.useCallback((date: string): boolean => {
    const persianDateRegex = /^14\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/;
    return persianDateRegex.test(date);
  }, []);

  // Convert Persian date to Gregorian ISO string using jalali-moment
  const convertPersianToISO = React.useCallback((persianDate: string): string => {
    try {
      const gregorianDate = convertPersianToGregorian_2(persianDate);
      return moment(gregorianDate, "YYYY-MM-DD").toISOString();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error converting Persian date to ISO:", error);
      return new Date().toISOString();
    }
  }, []);

  useEffect(() => {
    if (requestData && isOpen) {
      // Initialize editable fields from invoice data
      if (requestData.invoiceId) {
        setEditableCheques(requestData.invoiceId.cheques || []);
        setEditableDriver(requestData.invoiceId.driver || null);

        if (requestData.invoiceId.loadingDate) {
          const date = new Date(requestData.invoiceId.loadingDate);
          const persianDate = convertGregorianToPersianLocal(date);
          setEditableLoadingDate(persianDate);
        } else {
          setEditableLoadingDate("");
        }
      } else {
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
  }, [requestData, isOpen, driverOnlyMode, convertGregorianToPersianLocal]);

  const handleChequeChange = (index: number, field: string, value: string) => {
    const updatedCheques = [...editableCheques];
    updatedCheques[index] = {
      ...updatedCheques[index],
      [field]: value,
    };
    setEditableCheques(updatedCheques);

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
          requestId,
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
          requestId,
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

    const isoDate = convertPersianToISO(editableLoadingDate);

    dispatch(
      UpdateProductRequestInvoiceAdminAction({
        requestId,
        data: {
          loadingDate: isoDate,
        },
      })
    );
  };

  return {
    editableCheques,
    editableDriver,
    editableLoadingDate,
    validationErrors,
    driverValidationErrors,
    loadingDateError,
    resetEditorState,
    handleChequeChange,
    handleDriverChange,
    handleLoadingDateChange,
    handleSaveCheques,
    handleSaveDriver,
    handleSaveLoadingDate,
  };
}


