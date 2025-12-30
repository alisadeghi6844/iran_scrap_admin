import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { HandleFilterParams } from "../../../types/FilterParams";
import CollectionControls from "../../organism/CollectionControls";
import Table from "../../../components/table";
import TableHead from "../../../components/table/TableHead";
import TableHeadCell from "../../../components/table/TableHeadCell";
import TableRow from "../../../components/table/TableRow";
import TableBody from "../../../components/table/TableBody";
import TableFilterCell from "../../../components/table/TableFilterCell";
import TableCell from "../../../components/table/TableCell";
import EmptyImage from "../../../components/image/EmptyImage";
import TableSkeleton from "../../organism/skeleton/TableSkeleton";
import Button from "../../../components/button";

import SingleSelect from "../../../components/select/SingleSelect";
import { SelectOptionTypes } from "../../../types/features/FeatureSelectTypes";
import {
  ProductRequestItem,
  ProductRequestsTableFilterData,
  ProductRequestsTableProps,
} from "./ProductRequestsTable.types";
import {
  formatDate,
  getAmountTypeText,
  getPaymentTypeText,
  getStatusDisplay,
  paymentTypeOptions,
  statusOptions,
} from "./ProductRequestsTable.utils";

import {
  selectGetProductRequestOfferAdminData,
  selectGetProductRequestOfferAdminLoading,
} from "../../../redux/slice/product-request-offer-admin/ProductRequestOfferAdminSlice";
import { GetProductRequestOfferAdminAction } from "../../../redux/actions/product-request-offer-admin/ProductRequestOfferAdminActions";
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

