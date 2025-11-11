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
  selectCreatePbBrandAdminData,
  selectGetPbBrandAdminData,
  selectGetPbBrandAdminLoading,
  selectUpdatePbBrandAdminData,
  selectDeletePbBrandAdminData,
} from "../../../redux/slice/pbBrandAdmin/PbBrandAdminSlice";
import {
  GetPbBrandAdminAction,
} from "../../../redux/actions/pbBrandAdmin/PbBrandAdminActions";
import SearchInputField from "../../../components/molcols/formik-fields/SearchInputField";
import Button from "../../../components/button";
import { FaRegEdit } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";

interface PbBrandAdminItem {
  _id?: string;
  id?: string;
  name: string;
  order: number;
  categoryId: {
    id: string;
    name: string;
    code: string;
  };
  createdAt: number;
  updatedAt: number;
}

interface PbBrandAdminTypes {
  onRowClick?: (action: string, row: PbBrandAdminItem) => void;
}

const PbBrandAdminTable: React.FC<PbBrandAdminTypes> = (props) => {
  const { onRowClick } = props;

  const dispatch = useDispatch<AppDispatch>();

  const filterDefaultInitialValues = {
    Name: "",
  };

  const loading = useSelector(selectGetPbBrandAdminLoading);
  const pbBrandAdminData = useSelector(selectGetPbBrandAdminData);
  const updateData = useSelector(selectUpdatePbBrandAdminData);
  const createData = useSelector(selectCreatePbBrandAdminData);
  const deleteData = useSelector(selectDeletePbBrandAdminData);

  useEffect(() => {
    dispatch(GetPbBrandAdminAction({ page: 0, size: 10 }));
  }, [dispatch]);

  const handleFilter = ({ filter, page, pageSize }: HandleFilterParams) => {
    dispatch(
      GetPbBrandAdminAction({
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
        GetPbBrandAdminAction({
          page: 0,
          size: 10,
        })
      );
    }
  }, [updateData, createData, deleteData, dispatch]);

  return (
    <CollectionControls
      buttons={["create"]}
      createTitle="ساخت برند جدید"
      hasBox={false}
      filterInitialValues={filterDefaultInitialValues}
      onFilter={handleFilterParameters}
      data={pbBrandAdminData}
      onMetaChange={handleFilter}
      onButtonClick={(button) => {
        if (onRowClick) {
          if (button === "create") {
            onRowClick("create", {} as PbBrandAdminItem);
          }
        }
      }}
    >
      <Table className="w-full" isLoading={false} shadow={false}>
        <TableHead className="w-full" isLoading={false} shadow={false}>
          <TableRow>
            <TableHeadCell>نام برند</TableHeadCell>
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
                placeholder="جستجوی نام برند..."
              />
            </TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
          </TableRow>
          {!loading ? (
            pbBrandAdminData?.data?.length > 0 ? (
              pbBrandAdminData?.data?.map((row: PbBrandAdminItem) => (
                <TableRow key={row?._id || row?.id}>
                  <TableCell>{row?.name ?? "_"}</TableCell>
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
                <TableCell colspan="4" className="flex justify-center !py-4">
                  <EmptyImage />
                </TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell colspan="4" className="flex justify-center !py-4">
                <TableSkeleton />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CollectionControls>
  );
};

export default PbBrandAdminTable;