import { lazy, Suspense, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import CRUD from "../../container/organism/CRUD";

interface OrderItem {
  id: string;
  buyerId: string;
  providerId: string;
  product: {
    id: string;
    name?: string;
    categoryId: string;
    inventoryType: string;
  };
  quantity: number;
  price: number;
  finalPrice: number;
  payingPrice: number;
  paymentType: string;
  installmentMonths: number;
  status: string;
  city: string;
  province: string;
  createdAt: number;
  updatedAt: number;
  loadingDate?: string;
  unloadingDate?: string;
  cheques?: Array<{
    date: string;
    bank: string;
    no: string;
    sayyad: string;
  }>;
  driver?: {
    billNumber: string;
    licensePlate: string;
    vehicleName: string;
    driverName: string;
    driverPhone: string;
  };
  shippings: {
    digifarm: number;
    provider: number;
  };
  shippingPrice: number;
}

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
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState<"registered" | "loading" | "financial" | "delivery">("registered");
  const [mode, setMode] = useState<string>("content");
  const [selectedRow, setSelectedRow] = useState<OrderItem | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const handleCloseModal = () => {
    setMode("content");
    setSelectedRow(null);
  };

  const handleRefreshTable = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const tabs = [
    { key: "registered", label: "خریدهای ثبت شده" },
    { key: "loading", label: "سفارش در انتظار بارگیری" },
    { key: "financial", label: "خریدهای در انتظار تائید مالی" },
    { key: "delivery", label: "خریدهای در انتظار تحویل" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "registered":
        return (
          <Suspense>
            <RegisteredOrdersTable
              refreshTrigger={refreshTrigger}
              onRowClick={(action: string, row: OrderItem) => {
                setMode(action);
                setSelectedRow(row);
              }}
            />
          </Suspense>
        );
      case "loading":
        return (
          <Suspense>
            <PendingLoadingTable
              refreshTrigger={refreshTrigger}
              onRowClick={(action: string, row: OrderItem) => {
                setMode(action);
                setSelectedRow(row);
              }}
            />
          </Suspense>
        );
      case "financial":
        return (
          <Suspense>
            <FinancialApprovalTable
              refreshTrigger={refreshTrigger}
              onRowClick={(action: string, row: OrderItem) => {
                setMode(action);
                setSelectedRow(row);
              }}
            />
          </Suspense>
        );
      case "delivery":
        return (
          <Suspense>
            <PendingDeliveryTable
              refreshTrigger={refreshTrigger}
              onRowClick={(action: string, row: OrderItem) => {
                setMode(action);
                setSelectedRow(row);
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
        <h1 className="text-2xl font-bold text-gray-800 mb-4">فروشگاه</h1>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 rtl:space-x-reverse">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key as "registered" | "loading" | "financial" | "delivery");
                  setMode("content");
                  setSelectedRow(null);
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
        confirmModalSize="lg"
        mode="content"
        content={renderTabContent()}
        confirmation={null}
        onModalClose={handleCloseModal}
      />

      {/* Order Details Modal */}
      {mode === "viewOrder" && (
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