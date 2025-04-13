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
  selectCreateRoleManagementData,
  selectDeleteRoleManagementData,
  selectGetPermissionsData,
  selectGetRoleManagementData,
  selectGetRoleManagementLoading,
  selectUpdateRoleManagementData,
} from "../../../redux/slice/roleManagement/RoleManagementSlice";
import {
  AssignRoleManagementAction,
  GetRoleManagementAction,
  RevokeRoleManagementAction,
} from "../../../redux/actions/roleManagement/RoleManagementActions";

// تعریف ساختار داده برای ارسال
interface RoleAssignmentPayload {
  userIds: string[];
  roleIds: string[];
}

interface RoleManagementTypes {
  onRowClick?: any;
  userIds?: string[]; // آیدی‌های کاربران برای ارسال
  defaultRolesId?: string[]; // آیدی‌های نقش‌های پیش‌فرض
}

const SimpleRoleTable: React.FC<RoleManagementTypes> = (props) => {
  const { onRowClick, userIds = [], defaultRolesId = [] } = props;

  const dispatch: any = useDispatch();
  // استفاده از state برای نگهداری آرایه‌ای از آیتم‌های انتخاب شده
  const [selectedRoles, setSelectedRoles] = useState<any[]>([]);

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
  const persissionsData = useSelector(selectGetPermissionsData);

  // دریافت داده‌های نقش‌ها
  useEffect(() => {
    dispatch(GetRoleManagementAction({ page: 0, size: 20 }));
  }, []);

  // تنظیم نقش‌های پیش‌فرض پس از دریافت داده‌ها
  useEffect(() => {
    if (roleManagementData?.length > 0 && defaultRolesId?.length > 0) {
      // پیدا کردن نقش‌های پیش‌فرض در داده‌های دریافتی بر اساس name
      const defaultRoles = roleManagementData.filter((role: any) => 
        defaultRolesId.includes(role.title) // استفاده از title به جای id
      );
      
      // تنظیم نقش‌های پیش‌فرض به عنوان انتخاب شده
      setSelectedRoles(defaultRoles);
    }
  }, [roleManagementData, defaultRolesId]);

  // هندلر برای مدیریت تغییر وضعیت چک باکس و فراخوانی اکشن‌های مناسب
  const handleCheckboxChange = (role: any) => {
    const isSelected = selectedRoles.some((item) => item.id === role.id);
    let newSelectedRoles;

    if (isSelected) {
      // اگر قبلاً انتخاب شده بود، آن را حذف می‌کنیم
      newSelectedRoles = selectedRoles.filter((item) => item.id !== role.id);
      
      // فراخوانی اکشن لغو نقش
      if (userIds.length > 0) {
        const payload: RoleAssignmentPayload = {
          userIds: userIds,
          roleIds: [role.id], // فقط آیدی نقش حذف شده
        };
        dispatch(RevokeRoleManagementAction({ credentials: payload }));
      }
    } else {
      // اگر انتخاب نشده بود، آن را اضافه می‌کنیم
      newSelectedRoles = [...selectedRoles, role];
      
      // فراخوانی اکشن اضافه کردن نقش
      if (userIds.length > 0) {
        const payload: RoleAssignmentPayload = {
          userIds: userIds,
          roleIds: [role.id], // فقط آیدی نقش اضافه شده
        };
        dispatch(AssignRoleManagementAction({ credentials: payload }));
      }
    }

    setSelectedRoles(newSelectedRoles);
  };

  // تابع برای بررسی اینکه آیا یک نقش انتخاب شده است یا خیر
  const isRoleSelected = (role: any) => {
    return selectedRoles.some((item) => item.id === role.id);
  };

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
    if (RoleManagement?.label)
      queryParam += "categoriesId=" + RoleManagement?.value + ",";
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
        GetRoleManagementAction({
          page: 0,
          size: 20,
        })
      );
    }
  }, [updateData, createData, deleteData]);

  return (
    <div className="flex flex-col">
      <CollectionControls
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
              <TableHeadCell className="w-10">انتخاب</TableHeadCell>
              <TableHeadCell>نام دسترسی </TableHeadCell>
              <TableHeadCell>مجوز ها </TableHeadCell>
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
                    <TableCell className="w-10">
                      <input
                        type="checkbox"
                        checked={isRoleSelected(row)}
                        onChange={() => handleCheckboxChange(row)}
                        className="w-4 h-4 cursor-pointer"
                        disabled={userIds.length === 0} // غیرفعال کردن چک‌باکس اگر هیچ کاربری انتخاب نشده باشد
                      />
                    </TableCell>
                    <TableCell>{row?.title ?? "_"}</TableCell>
                    <TableCell>
                      {row?.permissions?.length
                        ? row.permissions
                            .map((item: any) => {
                              const permission = persissionsData?.find(
                                (per: any) => per?.id === item
                              );
                              return permission
                                ? permission.title
                                : item == "*"
                                ? "تمامی دسترسی ها"
                                : null;
                            })
                            .filter(Boolean) // Filter out any null values
                            .join(", ")
                        : "_"}
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

      {/* نمایش اطلاعات انتخاب‌ها */}
      <div className="mt-4 p-4 bg-gray-50 rounded-md">
        <div className="text-sm">
          {selectedRoles.length > 0 ? (
            <div>
              <p className="text-blue-700">
                {selectedRoles.length} دسترسی انتخاب شده است
              </p>
              {userIds.length === 0 && (
                <p className="text-red-500 mt-1">
                  هیچ کاربری انتخاب نشده است. لطفاً ابتدا کاربر(ها) را انتخاب کنید.
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-500">هیچ دسترسی انتخاب نشده است</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default SimpleRoleTable;
