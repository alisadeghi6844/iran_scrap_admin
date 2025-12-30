import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HandleFilterParams } from "../../../types/FilterParams";
import CollectionControls from "../../organism/CollectionControls";
import Table from "../../../components/table";
import TableRow from "../../../components/table/TableRow";
import TableBody from "../../../components/table/TableBody";
import TableCell from "../../../components/table/TableCell";
import EmptyImage from "../../../components/image/EmptyImage";
import TableSkeleton from "../../organism/skeleton/TableSkeleton";
import {
  selectGetProductRequestAdminData,
  selectGetProductRequestAdminLoading,
  selectUpdateProductRequestProviderAdminData,
} from "../../../redux/slice/productRequestStatus/ProductStatusRequestSlice";
import { GetRequestProductAdminAction } from "../../../redux/actions/productRequestStatus/RequestProductStatus";

import { selectUpdateRequestProductOfferSendToBuyerData } from "../../../redux/slice/productRequestOffer/ProductStatusRequestSlice";
import RequestDetailModal from "../closeRequest/RequestDetailModal";
import { SelectOptionTypes } from "../../../types/features/FeatureSelectTypes";
import {
  selectGetCategoryData,
  selectGetCategoryLoading,
} from "../../../redux/slice/category/CategorySlice";
import { GetCategoryAction } from "../../../redux/actions/category/CategoryActions";
import {
  selectGetUsersProvidersData,
  selectGetUsersProvidersLoading,
} from "../../../redux/slice/users/UsersSlice";
import { GetUsersProvidersAction } from "../../../redux/actions/users/UsersActions";
import {
  OpenRequestTableDataRow,
  OpenRequestTableFilterRow,
  OpenRequestTableHead,
} from "./OpenRequestTable.parts";

interface ProductRequestAdminTypes {
  onRowClick?: any;
}

