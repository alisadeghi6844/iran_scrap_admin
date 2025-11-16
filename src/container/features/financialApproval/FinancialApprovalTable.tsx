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

  const filterDefaultInitialValues = {
    StatusSelect: "",
  };

  const loading = useSelector(selectGetProductRequestAdminLoading);
  const productAdminData = useSelector(selectGetProductRequestAdminData);
  const updateData = useSelector(
    selectUpdateRequestProductOfferSendToBuyerData
  );
  const updateData_2 = useSelector(selectUpdateProductRequestProviderAdminData);
  const verifyPaymentData = useSelector(selectVerifyPaymentData);

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
  }, [dispatch]);

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
            <TableHeadCell>دسته بندی</TableHeadCell>
            <TableHeadCell>توضیحات</TableHeadCell>
            <TableHeadCell> تامین کننده</TableHeadCell>
            <TableHeadCell>تاریخ ثبت درخواست</TableHeadCell>
            <TableHeadCell>آدرس</TableHeadCell>
            <TableHeadCell>نوع پرداخت</TableHeadCell>
            <TableHeadCell>مقدار درخواستی</TableHeadCell>
            <TableHeadCell className="min-w-[170px]">وضعیت</TableHeadCell>
            <TableHeadCell />
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
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
          </TableRow>
          {!loading ? (
            productAdminData?.data?.length > 0 ? (
              productAdminData?.data?.map((row: unknown) => (
                <TableRow key={row?.id}>
                  <TableCell>
                    {row?.user?.firstName
                      ? row?.user?.firstName + " " + row?.user?.lastName
                      : "_"}
                  </TableCell>
                  <TableCell>{row?.user?.mobile ?? "_"}</TableCell>
                  <TableCell>{row?.category?.name ?? "_"}</TableCell>
                  <TableCell>{row?.description ?? "_"}</TableCell>
                  <TableCell>
                    {row?.user?.firstName && row?.user?.lastName
                      ? `${row.user.firstName} ${row.user.lastName}`
                      : row?.user?.mobile ?? "_"}
                  </TableCell>
                  <TableCell>
                    {row?.createdAt ? convertToJalali(row?.createdAt) : "_"}
                  </TableCell>
                  <TableCell>{row?.province + " , " + row?.city}</TableCell>
                  <TableCell>
                    {row?.paymentType
                      ? row?.paymentType === "INSTALLMENTS"
                        ? "مدت دار"
                        : row?.paymentType === "CASH_AND_INSTALLMENTS"
                        ? "نقد و مدت دار"
                        : "نقد"
                      : "_"}
                  </TableCell>
                  <TableCell>
                    {row?.amount ? `${row?.amount} (کیلوگرم)` : "_"}
                  </TableCell>
                  <TableCell>{row?.statusTitle ?? "_"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        type="button"
                        variant="primary"
                        onClick={() => {
                          setSelectedRequest(row);
                          setIsDetailModalOpen(true);
                        }}
                      >
                        مشاهده درخواست
                      </Button>
                      {row?.status === "BUYER_WAITFORFINANCE" && (
                        <>
                          <Button
                            type="button"
                            size="sm"
                            variant="success"
                            onClick={() => {
                              onRowClick && onRowClick("approve", row);
                            }}
                          >
                            تایید
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="error"
                            onClick={() => {
                              onRowClick && onRowClick("reject", row);
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
