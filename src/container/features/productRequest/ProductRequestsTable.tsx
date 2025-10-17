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
  selectGetProductRequestAdminData,
  selectGetProductRequestAdminLoading,
  selectUpdateProductRequestAdminData,
} from "../../../redux/slice/productRequestStatus/ProductStatusRequestSlice";
import { GetRequestProductAdminAction } from "../../../redux/actions/productRequestStatus/RequestProductStatus";

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

interface ProductRequestsTableProps {
  onRowClick?: (action: string, row: ProductRequestItem) => void;
  refreshTrigger?: number;
}

const ProductRequestsTable: React.FC<ProductRequestsTableProps> = (props) => {
  const { onRowClick, refreshTrigger } = props;

  const dispatch = useDispatch<AppDispatch>();

  const filterDefaultInitialValues = {
    Status: null,
  };

  const loading = useSelector(selectGetProductRequestAdminLoading);
  const requestData = useSelector(selectGetProductRequestAdminData);
  const updateRequestData = useSelector(selectUpdateProductRequestAdminData);

  useEffect(() => {
    dispatch(GetRequestProductAdminAction({ page: 1, size: 20 }));
  }, [dispatch]);

  const handleFilter = ({ filter, page, pageSize }: HandleFilterParams) => {
    dispatch(
      GetRequestProductAdminAction({
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
    if (updateRequestData?.status == 200) {
      dispatch(
        GetRequestProductAdminAction({
          page: 1,
          size: 20,
        })
      );
    }
  }, [updateRequestData, dispatch]);

  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      dispatch(GetRequestProductAdminAction({ page: 1, size: 20 }));
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

  const getAmountTypeText = (amountType: string) => {
    switch (amountType?.toUpperCase()) {
      case "KILOGRAM":
        return "کیلوگرم";
      case "TON":
        return "تن";
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

  const getRequestTypeText = (requestType: string) => {
    switch (requestType?.toUpperCase()) {
      case "NORMAL":
        return "عادی";
      case "URGENT":
        return "فوری";
      default:
        return requestType || "_";
    }
  };

  return (
    <CollectionControls
      buttons={[]}
      hasBox={false}
      filterInitialValues={filterDefaultInitialValues}
      onFilter={handleFilterParameters}
      data={requestData}
      onMetaChange={handleFilter}
    >
      <Table className="w-full" isLoading={false} shadow={false}>
        <TableHead className="w-full" isLoading={false} shadow={false}>
          <TableRow>
            <TableHeadCell>توضیحات</TableHeadCell>
            <TableHeadCell>مقدار</TableHeadCell>
            <TableHeadCell>نوع درخواست</TableHeadCell>
            <TableHeadCell>نوع پرداخت</TableHeadCell>
            <TableHeadCell>شهر</TableHeadCell>
            <TableHeadCell>استان</TableHeadCell>
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
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
          </TableRow>
          {!loading ? (
            requestData?.data?.length > 0 ? (
              requestData?.data?.map((row: ProductRequestItem) => (
                <TableRow key={row?.id}>
                  <TableCell>{row?.description ?? "_"}</TableCell>
                  <TableCell>
                    {row?.amount
                      ? `${row.amount} ${getAmountTypeText(row?.amountType)}`
                      : "_"}
                  </TableCell>
                  <TableCell>{getRequestTypeText(row?.requestType)}</TableCell>
                  <TableCell>{getPaymentTypeText(row?.paymentType)}</TableCell>
                  <TableCell>{row?.city ?? "_"}</TableCell>
                  <TableCell>{row?.province ?? "_"}</TableCell>
                  <TableCell>{formatDate(row?.createdAt)}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded text-sm bg-blue-100 text-blue-800">
                      {JSON.stringify(row?.status) || "_"}
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
                        type="button"
                        size="sm"
                        variant="warning"
                        onClick={() => onRowClick?.("edit", row)}
                      >
                        ویرایش
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="info"
                        onClick={() => onRowClick?.("providers", row)}
                      >
                        تامین‌کنندگان
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="error"
                        onClick={() => {
                          if (confirm("آیا از حذف این درخواست اطمینان دارید؟")) {
                            onRowClick?.("delete", row);
                          }
                        }}
                      >
                        حذف
                      </Button>
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

export default ProductRequestsTable;