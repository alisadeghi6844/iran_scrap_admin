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
import {
  selectCreateFaqData,
  selectDeleteFaqData,
  selectGetFaqData,
  selectGetFaqLoading,
  selectUpdateFaqData,
} from "../../../redux/slice/faq/FaqSlice";
import { GetFaqAction } from "../../../redux/actions/faq/FaqActions";
import { BiTrash } from "react-icons/bi";
import { faqCategoryOption } from "./FaqCategorySelect";
import TextOverflow from "../../../utils/TextOverflow";

interface FaqTypes {
  onRowClick?: any;
}

const FaqTable: React.FC<FaqTypes> = (props) => {
  const { onRowClick } = props;

  const dispatch: any = useDispatch();

  const filterDefaultInitialValues = {
    FoodName: "",
    Faq: null,
    Restaurant: null,
  };

  const loading = useSelector(selectGetFaqLoading);
  const faqData = useSelector(selectGetFaqData);
  const updateData = useSelector(selectUpdateFaqData);
  const createData = useSelector(selectCreateFaqData);
  const deleteData = useSelector(selectDeleteFaqData);

  useEffect(() => {
    dispatch(GetFaqAction({ page: 0, size: 999 }));
  }, []);

  const handleFilter = ({ filter, page, pageSize }: HandleFilterParams) => {
    dispatch(
      GetFaqAction({
        filter,
        page: page ?? 0,
        size: pageSize ?? 999,
      })
    );
  };

  const handleFilterParameters = (data: any) => {
    const { FoodName, Faq, Restaurant } = data;
    let queryParam = "";
    if (FoodName) queryParam += "title=" + FoodName + ",";
    if (Faq?.label) queryParam += "categoriesId=" + Faq?.value + ",";
    if (Restaurant?.label)
      queryParam += "restaurantId=" + Restaurant?.value + ",";

    return queryParam.substring(0, queryParam.length - 1);
  };

  useEffect(() => {
    if (
      updateData?.status == 200 ||
      createData?.status == 201 ||
      deleteData?.status == 200
    ) {
      dispatch(
        GetFaqAction({
          page: 0,
          size: 999,
        })
      );
    }
  }, [updateData, createData, deleteData]);

  return (
    <CollectionControls
      buttons={["create"]}
      createTitle="ساخت سوال متداول جدید"
      hasBox={false}
      filterInitialValues={filterDefaultInitialValues}
      onFilter={handleFilterParameters}
      data={faqData}
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
            <TableHeadCell>سوال </TableHeadCell>
            <TableHeadCell>دسته بندی </TableHeadCell>
            <TableHeadCell>پاسخ </TableHeadCell>
            <TableHeadCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
          </TableRow>
          {!loading ? (
            faqData?.data?.length > 0 ? (
              faqData?.data?.map((row: any) => (
                <TableRow key={row?._id}>
                  <TableCell>{row?.title ?? "_"}</TableCell>
                  <TableCell>
                    {row?.category
                      ? faqCategoryOption.find(
                          (item: any) => item?.value == row?.category
                        )?.label
                      : "_"}
                  </TableCell>
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
                      startIcon={<BiTrash className="text-xl" />}
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
export default FaqTable;
