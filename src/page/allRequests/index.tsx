import React, { lazy, Suspense, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CRUD from "../../container/organism/CRUD";
import OpenRequestDetail from "../../container/features/openRequest/OpenRequestDetail";
import { VerifyRequestPaymentAction } from "../../redux/actions/requestOrder/RequestOrderActions";
import {
  selectVerifyRequestPaymentLoading,
  selectVerifyRequestPaymentData,
} from "../../redux/slice/requestOrder/requestOrderSlice";
import { clearAllProductRequestAdminData } from "../../redux/slice/productRequestStatus/ProductStatusRequestSlice";
import { 
  VerifyPaymentAction,
} from "../../redux/actions/product-request-offer-admin/ProductRequestOfferAdminActions";
import {
  selectVerifyPaymentLoading,
  selectVerifyPaymentData,
} from "../../redux/slice/product-request-offer-admin/ProductRequestOfferAdminSlice";

const ProductRequestAdminTable = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequestAdmin" */ "../../container/features/productRequestAdmin/ProductRequestAdminTable"
    )
);
const CloseRequestTable = lazy(
  () =>
    import(
      /* webpackChunkName: "closeRequest" */ "../../container/features/closeRequest/CloseRequestTable"
    )
);
const OpenRequestTable = lazy(
  () =>
    import(
      /* webpackChunkName: "openRequest" */ "../../container/features/openRequest/OpenRequestTable"
    )
);
const ProductRequestAdminForm = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequestAdmin" */ "../../container/features/productRequestAdmin/ProductRequestAdminForm"
    )
);
const ProductRequestEditForm = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequestEdit" */ "../../container/features/productRequestAdmin/ProductRequestEditForm"
    )
);
const CloseRequestForm = lazy(
  () =>
    import(
      /* webpackChunkName: "closeRequest" */ "../../container/features/closeRequest/CloseRequestForm"
    )
);
const OpenRequestForm = lazy(
  () =>
    import(
      /* webpackChunkName: "openRequest" */ "../../container/features/openRequest/OpenRequestForm"
    )
);
const RequestOrderPaymentModal = lazy(
  () =>
    import(
      /* webpackChunkName: "RequestOrderPayment" */ "../../container/features/requestOrder/RequestOrderPaymentModal"
    )
);
const TenderRequestEditModal = lazy(
  () =>
    import(
      /* webpackChunkName: "TenderRequest" */ "../../container/features/tenderRequest/TenderRequestEditModal"
    )
);
const FinancialApprovalTable = lazy(
  () =>
    import(
      /* webpackChunkName: "FinancialApproval" */ "../../container/features/financialApproval/FinancialApprovalTable"
    )
);
const PendingDeliveryTable = lazy(
  () =>
    import(
      /* webpackChunkName: "PendingDelivery" */ "../../container/features/pendingDelivery/PendingDeliveryTable"
    )
);
const ProductRequestApprovalModal = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequestApproval" */ "../../container/features/productRequest/ProductRequestApprovalModal"
    )
);
const ProductRequestRejectionModal = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequestRejection" */ "../../container/features/productRequest/ProductRequestRejectionModal"
    )
);

