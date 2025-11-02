import { lazy, Suspense, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  UpdateRequestProductAdminAction,
  UpdateRequestProductAdminProviderAction,
  DeleteRequestProductAdminAction,
} from "../../redux/actions/productRequestStatus/RequestProductStatus";
import {
  selectUpdateProductRequestAdminLoading,
  selectUpdateProductRequestAdminData,
  selectDeleteProductRequestAdminLoading,
} from "../../redux/slice/productRequestStatus/ProductStatusRequestSlice";
import { 
  VerifyPaymentAction,
  MakeDeliveredAction,
} from "../../redux/actions/product-request-offer-admin/ProductRequestOfferAdminActions";
import {
  selectVerifyPaymentLoading,
  selectVerifyPaymentData,
  selectMakeDeliveredLoading,
  selectMakeDeliveredData,
} from "../../redux/slice/product-request-offer-admin/ProductRequestOfferAdminSlice";
import CRUD from "../../container/organism/CRUD";

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

const ProductRequestsTable = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequests" */ "../../container/features/productRequest/ProductRequestsTable"
    )
);
const ProductRequestDetailsModal = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequests" */ "../../container/features/productRequest/ProductRequestDetailsModal"
    )
);
const ProductRequestEditModal = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequests" */ "../../container/features/productRequest/ProductRequestEditModal"
    )
);
const ProductRequestEditRequestModal = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequests" */ "../../container/features/productRequest/ProductRequestEditRequestModal"
    )
);
const ProductRequestProvidersModal = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequests" */ "../../container/features/productRequest/ProductRequestProvidersModal"
    )
);
const ProductRequestSuggestionsModal = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequests" */ "../../container/features/productRequest/ProductRequestSuggestionsModal"
    )
);
const ProductRequestApprovalModal = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequests" */ "../../container/features/productRequest/ProductRequestApprovalModal"
    )
);
const ProductRequestRejectionModal = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequests" */ "../../container/features/productRequest/ProductRequestRejectionModal"
    )
);
const ProductRequestDeliveryModal = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequests" */ "../../container/features/productRequest/ProductRequestDeliveryModal"
    )
);

