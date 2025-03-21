import React, { useEffect, useState } from "react";
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
import EmptyImage from "../../../components/image/EmptyImage";
import TableSkeleton from "../../organism/skeleton/TableSkeleton";

import {
  selectGetUsersData,
  selectGetUsersLoading,
} from "../../../redux/slice/users/UsersSlice";
import { GetUsersAction } from "../../../redux/actions/users/UsersActions";
import Image from "../../../components/image";
import { AssignRoleManagementAction } from "../../../redux/actions/roleManagement/RoleManagementActions";
import { selectAssignRoleManagementLoading } from "../../../redux/slice/roleManagement/RolemanagementSlice";
interface RoleManagementTypes {
  onRowClick?: any;
  mode?: string;
  value?: string;
  onSubmit?: any;
}

const RoleManagementDetail: React.FC<RoleManagementTypes> = (props) => {
  const { onRowClick, onSubmit, value, mode } = props;
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const dispatch: any = useDispatch();

  const filterDefaultInitialValues = {
    FoodName: "",
    RoleManagement: null,
    Restaurant: null,
  };

  const loading = useSelector(selectGetUsersLoading);
  const usersData = useSelector(selectGetUsersData);

  const assignLoading = useSelector(selectAssignRoleManagementLoading);

  useEffect(() => {
    dispatch(GetUsersAction({ credentials: { page: 0, size: 20 } }));
  }, [mode]);

  useEffect(() => {
    if (usersData?.data?.data) {
      const preSelectedUsers = usersData.data.data
        .filter((user: any) => user.roles?.some((role: any) => role === value))
        .map((user: any) => user.id);
      setSelectedUsers(preSelectedUsers);
    }
  }, [usersData, value]);

  const handleFilter = ({ filter, page, pageSize }: HandleFilterParams) => {
    dispatch(
      GetUsersAction({
        credentials: {
          filter,
          page: page ?? 0,
          size: pageSize ?? 20,
        },
      })
    );
  };

  const handleFilterParameters = (data: any) => {
    const { FoodName, Users, Restaurant } = data;
    let queryParam = "";
    if (FoodName) queryParam += "title=" + FoodName + ",";
    if (Users?.label) queryParam += "categoriesId=" + Users?.value + ",";
    if (Restaurant?.label)
      queryParam += "restaurantId=" + Restaurant?.value + ",";

    return queryParam.substring(0, queryParam.length - 1);
  };

  // useEffect(() => {
  //   if (
  //     updateData?.status == 200 ||
  //     createData?.status == 201 ||
  //     deleteData?.status == 200
  //   ) {
  //     dispatch(
  //       GetUsersAction({
  //         page: 0,
  //         size: 20,
  //       })
  //     );
  //   }
  // }, [updateData, createData, deleteData]);

  useEffect(() => {
    console.log("usersData", usersData);
  }, [usersData]);

  const handleSelectUser = (userId: string) => {
    setSelectedUsers((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      }
      return [...prev, userId];
    });
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === (usersData?.data?.data?.length || 0)) {
      setSelectedUsers([]);
    } else {
      const allUserIds =
        usersData?.data?.data?.map((user: any) => user.id) || [];
      setSelectedUsers(allUserIds);
    }
  };

  const handleButtonClick = () => {
    console.log("selectedUsers");
    dispatch(
      AssignRoleManagementAction({
        credentials: {
          userIds: selectedUsers,
          roleIds: [value],
        },
        onSubmitForm: onSubmit,
      })
    );
  };

  return (
    <CollectionControls
      buttons={["create"]}
      hasBox={false}
      createTitle="اضافه کردن کاربر"
      filterInitialValues={filterDefaultInitialValues}
      isLoading={assignLoading}
      onFilter={handleFilterParameters}
      data={usersData?.data}
      onMetaChange={handleFilter}
      onButtonClick={(button) => {
        if (button === "create") {
          handleButtonClick();
        }
      }}
    >
      <Table className="w-full" isLoading={false} shadow={false}>
        <TableHead className="w-full" isLoading={false} shadow={false}>
          <TableRow>
            <TableHeadCell>
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={
                  selectedUsers.length ===
                    (usersData?.data?.data?.length || 0) &&
                  usersData?.data?.data?.length > 0
                }
                onChange={handleSelectAll}
              />
            </TableHeadCell>
            <TableHeadCell>تصویر</TableHeadCell>
            <TableHeadCell>نام</TableHeadCell>
            <TableHeadCell>نام خانوادگی</TableHeadCell>
            <TableHeadCell>شماره تلفن</TableHeadCell>
            <TableHeadCell>دسترسی ها</TableHeadCell>
            <TableHeadCell>نوع کاربر</TableHeadCell>
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
            <TableFilterCell></TableFilterCell>
          </TableRow>
          {!loading ? (
            usersData?.data?.data?.length > 0 ? (
              usersData?.data?.data?.map((row: any) => (
                <TableRow key={row?.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={selectedUsers.includes(row.id)}
                      onChange={() => handleSelectUser(row.id)}
                    />
                  </TableCell>
                  <TableCell className="flex items-center justify-center">
                    <Image
                      src={row?.profileImg ?? null}
                      alt="user"
                      className="w-12 h-12 rounded-full"
                    />
                  </TableCell>
                  <TableCell>{row?.firstName ?? "_"}</TableCell>
                  <TableCell>{row?.lastName ?? "_"}</TableCell>
                  <TableCell>{row?.mobile ?? "_"}</TableCell>
                  <TableCell>
                    {row?.roles?.length > 0
                      ? row?.roles?.map((item: any) => item).join(",")
                      : "_"}
                  </TableCell>
                  <TableCell>
                    {row?.usertype === "Buyer"
                      ? "خریدار"
                      : row?.usertype === "Provider"
                      ? "تامین کننده"
                      : "نا مشخص"}
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
export default RoleManagementDetail;