const AllRequests = () => {
  const dispatch: unknown = useDispatch();
  const [activeTab, setActiveTab] = useState<"new" | "processing" | "closed" | "financial" | "delivery">(
    "new"
  );
  const [mode, setMode] = useState<string>("content");
  const [selectedRow, setSelectedRow] = useState<unknown>({});
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const verifyRequestPaymentLoading = useSelector(
    selectVerifyRequestPaymentLoading
  );
  const verifyRequestPaymentData = useSelector(selectVerifyRequestPaymentData);
  const verifyPaymentLoading = useSelector(selectVerifyPaymentLoading);
  const verifyPaymentData = useSelector(selectVerifyPaymentData);

  const handleRequestPayment = (requestOrderId: string) => {
    dispatch(
      VerifyRequestPaymentAction({
        requestOrderId,
        verified: true,
        comment: "پرداخت توسط خریدار انجام شد",
        onSubmitForm: () => {
          setMode("content");
          setSelectedRow({});
        },
      })
    );
  };

  const handleClosePaymentModal = () => {
    if (!verifyRequestPaymentLoading) {
      setMode("content");
      setSelectedRow({});
    }
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

  // Handle successful payment response
  useEffect(() => {
    if (verifyRequestPaymentData?.status === 200) {
      setMode("content");
      setSelectedRow({});
    }
  }, [verifyRequestPaymentData]);

  // Handle successful verify payment response
  useEffect(() => {
    if (verifyPaymentData) {
      setMode("content");
      setSelectedRow({});
      // Trigger refresh in child components
      setRefreshTrigger(prev => prev + 1);
    }
  }, [verifyPaymentData]);

  const tabs = [
    { key: "new", label: "درخواست های ثبت شده" },
    { key: "processing", label: "درخواست های دارای پیشنهاد" },
    { key: "closed", label: " درخواست های در انتظار بارگیری" },
    { key: "financial", label: "درخواست های در انتظار تائید مالی" },
    { key: "delivery", label: "درخواست های در انتظار تحویل" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "new":
        return (
          <Suspense>
            <ProductRequestAdminTable
              onRowClick={(name: string, row: unknown) => {
                setMode(name);
                if (row) {
                  setSelectedRow(row);
                }
              }}
            />
          </Suspense>
        );
      case "processing":
        return (
          <Suspense>
            <CloseRequestTable
              onRowClick={(name: string, row: unknown) => {
                setMode(name);
                if (row) {
                  setSelectedRow(row);
                }
              }}
            />
          </Suspense>
        );
      case "closed":
        return (
          <Suspense>
            <OpenRequestTable
              onRowClick={(name: string, row: unknown) => {
                setMode(name);
                if (row) {
                  setSelectedRow(row);
                }
              }}
            />
          </Suspense>
        );
      case "financial":
        return (
          <Suspense>
            <FinancialApprovalTable
              refreshTrigger={refreshTrigger}
              onRowClick={(name: string, row: unknown) => {
                setMode(name);
                if (row) {
                  setSelectedRow(row);
                }
              }}
            />
          </Suspense>
        );
      case "delivery":
        return (
          <Suspense>
            <PendingDeliveryTable
              onRowClick={(name: string, row: unknown) => {
                setMode(name);
                if (row) {
                  setSelectedRow(row);
                }
              }}
            />
          </Suspense>
        );
      default:
        return null;
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case "new":
        if (mode === "edit") {
          return (
            <Suspense>
              <ProductRequestEditForm
                handleSubmit={() => setMode("content")}
                id={selectedRow?.id ?? null}
                mode={mode}
                onSubmitForm={() => {
                  setMode("content");
                }}
              />
            </Suspense>
          );
        }
        return (
          <Suspense>
            <ProductRequestAdminForm
              handleSubmit={() => setMode("content")}
              id={selectedRow?.id ?? null}
              mode={mode}
              onSubmitForm={() => {
                setMode("content");
              }}
            />
          </Suspense>
        );
      case "processing":
        return (
          <Suspense>
            <CloseRequestForm
              handleSubmit={() => setMode("content")}
              id={selectedRow?.id ?? null}
              mode={mode}
              onSubmitForm={() => {
                setMode("content");
              }}
            />
          </Suspense>
        );
      case "closed":
        return (
          <Suspense>
            <OpenRequestForm
              handleSubmit={() => setMode("content")}
              id={selectedRow?.id ?? null}
              value={selectedRow ?? null}
              mode={mode}
              onSubmitForm={() => {
                setMode("content");
              }}
            />
          </Suspense>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="mt-[160px] w-[92%] mb-[60px] mx-auto h-auto min-h-[50vh] rounded-xl bg-white relative p-6"
      style={{
        boxShadow: "0px 0px 4px 0px #00000040",
      }}
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          درخواست های مناقصه
        </h1>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 rtl:space-x-reverse">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  dispatch(clearAllProductRequestAdminData());
                  setActiveTab(tab.key as "new" | "processing" | "closed" | "financial" | "delivery");
                  setMode("content");
                  setSelectedRow({});
                }}
                className={`py-2 px-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.key
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <CRUD
        confirmModalSize="2xl"
        formModalSize="2xl"
        detailModalSize="2xl"
        mode={mode}
        content={renderTabContent()}
        form={renderForm()}
        detail={
          activeTab === "new" ? (
            <Suspense>
              <TenderRequestEditModal
                isOpen={mode === "detail"}
                onClose={() => {
                  dispatch(clearAllProductRequestAdminData());
                  setMode("content");
                  setSelectedRow({});
                }}
                request={selectedRow}
                onSuccess={() => {
                  dispatch(clearAllProductRequestAdminData());
                  setMode("content");
                  setSelectedRow({});
                }}
              />
            </Suspense>
          ) : (
            <Suspense>
              <OpenRequestDetail
                handleSubmit={() => setMode("content")}
                id={selectedRow ?? null}
                mode={mode}
                onSubmitForm={() => {
                  setMode("content");
                }}
              />
            </Suspense>
          )
        }
        onModalClose={() => {
          dispatch(clearAllProductRequestAdminData());
          setMode("content");
          setSelectedRow({});
        }}
      />

      {/* Render RequestOrderPaymentModal for processing tab */}
      {activeTab === "processing" && mode === "payment" && (
        <Suspense>
          <RequestOrderPaymentModal
            isOpen={true}
            onClose={handleClosePaymentModal}
            requestOrder={selectedRow}
            onPayment={handleRequestPayment}
            loading={verifyRequestPaymentLoading}
          />
        </Suspense>
      )}

      {/* Render ProductRequestApprovalModal for financial tab */}
      {activeTab === "financial" && mode === "approve" && (
        <Suspense>
          <ProductRequestApprovalModal
            isOpen={true}
            onClose={() => {
              setMode("content");
              setSelectedRow({});
            }}
            request={selectedRow}
            onApprove={handleApproveRequest}
            loading={verifyPaymentLoading}
          />
        </Suspense>
      )}

      {/* Render ProductRequestRejectionModal for financial tab */}
      {activeTab === "financial" && mode === "reject" && (
        <Suspense>
          <ProductRequestRejectionModal
            isOpen={true}
            onClose={() => {
              setMode("content");
              setSelectedRow({});
            }}
            request={selectedRow}
            onReject={handleRejectRequest}
            loading={verifyPaymentLoading}
          />
        </Suspense>
      )}
    </div>
  );
};

export default AllRequests;
