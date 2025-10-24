import { lazy, Suspense, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  VerifyPaymentAction,
  MakeDeliveredAction,
} from "../../redux/actions/order/OrderActions";
import {
  selectVerifyPaymentLoading,
  selectVerifyPaymentData,
  selectMakeDeliveredLoading,
} from "../../redux/slice/order/orderSlice";
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

const PendingOrdersTable = lazy(
  () =>
    import(
      /* webpackChunkName: "PendingOrders" */ "../../container/features/order/PendingOrdersTable"
    )
);
const OrderDetailsModal = lazy(
  () =>
    import(
      /* webpackChunkName: "PendingOrders" */ "../../container/features/order/OrderDetailsModal"
    )
);
const OrderApprovalModal = lazy(
  () =>
    import(
      /* webpackChunkName: "PendingOrders" */ "../../container/features/order/OrderApprovalModal"
    )
);
const OrderRejectionModal = lazy(
  () =>
    import(
      /* webpackChunkName: "PendingOrders" */ "../../container/features/order/OrderRejectionModal"
    )
);
import OrderDeliveryModal from "../../container/features/order/OrderDeliveryModal";

const PendingOrdersFinancial = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [mode, setMode] = useState<string>("content");
  const [selectedRow, setSelectedRow] = useState<OrderItem | null>(null);
  const [refreshTable, setRefreshTable] = useState<number>(0);

  const verifyPaymentLoading = useSelector(selectVerifyPaymentLoading);
  const verifyPaymentData = useSelector(selectVerifyPaymentData);
  const makeDeliveredLoading = useSelector(selectMakeDeliveredLoading);

  const handleApproveOrder = (orderId: string) => {
    dispatch(
      VerifyPaymentAction({
        orderId,
        verified: true,
        comment: null,
      })
    );
  };

  const handleRejectOrder = (orderId: string, reason: string) => {
    dispatch(
      VerifyPaymentAction({
        orderId,
        verified: false,
        comment: reason,
      })
    );
  };

  const handleDeliveryOrder = (orderId: string, loadingDate: string) => {
    dispatch(
      MakeDeliveredAction({
        orderId,
        loadingDate,
        onSubmitForm: () => {
          setMode("content");
          setSelectedRow(null);
          setRefreshTable((prev) => prev + 1);
        },
      })
    );
  };

  const handleCloseModal = () => {
    setMode("content");
    setSelectedRow(null);
  };

  // Handle successful verify payment response
  useEffect(() => {
    if (
      verifyPaymentData?.status === 200 ||
      verifyPaymentData?.status === 201
    ) {
      setMode("content");
      setSelectedRow(null);
      setRefreshTable((prev) => prev + 1);
    }
  }, [verifyPaymentData]);

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
            <PendingOrdersTable
              refreshTrigger={refreshTable}
              onRowClick={(action: string, row: OrderItem) => {
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

      {/* Render OrderDetailsModal separately outside CRUD */}
      {mode === "viewMore" && (
        <Suspense>
          <OrderDetailsModal
            isOpen={true}
            onClose={handleCloseModal}
            order={selectedRow}
          />
        </Suspense>
      )}

      {/* Render OrderRejectionModal separately outside CRUD */}
      {mode === "reject" && (
        <Suspense>
          <OrderRejectionModal
            isOpen={true}
            onClose={handleCloseModal}
            order={selectedRow}
            onReject={handleRejectOrder}
            loading={verifyPaymentLoading}
          />
        </Suspense>
      )}

      {/* Render OrderApprovalModal separately outside CRUD */}
      {mode === "approve" && (
        <Suspense>
          <OrderApprovalModal
            isOpen={true}
            onClose={handleCloseModal}
            order={selectedRow}
            onApprove={handleApproveOrder}
            loading={verifyPaymentLoading}
          />
        </Suspense>
      )}

      {/* Render OrderDeliveryModal separately outside CRUD */}
      {mode === "delivery" && (
        <OrderDeliveryModal
          isOpen={true}
          onClose={handleCloseModal}
          orderId={selectedRow?.id || ""}
          order={selectedRow}
          onDelivery={handleDeliveryOrder}
          loading={makeDeliveredLoading}
        />
      )}
    </div>
  );
};

export default PendingOrdersFinancial;
