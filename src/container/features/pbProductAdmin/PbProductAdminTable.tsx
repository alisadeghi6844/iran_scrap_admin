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
  selectCreatePbProductAdminData,
  selectGetPbProductAdminData,
  selectGetPbProductAdminLoading,
  selectUpdatePbProductAdminData,
  selectDeletePbProductAdminData,
} from "../../../redux/slice/pbProductAdmin/PbProductAdminSlice";
import {
  GetPbProductAdminAction,
} from "../../../redux/actions/pbProductAdmin/PbProductAdminActions";
import SearchInputField from "../../../components/molcols/formik-fields/SearchInputField";
import Button from "../../../components/button";
import { FaRegEdit } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";

interface PbProductAdminItem {
  _id?: string;
  id?: string;
  name: string;
  code: string;
  order: number;
  categoryId: {
    id: string;
    name: string;
    code: string;
  };
  createdAt: number;
  updatedAt: number;
}

interface PbProductAdminTypes {
  onRowClick?: (action: string, row: PbProductAdminItem) => void;
}

const PbProductAdminTable: React.FC<PbProductAdminTypes> = (props) => {
  const { onRowClick } = props;

  const dispatch = useDispatch<AppDispatch>();

  const filterDefaultInitialValues = {
    Name: "",
  };

  const loading = useSelector(selectGetPbProductAdminLoading);
  const pbProductAdminData = useSelector(selectGetPbProductAdminData);
  const updateData = useSelector(selectUpdatePbProductAdminData);
  const createData = useSelector(selectCreatePbProductAdminData);
  const deleteData = useSelector(selectDeletePbProductAdminData);

  useEffect(() => {
    dispatch(GetPbProductAdminAction({ page: 0, size: 10 }));
  }, [dispatch]);

  const handleFilter = ({ filter, page, pageSize }: HandleFilterParams) => {
    dispatch(
      GetPbProductAdminAction({
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
        GetPbProductAdminAction({
          page: 0,
          size: 10,
        })
      );
    }
  }, [updateData, createData, deleteData, dispatch]);



  return (
    <CollectionControls
      buttons={["create"]}
      createTitle="ساخت کالا جدید"
      hasBox={false}
      filterInitialValues={filterDefaultInitialValues}
      onFilter={handleFilterParameters}
      data={pbProductAdminData}
      onMetaChange={handleFilter}
      onButtonClick={(button) => {
        if (onRowClick) {
          if (button === "create") {
            onRowClick("create", {} as PbProductAdminItem);
          }
        }
      }}
    >
      <Table className="w-full" isLoading={false} shadow={false}>
        <TableHead className="w-full" isLoading={false} shadow={false}>
          <TableRow>
            <TableHeadCell>نام کالا</TableHeadCell>
            <TableHeadCell>کد کالا</TableHeadCell>
            <TableHeadCell>ترتیب</TableHeadCell>
            <TableHeadCell>دسته‌بندی</TableHeadCell>
            <TableHeadCell>عملیات</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableFilterCell>
              <SearchInputField
                name="Name"
                noBorder
                placeholder="جستجوی نام کالا..."
              />
            </TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
          </TableRow>
          {!loading ? (
            pbProductAdminData?.data?.length > 0 ? (
              pbProductAdminData?.data?.map((row: PbProductAdminItem) => (
                <TableRow key={row?._id || row?.id}>
                  <TableCell>{row?.name ?? "_"}</TableCell>
                  <TableCell>{row?.code ?? "_"}</TableCell>
                  <TableCell>{row?.order ?? "_"}</TableCell>
                  <TableCell>{row?.categoryId?.name ?? "_"}</TableCell>
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
                <TableCell colspan="5" className="flex justify-center !py-4">
                  <EmptyImage />
                </TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell colspan="5" className="flex justify-center !py-4">
                <TableSkeleton />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CollectionControls>
  );
};

export default PbProductAdminTable;