import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { HandleFilterParams } from "../../../types/FilterParams";
import { OrderItem } from "../../../types/OrderItem";
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
  selectGetOrderAdminData,
  selectGetOrderAdminLoading,
} from "../../../redux/slice/order/orderSlice";
import { GetOrderAdminAction } from "../../../redux/actions/order/OrderActions";
import {
  getOrderStatusText,
  getOrderStatusColor,
  orderStatusOptions,
} from "../../../types/OrderStatus";
import CategoryFilterSelect from "../filters/CategoryFilterSelect";
import ProviderFilterSelect from "../filters/ProviderFilterSelect";

interface RegisteredOrdersTableProps {
  refreshTrigger?: number;
  onRowClick?: (action: string, row: OrderItem) => void;
}

const RegisteredOrdersTable: React.FC<RegisteredOrdersTableProps> = ({
  refreshTrigger,
  onRowClick,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  // Filter states
  const [categoryFilter, setCategoryFilter] =
    useState<SelectOptionTypes | null>(null);
  const [providerFilter, setProviderFilter] =
    useState<SelectOptionTypes | null>(null);
  const [statusFilter, setStatusFilter] = useState<SelectOptionTypes | null>(
    null
  );

  const filterDefaultInitialValues = {
    Category: categoryFilter,
    Provider: providerFilter,
    Status: statusFilter,
  };

  const loading = useSelector(selectGetOrderAdminLoading);
  const orderData = useSelector(selectGetOrderAdminData);

  // Debounced fetch function
  const debouncedFetch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (filterString?: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          dispatch(
            GetOrderAdminAction({
              filter: filterString || undefined,
              page: 0,
              size: 20,
            })
          );
        }, 300); // 300ms debounce
      };
    })(),
    [dispatch]
  );

  useEffect(() => {
    dispatch(GetOrderAdminAction({ page: 0, size: 20 }));
  }, [dispatch]);

  // Trigger filtering when filter values change
  useEffect(() => {
    const filterData = {
      Category: categoryFilter,
      Provider: providerFilter,
      Status: statusFilter,
    };

    const filterString = handleFilterParameters(filterData);
    debouncedFetch(filterString);
  }, [categoryFilter, providerFilter, statusFilter, debouncedFetch]);

  const handleFilter = ({ filter, page, pageSize }: HandleFilterParams) => {
    dispatch(
      GetOrderAdminAction({
        filter,
        page: page ?? 1,
        size: pageSize ?? 20,
      })
    );
  };

  const handleFilterParameters = (data: unknown) => {
    const { Category, Provider, Status } = data as {
      Category?: SelectOptionTypes;
      Provider?: SelectOptionTypes;
      Status?: SelectOptionTypes;
    };
    let queryParam = "";
    if (Category?.value) queryParam += "categoryId=" + Category?.value + ",";
    if (Provider?.value) queryParam += "providerId=" + Provider?.value + ",";
    if (Status?.value) queryParam += "status=" + Status?.value + ",";

    return queryParam.substring(0, queryParam.length - 1);
  };

  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      dispatch(GetOrderAdminAction({ page: 0, size: 20 }));
    }
  }, [refreshTrigger, dispatch]);



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
      case "CREDIT":
        return "اعتباری";
      default:
        return paymentType || "_";
    }
  };

  const getInventoryUnit = (inventoryType: string) => {
    switch (inventoryType?.toUpperCase()) {
      case "KILOGRAM":
      case "KG":
        return "کیلوگرم";
      case "GRAM":
        return "گرم";
      case "LITER":
        return "لیتر";
      case "PIECE":
        return "عدد";
      default:
        return "";
    }
  };

  return (
    <CollectionControls
      buttons={[]}
      hasBox={false}
      filterInitialValues={filterDefaultInitialValues}
      onFilter={handleFilterParameters}
      data={orderData}
      onMetaChange={handleFilter}
    >
      <Table className="w-full" isLoading={false} shadow={false}>
        <TableHead className="w-full" isLoading={false} shadow={false}>
          <TableRow>
            <TableHeadCell>نام محصول</TableHeadCell>
            <TableHeadCell className="min-w-[200px]">دسته بندی</TableHeadCell>
            <TableHeadCell>تعداد</TableHeadCell>
            <TableHeadCell>قیمت واحد</TableHeadCell>
            <TableHeadCell>قیمت نهایی</TableHeadCell>
            <TableHeadCell className="min-w-[200px]">تامین کننده</TableHeadCell>
            <TableHeadCell>نوع پرداخت</TableHeadCell>
            <TableHeadCell>شهر</TableHeadCell>
            <TableHeadCell>تاریخ ایجاد</TableHeadCell>
            <TableHeadCell>تاریخ تخلیه</TableHeadCell>
            <TableHeadCell className="min-w-[180px]">وضعیت</TableHeadCell>
            <TableHeadCell>عملیات</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell>
      
            </TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell>
              <ProviderFilterSelect
                value={providerFilter}
                onChange={setProviderFilter}
                noBorder
                isClearable
              />
            </TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell>
              <SingleSelect
                label=""
                options={orderStatusOptions}
                onChange={setStatusFilter}
                value={statusFilter}
                placeholder="انتخاب وضعیت..."
                noBorder
                isClearable
              />
            </TableFilterCell>
            <TableFilterCell></TableFilterCell>
          </TableRow>
          {!loading ? (
            orderData?.data?.length > 0 ? (
              orderData?.data?.map((row: OrderItem) => (
                <TableRow key={row?.id}>
                  <TableCell>{row?.product?.name ?? "_"}</TableCell>
                  <TableCell>{row?.category?.name ?? "_"}</TableCell>
                  <TableCell>
                    {row?.quantity
                      ? `${row.quantity} ${getInventoryUnit(
                          row?.product?.inventoryType
                        )}`
                      : "_"}
                  </TableCell>
                  <TableCell>
                    {row?.price ? `${row.price.toLocaleString()} تومان` : "_"}
                  </TableCell>
                  <TableCell>
                    {row?.finalPrice
                      ? `${row.finalPrice.toLocaleString()} تومان`
                      : "_"}
                  </TableCell>
                  <TableCell>
                    {typeof row?.providerId === "object" &&
                    row?.providerId?.firstName &&
                    row?.providerId?.lastName
                      ? `${row.providerId.firstName} ${row.providerId.lastName}`
                      : typeof row?.providerId === "object" &&
                        (row?.providerId?.mobile ||
                          row?.providerId?.companyName)
                      ? row?.providerId?.mobile || row?.providerId?.companyName
                      : row?.provider?.firstName && row?.provider?.lastName
                      ? `${row.provider.firstName} ${row.provider.lastName}`
                      : row?.provider?.mobile ||
                        row?.provider?.companyName ||
                        "_"}
                  </TableCell>
                  <TableCell>{getPaymentTypeText(row?.paymentType)}</TableCell>
                  <TableCell>{row?.city ?? "_"}</TableCell>
                  <TableCell>{formatDate(row?.createdAt)}</TableCell>
                  <TableCell>
                    {row?.unloadingDate
                      ? new Date(row.unloadingDate).toLocaleDateString("fa-IR")
                      : "_"}
                  </TableCell>
                  <TableCell>
                    <span className={getOrderStatusColor(row?.status)}>
                      {getOrderStatusText(row?.status)}
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
                        مشاهده سفارش
                      </Button>
                      <Button
                        size="sm"
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          onRowClick?.("editOrder", row);
                        }}
                      >
                        ویرایش سفارش
                      </Button>
                      {/* <Button
                        size="sm"
                        type="button"
                        variant="warning"
                        onClick={() => {
                          // Handle status change
                          console.log("Change status for order:", row?.id);
                        }}
                      >
                        تغییر وضعیت
                      </Button> */}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={12} className="flex justify-center !py-4">
                  <EmptyImage />
                </TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell colSpan={12} className="flex justify-center !py-4">
                <TableSkeleton />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CollectionControls>
  );
};

export default RegisteredOrdersTable;
