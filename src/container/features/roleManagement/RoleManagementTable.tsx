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

import { LuGitPullRequestCreateArrow } from "react-icons/lu";

import { FaRegEdit } from "react-icons/fa";
import {
  selectCreateRoleManagementData,
  selectDeleteRoleManagementData,
  selectGetRoleManagementData,
  selectGetRoleManagementLoading,
  selectUpdateRoleManagementData,
} from "../../../redux/slice/roleManagement/RolemanagementSlice";
import { GetRoleManagementAction } from "../../../redux/actions/roleManagement/RoleManagementActions";
import { BiTrashAlt } from "react-icons/bi";

interface RoleManagementTypes {
  onRowClick?: any;
}

const RoleManagementTable: React.FC<RoleManagementTypes> = (props) => {
  const { onRowClick } = props;

  const dispatch: any = useDispatch();

  const filterDefaultInitialValues = {
    FoodName: "",
    RoleManagement: null,
    Restaurant: null,
  };

  const loading = useSelector(selectGetRoleManagementLoading);
  const roleManagementData = useSelector(selectGetRoleManagementData);
  const updateData = useSelector(selectUpdateRoleManagementData);
  const createData = useSelector(selectCreateRoleManagementData);
  const deleteData = useSelector(selectDeleteRoleManagementData);

  useEffect(() => {
    dispatch(GetRoleManagementAction({ page: 0, size: 20 }));
  }, []);

  const handleFilter = ({ filter, page, pageSize }: HandleFilterParams) => {
    dispatch(
      GetRoleManagementAction({
        filter,
        page: page ?? 0,
        size: pageSize ?? 20,
      })
    );
  };

  const handleFilterParameters = (data: any) => {
    const { FoodName, RoleManagement, Restaurant } = data;
    let queryParam = "";
    if (FoodName) queryParam += "title=" + FoodName + ",";
    if (RoleManagement?.label) queryParam += "categoriesId=" + RoleManagement?.value + ",";
    if (Restaurant?.label)
      queryParam += "restaurantId=" + Restaurant?.value + ",";

    return queryParam.substring(0, queryParam.length - 1);
  };

  useEffect(() => {
    if (updateData?.status == 200 || createData?.status == 201||deleteData?.status==200) {
      dispatch(
        GetRoleManagementAction({
          page: 0,
          size: 20,
        })
      );
    }
  }, [updateData, createData,deleteData]);


  return (
    <CollectionControls
      buttons={["create"]}
      createTitle="ساخت دسترسی جدید"
      hasBox={false}
      filterInitialValues={filterDefaultInitialValues}
      onFilter={handleFilterParameters}
      data={roleManagementData}
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
            <TableHeadCell>نام دسترسی </TableHeadCell>
            <TableHeadCell>مجوز ها  </TableHeadCell>
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
            roleManagementData?.length > 0 ? (
              roleManagementData?.map((row: any) => (
                <TableRow key={row?.id}>
               
                  <TableCell>{row?.title ?? "_"}</TableCell>
                  <TableCell>{row?.permissions?.length ?row?.permissions?.map((item:any)=>item).join(",") : "_"}</TableCell>
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
                      startIcon={
                        <LuGitPullRequestCreateArrow className="text-xl" />
                      }
                      type="button"
                      variant="outline-warning"
                      size="sm"
                      onClick={() => {
                        onRowClick && onRowClick("detail", row);
                      }}
                    >
                      دسترسی به کاربر
                    </Button>
                    <Button
                      startIcon={
                        <BiTrashAlt className="text-xl" />
                      }
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
export default RoleManagementTable;
