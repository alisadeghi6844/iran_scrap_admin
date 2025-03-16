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
import StatusSelect from "../status/StatusSelect";

interface ProductRequestAdminTypes {
  onRowClick?: any;
}

const OpenRequest: React.FC<ProductRequestAdminTypes> = (props) => {
  const { onRowClick } = props;
  const [selectedStatus, setSelectedStatus] = useState("");
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
          status: selectedStatus
            ? [selectedStatus?.value]
            : ["REGISTERED", "BUYER_CANCELLATION", "RETURN_TO_BUYER_REQUEST"],
        })
      );
    } else {
      dispatch(
        GetRequestProductAdminAction({
          page: 0,
          size: 20,
          status:["REGISTERED", "BUYER_CANCELLATION", "RETURN_TO_BUYER_REQUEST"]
        })
      );
    }
  }, [selectedStatus]);

  const handleFilter = ({
    filter,
    page,
    pageSize,
  }: HandleFilterParams) => {
    if (selectedStatus) {
      dispatch(
        GetRequestProductAdminAction({
          filter,
          page: page ?? 0,
          size: pageSize??20,
          status: selectedStatus
            ? [selectedStatus?.value]
            : ["REGISTERED", "BUYER_CANCELLATION", "RETURN_TO_BUYER_REQUEST"],
        })
      );
    } else {
      dispatch(
        GetRequestProductAdminAction({
          filter,
          page: page ?? 0,
          size: pageSize??20,
          status:["REGISTERED", "BUYER_CANCELLATION", "RETURN_TO_BUYER_REQUEST"]
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
            status: selectedStatus
              ? [selectedStatus?.value]
              : ["REGISTERED", "BUYER_CANCELLATION", "RETURN_TO_BUYER_REQUEST"],
          })
        );
      } else {
        dispatch(
          GetRequestProductAdminAction({
            page: 0,
            size: 20,
            status:["REGISTERED", "BUYER_CANCELLATION", "RETURN_TO_BUYER_REQUEST"]
          })
        );
      }
    }
  }, [updateData, updateData_2, updateProviderData]);

  return (
    <CollectionControls
      title="درخواست های باز"
      hasBox={false}
      filterInitialValues={filterDefaultInitialValues}
      data={productAdminData}
      onMetaChange={handleFilter}
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
            <TableHeadCell>توضیحات</TableHeadCell>
            <TableHeadCell>تاریخ ثبت درخواست</TableHeadCell>
            <TableHeadCell>آدرس</TableHeadCell>
            <TableHeadCell className="min-w-[170px]">وضعیت</TableHeadCell>
            <TableHeadCell />
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

            <TableFilterCell>
              <StatusSelect
                codes={[
                  "REGISTERED",
                  "BUYER_CANCELLATION",
                  "RETURN_TO_BUYER_REQUEST",
                ]}
                name="StatusSelect"
                label=""
                noBorder
                value={selectedStatus}
                onChange={(status: any) => setSelectedStatus(status)} // به روز رسانی وضعیت انتخاب شده
              />
            </TableFilterCell>
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
                  <TableCell>{row?.description ?? "_"}</TableCell>
                  <TableCell>
                    {row?.createdAt ? convertToJalali(row?.createdAt) : "_"}
                  </TableCell>
                  <TableCell>{row?.province + " , " + row?.city}</TableCell>
                  <TableCell>{row?.statusTitle ?? "_"}</TableCell>
                  <TableCell className="flex justify-center">
                    <Button
                      type="button"
                      onClick={() => {
                        onRowClick && onRowClick("detail", row);
                      }}
                      variant="outline-warning"
                    >
                      تغییر وضعیت
                    </Button>
                  </TableCell>
                  <TableCell className="flex justify-center">
                    <Button
                      type="button"
                      onClick={() => {
                        onRowClick && onRowClick("update", row);
                      }}
                      variant="outline-primary"
                    >
                      مشاهده پیشنهادات
                    </Button>
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
export default OpenRequest;
