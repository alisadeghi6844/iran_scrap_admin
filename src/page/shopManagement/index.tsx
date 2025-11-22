import { lazy, Suspense, useState, useMemo } from "react";
import CRUD from "../../container/organism/CRUD";
import { OrderItem } from "../../types/OrderItem";

// Lazy load components
const RegisteredOrdersTable = lazy(
  () =>
    import(
      /* webpackChunkName: "RegisteredOrders" */ "../../container/features/shopManagement/RegisteredOrdersTable"
    )
);
const PendingLoadingTable = lazy(
  () =>
    import(
      /* webpackChunkName: "PendingLoading" */ "../../container/features/shopManagement/PendingLoadingTable"
    )
);
const FinancialApprovalTable = lazy(
  () =>
    import(
      /* webpackChunkName: "FinancialApproval" */ "../../container/features/shopManagement/FinancialApprovalTable"
    )
);
const PendingDeliveryTable = lazy(
  () =>
    import(
      /* webpackChunkName: "PendingDelivery" */ "../../container/features/shopManagement/PendingDeliveryTable"
    )
);
const OrderDetailsModal = lazy(
  () =>
    import(
      /* webpackChunkName: "OrderDetails" */ "../../container/features/shopManagement/OrderDetailsModal"
    )
);
const OrderEditModal = lazy(
  () =>
    import(
      /* webpackChunkName: "OrderEdit" */ "../../container/features/shopManagement/OrderEditModal"
    )
);
const DriverEditModal = lazy(
  () =>
    import(
      /* webpackChunkName: "DriverEdit" */ "../../container/features/shopManagement/DriverEditModal"
    )
);
const FinancialApprovalModal = lazy(
  () =>
    import(
      /* webpackChunkName: "FinancialApprovalModal" */ "../../container/features/shopManagement/FinancialApprovalModal"
    )
);

const ShopManagement = () => {
  const [activeTab, setActiveTab] = useState<
    "registered" | "loading" | "financial" | "delivery"
  >("registered");
  const [mode, setMode] = useState<string>("content");
  const [selectedRow, setSelectedRow] = useState<OrderItem | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [tabLoading, setTabLoading] = useState<boolean>(false);

  const handleCloseModal = () => {
    setMode("content");
    setSelectedRow(null);
  };

  const handleRefreshTable = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const tabs = [
    { key: "registered", label: "خریدهای ثبت شده" },
    { key: "loading", label: "سفارش در انتظار بارگیری" },
    { key: "financial", label: "خریدهای در انتظار تائید مالی" },
    { key: "delivery", label: "خریدهای در انتظار تحویل" },
  ];

  const tabContent = useMemo(() => {
    const handleRowClick = (action: string, row: OrderItem) => {
      setMode(action);
      setSelectedRow(row);
    };

    if (tabLoading) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">در حال بارگذاری...</div>
        </div>
      );
    }

    switch (activeTab) {
      case "registered":
        return (
          <Suspense fallback={<div className="flex justify-center items-center py-8"><div className="text-gray-500">در حال بارگذاری...</div></div>}>
            <RegisteredOrdersTable
              refreshTrigger={refreshTrigger}
              onRowClick={handleRowClick}
            />
          </Suspense>
        );
      case "loading":
        return (
          <Suspense fallback={<div className="flex justify-center items-center py-8"><div className="text-gray-500">در حال بارگذاری...</div></div>}>
            <PendingLoadingTable
              refreshTrigger={refreshTrigger}
              onRowClick={handleRowClick}
            />
          </Suspense>
        );
      case "financial":
        return (
          <Suspense fallback={<div className="flex justify-center items-center py-8"><div className="text-gray-500">در حال بارگذاری...</div></div>}>
            <FinancialApprovalTable
              refreshTrigger={refreshTrigger}
              onRowClick={handleRowClick}
            />
          </Suspense>
        );
      case "delivery":
        return (
          <Suspense fallback={<div className="flex justify-center items-center py-8"><div className="text-gray-500">در حال بارگذاری...</div></div>}>
            <PendingDeliveryTable
              refreshTrigger={refreshTrigger}
              onRowClick={handleRowClick}
            />
          </Suspense>
        );
      default:
        return null;
    }
  }, [activeTab, refreshTrigger, tabLoading]);

  return (
    <div
      className="mt-[160px] w-[92%] mb-[60px] mx-auto h-auto min-h-[50vh] rounded-xl bg-white relative p-6"
      style={{
        boxShadow: "0px 0px 4px 0px #00000040",
      }}
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">فروشگاه</h1>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 rtl:space-x-reverse">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  if (activeTab !== tab.key) {
                    setTabLoading(true);
                    setActiveTab(
                      tab.key as
                        | "registered"
                        | "loading"
                        | "financial"
                        | "delivery"
                    );
                    setMode("content");
                    setSelectedRow(null);
                    // Reset loading after a short delay to allow component to mount
                    setTimeout(() => setTabLoading(false), 100);
                  }
                }}
                disabled={tabLoading}
                className={`py-2 px-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.key
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } ${tabLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <CRUD
        confirmModalSize="lg"
        mode={mode}
        content={tabContent}
        confirmation={null}
        onModalClose={handleCloseModal}
      />

      {/* Order Details Modal */}
      {mode === "viewMore" && (
        <Suspense>
          <OrderDetailsModal
            isOpen={true}
            onClose={handleCloseModal}
            order={selectedRow}
          />
        </Suspense>
      )}

      {/* Order Edit Modal */}
      {mode === "editOrder" && (
        <Suspense>
          <OrderEditModal
            isOpen={true}
            onClose={handleCloseModal}
            order={selectedRow}
            onSuccess={handleRefreshTable}
          />
        </Suspense>
      )}

      {/* Driver Edit Modal */}
      {mode === "editDriver" && (
        <Suspense>
          <DriverEditModal
            isOpen={true}
            onClose={handleCloseModal}
            order={selectedRow}
            onSuccess={handleRefreshTable}
          />
        </Suspense>
      )}

      {/* Financial Approval Modal */}
      {mode === "financialApproval" && (
        <Suspense>
          <FinancialApprovalModal
            isOpen={true}
            onClose={handleCloseModal}
            order={selectedRow}
            onSuccess={handleRefreshTable}
          />
        </Suspense>
      )}
    </div>
  );
};

export default ShopManagement;
