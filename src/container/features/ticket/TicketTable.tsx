import React, { useEffect } from "react";
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

import { FaRegEdit } from "react-icons/fa";
import Image from "../../../components/image";
import {
  selectCreateTicketData,
  selectGetTicketData,
  selectGetTicketLoading,
  selectUpdateTicketData,
} from "../../../redux/slice/ticket/TicketSlice";
import { GetTicketAction } from "../../../redux/actions/ticket/TicketActions";
import TextOverflow from "../../../utils/TextOverflow";
import { BiTrashAlt } from "react-icons/bi";

interface TicketTypes {
  onRowClick?: any;
}

const TicketTable: React.FC<TicketTypes> = (props) => {
  const { onRowClick } = props;

  const dispatch: any = useDispatch();

  const filterDefaultInitialValues = {
    FoodName: "",
    Ticket: null,
    Restaurant: null,
  };

  const loading = useSelector(selectGetTicketLoading);
  const ticketData = useSelector(selectGetTicketData);
  const updateData = useSelector(selectUpdateTicketData);
  const createData = useSelector(selectCreateTicketData);

  useEffect(() => {
    dispatch(GetTicketAction({ page: 0, size: 20 }));
  }, []);

  const handleFilter = ({ filter, page, pageSize }: HandleFilterParams) => {
    dispatch(
      GetTicketAction({
        filter,
        page: page ?? 0,
        size: pageSize ?? 20,
      })
    );
  };

  const handleFilterParameters = (data: any) => {
    const { FoodName, Ticket, Restaurant } = data;
    let queryParam = "";
    if (FoodName) queryParam += "title=" + FoodName + ",";
    if (Ticket?.label) queryParam += "categoriesId=" + Ticket?.value + ",";
    if (Restaurant?.label)
      queryParam += "restaurantId=" + Restaurant?.value + ",";

    return queryParam.substring(0, queryParam.length - 1);
  };

  useEffect(() => {
    if (updateData?.status == 200 || createData?.status == 201) {
      dispatch(
        GetTicketAction({
          page: 0,
          size: 20,
        })
      );
    }
  }, [updateData, createData]);

  useEffect(() => {
    console.log("ticketData", ticketData);
  }, [ticketData]);

  return (
    <CollectionControls
      buttons={["create"]}
      createTitle="ساخت تیکت جدید"
      hasBox={false}
      filterInitialValues={filterDefaultInitialValues}
      onFilter={handleFilterParameters}
      data={ticketData}
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
            <TableHeadCell>تصویر تیکت</TableHeadCell>
            <TableHeadCell>عنوان تیکت </TableHeadCell>
            <TableHeadCell>دسته بندی</TableHeadCell>
            <TableHeadCell>وضعیت</TableHeadCell>
            <TableHeadCell>توضیح کوتاه</TableHeadCell>
            <TableHeadCell>متن تیکت</TableHeadCell>
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
          </TableRow>
          {!loading ? (
            ticketData?.data?.length > 0 ? (
              ticketData?.data?.map((row: any) => (
                <TableRow key={row?._id}>
                  <TableCell>
                    <Image
                      className="w-[94px] h-[84px] rounded-lg"
                      src={
                        row?.thumbnail
                          ? row?.thumbnail
                          : "/images/core/default-image.png"
                      }
                    />
                  </TableCell>
                  <TableCell>{row?.title ?? "_"}</TableCell>
                  <TableCell>{row?.category?.title ?? "_"}</TableCell>
                  <TableCell>{row?.isActive ? "فعال" : "غیر فعال"}</TableCell>
                  <TableCell>{row?.summery ?? "_"}</TableCell>
                  <TableCell>
                    <TextOverflow>{row?.description ?? "_"}</TextOverflow>
                  </TableCell>
                  <TableCell
                    onClick={(e: any) => {
                      e.stopPropagation();
                    }}
                    className="justify-center gap-x-4"
                  >
                    <Button
                      startIcon={<FaRegEdit className="text-xl" />}
                      type="button"
                      variant="outline-success"
                      size="sm"
                      onClick={() => {
                        onRowClick && onRowClick("update", row);
                      }}
                    >
                      ویرایش
                    </Button>

                    <Button
                      startIcon={<BiTrashAlt className="text-xl" />}
                      type="button"
                      variant="outline-error"
                      size="sm"
                      onClick={() => {
                        onRowClick && onRowClick("delete", row);
                      }}
                    >
                      حذف
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
export default TicketTable;