const OpenRequest: React.FC<ProductRequestAdminTypes> = (props) => {
  const { onRowClick } = props;
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const dispatch: any = useDispatch();

  // Filter states
  const [categoryFilter, setCategoryFilter] =
    useState<SelectOptionTypes | null>(null);
  const [providerFilter, setProviderFilter] =
    useState<SelectOptionTypes | null>(null);
  const [paymentTypeFilter, setPaymentTypeFilter] =
    useState<SelectOptionTypes | null>(null);
  const [statusFilter, setStatusFilter] = useState<SelectOptionTypes | null>(
    null
  );

  const filterDefaultInitialValues = {
    Category: categoryFilter,
    Provider: providerFilter,
    PaymentType: paymentTypeFilter,
    Status: statusFilter,
  };

  const loading = useSelector(selectGetProductRequestAdminLoading);
  const productAdminData = useSelector(selectGetProductRequestAdminData);
  const updateProviderData = useSelector(
    selectUpdateProductRequestProviderAdminData
  );
  const updateData = useSelector(
    selectUpdateRequestProductOfferSendToBuyerData
  );
  const categoryData = useSelector(selectGetCategoryData);
  const categoryLoading = useSelector(selectGetCategoryLoading);
  const providersData = useSelector(selectGetUsersProvidersData);
  const providersLoading = useSelector(selectGetUsersProvidersLoading);
  const updateData_2 = useSelector(selectUpdateProductRequestProviderAdminData);

  useEffect(() => {
    if (selectedStatus) {
      dispatch(
        GetRequestProductAdminAction({
          page: 0,
          size: 20,
          status: [selectedStatus],
        })
      );
    } else {
      dispatch(
        GetRequestProductAdminAction({
          page: 0,
          size: 20,
          status: ["LOADING_ORDER", "WAITING_UNLOADING"],
        })
      );
    }
    dispatch(GetCategoryAction({}));
    dispatch(GetUsersProvidersAction({ credentials: {} }));
  }, [selectedStatus, dispatch]);

  // Trigger filtering when filter values change
  useEffect(() => {
    const filterData = {
      Category: categoryFilter,
      Provider: providerFilter,
      PaymentType: paymentTypeFilter,
      Status: statusFilter,
    };

    const filterString = handleFilterParameters(filterData);
    const statusArray = selectedStatus
      ? [selectedStatus]
      : ["LOADING_ORDER", "WAITING_UNLOADING"];

    dispatch(
      GetRequestProductAdminAction({
        filter: filterString || undefined,
        page: 0,
        size: 20,
        status: statusArray,
      })
    );
  }, [
    categoryFilter,
    providerFilter,
    paymentTypeFilter,
    statusFilter,
    dispatch,
    selectedStatus,
  ]);

  const handleFilterParameters = (data: unknown) => {
    const { Category, Provider, PaymentType, Status } = data as {
      Category?: SelectOptionTypes;
      Provider?: SelectOptionTypes;
      PaymentType?: SelectOptionTypes;
      Status?: SelectOptionTypes;
    };
    let queryParam = "";
    if (Category?.value) queryParam += "categoryId=" + Category?.value + ",";
    if (Provider?.value) queryParam += "providerId=" + Provider?.value + ",";
    if (PaymentType?.value)
      queryParam += "paymentType=" + PaymentType?.value + ",";
    if (Status?.value) queryParam += "status=" + Status?.value + ",";

    return queryParam.substring(0, queryParam.length - 1);
  };

  // Filter options
  const paymentTypeOptions = [
    { value: "CASH", label: "نقدی" },
    { value: "INSTALLMENTS", label: "مدت دار" },
    { value: "CASH_AND_INSTALLMENTS", label: "نقدی و مدت دار" },
  ];

  // Get categories from category API
  const categoryOptions = React.useMemo(() => {
    if (!categoryData?.data) return [];
    return categoryData.data.map((category: any) => ({
      value: category._id || category.id,
      label: category.name,
    }));
  }, [categoryData]);

  // Get providers from users API with Provider or Both usertype
  const providerOptions = React.useMemo(() => {
    if (!providersData?.data?.data) return [];
    return providersData.data.data
      .filter(
        (user: any) => user.usertype === "Provider" || user.usertype === "Both"
      )
      .map((user: any) => ({
        value: user.id,
        label:
          user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.mobile || user.companyName || "نامشخص",
      }));
  }, [providersData]);

  const handleFilter = ({ filter, page, pageSize }: HandleFilterParams) => {
    if (selectedStatus) {
      dispatch(
        GetRequestProductAdminAction({
          filter,
          page: page ?? 0,
          size: pageSize ?? 20,
          status: [selectedStatus],
        })
      );
    } else {
      dispatch(
        GetRequestProductAdminAction({
          filter,
          page: page ?? 0,
          size: pageSize ?? 20,
          status: ["LOADING_ORDER", "WAITING_UNLOADING"],
        })
      );
    }
  };

  useEffect(() => {
    if (
      updateData?.status == 200 ||
      updateData_2?.status == 200 ||
      updateProviderData?.status?.id
    ) {
      if (selectedStatus) {
        dispatch(
          GetRequestProductAdminAction({
            page: 0,
            size: 20,
            status: [selectedStatus],
          })
        );
      } else {
        dispatch(
          GetRequestProductAdminAction({
            page: 0,
            size: 20,
            status: ["LOADING_ORDER", "WAITING_UNLOADING"],
          })
        );
      }
    }
  }, [updateData, updateData_2, updateProviderData, dispatch, selectedStatus]);

  const handleOpenDetail = (row: any) => {
    setSelectedRequest(row);
    setIsDetailModalOpen(true);
  };

  const handleEditDriver = (row: any) => {
    if (onRowClick) {
      onRowClick("showDriver", row);
    }
  };

  return (
    <CollectionControls
      title="درخواست های تحویل داده شده"
      hasBox={false}
      filterInitialValues={filterDefaultInitialValues}
      onFilter={handleFilterParameters}
      data={productAdminData}
      onMetaChange={handleFilter}
      onButtonClick={(button) => {
        if (onRowClick) {
          if (button === "create") {
            onRowClick("create");
          }
        }
      }}
    >
      <Table className="w-full" isLoading={false} shadow={false}>
        <OpenRequestTableHead />
        <TableBody>
          <OpenRequestTableFilterRow
            categoryLoading={categoryLoading}
            categoryOptions={categoryOptions}
            categoryFilter={categoryFilter}
            onCategoryChange={(value: any) => setCategoryFilter(value)}
            providersLoading={providersLoading}
            providerOptions={providerOptions}
            providerFilter={providerFilter}
            onProviderChange={(value: any) => setProviderFilter(value)}
            paymentTypeOptions={paymentTypeOptions}
            paymentTypeFilter={paymentTypeFilter}
            onPaymentTypeChange={(value: any) => setPaymentTypeFilter(value)}
          />
          {!loading ? (
            productAdminData?.data?.length > 0 ? (
              productAdminData?.data?.map((row: unknown) => (
                <OpenRequestTableDataRow
                  key={row?.id}
                  row={row}
                  onOpenDetail={handleOpenDetail}
                  onEditDriver={handleEditDriver}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="flex justify-center !py-4">
                  <EmptyImage />
                </TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell colSpan={10} className="flex justify-center !py-4">
                <TableSkeleton />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* مودال جزئیات درخواست */}
      <RequestDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedRequest(null);
        }}
        request={selectedRequest}
      />
    </CollectionControls>
  );
};
export default OpenRequest;
