import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { HandleFilterParams } from "../../../types/FilterParams";
import CollectionControls from "../../organism/CollectionControls";
import Table from "../../../components/table";
import TableHead from "../../../components/table/TableHead";
import TableHeadCell from "../../../components/table/TableHeadCell";
import TableRow from "../../../components/table/TableRow";
import TableBody from "../../../components/table/TableBody";
import TableFilterCell from "../../../components/table/TableFilterCell";
import TableCell from "../../../components/table/TableCell";
import EmptyImage from "../../../components/image/EmptyImage";
import TableSkeleton from "../../organism/skeleton/TableSkeleton";

import {
  selectCreatePbPortAdminData,
  selectGetPbPortAdminData,
  selectGetPbPortAdminLoading,
  selectUpdatePbPortAdminData,
  selectDeletePbPortAdminData,
} from "../../../redux/slice/pbPortAdmin/PbPortAdminSlice";
import {
  GetPbPortAdminAction,
} from "../../../redux/actions/pbPortAdmin/PbPortAdminActions";
import SearchInputField from "../../../components/molcols/formik-fields/SearchInputField";
import Button from "../../../components/button";
import { FaRegEdit } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";

interface PbPortAdminItem {
  _id?: string;
  id?: string;
  name: string;
  order: number;
  createdAt: number;
  updatedAt: number;
}

interface PbPortAdminTypes {
  onRowClick?: (action: string, row: PbPortAdminItem) => void;
}

const PbPortAdminTable: React.FC<PbPortAdminTypes> = (props) => {
  const { onRowClick } = props;

  const dispatch = useDispatch<AppDispatch>();

  const filterDefaultInitialValues = {
    Name: "",
  };

  const loading = useSelector(selectGetPbPortAdminLoading);
  const pbPortAdminData = useSelector(selectGetPbPortAdminData);
  const updateData = useSelector(selectUpdatePbPortAdminData);
  const createData = useSelector(selectCreatePbPortAdminData);
  const deleteData = useSelector(selectDeletePbPortAdminData);

  useEffect(() => {
    dispatch(GetPbPortAdminAction({ page: 0, size: 10 }));
  }, [dispatch]);

  const handleFilter = ({ filter, page, pageSize }: HandleFilterParams) => {
    dispatch(
      GetPbPortAdminAction({
        filter,
        page: page ?? 0,
        size: pageSize ?? 10,
      })
    );
  };

  const handleFilterParameters = (data: unknown) => {
    const { Name } = data as {
      Name?: string;
    };
    let queryParam = "";
    if (Name) queryParam += "name=" + Name + ",";

    return queryParam.substring(0, queryParam.length - 1);
  };

  useEffect(() => {
    if (
      updateData?.status == 200 ||
      createData?.status == 201 ||
      deleteData?.status == 200
    ) {
      dispatch(
        GetPbPortAdminAction({
          page: 0,
          size: 10,
        })
      );
    }
  }, [updateData, createData, deleteData, dispatch]);

  return (
    <CollectionControls
      buttons={["create"]}
      createTitle="ساخت محل بارگیری جدید"
      hasBox={false}
      filterInitialValues={filterDefaultInitialValues}
      onFilter={handleFilterParameters}
      data={pbPortAdminData}
      onMetaChange={handleFilter}
      onButtonClick={(button) => {
        if (onRowClick) {
          if (button === "create") {
            onRowClick("create", {} as PbPortAdminItem);
          }
        }
      }}
    >
      <Table className="w-full" isLoading={false} shadow={false}>
        <TableHead className="w-full" isLoading={false} shadow={false}>
          <TableRow>
            <TableHeadCell>نام محل بارگیری</TableHeadCell>
            <TableHeadCell>ترتیب</TableHeadCell>
            <TableHeadCell>عملیات</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableFilterCell>
              <SearchInputField
                name="Name"
                noBorder
                placeholder="جستجوی نام محل بارگیری..."
              />
            </TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
          </TableRow>
          {!loading ? (
            pbPortAdminData?.data?.length > 0 ? (
              pbPortAdminData?.data?.map((row: PbPortAdminItem) => (
                <TableRow key={row?._id || row?.id}>
                  <TableCell>{row?.name ?? "_"}</TableCell>
                  <TableCell>{row?.order ?? "_"}</TableCell>
                  <TableCell
                    onClick={(e: React.MouseEvent) => {
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
                        if (onRowClick) {
                          onRowClick("update", row);
                        }
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
                        if (onRowClick) {
                          onRowClick("delete", row);
                        }
                      }}
                    >
                      حذف
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colspan="3" className="flex justify-center !py-4">
                  <EmptyImage />
                </TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell colspan="3" className="flex justify-center !py-4">
                <TableSkeleton />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CollectionControls>
  );
};

export default PbPortAdminTable;