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
  selectCreateGeneralSettingData,
  selectDeleteGeneralSettingData,
  selectGetGeneralSettingData,
  selectGetGeneralSettingLoading,
  selectUpdateGeneralSettingData,
} from "../../../redux/slice/generalSetting/GeneralSettingSlice";
import { GetGeneralSettingAction } from "../../../redux/actions/generalSetting/GeneralSettingActions";
import { BiTrash } from "react-icons/bi";
import TextOverflow from "../../../utils/TextOverflow";
interface GeneralSettingTypes {
  onRowClick?: any;
}

const GeneralSettingTable: React.FC<GeneralSettingTypes> = (props) => {
  const { onRowClick } = props;

  const dispatch: any = useDispatch();

  const filterDefaultInitialValues = {
    FoodName: "",
    GeneralSetting: null,
    Restaurant: null,
  };

  const loading = useSelector(selectGetGeneralSettingLoading);
  const generalSettingData = useSelector(selectGetGeneralSettingData);
  const updateData = useSelector(selectUpdateGeneralSettingData);
  const createData = useSelector(selectCreateGeneralSettingData);
  const deleteData = useSelector(selectDeleteGeneralSettingData);

  useEffect(() => {
    dispatch(GetGeneralSettingAction({ page: 0, size: 999 }));
  }, []);

  const handleFilter = ({ filter, page, pageSize }: HandleFilterParams) => {
    dispatch(
      GetGeneralSettingAction({
        filter,
        page: page ?? 0,
        size: pageSize ?? 999,
      })
    );
  };

  const handleFilterParameters = (data: any) => {
    const { FoodName, GeneralSetting, Restaurant } = data;
    let queryParam = "";
    if (FoodName) queryParam += "title=" + FoodName + ",";
    if (GeneralSetting?.label)
      queryParam += "categoriesId=" + GeneralSetting?.value + ",";
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
        GetGeneralSettingAction({
          page: 0,
          size: 999,
        })
      );
    }
  }, [updateData, createData, deleteData]);

  return (
    <CollectionControls
      buttons={["create"]}
      createTitle="ساخت صفحه جدید"
      hasBox={false}
      filterInitialValues={filterDefaultInitialValues}
      onFilter={handleFilterParameters}
      data={generalSettingData}
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
            <TableHeadCell>عنوان </TableHeadCell>
            <TableHeadCell>دسته بندی </TableHeadCell>
            <TableHeadCell>متن صفحه </TableHeadCell>
            <TableHeadCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
          </TableRow>
          {!loading ? (
            generalSettingData?.data?.length > 0 ? (
              generalSettingData?.data?.map((row: any) => (
                <TableRow key={row?._id}>
                  <TableCell>{row?.title ?? "_"}</TableCell>
                  <TableCell>{row?.category ?? "_"}</TableCell>
                  <TableCell>
                    <TextOverflow>{row?.value ?? "_"}</TextOverflow>
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
export default GeneralSettingTable;
