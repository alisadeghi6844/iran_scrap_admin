import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import Modal from "../../../components/modal";

import {
  GetProductRequestAdminByIdAction,
} from "../../../redux/actions/product-request-offer-admin/ProductRequestOfferAdminActions";
import {
  selectGetProductRequestAdminByIdLoading,
  selectGetProductRequestAdminByIdData,
  selectGetProductRequestAdminByIdError,
  selectUpdateProductRequestInvoiceAdminLoading,
  selectUpdateProductRequestInvoiceAdminData,
} from "../../../redux/slice/product-request-offer-admin/ProductRequestOfferAdminSlice";

import {
  ProductRequestDetailsDisplayData,
  ProductRequestItem,
} from "./ProductRequestDetailsModal.types";
import RequestHeaderSection from "./components/ProductRequestDetailsModal/RequestHeaderSection";
import CategoryInfoSection from "./components/ProductRequestDetailsModal/CategoryInfoSection";
import RequestInfoSection from "./components/ProductRequestDetailsModal/RequestInfoSection";
import OfferInfoSection from "./components/ProductRequestDetailsModal/OfferInfoSection";
import PaymentInfoSection from "./components/ProductRequestDetailsModal/PaymentInfoSection";
import UserInfoSection from "./components/ProductRequestDetailsModal/UserInfoSection";
import DatesInfoSection from "./components/ProductRequestDetailsModal/DatesInfoSection";
import WinnerInfoSection from "./components/ProductRequestDetailsModal/WinnerInfoSection";
import ChequesSection from "./components/ProductRequestDetailsModal/ChequesSection";
import LoadingDateSection from "./components/ProductRequestDetailsModal/LoadingDateSection";
import DriverSectionBody from "./components/ProductRequestDetailsModal/DriverSectionBody";
import { useProductRequestInvoiceEditor } from "./hooks/useProductRequestInvoiceEditor";

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

  const loading = useSelector(selectGetProductRequestAdminByIdLoading);
  const requestData = useSelector(selectGetProductRequestAdminByIdData);
  const error = useSelector(selectGetProductRequestAdminByIdError);
  const updateLoading = useSelector(
    selectUpdateProductRequestInvoiceAdminLoading
  );
  const updateData = useSelector(selectUpdateProductRequestInvoiceAdminData);

  const requestId = (request?._id || request?.id || "") as string;
  const {
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
  } = useProductRequestInvoiceEditor({
    dispatch,
    isOpen,
    driverOnlyMode,
    requestId,
    requestData,
  });

  // Reset all states when modal opens or request changes
  useEffect(() => {
    if (isOpen && (request?._id || request?.id)) {
      resetEditorState();
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
      resetEditorState();
      setRequestDetails(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (requestData && isOpen) {
      setRequestDetails(requestData);
    }
  }, [requestData, isOpen]);

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



  if (!request) {
    return null;
  }

  const displayData =
    (requestDetails as ProductRequestDetailsDisplayData) ||
    (request as unknown as ProductRequestDetailsDisplayData);

  const formatDate = (timestamp?: number) => {
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
              <DriverSectionBody
                editableDriver={editableDriver}
                driverValidationErrors={driverValidationErrors}
                updateLoading={updateLoading}
                onSaveDriver={handleSaveDriver}
                onDriverChange={handleDriverChange}
                buttonText="ذخیره اطلاعات راننده"
              />
            </div>
          ) : (
            <>
              {/* Request Header */}
              <RequestHeaderSection displayData={displayData} formatDate={formatDate} />

              {/* Category Information */}
              <CategoryInfoSection displayData={displayData} />

              {/* Request Information */}
              <RequestInfoSection
                displayData={displayData}
                getAmountTypeText={getAmountTypeText}
                getRequestTypeText={getRequestTypeText}
              />

              {/* Offer Information */}
              <OfferInfoSection
                displayData={displayData}
                getPaymentTypeText={getPaymentTypeText}
              />

              {/* Payment Information */}
              <PaymentInfoSection
                displayData={displayData}
                getPaymentTypeText={getPaymentTypeText}
              />

              {/* User Information */}
              <UserInfoSection displayData={displayData} />

              {/* Dates Information */}
              <DatesInfoSection displayData={displayData} formatDate={formatDate} />

              {/* Winner Information */}
              <WinnerInfoSection
                displayData={displayData}
                formatDate={formatDate}
                getPaymentTypeText={getPaymentTypeText}
              />

              {/* Cheques Section */}
              <ChequesSection
                editableCheques={editableCheques}
                validationErrors={validationErrors}
                updateLoading={updateLoading}
                onSaveCheques={handleSaveCheques}
                onChequeChange={handleChequeChange}
              />

              {/* Loading Date Section - Only editable in LOADING_ORDER and WAITING_UNLOADING status */}
              <LoadingDateSection
                status={displayData.status}
                editableLoadingDate={editableLoadingDate}
                loadingDateError={loadingDateError}
                updateLoading={updateLoading}
                onSaveLoadingDate={handleSaveLoadingDate}
                onLoadingDateChange={handleLoadingDateChange}
              />

              {/* Driver Section */}
              <div>
                <DriverSectionBody
                  editableDriver={editableDriver}
                  driverValidationErrors={driverValidationErrors}
                  updateLoading={updateLoading}
                  onSaveDriver={handleSaveDriver}
                  onDriverChange={handleDriverChange}
                  buttonText="ویرایش اطلاعات راننده"
                  phoneHelperText="مثال: 09123456789"
                />
              </div>
          </>
          )}
        </div>
      )}
    </Modal>
  );
};

export default ProductRequestDetailsModal;
