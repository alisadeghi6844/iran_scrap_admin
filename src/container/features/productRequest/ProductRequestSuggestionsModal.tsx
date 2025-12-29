import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import Modal from "../../../components/modal";
import Table from "../../../components/table";
import TableHead from "../../../components/table/TableHead";
import TableHeadCell from "../../../components/table/TableHeadCell";
import TableRow from "../../../components/table/TableRow";
import TableBody from "../../../components/table/TableBody";
import TableCell from "../../../components/table/TableCell";
import EmptyImage from "../../../components/image/EmptyImage";
import TableSkeleton from "../../organism/skeleton/TableSkeleton";
import Typography from "../../../components/typography/Typography";
import { GetRequestProductAdminByIdAction } from "../../../redux/actions/productRequestStatus/RequestProductStatus";
import {
  selectGetProductRequestAdminByIdData,
  selectGetProductRequestAdminByIdLoading,
} from "../../../redux/slice/productRequestStatus/ProductStatusRequestSlice";

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

  const renderTableContent = () => {
    if (offerLoading) {
      return <TableSkeleton />;
    }

    if (!offerData?.providerIds?.length) {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <EmptyImage />
          <Typography variant="body2" className="text-gray-500 mt-4">
            هیچ پیشنهادی برای این درخواست ثبت نشده است
          </Typography>
        </div>
      );
    }

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>تامین کننده</TableHeadCell>
            <TableHeadCell>شماره تماس</TableHeadCell>
            <TableHeadCell>قیمت پیشنهادی</TableHeadCell>
            <TableHeadCell>هزینه حمل</TableHeadCell>
            <TableHeadCell>زمان تحویل</TableHeadCell>
            <TableHeadCell>وضعیت</TableHeadCell>
            <TableHeadCell>توضیحات</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {offerData.providerIds?.map((provider: Provider) => {
            const winner =
              offerData.winner?.providerId === provider.id
                ? offerData.winner
                : null;

            return (
              <TableRow key={provider.id}>
                <TableCell>
                  <Typography variant="body2" className="font-medium">
                    {getProviderName(provider)}
                  </Typography>
                  {provider.companyName && provider.agentName && (
                    <Typography variant="caption" className="text-gray-500">
                      شرکت: {provider.companyName}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{provider.mobile}</Typography>
                  {provider.agentPhone && (
                    <Typography
                      variant="caption"
                      className="text-gray-500 block"
                    >
                      نماینده: {provider.agentPhone}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {winner ? (
                    <Typography
                      variant="body2"
                      className="font-medium text-secondary-600"
                    >
                      {formatPrice(winner.price)}
                    </Typography>
                  ) : (
                    <Typography variant="body2" className="text-gray-400">
                      در انتظار پیشنهاد
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {winner ? (
                    <Typography variant="body2">
                      {formatPrice(winner.shippingPrice)}
                    </Typography>
                  ) : (
                    <Typography variant="body2" className="text-gray-400">
                      _
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {winner ? (
                    <Typography variant="body2">
                      {formatDate(winner.deliveryTime)}
                    </Typography>
                  ) : (
                    <Typography variant="body2" className="text-gray-400">
                      _
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {winner ? (
                    <span className={getStatusColor(winner.status)}>
                      {getStatusText(winner.status)}
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded text-sm bg-gray-100 text-gray-600">
                      بدون پیشنهاد
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {winner ? (
                    <Typography variant="body2" className="max-w-xs truncate">
                      {winner.description || "_"}
                    </Typography>
                  ) : (
                    <Typography variant="body2" className="text-gray-400">
                      _
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };

  // Loading skeleton component
  const renderLoadingSkeleton = () => (
    <div className="p-4 animate-pulse">
      {/* Request Info Summary Skeleton */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index}>
              <div className="h-3 bg-gray-300 rounded w-16 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="overflow-x-auto mb-6">
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Table Header */}
          <div className="border-b border-gray-200 p-4">
            <div className="grid grid-cols-7 gap-4">
              {[...Array(7)].map((_, index) => (
                <div key={index} className="h-4 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>

          {/* Table Rows */}
          {[...Array(5)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="border-b border-gray-100 p-4 last:border-b-0"
            >
              <div className="grid grid-cols-7 gap-4">
                {[...Array(7)].map((_, colIndex) => (
                  <div key={colIndex}>
                    <div className="h-4 bg-gray-200 rounded mb-1"></div>
                    {colIndex === 0 && (
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Winner Box Skeleton */}
      <div className="mt-10 relative">
        {/* Winner Badge Skeleton */}
        <div className="absolute -top-6 right-4 z-10">
          <div className="bg-gray-300 px-4 py-2 rounded-full h-10 w-32"></div>
        </div>

        <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
          {/* Header Skeleton */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="h-6 bg-gray-300 rounded w-40 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-28"></div>
              </div>
              <div className="h-8 bg-gray-300 rounded-full w-24"></div>
            </div>
          </div>

          {/* Price Highlight Skeleton */}
          <div className="bg-white rounded-xl p-4 mb-6 border border-gray-100">
            <div className="text-center">
              <div className="h-3 bg-gray-300 rounded w-16 mx-auto mb-2"></div>
              <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-2"></div>
              <div className="flex justify-center gap-4">
                <div className="h-3 bg-gray-300 rounded w-24"></div>
                <div className="h-3 bg-gray-300 rounded w-1"></div>
                <div className="h-3 bg-gray-300 rounded w-20"></div>
              </div>
            </div>
          </div>

          {/* Details Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-4 w-4 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded w-20"></div>
                </div>
                <div className="h-4 bg-gray-300 rounded w-24"></div>
              </div>
            ))}
          </div>

          {/* Timeline Skeleton */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 mb-4">
            <div className="h-4 bg-gray-300 rounded w-20 mb-3"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, index) => (
                <div key={index}>
                  <div className="h-3 bg-gray-300 rounded w-16 mb-1"></div>
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Description Skeleton */}
          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <div className="h-4 bg-gray-300 rounded w-28 mb-2"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-300 rounded w-full"></div>
              <div className="h-3 bg-gray-300 rounded w-4/5"></div>
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      headerTitle={`پیشنهادات برای درخواست: ${request?.description || ""}`}
      size="xl"
    >
      {offerLoading ? (
        renderLoadingSkeleton()
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
          <div className="overflow-x-auto">{renderTableContent()}</div>

          {/* Winner Info */}
          {offerData?.winner && (
            <div className="mt-10 relative">
              {/* Winner Badge */}
              <div className="absolute -top-6 right-4 z-10">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                  <span className="text-lg">🏆</span>
                  <Typography variant="body2" className="font-bold">
                    پیشنهاد برنده
                  </Typography>
                </div>
              </div>

              <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 border-2 border-secondary-200 rounded-xl p-6 shadow-lg">
                {/* Header with Provider Info */}
                <div className="mb-6">
                  {(() => {
                    const winnerProvider = offerData.providerIds?.find(
                      (p: Provider) => p.id === offerData.winner.providerId
                    );
                    return winnerProvider ? (
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <Typography
                            variant="h6"
                            className="text-secondary-800 font-bold"
                          >
                            {getProviderName(winnerProvider)}
                          </Typography>
                          <Typography
                            variant="body2"
                            className="text-secondary-600"
                          >
                            {winnerProvider.mobile}
                          </Typography>
                        </div>
                        <div className="text-left">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                            {getStatusText(offerData.winner.status)}
                          </span>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>

                {/* Price Highlight */}
                <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-green-100">
                  <div className="text-center">
                    <Typography
                      variant="caption"
                      className="text-green-600 block mb-2"
                    >
                      قیمت نهایی
                    </Typography>
                    <Typography
                      variant="h4"
                      className="font-bold text-green-800 mb-2"
                    >
                      {formatPrice(
                        offerData.winner.price + offerData.winner.shippingPrice
                      )}
                    </Typography>
                    <div className="flex justify-center gap-4 text-sm text-green-600">
                      <span>
                        قیمت کالا: {formatPrice(offerData.winner.price)}
                      </span>
                      <span>•</span>
                      <span>
                        حمل: {formatPrice(offerData.winner.shippingPrice)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-green-600">📅</span>
                      <Typography
                        variant="caption"
                        className="text-green-600 font-medium"
                      >
                        زمان تحویل
                      </Typography>
                    </div>
                    <Typography
                      variant="body2"
                      className="text-green-800 font-bold"
                    >
                      {formatDate(offerData.winner.deliveryTime)}
                    </Typography>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-green-600">💳</span>
                      <Typography
                        variant="caption"
                        className="text-green-600 font-medium"
                      >
                        نوع پرداخت
                      </Typography>
                    </div>
                    <Typography
                      variant="body2"
                      className="text-green-800 font-bold"
                    >
                      {offerData.winner.paymentType === "CASH"
                        ? "نقدی"
                        : "مدت دار"}
                      {offerData.winner.installmentMonths && (
                        <span className="text-sm text-green-600 block">
                          {offerData.winner.installmentMonths} ماهه
                        </span>
                      )}
                    </Typography>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-green-600">🚚</span>
                      <Typography
                        variant="caption"
                        className="text-green-600 font-medium"
                      >
                        نحوه ارسال
                      </Typography>
                    </div>
                    <Typography
                      variant="body2"
                      className="text-green-800 font-bold"
                    >
                      {offerData.winner.shippings === "provider"
                        ? "توسط تامین کننده"
                        : "توسط خریدار"}
                    </Typography>
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-white rounded-lg p-4 shadow-sm border border-green-100 mb-4">
                  <Typography
                    variant="body2"
                    className="text-green-600 font-medium mb-3"
                  >
                    ⏱️ زمان‌بندی
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Typography
                        variant="caption"
                        className="text-gray-500 block"
                      >
                        ثبت پیشنهاد
                      </Typography>
                      <Typography
                        variant="body2"
                        className="text-green-800 font-medium"
                      >
                        {formatDate(offerData.winner.createdAt)}
                      </Typography>
                    </div>

                    <div>
                      <Typography
                        variant="caption"
                        className="text-gray-500 block"
                      >
                        تایید شده
                      </Typography>
                      <Typography
                        variant="body2"
                        className="text-green-800 font-medium"
                      >
                        {formatDateTime(offerData.winner.confirmDate)}
                      </Typography>
                    </div>

                    <div>
                      <Typography
                        variant="caption"
                        className="text-gray-500 block"
                      >
                        انقضا
                      </Typography>
                      <Typography
                        variant="body2"
                        className="text-green-800 font-medium"
                      >
                        {formatDate(offerData.winner.expireDate)}
                      </Typography>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {offerData.winner.description && (
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
                    <Typography
                      variant="body2"
                      className="text-green-600 font-medium mb-2 flex items-center gap-2"
                    >
                      📝 توضیحات پیشنهاد
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-green-800 leading-relaxed"
                    >
                      {offerData.winner.description}
                    </Typography>
                  </div>
                )}

                {/* Comments */}
                {offerData.winner.comments &&
                  offerData.winner.comments.length > 0 && (
                    <div className="mt-4 bg-white rounded-lg p-4 shadow-sm border border-green-100">
                      <Typography
                        variant="body2"
                        className="text-green-600 font-medium mb-3 flex items-center gap-2"
                      >
                        💬 نظرات و یادداشت‌ها
                      </Typography>
                      <div className="space-y-2">
                        {offerData.winner.comments.map(
                          (comment: unknown, index: number) => (
                            <div
                              key={index}
                              className="bg-green-50 border border-green-100 p-3 rounded-lg"
                            >
                              <Typography
                                variant="body2"
                                className="text-green-800"
                              >
                                {typeof comment === "string"
                                  ? comment
                                  : JSON.stringify(comment)}
                              </Typography>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default ProductRequestSuggestionsModal;