const ProductRequestsTable: React.FC<ProductRequestsTableProps> = (props) => {
  const { onRowClick, refreshTrigger } = props;

  const dispatch = useDispatch<AppDispatch>();

  // Filter states
  const [statusFilter, setStatusFilter] = useState<SelectOptionTypes | null>(
    null
  );
  const [categoryFilter, setCategoryFilter] =
    useState<SelectOptionTypes | null>(null);
  const [paymentTypeFilter, setPaymentTypeFilter] =
    useState<SelectOptionTypes | null>(null);
  const [providerFilter, setProviderFilter] =
    useState<SelectOptionTypes | null>(null);

  const getFilterInitialValues = () => ({
    Status: statusFilter,
    Category: categoryFilter,
    PaymentType: paymentTypeFilter,
    Provider: providerFilter,
  });

  const loading = useSelector(selectGetProductRequestOfferAdminLoading);
  const requestData = useSelector(selectGetProductRequestOfferAdminData);
  const categoryData = useSelector(selectGetCategoryData);
  const categoryLoading = useSelector(selectGetCategoryLoading);
  const providersData = useSelector(selectGetUsersProvidersData);
  const providersLoading = useSelector(selectGetUsersProvidersLoading);

  useEffect(() => {
    dispatch(GetProductRequestOfferAdminAction({ page: 0, size: 20 }));
    dispatch(GetCategoryAction({}));
    dispatch(GetUsersProvidersAction({ credentials: {} }));
  }, [dispatch]);

  // Trigger filtering when filter values change
  useEffect(() => {
    const filterData = {
      Status: statusFilter,
      Category: categoryFilter,
      PaymentType: paymentTypeFilter,
      Provider: providerFilter,
    };

    const filterString = handleFilterParameters(filterData);

    dispatch(
      GetProductRequestOfferAdminAction({
        filter: filterString || undefined,
        page: 0,
        size: 20,
      })
    );
  }, [
    statusFilter,
    categoryFilter,
    paymentTypeFilter,
    providerFilter,
    dispatch,
  ]);

  const handleFilter = ({ filter, page, pageSize }: HandleFilterParams) => {
    dispatch(
      GetProductRequestOfferAdminAction({
        filter,
        page: page ?? 0,
        size: pageSize ?? 20,
      })
    );
  };

  const handleFilterParameters = (data: unknown) => {
    const { Status, Category, PaymentType, Provider } =
      data as ProductRequestsTableFilterData;
    let queryParam = "";
    if (Status?.value) queryParam += "status=" + Status?.value + ",";
    if (Category?.value) queryParam += "categoryId=" + Category?.value + ",";
    if (PaymentType?.value)
      queryParam += "paymentType=" + PaymentType?.value + ",";
    if (Provider?.value) queryParam += "providerId=" + Provider?.value + ",";

    return queryParam.substring(0, queryParam.length - 1);
  };

  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      const filterData = {
        Status: statusFilter,
        Category: categoryFilter,
        PaymentType: paymentTypeFilter,
        Provider: providerFilter,
      };
      const filterString = handleFilterParameters(filterData);

      dispatch(
        GetProductRequestOfferAdminAction({
          filter: filterString || undefined,
          page: 0,
          size: 20,
        })
      );
    }
  }, [
    refreshTrigger,
    dispatch,
    statusFilter,
    categoryFilter,
    paymentTypeFilter,
    providerFilter,
  ]);

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
      .map((user: unknown) => ({
        value: user.id,
        label:
          user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.mobile || user.companyName || "نامشخص",
      }));
  }, [providersData]);

  // Filter change handlers
  const handleStatusFilterChange = (value: SelectOptionTypes | null) => {
    setStatusFilter(value);
  };

  const handleCategoryFilterChange = (value: SelectOptionTypes | null) => {
    setCategoryFilter(value);
  };

  const handlePaymentTypeFilterChange = (value: SelectOptionTypes | null) => {
    setPaymentTypeFilter(value);
  };

  const handleProviderFilterChange = (value: SelectOptionTypes | null) => {
    setProviderFilter(value);
  };



  return (
    <CollectionControls
      buttons={[]}
      hasBox={false}
      filterInitialValues={getFilterInitialValues()}
      onFilter={handleFilterParameters}
      data={requestData}
      onMetaChange={handleFilter}
    >
      <Table className="w-full" isLoading={false} shadow={false}>
        <TableHead className="w-full" isLoading={false} shadow={false}>
          <TableRow>
            <TableHeadCell>توضیحات</TableHeadCell>
            <TableHeadCell>دسته‌بندی</TableHeadCell>
            <TableHeadCell>مقدار</TableHeadCell>
            <TableHeadCell>نوع پرداخت</TableHeadCell>

            <TableHeadCell>تامین‌کننده</TableHeadCell>
            <TableHeadCell>تاریخ تحویل</TableHeadCell>
            <TableHeadCell className="min-w-[180px]">وضعیت</TableHeadCell>
            <TableHeadCell>عملیات</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell>
              <SingleSelect
                isLoading={categoryLoading}
                options={categoryOptions}
                onChange={handleCategoryFilterChange}
                value={categoryFilter}
                placeholder="انتخاب دسته‌بندی..."
                noBorder
                isClearable
              />
            </TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell>
              <SingleSelect
                isLoading={false}
                options={paymentTypeOptions}
                onChange={handlePaymentTypeFilterChange}
                value={paymentTypeFilter}
                placeholder="انتخاب نوع پرداخت..."
                noBorder
                isClearable
              />
            </TableFilterCell>
            <TableFilterCell>
              <SingleSelect
                isLoading={providersLoading}
                options={providerOptions}
                onChange={handleProviderFilterChange}
                value={providerFilter}
                placeholder="انتخاب تامین‌کننده..."
                noBorder
                isClearable
              />
            </TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell>
              <SingleSelect
                isLoading={false}
                options={statusOptions}
                onChange={handleStatusFilterChange}
                value={statusFilter}
                placeholder="انتخاب وضعیت..."
                noBorder
                isClearable
              />
            </TableFilterCell>
            <TableFilterCell></TableFilterCell>
          </TableRow>
          {!loading ? (
            requestData?.data?.length > 0 ? (
              requestData?.data?.map((row: ProductRequestItem) => (
                <TableRow key={row?._id || row?.id}>
                  <TableCell>{row?.description ?? "_"}</TableCell>
                  <TableCell>{row?.category?.name ?? "_"}</TableCell>
                  <TableCell>
                    {row?.amount
                      ? `${row.amount} ${getAmountTypeText(row?.amountType)}`
                      : "_"}
                  </TableCell>
                  <TableCell>{getPaymentTypeText(row?.paymentType)}</TableCell>

                  <TableCell>
                    {row?.user?.firstName && row?.user?.lastName
                      ? `${row.user.firstName} ${row.user.lastName}`
                      : row?.user?.mobile ?? "_"}
                  </TableCell>
                  <TableCell>{formatDate(row?.expectedDate)}</TableCell>
                  <TableCell>
                    <span className={getStatusDisplay(row).className}>
                      {getStatusDisplay(row).text}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        type="button"
                        variant="primary"
                        onClick={() => {
                          onRowClick?.("viewMore", row);
                        }}
                      >
                        مشاهده بیشتر
                      </Button>
                      <Button
                        size="sm"
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          onRowClick?.("editRequest", row);
                        }}
                      >
                        ویرایش درخواست
                      </Button>
                      {/* <Button
                        type="button"
                        size="sm"
                        variant="success"
                        onClick={() => onRowClick?.("viewSuggestions", row)}
                      >
                        مشاهده پیشنهاد
                      </Button> */}
                      {row?.status === "BUYER_WAITFORFINANCE" &&
                        row?.paymentType?.toUpperCase() === "INSTALLMENTS" && (
                          <>
                            <Button
                              type="button"
                              size="sm"
                              variant="success"
                              onClick={() => onRowClick?.("approve", row)}
                            >
                              تایید
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              variant="error"
                              onClick={() => onRowClick?.("reject", row)}
                            >
                              رد
                            </Button>
                          </>
                        )}
                      {row?.status === "WAITING_UNLOADING" && (
                        <Button
                          type="button"
                          size="sm"
                          variant="warning"
                          onClick={() => onRowClick?.("delivery", row)}
                        >
                          تحویل داده شده
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colspan="10" className="flex justify-center !py-4">
                  <EmptyImage />
                </TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell colspan="10" className="flex justify-center !py-4">
                <TableSkeleton />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CollectionControls>
  );
};

export default ProductRequestsTable;
