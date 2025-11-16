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
import RequestDetailModal from "./RequestDetailModal";

interface ProductRequestAdminTypes {
  onRowClick?: any;
}

const CloseRequest: React.FC<ProductRequestAdminTypes> = (props) => {
  const { onRowClick } = props;

  const dispatch: any = useDispatch();

  const filterDefaultInitialValues = {
    StatusSelect: "",
  };

  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const loading = useSelector(selectGetProductRequestAdminLoading);
  const productAdminData = useSelector(selectGetProductRequestAdminData);
  const updateData = useSelector(
    selectUpdateRequestProductOfferSendToBuyerData
  );

  const updateData_2 = useSelector(selectUpdateProductRequestProviderAdminData);

  // تعریف آرایه وضعیت‌های پیش‌فرض برای جلوگیری از تکرار
  const defaultStatuses = [
    "SEND_FINAL_OFFER_TO_BUYER",
    "SEND_FINAL_OFFER_TO_BUYER",
  ];

  useEffect(() => {
    dispatch(
      GetRequestProductAdminAction({
        page: 0,
        size: 20,
        status: selectedStatus ? [selectedStatus?.value] : defaultStatuses,
      })
    );
  }, [selectedStatus, dispatch]);

  const handleFilter = ({ filter, page, pageSize }: HandleFilterParams) => {
    console.log("search ", filter, page, pageSize);
    dispatch(
      GetRequestProductAdminAction({
        filter,
        page: page ?? 0,
        size: pageSize ?? 20,
        status: selectedStatus ? [selectedStatus?.value] : defaultStatuses,
      })
    );
  };

  useEffect(() => {
    console.log("updateData_2", updateData_2);
    if (updateData?.status === 200 || updateData_2?.id) {
      dispatch(
        GetRequestProductAdminAction({
          page: 0,
          size: 20,
          status: selectedStatus ? [selectedStatus?.value] : defaultStatuses,
        })
      );
    }
  }, [updateData, updateData_2, dispatch, selectedStatus]);

  return (
    <CollectionControls
      title="درخواست های  دارای پیشنهاد"
      hasBox={false}
      filterInitialValues={filterDefaultInitialValues}
      onMetaChange={handleFilter}
      data={productAdminData}
      onButtonClick={(button) => {
        if (!!onRowClick) {
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

            <TableFilterCell>
              {/* <StatusSelect
                codes={defaultStatuses}
                name="StatusSelect"
                label=""
                noBorder
                value={selectedStatus}
                onChange={(status: any) => setSelectedStatus(status)}
              /> */}
            </TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
          </TableRow>
          {!loading ? (
            productAdminData?.data?.length > 0 ? (
              productAdminData?.data?.map((row: any) => (
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
                  {/* <TableCell className="flex justify-center">
                    <Button
                      type="button"
                      onClick={() => {
                        onRowClick && onRowClick("detail", row);
                      }}
                      variant="outline-warning"
                    >
                      تغییر وضعیت
                    </Button>
                  </TableCell> */}
                  <TableCell className="flex justify-center gap-2">
                    <Button
                      onClick={() => {
                        setSelectedRequest(row);
                        setIsDetailModalOpen(true);
                      }}
                      variant="outline-primary"
                    >
                      مشاهده درخواست
                    </Button>
                    {/* <Button
                      onClick={() => {
                        onRowClick && onRowClick("update", row);
                      }}
                      variant="outline-success"
                      size="sm"
                    >
                      پیشنهادات
                    </Button> */}
                  </TableCell>
                  {/* {row?.status === "SEND_FINAL_OFFER_TO_BUYER" && (
                    <TableCell className="flex justify-center">
                      <Button
                        onClick={() => {
                          onRowClick && onRowClick("payment", row);
                        }}
                        variant="outline-success"
                      >
                        پرداخت هزینه
                      </Button>
                    </TableCell>
                  )} */}
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

export default CloseRequest;
