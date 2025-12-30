import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HandleFilterParams } from "../../../types/FilterParams";
import CollectionControls from "../../organism/CollectionControls";
import Table from "../../../components/table";
import TableHead from "../../../components/table/TableHead";
import TableHeadCell from "../../../components/table/TableHeadCell";
import TableRow from "../../../components/table/TableRow";
import TableBody from "../../../components/table/TableBody";
import TableFilterCell from "../../../components/table/TableFilterCell";
import TableCell from "../../../components/table/TableCell";
import Button from "../../../components/button";
import EmptyImage from "../../../components/image/EmptyImage";
import TableSkeleton from "../../organism/skeleton/TableSkeleton";
import {
  selectGetProductRequestAdminData,
  selectGetProductRequestAdminLoading,
  selectUpdateProductRequestProviderAdminData,
} from "../../../redux/slice/productRequestStatus/ProductStatusRequestSlice";
import { GetRequestProductAdminAction } from "../../../redux/actions/productRequestStatus/RequestProductStatus";
import { convertToJalali } from "../../../utils/MomentConvertor";
import { selectUpdateRequestProductOfferSendToBuyerData } from "../../../redux/slice/productRequestOffer/ProductStatusRequestSlice";
import RequestDetailModal from "../closeRequest/RequestDetailModal";
import { selectVerifyPaymentData } from "../../../redux/slice/product-request-offer-admin/ProductRequestOfferAdminSlice";
import SingleSelect from "../../../components/select/SingleSelect";
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
  orderStatusOptions,
  getOrderStatusText,
  getOrderStatusColor,
} from "../../../types/OrderStatus";
import FiltersRow from "./components/FinancialApprovalTable/FiltersRow";
import RequestRow from "./components/FinancialApprovalTable/RequestRow";

interface FinancialApprovalTableProps {
  onRowClick?: any;
  refreshTrigger?: number;
}

const FinancialApprovalTable: React.FC<FinancialApprovalTableProps> = (
  props
) => {
  const { onRowClick, refreshTrigger } = props;

  const dispatch: any = useDispatch();
  const [selectedRequest, setSelectedRequest] = useState<unknown>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

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
  const updateData = useSelector(
    selectUpdateRequestProductOfferSendToBuyerData
  );
  const updateData_2 = useSelector(selectUpdateProductRequestProviderAdminData);
  const verifyPaymentData = useSelector(selectVerifyPaymentData);
  const categoryData = useSelector(selectGetCategoryData);
  const categoryLoading = useSelector(selectGetCategoryLoading);
  const providersData = useSelector(selectGetUsersProvidersData);
  const providersLoading = useSelector(selectGetUsersProvidersLoading);

  // وضعیت‌های مربوط به تائید مالی
  const defaultStatuses = ["BUYER_WAITFORFINANCE", "BUYER_WAITFORFINANCE"];

  useEffect(() => {
    dispatch(
      GetRequestProductAdminAction({
        page: 0,
        size: 20,
        status: defaultStatuses,
      })
    );
    dispatch(GetCategoryAction({}));
    dispatch(GetUsersProvidersAction({ credentials: {} }));
  }, [dispatch]);

  // Trigger filtering when filter values change
  useEffect(() => {
    const filterData = {
      Category: categoryFilter,
      Provider: providerFilter,
      PaymentType: paymentTypeFilter,
      Status: statusFilter,
    };

    const filterString = handleFilterParameters(filterData);

    dispatch(
      GetRequestProductAdminAction({
        filter: filterString || undefined,
        page: 0,
        size: 20,
        status: defaultStatuses,
      })
    );
  }, [
    categoryFilter,
    providerFilter,
    paymentTypeFilter,
    statusFilter,
    dispatch,
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
    dispatch(
      GetRequestProductAdminAction({
        filter,
        page: page ?? 0,
        size: pageSize ?? 20,
        status: defaultStatuses,
      })
    );
  };

  useEffect(() => {
    if (updateData?.status === 200 || updateData_2?.id) {
      dispatch(
        GetRequestProductAdminAction({
          page: 0,
          size: 20,
          status: defaultStatuses,
        })
      );
    }
  }, [updateData, updateData_2, dispatch]);

  // Update table after verify payment (approve/reject)
  useEffect(() => {
    if (verifyPaymentData) {
      dispatch(
        GetRequestProductAdminAction({
          page: 0,
          size: 20,
          status: defaultStatuses,
        })
      );
    }
  }, [verifyPaymentData, dispatch]);

  // Update table when refreshTrigger changes
  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      dispatch(
        GetRequestProductAdminAction({
          page: 0,
          size: 20,
          status: defaultStatuses,
        })
      );
    }
  }, [refreshTrigger, dispatch]);

  return (
    <CollectionControls
      title="درخواست های در انتظار تائید مالی"
      hasBox={false}
      filterInitialValues={filterDefaultInitialValues}
      onFilter={handleFilterParameters}
      onMetaChange={handleFilter}
      data={productAdminData}
      onButtonClick={(button) => {
        if (onRowClick) {
          button === "create" && onRowClick("create");
        }
      }}
    >
      <Table className="w-full" isLoading={false} shadow={false}>
        <TableHead className="w-full" isLoading={false} shadow={false}>
          <TableRow>
            <TableHeadCell>نام درخواست کننده</TableHeadCell>
            <TableHeadCell>تلفن همراه درخواست کننده</TableHeadCell>
            <TableHeadCell className="min-w-[230px]">دسته بندی</TableHeadCell>
            <TableHeadCell>توضیحات</TableHeadCell>
            <TableHeadCell className="min-w-[230px]">
              {" "}
              تامین کننده
            </TableHeadCell>
            <TableHeadCell>تاریخ ثبت درخواست</TableHeadCell>
            <TableHeadCell>آدرس</TableHeadCell>
            <TableHeadCell className="min-w-[230px]">نوع پرداخت</TableHeadCell>
            <TableHeadCell>مقدار درخواستی</TableHeadCell>
            <TableHeadCell className="min-w-[170px]">وضعیت</TableHeadCell>
            <TableHeadCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <FiltersRow
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
            orderStatusOptions={orderStatusOptions}
            statusFilter={statusFilter}
            onStatusChange={(value: any) => setStatusFilter(value)}
          />
          {!loading ? (
            productAdminData?.data?.length > 0 ? (
              productAdminData?.data?.map((row: unknown) => (
                <RequestRow
                  key={row?.id}
                  row={row}
                  onViewRequest={() => {
                    setSelectedRequest(row);
                    setIsDetailModalOpen(true);
                  }}
                  onApprove={() => {
                    onRowClick && onRowClick("approve", row);
                  }}
                  onReject={() => {
                    onRowClick && onRowClick("reject", row);
                  }}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={11} className="flex justify-center !py-4">
                  <EmptyImage />
                </TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell colSpan={11} className="flex justify-center !py-4">
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

export default FinancialApprovalTable;
