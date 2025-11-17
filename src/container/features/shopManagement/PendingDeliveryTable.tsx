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
import { SelectOptionTypes } from "../../../types/features/FeatureSelectTypes";
import {
  selectGetOrderAdminData,
  selectGetOrderAdminLoading,
} from "../../../redux/slice/order/orderSlice";
import { GetOrderAdminAction } from "../../../redux/actions/order/OrderActions";
import {
  getOrderStatusText,
  getOrderStatusColor,
} from "../../../types/OrderStatus";
import { OrderItem } from "../../../types/OrderItem";
import CategoryFilterSelect from "../filters/CategoryFilterSelect";
import ProviderFilterSelect from "../filters/ProviderFilterSelect";

interface PendingDeliveryTableProps {
  refreshTrigger?: number;
  onRowClick?: (action: string, row: OrderItem) => void;
}

const PendingDeliveryTable: React.FC<PendingDeliveryTableProps> = ({
  refreshTrigger,
  onRowClick,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  // Filter states
  const [categoryFilter, setCategoryFilter] =
    useState<SelectOptionTypes | null>(null);
  const [providerFilter, setProviderFilter] =
    useState<SelectOptionTypes | null>(null);

  const filterDefaultInitialValues = {
    Category: categoryFilter,
    Provider: providerFilter,
  };

  const loading = useSelector(selectGetOrderAdminLoading);
  const orderData = useSelector(selectGetOrderAdminData);

  useEffect(() => {
    dispatch(
      GetOrderAdminAction({
        page: 0,
        size: 20,
        filter: "status=WAITING_UNLOADING,status=WAITING_UNLOADING",
      })
    );
  }, [dispatch, refreshTrigger]);

  // Trigger filtering when filter values change
  useEffect(() => {
    const filterData = {
      Category: categoryFilter,
      Provider: providerFilter,
    };

    const filterString = handleFilterParameters(filterData);

    dispatch(
      GetOrderAdminAction({
        filter: filterString || undefined,
        page: 0,
        size: 20,
      })
    );
  }, [categoryFilter, providerFilter, dispatch]);

  const handleFilterParameters = (data: unknown) => {
    const { Category, Provider } = data as {
      Category?: SelectOptionTypes;
      Provider?: SelectOptionTypes;
    };
    let queryParam = "status=WAITING_UNLOADING,status=WAITING_UNLOADING";
    if (Category?.value) queryParam += ",categoryId=" + Category?.value;
    if (Provider?.value) queryParam += ",providerId=" + Provider?.value;

    return queryParam;
  };

  const handleFilterParams: HandleFilterParams = (data) => {
    const filterString = handleFilterParameters(data);
    if (filterString) {
      dispatch(
        GetOrderAdminAction({
          page: 0,
          size: 20,
          filter: filterString,
        })
      );
    } else {
      dispatch(
        GetOrderAdminAction({
          page: 0,
          size: 20,
          filter: "status=WAITING_UNLOADING,status=WAITING_UNLOADING",
        })
      );
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("fa-IR");
  };

  return (
    <div className="w-full">
      <CollectionControls
        filterDefaultInitialValues={filterDefaultInitialValues}
        onFilterSubmit={handleFilterParams}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>شناسه سفارش</TableHeadCell>
            <TableHeadCell>نام محصول</TableHeadCell>
            <TableHeadCell>دسته‌بندی</TableHeadCell>
            <TableHeadCell>تامین‌کننده</TableHeadCell>
            <TableHeadCell>مقدار</TableHeadCell>
            <TableHeadCell>قیمت نهایی</TableHeadCell>
            <TableHeadCell>وضعیت</TableHeadCell>
            <TableHeadCell>تاریخ ایجاد</TableHeadCell>
            <TableHeadCell>عملیات</TableHeadCell>
          </TableRow>
          <TableRow>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell>
              <CategoryFilterSelect
                value={categoryFilter}
                onChange={setCategoryFilter}
                noBorder
                isClearable
              />
            </TableFilterCell>
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
            <TableFilterCell></TableFilterCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableSkeleton />
          ) : orderData?.data?.data?.length > 0 ? (
            orderData.data.data.map((row: OrderItem, index: number) => (
              <TableRow key={row.id || index}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row?.product?.name ?? "_"}</TableCell>
                <TableCell>{row?.product?.category?.name ?? "_"}</TableCell>
                <TableCell>
                  {row?.provider?.firstName && row?.provider?.lastName
                    ? `${row.provider.firstName} ${row.provider.lastName}`
                    : row?.provider?.mobile ||
                      row?.provider?.companyName ||
                      "_"}
                </TableCell>
                <TableCell>
                  {row.quantity} {getInventoryUnit(row?.product?.inventoryType)}
                </TableCell>
                <TableCell>{formatPrice(row.finalPrice)} تومان</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      getOrderStatusColor(row.status) || "bg-gray-100"
                    }`}
                  >
                    {getOrderStatusText(row.status)}
                  </span>
                </TableCell>
                <TableCell>{formatDate(row.createdAt)}</TableCell>
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
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9}>
                <EmptyImage />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PendingDeliveryTable;