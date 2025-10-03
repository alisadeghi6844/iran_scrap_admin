import React, { useEffect } from "react";
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
  selectGetOrderAdminData,
  selectGetOrderAdminLoading,
  selectVerifyPaymentData,
} from "../../../redux/slice/order/orderSlice";
import { GetOrderAdminAction } from "../../../redux/actions/order/OrderActions";
import StatusSelect from "./StatusSelect";
import { OrderStatus, getOrderStatusText, getOrderStatusColor } from "../../../types/OrderStatus";

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
  cheques?: Array<{
    date: string;
    bank: string;
    no: string;
    sayyad: string;
  }>;
  shippings: {
    digifarm: number;
    provider: number;
  };
  shippingPrice: number;
}

interface PendingOrdersTypes {
  onRowClick?: (action: string, row: OrderItem) => void;
  refreshTrigger?: number;
}

const PendingOrdersTable: React.FC<PendingOrdersTypes> = (props) => {
  const { onRowClick, refreshTrigger } = props;

  const dispatch = useDispatch<AppDispatch>();

  const filterDefaultInitialValues = {
    Status: null,
  };

  const loading = useSelector(selectGetOrderAdminLoading);
  const orderData = useSelector(selectGetOrderAdminData);
  const verifyPaymentData = useSelector(selectVerifyPaymentData);

  useEffect(() => {
    dispatch(GetOrderAdminAction({ page: 1, size: 20 }));
  }, [dispatch]);

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
    const { Status } = data as {
      Status?: { label: string; value: string };
    };
    let queryParam = "";
    if (Status?.value) queryParam += "status=" + Status?.value + ",";

    return queryParam.substring(0, queryParam.length - 1);
  };

  useEffect(() => {
    if (verifyPaymentData?.status == 200) {
      dispatch(
        GetOrderAdminAction({
          page: 1,
          size: 20,
        })
      );
    }
  }, [verifyPaymentData, dispatch]);

  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      dispatch(GetOrderAdminAction({ page: 1, size: 20 }));
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
        return "اقساطی";
      case "CREDIT":
        return "اعتباری";
      default:
        return paymentType || "_";
    }
  };

  const getInventoryUnit = (inventoryType: string) => {
    switch (inventoryType?.toUpperCase()) {
      case "TON":
        return "تن";
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
            <TableHeadCell>تعداد</TableHeadCell>
            <TableHeadCell>قیمت واحد</TableHeadCell>
            <TableHeadCell>قیمت نهایی</TableHeadCell>
            <TableHeadCell>نوع پرداخت</TableHeadCell>
            <TableHeadCell>شهر</TableHeadCell>
            <TableHeadCell>تاریخ ایجاد</TableHeadCell>
            <TableHeadCell className="min-w-[180px]">وضعیت</TableHeadCell>
            <TableHeadCell>عملیات</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell>
              <StatusSelect name="Status" noBorder label="" />
            </TableFilterCell>
            <TableFilterCell></TableFilterCell>
          </TableRow>
          {!loading ? (
            orderData?.data?.length > 0 ? (
              orderData?.data?.map((row: OrderItem) => (
                <TableRow key={row?.id}>
                  <TableCell>{row?.product?.name ?? "_"}</TableCell>
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
                  <TableCell>{getPaymentTypeText(row?.paymentType)}</TableCell>
                  <TableCell>{row?.city ?? "_"}</TableCell>
                  <TableCell>{formatDate(row?.createdAt)}</TableCell>
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
                        مشاهده بیشتر
                      </Button>
                      {(row?.status?.toLowerCase() === OrderStatus.Payed.toLowerCase() ||
                        row?.status?.toLowerCase() === OrderStatus.PaymentDeclined.toLowerCase()) && (
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
                            onClick={() => {
                              onRowClick?.("reject", row);
                            }}
                          >
                            رد
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colspan="9" className="flex justify-center !py-4">
                  <EmptyImage />
                </TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell colspan="9" className="flex justify-center !py-4">
                <TableSkeleton />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CollectionControls>
  );
};

export default PendingOrdersTable;
