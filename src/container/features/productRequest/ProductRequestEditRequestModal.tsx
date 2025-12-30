import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import Modal from "../../../components/modal";
import OffersLockedView from "./components/ProductRequestEditRequestModal/OffersLockedView";
import EditableFormView from "./components/ProductRequestEditRequestModal/EditableFormView";
import {
  buildInitialValues,
  buildUpdatePayload,
  findProvinceIdByName,
  hasAnyOffers,
} from "./components/ProductRequestEditRequestModal/utils";
import {
  GetProductRequestAdminByIdAction,
  CheckProductRequestOfferAdminAction,
} from "../../../redux/actions/product-request-offer-admin/ProductRequestOfferAdminActions";
import { UpdateRequestProductAdminAction } from "../../../redux/actions/productRequestStatus/RequestProductStatus";
import {
  selectGetProductRequestAdminByIdLoading,
  selectGetProductRequestAdminByIdData,
  selectCheckProductRequestOfferAdminLoading,
  selectCheckProductRequestOfferAdminData,
  clearAllProductRequestEditData,
} from "../../../redux/slice/product-request-offer-admin/ProductRequestOfferAdminSlice";
import {
  selectUpdateProductRequestAdminLoading,
  selectUpdateProductRequestAdminData,
  clearUpdateProductRequestAdminData,
} from "../../../redux/slice/productRequestStatus/ProductStatusRequestSlice";

interface ProductRequestItem {
  _id: string;
  id?: string;
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
  [key: string]: any;
}

interface ProductRequestEditRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: ProductRequestItem | null;
  onSuccess?: () => void;
}

const ProductRequestEditRequestModal: React.FC<
  ProductRequestEditRequestModalProps
> = ({ isOpen, onClose, request, onSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(
    null
  );

  const loading = useSelector(selectGetProductRequestAdminByIdLoading);
  const requestData = useSelector(selectGetProductRequestAdminByIdData);
  const checkOfferLoading = useSelector(
    selectCheckProductRequestOfferAdminLoading
  );
  const checkOfferData = useSelector(selectCheckProductRequestOfferAdminData);
  const updateLoading = useSelector(selectUpdateProductRequestAdminLoading);
  const updateData = useSelector(selectUpdateProductRequestAdminData);

  // Handle modal state changes
  useEffect(() => {
    if (isOpen && (request?._id || request?.id)) {
      // Clear previous states and load new data
      dispatch(clearAllProductRequestEditData());
      dispatch(clearUpdateProductRequestAdminData());
      setSelectedProvinceId(null);
      
      dispatch(
        GetProductRequestAdminByIdAction({
          requestId: request._id || request.id || "",
        })
      );
      dispatch(
        CheckProductRequestOfferAdminAction({
          requestId: request._id || request.id || "",
        })
      );
    } else if (!isOpen) {
      // Clear states when modal closes
      dispatch(clearAllProductRequestEditData());
      dispatch(clearUpdateProductRequestAdminData());
      setSelectedProvinceId(null);
    }
  }, [isOpen, request?._id, request?.id, dispatch]);



  if (!request) {
    return null;
  }

  // Check if there are any offers for this request
  // API returns {countAll: 0, data: [], page: 1, size: 10} when no offers exist
  // If countAll > 0 or data has items, it means there are offers and editing should be disabled
  const hasOffers = hasAnyOffers(checkOfferData);

  const getInitialValues = useCallback(
    () => buildInitialValues(requestData),
    [requestData]
  );

  // Set initial province ID when data loads
  useEffect(() => {
    if (requestData && isOpen) {
      // Set selected province ID for city filtering
      const provinceId = findProvinceIdByName(requestData.province);
      if (provinceId) setSelectedProvinceId(provinceId);
    }
  }, [requestData, isOpen]);

  const handleSubmit = (values: any) => {
    if (!request?._id && !request?.id) return;

    const requestId = request._id || request.id || "";

    const payload = buildUpdatePayload(values);

    dispatch(
      UpdateRequestProductAdminAction({
        credentials: requestId,
        item: payload,
        onSuccess: () => {
          // Clear states before closing
          dispatch(clearAllProductRequestEditData());
          dispatch(clearUpdateProductRequestAdminData());
          setSelectedProvinceId(null);
          
          onClose();
          onSuccess && onSuccess();
        },
        thunkAPI: null,
      })
    );
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size="xl"
      headerTitle="ویرایش درخواست محصول"
    >
      {loading || checkOfferLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-center">در حال بارگذاری...</div>
        </div>
      ) : (
        <div className="space-y-8">
          {hasOffers ? (
            <OffersLockedView onClose={onClose} />
          ) : (
            <EditableFormView
              requestData={requestData}
              isOpen={isOpen}
              selectedProvinceId={selectedProvinceId}
              setSelectedProvinceId={setSelectedProvinceId}
              updateLoading={updateLoading}
              onClose={onClose}
              getInitialValues={getInitialValues}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      )}
    </Modal>
  );
};

export default ProductRequestEditRequestModal;
