import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FormProps } from "../../../types/organism/Form";
import Table from "../../../components/table";
import TableHead from "../../../components/table/TableHead";
import TableRow from "../../../components/table/TableRow";
import TableHeadCell from "../../../components/table/TableHeadCell";
import TableBody from "../../../components/table/TableBody";
import TableCell from "../../../components/table/TableCell";
import EmptyImage from "../../../components/image/EmptyImage";
import TableSkeleton from "../../organism/skeleton/TableSkeleton";
import { convertToJalali } from "../../../utils/MomentConvertor";
import Typography from "../../../components/typography/Typography";
import {
  GetRequestProductOfferAction,
} from "../../../redux/actions/productRequestOffer/RequestProductOffer";
import {
  selectGetProductRequestOfferData,
  selectGetProductRequestOfferLoading,
} from "../../../redux/slice/productRequestOffer/ProductStatusRequestSlice";

const OpenRequestForm: React.FC<FormProps> = (props) => {
  const { mode = "create", id, onSubmitForm, ...rest } = props;

  const dispatch: any = useDispatch();
  const reqData = useSelector(selectGetProductRequestOfferData);
  const reqLoading = useSelector(selectGetProductRequestOfferLoading);



  useEffect(() => {
    if (id && mode === "update") {
      dispatch(
        GetRequestProductOfferAction({ page: 0, size: 20, requestId: id })
      );
    }
  }, [id, mode]);


  return (
    <>
      <div className="flex items-center justify-between my-3">
        <Typography className="font-bold mb-2">
          پیشنهادات تامین کنندگان
        </Typography>
      </div>
      <Table className="w-full" isLoading={false} shadow={false}>
        <TableHead className="w-full" isLoading={false} shadow={false}>
          <TableRow>
            <TableHeadCell>نام تامین کننده</TableHeadCell>
            <TableHeadCell>تلفن همراه درخواست کننده</TableHeadCell>
            <TableHeadCell>توضیحات</TableHeadCell>
            <TableHeadCell>تاریخ تحویل</TableHeadCell>
            <TableHeadCell>قیمت</TableHeadCell>
            <TableHeadCell>وضعیت</TableHeadCell>
            <TableHeadCell>مقدار درخواستی</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!reqLoading ? (
            reqData?.data?.length > 0 ? (
              reqData?.data?.map((row: any) => (
                <TableRow key={row?.id}>
                  <TableCell>
                    {row?.provider?.firstName
                      ? row?.provider?.firstName + " " + row?.provider?.lastName
                      : "_"}
                  </TableCell>
                  <TableCell>{row?.provider?.mobile ?? "_"}</TableCell>
                  <TableCell>{row?.description ?? "_"}</TableCell>
                  <TableCell>
                    {row?.deliveryTime
                      ? convertToJalali(row?.deliveryTime)
                      : "_"}
                  </TableCell>
                  <TableCell>{row?.price + " " + "تومان"}</TableCell>
                  <TableCell>{row?.status}</TableCell>
                  <TableCell>
                    {row?.request?.amount
                      ? `${row?.request?.amount} (${
                          row?.request?.amountType === "TON" ? "تن" : "کیلوگرم"
                        })`
                      : "_"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colspan="8" className="flex justify-center !py-4">
                  <EmptyImage />
                </TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell colspan="8" className="flex justify-center !py-4">
                <TableSkeleton />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default OpenRequestForm;
