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

const AllRequests = () => {
  const dispatch: any = useDispatch();
  const [activeTab, setActiveTab] = useState<"new" | "processing" | "closed">(
    "new"
  );
  const [mode, setMode] = useState<string>("content");
  const [selectedRow, setSelectedRow] = useState<unknown>({});

  const verifyRequestPaymentLoading = useSelector(
    selectVerifyRequestPaymentLoading
  );
  const verifyRequestPaymentData = useSelector(selectVerifyRequestPaymentData);

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

  // Handle successful payment response
  useEffect(() => {
    if (verifyRequestPaymentData?.status === 200) {
      setMode("content");
      setSelectedRow({});
    }
  }, [verifyRequestPaymentData]);

  const tabs = [
    { key: "new", label: "درخواست های ثبت شده" },
    { key: "processing", label: "درخواست های درحال پردازش" },
    { key: "closed", label: "درخواست های تحویل داده شده" },
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
                  setActiveTab(tab.key as "new" | "processing" | "closed");
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
    </div>
  );
};

export default AllRequests;
