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

import { selectUpdateRequestProductOfferSendToBuyerData } from "../../../redux/slice/productRequestOffer/ProductStatusRequestSlice";
import StatusSelect from "../status/StatusSelect";
import RequestDetailModal from "../closeRequest/RequestDetailModal";

interface ProductRequestAdminTypes {
  onRowClick?: any;
}

const OpenRequest: React.FC<ProductRequestAdminTypes> = (props) => {
  const { onRowClick } = props;
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const dispatch: any = useDispatch();

  const filterDefaultInitialValues = {
    FoodName: "",
    Category: null,
    Restaurant: null,
  };

  const loading = useSelector(selectGetProductRequestAdminLoading);
  const productAdminData = useSelector(selectGetProductRequestAdminData);
  const updateProviderData = useSelector(
    selectUpdateProductRequestProviderAdminData
  );
  const updateData = useSelector(
    selectUpdateRequestProductOfferSendToBuyerData
  );
  const updateData_2 = useSelector(selectUpdateProductRequestProviderAdminData);

  useEffect(() => {
    if (selectedStatus) {
      dispatch(
        GetRequestProductAdminAction({
          page: 0,
          size: 20,
          status: [selectedStatus],
        })
      );
    } else {
      dispatch(
        GetRequestProductAdminAction({
          page: 0,
          size: 20,
          status: ["LOADING_ORDER", "WAITING_UNLOADING"],
        })
      );
    }
  }, [selectedStatus, dispatch]);

  const handleFilter = ({ filter, page, pageSize }: HandleFilterParams) => {
    if (selectedStatus) {
      dispatch(
        GetRequestProductAdminAction({
          filter,
          page: page ?? 0,
          size: pageSize ?? 20,
          status: [selectedStatus],
        })
      );
    } else {
      dispatch(
        GetRequestProductAdminAction({
          filter,
          page: page ?? 0,
          size: pageSize ?? 20,
          status: ["LOADING_ORDER", "WAITING_UNLOADING"],
        })
      );
    }
  };

  useEffect(() => {
    if (
      updateData?.status == 200 ||
      updateData_2?.status == 200 ||
      updateProviderData?.status?.id
    ) {
      if (selectedStatus) {
        dispatch(
          GetRequestProductAdminAction({
            page: 0,
            size: 20,
            status: [selectedStatus],
          })
        );
      } else {
        dispatch(
          GetRequestProductAdminAction({
            page: 0,
            size: 20,
            status: ["LOADING_ORDER", "WAITING_UNLOADING"],
          })
        );
      }
    }
  }, [updateData, updateData_2, updateProviderData, dispatch, selectedStatus]);

  return (
    <CollectionControls
      title="درخواست های تحویل داده شده"
      hasBox={false}
      filterInitialValues={filterDefaultInitialValues}
      data={productAdminData}
      onMetaChange={handleFilter}
      onButtonClick={(button) => {
        if (onRowClick) {
          if (button === "create") {
            onRowClick("create");
          }
        }
      }}
    >
      <Table className="w-full" isLoading={false} shadow={false}>
        <TableHead className="w-full" isLoading={false} shadow={false}>
          <TableRow>
            <TableHeadCell>نام درخواست کننده</TableHeadCell>
            <TableHeadCell>دسته بندی</TableHeadCell>
            <TableHeadCell>تلفن همراه درخواست کننده</TableHeadCell>
            <TableHeadCell>توضیحات</TableHeadCell>
            <TableHeadCell>آدرس</TableHeadCell>
            <TableHeadCell>مقدار درخواست</TableHeadCell>
            <TableHeadCell>نوع پرداخت</TableHeadCell>
            <TableHeadCell className="min-w-[170px]">وضعیت</TableHeadCell>
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
            productAdminData?.data?.length > 0 ? (
              productAdminData?.data?.map((row: unknown) => (
                <TableRow key={row?.id}>
                  <TableCell>
                    {row?.user?.firstName
                      ? row?.user?.firstName + " " + row?.user?.lastName
                      : "_"}
                  </TableCell>
                  <TableCell>{row?.category?.name ?? "_"}</TableCell>
                  <TableCell>{row?.user?.mobile ?? "_"}</TableCell>
                  <TableCell>{row?.description ?? "_"}</TableCell>
                  <TableCell>{row?.province + " , " + row?.city}</TableCell>
                  <TableCell>
                    {row?.amount ? `${row?.amount} (کیلوگرم)` : "_"}
                  </TableCell>
                  <TableCell>
                    {row?.paymentType
                      ? row?.paymentType === "INSTALLMENTS"
                        ? "مدت دار"
                        : row?.paymentType === "CASH_AND_INSTALLMENTS"
                        ? "نقد و مدت دار"
                        : "نقد"
                      : "_"}
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
                      <Button
                        size="sm"
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          if (onRowClick) {
                            onRowClick("showDriver", row);
                          }
                        }}
                      >
                        ویرایش اطلاعات راننده
                      </Button>
                   
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="flex justify-center !py-4">
                  <EmptyImage />
                </TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="flex justify-center !py-4">
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
export default OpenRequest;
