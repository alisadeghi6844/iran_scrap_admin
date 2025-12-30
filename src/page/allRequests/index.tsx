import React, { Suspense, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CRUD from "../../container/organism/CRUD";
import OpenRequestDetail from "../../container/features/openRequest/OpenRequestDetail";
import { VerifyRequestPaymentAction } from "../../redux/actions/requestOrder/RequestOrderActions";
import {
  selectVerifyRequestPaymentLoading,
  selectVerifyRequestPaymentData,
} from "../../redux/slice/requestOrder/requestOrderSlice";
import { clearAllProductRequestAdminData } from "../../redux/slice/productRequestStatus/ProductStatusRequestSlice";
import { VerifyPaymentAction } from "../../redux/actions/product-request-offer-admin/ProductRequestOfferAdminActions";
import {
  selectVerifyPaymentLoading,
  selectVerifyPaymentData,
} from "../../redux/slice/product-request-offer-admin/ProductRequestOfferAdminSlice";
import {
  CloseRequestForm,
  CloseRequestTable,
  FinancialApprovalTable,
  OpenRequestForm,
  OpenRequestTable,
  PendingDeliveryTable,
  ProductRequestAdminForm,
  ProductRequestAdminTable,
  ProductRequestApprovalModal,
  ProductRequestDetailsModal,
  ProductRequestEditForm,
  ProductRequestRejectionModal,
  RequestOrderPaymentModal,
  TenderRequestEditModal,
} from "./allRequests.lazies";
import AllRequestsTabs, { AllRequestsTabKey } from "./AllRequestsTabs";

const AllRequests = () => {
  const dispatch: unknown = useDispatch();
  const [activeTab, setActiveTab] = useState<AllRequestsTabKey>("new");
  const [mode, setMode] = useState<string>("content");
  const [selectedRow, setSelectedRow] = useState<unknown>({});
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [isDriverEditModalOpen, setIsDriverEditModalOpen] =
    useState<boolean>(false);
  const [selectedDriverEditRow, setSelectedDriverEditRow] = useState<unknown>(
    {}
  );

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
      setRefreshTrigger((prev) => prev + 1);
    }
  }, [verifyPaymentData]);

  const tabs: { key: AllRequestsTabKey; label: string }[] = [
    { key: "new", label: "درخواست های ثبت شده" },
    { key: "processing", label: "درخواست های دارای پیشنهاد" },
    { key: "closed", label: " درخواست های در انتظار بارگیری" },
    { key: "financial", label: "درخواست های در انتظار تائید مالی" },
    { key: "delivery", label: "درخواست های در انتظار تحویل" },
  ];

  const handleTabClick = (tabKey: AllRequestsTabKey) => {
    dispatch(clearAllProductRequestAdminData());
    setActiveTab(tabKey);
    setMode("content");
    setSelectedRow({});
  };

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
                if (name === "showDriver") {
                  setIsDriverEditModalOpen(true);
                  setSelectedDriverEditRow(row);
                } else {
                  setMode(name);
                  if (row) {
                    setSelectedRow(row);
                  }
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
      <AllRequestsTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={handleTabClick}
      />

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

      {/* Render ProductRequestDetailsModal for driver edit */}
      {isDriverEditModalOpen && (
        <Suspense>
          <ProductRequestDetailsModal
            isOpen={true}
            onClose={() => {
              setIsDriverEditModalOpen(false);
              setSelectedDriverEditRow({});
            }}
            request={selectedDriverEditRow}
            driverOnlyMode={true}
          />
        </Suspense>
      )}
    </div>
  );
};

export default AllRequests;
