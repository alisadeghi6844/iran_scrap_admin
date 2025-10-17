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
import CRUD from "../../container/organism/CRUD";

interface ProductRequestItem {
  id: string;
  providerIds: string[];
  description: string;
  categoryId: string;
  province: string;
  city: string;
  requestType: string;
  amount: number;
  amountType: string;
  paymentType: string;
  expectedDate: number;
  status: any;
  createdAt: number;
  updatedAt: number;
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
const ProductRequestProvidersModal = lazy(
  () =>
    import(
      /* webpackChunkName: "ProductRequests" */ "../../container/features/productRequest/ProductRequestProvidersModal"
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
                if (action === "delete") {
                  handleDeleteRequest(row.id);
                } else {
                  setMode(action);
                  setSelectedRow(row);
                }
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
    </div>
  );
};

export default ProductRequests;