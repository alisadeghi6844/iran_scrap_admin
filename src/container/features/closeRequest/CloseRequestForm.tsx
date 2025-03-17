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
import {
  convertToJalali,
  convertToJalali_2,
} from "../../../utils/MomentConvertor";
import Typography from "../../../components/typography/Typography";
import {
  GetRequestProductOfferAction,
  UpdateRequestProductOfferSendToBuyerAction,
} from "../../../redux/actions/productRequestOffer/RequestProductOffer";
import {
  selectGetProductRequestOfferData,
  selectGetProductRequestOfferLoading,
} from "../../../redux/slice/productRequestOffer/ProductStatusRequestSlice";
import Checkbox from "../../../components/checkbox";
import Button from "../../../components/button";
import { formatNumber } from "../../../utils/NumberFormated";

const CloseRequestForm: React.FC<FormProps> = (props) => {
  const { mode = "create", id, onSubmitForm, ...rest } = props;

  const dispatch: any = useDispatch();
  const reqData = useSelector(selectGetProductRequestOfferData);
  const reqLoading = useSelector(selectGetProductRequestOfferLoading);

  const [selectedItem, setSelectedItem] = useState<any | null>(null); // State for selected checkbox

  useEffect(() => {
    if (id && mode === "update") {
      dispatch(
        GetRequestProductOfferAction({ page: 0, size: 20, requestId: id })
      );
    }
  }, [id, mode]);

  const handleCheckboxChange = (checked: boolean, item: any) => {
    if (checked) {
      setSelectedItem(item); // Set the selected item
    } else {
      setSelectedItem(null); // Deselect if unchecked
    }
  };

  const handleSubmitProviders = () => {
    if (selectedItem) {
      dispatch(
        UpdateRequestProductOfferSendToBuyerAction({
          credentials: [selectedItem.id],
          onSubmitForm,
        })
      );
    }
  };

  return (
    <>
      <div className="flex items-center justify-between my-3">
        <Typography className="font-bold mb-2">
          پیشنهادات تامین کنندگان
        </Typography>
        <Button
          onClick={handleSubmitProviders}
          disable={!selectedItem} // Disable if no item is selected
        >
          ارسال به خریدار
        </Button>
      </div>
      <Table className="w-full" isLoading={false} shadow={false}>
        <TableHead className="w-full" isLoading={false} shadow={false}>
          <TableRow>
            <TableHeadCell>انتخاب</TableHeadCell>
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
                    <Checkbox
                      id={`checkbox-${row.id}`}
                      label=""
                      value={selectedItem?.id === row.id} // Check if this item is selected
                      onChange={(checked: any) =>
                        handleCheckboxChange(checked, row)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {row?.provider?.firstName
                      ? row?.provider?.firstName + " " + row?.provider?.lastName
                      : "_"}
                  </TableCell>
                  <TableCell>{row?.provider?.mobile ?? "_"}</TableCell>
                  <TableCell>{row?.description ?? "_"}</TableCell>
                  <TableCell>
                    {row?.deliveryTime
                      ? convertToJalali_2(row?.deliveryTime)
                      : "_"}
                  </TableCell>
                  <TableCell>
                    {formatNumber(row?.price) + " " + "تومان"}
                  </TableCell>
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

export default CloseRequestForm;
