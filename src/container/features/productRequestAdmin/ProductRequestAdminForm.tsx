import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FormProps } from "../../../types/organism/Form";
import { GetRequestProductAdminByIdAction } from "../../../redux/actions/productRequestStatus/RequestProductStatus";
import {
  selectGetProductRequestAdminByIdData,
  selectGetProductRequestAdminByIdLoading,
} from "../../../redux/slice/productRequestStatus/ProductStatusRequestSlice";
import Table from "../../../components/table";
import TableHead from "../../../components/table/TableHead";
import TableRow from "../../../components/table/TableRow";
import TableHeadCell from "../../../components/table/TableHeadCell";
import TableBody from "../../../components/table/TableBody";
import TableCell from "../../../components/table/TableCell";
import EmptyImage from "../../../components/image/EmptyImage";
import TableSkeleton from "../../organism/skeleton/TableSkeleton";
import {
  convertToJalali,
  convertToJalali_2,
} from "../../../utils/MomentConvertor";
import Typography from "../../../components/typography/Typography";
import UsersTable from "../users/UsersTable";

const ProductRequestStatusForm: React.FC<FormProps> = (props) => {
  const { mode = "create", id, handleSubmit, ...rest } = props;

  const dispatch: any = useDispatch();

  const reqData = useSelector(selectGetProductRequestAdminByIdData);
  const reqLoading = useSelector(selectGetProductRequestAdminByIdLoading);

  useEffect(() => {
    if (id) {
      dispatch(GetRequestProductAdminByIdAction(id));
    }
  }, [id]);

  return (
    <>
      <Typography className="font-bold mb-2">جزئیات درخواست کاربر</Typography>
      <Table className="w-full" isLoading={false} shadow={false}>
        <TableHead className="w-full" isLoading={false} shadow={false}>
          <TableRow>
            <TableHeadCell>توضیحات</TableHeadCell>
            <TableHeadCell>دسته بندی </TableHeadCell>
            <TableHeadCell>آدرس</TableHeadCell>
            <TableHeadCell>تاریخ ثبت درخواست</TableHeadCell>
            <TableHeadCell>تاریخ تحویل</TableHeadCell>
            <TableHeadCell>مقدار درخواستی</TableHeadCell>
            <TableHeadCell>نوع درخواست</TableHeadCell>
            <TableHeadCell>نوع پرداخت</TableHeadCell>
            <TableHeadCell>وضعیت</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!reqLoading ? (
            reqData?._id ? (
              <TableRow>
                <TableCell>{reqData?.description ?? "_"}</TableCell>
                <TableCell>{reqData?.category?.name ?? "_"}</TableCell>
                <TableCell>
                  {reqData?.province + " , " + reqData?.city}
                </TableCell>
                <TableCell>
                  {reqData?.createdAt
                    ? convertToJalali(reqData?.createdAt)
                    : "_"}
                </TableCell>
                <TableCell>
                  {reqData?.expectedDate
                    ? convertToJalali_2(reqData?.expectedDate)
                    : "_"}
                </TableCell>
                <TableCell>
                  {reqData?.amount
                    ? `${reqData?.amount} (${
                        reqData?.amountType === "TON" ? "تن" : "کیلوگرم"
                      })`
                    : "_"}
                </TableCell>
                <TableCell>
                  {reqData?.requestType
                    ? reqData?.requestType === "URGENT"
                      ? "فوری"
                      : "نرمال"
                    : "_"}
                </TableCell>
                <TableCell>
                  {reqData?.paymentType
                    ? reqData?.paymentType === "INSTALLMENTS"
                      ? "اقساط"
                      : reqData?.paymentType === "CASH_AND_INSTALLMENTS"
                      ? "نقد و اقساط"
                      : "نقد"
                    : "_"}
                </TableCell>
                <TableCell>{reqData?.statusTitle ?? "_"}</TableCell>
              </TableRow>
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
      <Typography className="mt-12 font-bold">لیست تامین کنندگان</Typography>
      {mode === "update" ? (
        <UsersTable id={id} setCloseModal={handleSubmit} />
      ) : null}
    </>
  );
};

export default ProductRequestStatusForm;