const ProductRequests = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [mode, setMode] = useState<string>("content");
  const [selectedRow, setSelectedRow] = useState<ProductRequestItem | null>(null);
  const [refreshTable, setRefreshTable] = useState<number>(0);

  const updateProductRequestLoading = useSelector(selectUpdateProductRequestAdminLoading);
  const updateProductRequestData = useSelector(selectUpdateProductRequestAdminData);
  const deleteProductRequestLoading = useSelector(selectDeleteProductRequestAdminLoading);
  const verifyPaymentLoading = useSelector(selectVerifyPaymentLoading);
  const verifyPaymentData = useSelector(selectVerifyPaymentData);
  const makeDeliveredLoading = useSelector(selectMakeDeliveredLoading);
  const makeDeliveredData = useSelector(selectMakeDeliveredData);

  const handleEditRequest = (requestId: string, requestData: any) => {
    dispatch(
      UpdateRequestProductAdminAction({
        credentials: requestId,
        item: requestData,
        onSuccess: () => {
          setMode("content");
          setSelectedRow(null);
          setRefreshTable((prev) => prev + 1);
        },
        thunkAPI: null,
      })
    );
  };

  const handleUpdateProviders = (requestId: string, providerIds: string[]) => {
    dispatch(
      UpdateRequestProductAdminProviderAction({
        credentials: { providerIds },
        id: requestId,
        handleSubmit: () => {
          setMode("content");
          setSelectedRow(null);
          setRefreshTable((prev) => prev + 1);
        },
        thunkAPI: null,
      })
    );
  };

  const handleDeleteRequest = (requestId: string) => {
    dispatch(
      DeleteRequestProductAdminAction({
        id: requestId,
        onSuccess: () => {
          setMode("content");
          setSelectedRow(null);
          setRefreshTable((prev) => prev + 1);
        },
      })
    );
  };

  const handleApproveRequest = (requestId: string) => {
    dispatch(
      VerifyPaymentAction({
        requestId: requestId,
        verified: true,
        comment: "تایید پرداخت توسط ادمین",
      })
    );
  };

  const handleRejectRequest = (requestId: string, reason: string) => {
    dispatch(
      VerifyPaymentAction({
        requestId: requestId,
        verified: false,
        comment: reason,
      })
    );
  };

  const handleDeliveryRequest = (requestId: string, unloadingDate: string) => {
    dispatch(
      MakeDeliveredAction({
        requestId,
        unloadingDate,
      })
    );
  };

  const handleCloseModal = () => {
    setMode("content");
    setSelectedRow(null);
  };

  // Handle successful update response
  useEffect(() => {
    if (updateProductRequestData?.status === 200 || updateProductRequestData?.status === 201) {
      setMode("content");
      setSelectedRow(null);
      setRefreshTable((prev) => prev + 1);
    }
  }, [updateProductRequestData]);

  // Handle successful verify payment response
  useEffect(() => {
    if (verifyPaymentData) {
      setMode("content");
      setSelectedRow(null);
      setRefreshTable((prev) => prev + 1);
    }
  }, [verifyPaymentData]);

  // Handle successful make delivered response
  useEffect(() => {
    if (makeDeliveredData) {
      setMode("content");
      setSelectedRow(null);
      setRefreshTable((prev) => prev + 1);
    }
  }, [makeDeliveredData]);

  return (
    <div
      className="mt-[160px] w-[92%] mb-[60px] mx-auto h-auto min-h-[50vh] rounded-xl bg-white relative p-6"
      style={{
        boxShadow: "0px 0px 4px 0px #00000040",
      }}
    >
      <CRUD
        confirmModalSize="lg"
        mode="content"
        content={
          <Suspense>
            <ProductRequestsTable
              refreshTrigger={refreshTable}
              onRowClick={(action: string, row: ProductRequestItem) => {
                console.log(
                  "onRowClick called with action:",
                  action,
                  "row:",
                  row
                );
                setMode(action);
                setSelectedRow(row);
              }}
            />
          </Suspense>
        }
        confirmation={null}
        onModalClose={handleCloseModal}
      />

      {/* Render ProductRequestDetailsModal separately outside CRUD */}
      {mode === "viewMore" && (
        <Suspense>
          <ProductRequestDetailsModal
            isOpen={true}
            onClose={handleCloseModal}
            request={selectedRow}
          />
        </Suspense>
      )}

      {/* Render ProductRequestEditModal separately outside CRUD */}
      {mode === "edit" && (
        <Suspense>
          <ProductRequestEditModal
            isOpen={true}
            onClose={handleCloseModal}
            request={selectedRow}
            onEdit={handleEditRequest}
            loading={updateProductRequestLoading}
          />
        </Suspense>
      )}

      {/* Render ProductRequestProvidersModal separately outside CRUD */}
      {mode === "providers" && (
        <Suspense>
          <ProductRequestProvidersModal
            isOpen={true}
            onClose={handleCloseModal}
            request={selectedRow}
            onUpdateProviders={handleUpdateProviders}
            loading={updateProductRequestLoading}
          />
        </Suspense>
      )}

      {/* Render ProductRequestSuggestionsModal separately outside CRUD */}
      {mode === "viewSuggestions" && (
        <Suspense>
          <ProductRequestSuggestionsModal
            isOpen={true}
            onClose={handleCloseModal}
            request={selectedRow}
          />
        </Suspense>
      )}

      {/* Render ProductRequestApprovalModal separately outside CRUD */}
      {mode === "approve" && (
        <Suspense>
          <ProductRequestApprovalModal
            isOpen={true}
            onClose={handleCloseModal}
            request={selectedRow}
            onApprove={handleApproveRequest}
            loading={verifyPaymentLoading}
          />
        </Suspense>
      )}

      {/* Render ProductRequestRejectionModal separately outside CRUD */}
      {mode === "reject" && (
        <Suspense>
          <ProductRequestRejectionModal
            isOpen={true}
            onClose={handleCloseModal}
            request={selectedRow}
            onReject={handleRejectRequest}
            loading={verifyPaymentLoading}
          />
        </Suspense>
      )}
{console.log("selectedRow",selectedRow)}
      {/* Render ProductRequestDeliveryModal separately outside CRUD */}
      {mode === "delivery" && (
        <Suspense>
          <ProductRequestDeliveryModal
            isOpen={true}
            onClose={handleCloseModal}
            requestId={selectedRow?.id || ""}
            onDelivery={handleDeliveryRequest}
            loading={makeDeliveredLoading}
          />
        </Suspense>
      )}

      {/* Render ProductRequestEditRequestModal separately outside CRUD */}
      {mode === "editRequest" && (
        <Suspense>
          <ProductRequestEditRequestModal
            isOpen={true}
            onClose={handleCloseModal}
            request={selectedRow}
            onSuccess={() => {
              setRefreshTable((prev) => prev + 1);
            }}
          />
        </Suspense>
      )}
    </div>
  );
};

export default ProductRequests;