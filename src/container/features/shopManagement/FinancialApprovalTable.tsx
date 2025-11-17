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
  OrderStatus,
  getOrderStatusText,
  getOrderStatusColor,
} from "../../../types/OrderStatus";
import { OrderItem } from "../../../types/OrderItem";
import CategoryFilterSelect from "../filters/CategoryFilterSelect";
import ProviderFilterSelect from "../filters/ProviderFilterSelect";
import { verifyPaymentService } from "../../../redux/service/order/OrderServices";
import { toast } from "react-toastify";

interface FinancialApprovalTableProps {
  refreshTrigger?: number;
  onRowClick?: (action: string, row: OrderItem) => void;
}

const FinancialApprovalTable: React.FC<FinancialApprovalTableProps> = ({
  refreshTrigger,
  onRowClick,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  // Filter states
  const [categoryFilter, setCategoryFilter] =
    useState<SelectOptionTypes | null>(null);
  const [providerFilter, setProviderFilter] =
    useState<SelectOptionTypes | null>(null);
  const [loadingActions, setLoadingActions] = useState<{
    [key: string]: boolean;
  }>({});

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
        filter: "status=BUYER_WAITFORFINANCE",
      })
    );
  }, [dispatch]);

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
    const { Category, Provider } = data as {
      Category?: SelectOptionTypes;
      Provider?: SelectOptionTypes;
    };
    let queryParam = "status=BUYER_WAITFORFINANCE"; // Always filter by BUYER_WAITFORFINANCE status (repeated)
    if (Category?.value) queryParam += ",categoryId=" + Category?.value;
    if (Provider?.value) queryParam += ",providerId=" + Provider?.value;

    return queryParam;
  };

  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      dispatch(
        GetOrderAdminAction({
          page: 0,
          size: 20,
          filter: "status=BUYER_WAITFORFINANCE",
        })
      );
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

  const handleApprovePayment = async (orderId: string) => {
    try {
      setLoadingActions((prev) => ({ ...prev, [`approve_${orderId}`]: true }));
      await verifyPaymentService(orderId, true, "تایید پرداخت توسط ادمین");
      toast.success("پرداخت با موفقیت تایید شد");

      // Refresh data
      dispatch(
        GetOrderAdminAction({
          page: 0,
          size: 20,
          filter: "status=BUYER_WAITFORFINANCE",
        })
      );
    } catch (error) {
      console.error("Error approving payment:", error);
    } finally {
      setLoadingActions((prev) => ({ ...prev, [`approve_${orderId}`]: false }));
    }
  };

  const handleRejectPayment = async (orderId: string) => {
    try {
      setLoadingActions((prev) => ({ ...prev, [`reject_${orderId}`]: true }));
      await verifyPaymentService(orderId, false, "رد پرداخت توسط ادمین");
      toast.success("پرداخت با موفقیت رد شد");

      // Refresh data
      dispatch(
        GetOrderAdminAction({
          page: 0,
          size: 20,
          filter: "status=BUYER_WAITFORFINANCE",
        })
      );
    } catch (error) {
      console.error("Error rejecting payment:", error);
    } finally {
      setLoadingActions((prev) => ({ ...prev, [`reject_${orderId}`]: false }));
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
              <CategoryFilterSelect
                value={categoryFilter}
                onChange={setCategoryFilter}
                noBorder
                isClearable
              />
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
            <TableFilterCell></TableFilterCell>
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
                          onRowClick?.("viewOrder", row);
                        }}
                      >
                        مشاهده سفارش
                      </Button>
                      {row?.status?.toLowerCase() ===
                        OrderStatus.BUYER_WAITFORFINANCE.toLowerCase() && (
                        <>
                          <Button
                            size="sm"
                            type="button"
                            variant="success"
                            onClick={() => handleApprovePayment(row.id)}
                            disabled={loadingActions[`approve_${row.id}`]}
                            isLoading={loadingActions[`approve_${row.id}`]}
                          >
                            تایید پرداخت
                          </Button>
                          <Button
                            size="sm"
                            type="button"
                            variant="error"
                            onClick={() => handleRejectPayment(row.id)}
                            disabled={loadingActions[`reject_${row.id}`]}
                            isLoading={loadingActions[`reject_${row.id}`]}
                          >
                            رد پرداخت
                          </Button>
                        </>
                      )}
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

export default FinancialApprovalTable;
