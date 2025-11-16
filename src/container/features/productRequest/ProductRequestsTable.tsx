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
import {
  getOrderStatusText,
  getOrderStatusColor,
} from "../../../types/OrderStatus";
import SingleSelect from "../../../components/select/SingleSelect";
import { SelectOptionTypes } from "../../../types/features/FeatureSelectTypes";

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

interface ProductRequestItem {
  _id: string;
  id?: string;
  address: string;
  amount: number;
  amountType: string;
  category: {
    _id: string;
    name: string;
    code: string;
    image: string;
  };
  catRoute: string;
  categoryId: {
    id: string;
    name: string;
    code: string;
    isLast: boolean;
    catRoute: string;
    createdAt: number;
    image: string;
    parentId: string;
    updatedAt: number;
  };
  city: string;
  createdAt: number;
  description: string;
  expectedDate: number;
  expireDate: number;
  installmentMonths: number;
  invoiceId?: {
    id: string;
    offerId: string;
    code: string;
    cheques: Array<{
      date: string;
      bank: string;
      no: string;
      sayyad: string;
    }>;
    comments: string[];
    createdAt: number;
    finalPrice: number;
    payingPrice: number;
    paymentType: string;
    price: number;
    selectedShipping: string;
    shippingPrice: number;
    totalprice: number;
    updatedAt: number;
  };
  paymentType: string;
  postalCode: string;
  providerIds: Array<{
    id: string;
    mobile: string;
    phone?: string;
    companyName?: string;
    agentName?: string;
    agentPhone?: string;
    firstName?: string;
    lastName?: string;
  }>;
  province: string;
  requestType: string;
  status: string;
  statusTitle: string;
  updatedAt: number;
  user: {
    id: string;
    mobile: string;
    firstName: string;
    lastName: string;
    authCode: string;
    authCodeExpireTime: number;
    createdAt: number;
    extraImages: unknown[];
    isWelcomeComplete: boolean;
    lastLoginAt: number;
    permissions: unknown[];
    productCategories: string[];
    roles: string[];
    updatedAt: number;
    updatedBy: string;
    updatedFields: string;
    userSort: string;
    usertype: string;
  };
  userId: {
    id: string;
    mobile: string;
    firstName: string;
    lastName: string;
    authCode: string;
    authCodeExpireTime: number;
    createdAt: number;
    extraImages: unknown[];
    isWelcomeComplete: boolean;
    lastLoginAt: number;
    permissions: unknown[];
    productCategories: string[];
    roles: string[];
    updatedAt: number;
    updatedBy: string;
    updatedFields: string;
    userSort: string;
    usertype: string;
  };
  winner?: {
    id: string;
    requestId: string;
    [key: string]: unknown;
  };
  winnerId?: string;
  __v: number;
}

interface ProductRequestsTableProps {
  onRowClick?: (action: string, row: ProductRequestItem) => void;
  refreshTrigger?: number;
}

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
    const { Status, Category, PaymentType, Provider } = data as {
      Status?: SelectOptionTypes;
      Category?: SelectOptionTypes;
      PaymentType?: SelectOptionTypes;
      Provider?: SelectOptionTypes;
    };
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

  const formatDate = (timestamp: number) => {
    if (!timestamp) return "_";
    const date = new Date(timestamp);
    return date.toLocaleDateString("fa-IR");
  };

  const getPaymentTypeText = (paymentType: string) => {
    switch (paymentType?.toUpperCase()) {
      case "CASH":
        return "نقدی";
      case "INSTALLMENTS":
        return "مدت دار";
      case "CASH_AND_INSTALLMENTS":
        return "نقدی و مدت دار";
      default:
        return paymentType || "_";
    }
  };

  const getAmountTypeText = (amountType: string) => {
    switch (amountType?.toUpperCase()) {
      case "KILOGRAM":
        return "کیلوگرم";
      case "GRAM":
        return "گرم";
      case "LITER":
        return "لیتر";
      case "PIECE":
        return "عدد";
      default:
        return amountType || "_";
    }
  };

  // Options for filters
  const statusOptions = [
    { value: "PENDING", label: "در انتظار" },
    { value: "APPROVED", label: "تایید شده" },
    { value: "REJECTED", label: "رد شده" },
    { value: "COMPLETED", label: "تکمیل شده" },
    { value: "BUYER_WAITFORFINANCE", label: "در انتظار تایید مالی" },
    { value: "WAITING_UNLOADING", label: "در انتظار تخلیه" },
  ];

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

  const getStatusDisplay = (row: ProductRequestItem) => {
    let statusText;
    let statusValue;

    if (row?.statusTitle) {
      statusValue = row.status || "";
      statusText = row.statusTitle;
    } else if (row?.status) {
      statusValue = row.status;
      statusText = getOrderStatusText(statusValue);
    } else {
      statusValue = "";
      statusText = "_";
    }

    const colorClass = getOrderStatusColor(statusValue);

    return {
      text: statusText,
      className: `px-2 py-1 rounded text-sm bg-opacity-20 ${colorClass
        .replace("text-", "bg-")
        .replace("-600", "-100")
        .replace("-500", "-100")
        .replace("-700", "-100")
        .replace("-800", "-100")} ${colorClass}`,
    };
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
