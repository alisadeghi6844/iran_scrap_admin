import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import Modal from "../../../components/modal";
import Typography from "../../../components/typography/Typography";
import { GetRequestProductAdminByIdAction } from "../../../redux/actions/productRequestStatus/RequestProductStatus";
import {
  selectGetProductRequestAdminByIdData,
  selectGetProductRequestAdminByIdLoading,
} from "../../../redux/slice/productRequestStatus/ProductStatusRequestSlice";
import LoadingSkeleton from "./components/ProductRequestSuggestionsModal/LoadingSkeleton";
import SuggestionsTable from "./components/ProductRequestSuggestionsModal/SuggestionsTable";
import WinnerInfo from "./components/ProductRequestSuggestionsModal/WinnerInfo";

interface ProductRequestItem {
  id: string;
  category: {
    name: string;
    code: string;
    parentId: string;
  };
  cheques: Array<{
    date: string;
    bank: string;
    no: string;
    sayyad: string;
  }>;
  comments: unknown[];
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

interface Provider {
  id: string;
  mobile: string;
  agentName?: string;
  agentPhone?: string;
  companyName?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

interface Winner {
  id: string;
  providerId: string;
  price: number;
  shippingPrice: number;
  deliveryTime: number;
  description: string;
  status: string;
  paymentType: string;
  installmentMonths: number | null;
  confirmDate?: number;
  createdAt: number;
  updatedAt: number;
  expireDate: number;
  shippings: string;
  comments: unknown[];
}

interface ProductRequestSuggestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: ProductRequestItem | null;
}

const ProductRequestSuggestionsModal: React.FC<
  ProductRequestSuggestionsModalProps
> = ({ isOpen, onClose, request }) => {
  const dispatch = useDispatch<AppDispatch>();
  const offerData = useSelector(selectGetProductRequestAdminByIdData);
  const offerLoading = useSelector(selectGetProductRequestAdminByIdLoading);

  // Load offers by request ID when modal opens and request is available
  useEffect(() => {
    if (isOpen && request?.requestId) {
      dispatch(GetRequestProductAdminByIdAction(request.requestId));
    }
  }, [isOpen, request?.requestId, dispatch]);

  const formatDate = (timestamp: number) => {
    if (!timestamp) return "_";
    const date = new Date(timestamp);
    return date.toLocaleDateString("fa-IR");
  };

  const formatDateTime = (timestamp: number) => {
    if (!timestamp) return "_";
    const date = new Date(timestamp);
    return (
      date.toLocaleDateString("fa-IR") +
      " " +
      date.toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  const getStatusText = (status: string) => {
    switch (status?.toUpperCase()) {
      case "PENDING":
        return "در انتظار";
      case "APPROVED":
      case "BUYER_CONFIRMED":
        return "تایید شده";
      case "REJECTED":
        return "رد شده";
      case "CONFIRMATION_REQUEST_BY_BUYER":
        return "تائید درخواست توسط خریدار";
      case "WAITING_FOR_PROVIDER":
        return "در انتظار تامین کننده";
      default:
        return status || "_";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case "PENDING":
      case "WAITING_FOR_PROVIDER":
        return "px-2 py-1 rounded text-sm bg-yellow-100 text-yellow-800";
      case "APPROVED":
      case "BUYER_CONFIRMED":
        return "px-2 py-1 rounded text-sm bg-secondary-100 text-secondary-800";
      case "REJECTED":
        return "px-2 py-1 rounded text-sm bg-red-100 text-red-800";
      case "CONFIRMATION_REQUEST_BY_BUYER":
        return "px-2 py-1 rounded text-sm bg-blue-100 text-blue-800";
      default:
        return "px-2 py-1 rounded text-sm bg-gray-100 text-gray-800";
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  const getProviderName = (provider: Provider) => {
    if (provider.firstName && provider.lastName) {
      return `${provider.firstName} ${provider.lastName}`;
    }
    if (provider.agentName) {
      return provider.agentName;
    }
    if (provider.companyName) {
      return provider.companyName;
    }
    return provider.mobile || "نامشخص";
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      headerTitle={`پیشنهادات برای درخواست: ${request?.description || ""}`}
      size="xl"
    >
      {offerLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="p-4">
          {/* Request Info Summary */}
          {request && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Typography variant="caption" className="text-gray-500">
                    دسته‌بندی:
                  </Typography>
                  <Typography variant="body2" className="font-medium">
                    {offerData?.categoryId?.name || "_"}
                  </Typography>
                </div>
                <div>
                  <Typography variant="caption" className="text-gray-500">
                    مقدار:
                  </Typography>
                  <Typography variant="body2" className="font-medium">
                    {offerData?.amount} کیلوگرم
                  </Typography>
                </div>
                <div>
                  <Typography variant="caption" className="text-gray-500">
                    شهر:
                  </Typography>
                  <Typography variant="body2" className="font-medium">
                    {offerData?.city}
                  </Typography>
                </div>
                <div>
                  <Typography variant="caption" className="text-gray-500">
                    وضعیت درخواست:
                  </Typography>
                  <Typography variant="body2" className="font-medium">
                    {offerData?.statusTitle || getStatusText(offerData?.status)}
                  </Typography>
                </div>
              </div>
            </div>
          )}

          {/* Suggestions Table */}
          <div className="overflow-x-auto">
            <SuggestionsTable
              offerLoading={offerLoading}
              offerData={offerData}
              getProviderName={getProviderName}
              formatPrice={formatPrice}
              formatDate={formatDate}
              getStatusColor={getStatusColor}
              getStatusText={getStatusText}
            />
          </div>

          {/* Winner Info */}
          <WinnerInfo
            offerData={offerData}
            getProviderName={getProviderName}
            formatPrice={formatPrice}
            formatDate={formatDate}
            formatDateTime={formatDateTime}
            getStatusText={getStatusText}
          />
        </div>
      )}
    </Modal>
  );
};

export default ProductRequestSuggestionsModal;
