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
  selectGetPermissionsData,
  selectGetRoleManagementData,
  selectGetRoleManagementLoading,
  selectUpdateRoleManagementData,
} from "../../../redux/slice/roleManagement/RoleManagementSlice";
import { GetRoleManagementAction } from "../../../redux/actions/roleManagement/RoleManagementActions";
import { BiTrashAlt } from "react-icons/bi";

// Helper function to get menu label by value
const getMenuLabel = (value: string): string => {
  const menuMap: { [key: string]: string } = {
    "/": "همه درخواست ها",
    "/product-request-status": "مدیریت وضعیت درخواست ها",
    "/pending-orders-financial": "سفارشات در انتظار تایید مالی",
    "/product-requests": "مدیریت درخواست‌های محصول",
    "/role-management": "مدیریت نقش",
    "/users-management": "مدیریت کاربران",
    "/buyer-management": "مدیریت خریداران",
    "/pages-management": "مدیریت متن صفحات",
    "/faq-management": "مدیریت سوالات متداول",
    "/blog-management": "مدیریت مقالات",
    "/blog-category-management": "مدیریت دسته بندی مقالات",
    "/category-management": "مدیریت دسته بندی",
    "/ticket-management": "مدیریت تیکت ها",
    "/survey-management": "مدیریت نظرسنجی ها",
    "/product-management": "مدیریت محصولات",
    "/product-price-management": "مدیریت قیمت گذاری محصولات",
    "/purchase-price-management": "مدیریت قیمت خرید",
    "/view-pricing-management": "مشاهده قیمت گذاری",
    "/shipment-management": "محاسبه کرایه ناوگان",
    "/pb-product-admin-management": "تعریف کالا",
    "/pb-brand-admin-management": "مدیریت برند",
    "/pb-provider-admin-management": "تعریف تامین کنندگان",
    "/pb-port-admin-management": "تعریف محل بارگیری",
  };
  return menuMap[value] || value;
};

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
  const persissionsData = useSelector(selectGetPermissionsData);

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

  useEffect(() => {
    console.log("persissionsData", persissionsData);
  }, [persissionsData]);

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
            <TableHeadCell>مجوز ها </TableHeadCell>
            <TableHeadCell>منوهای قابل دسترسی </TableHeadCell>
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
            roleManagementData?.length > 0 ? (
              roleManagementData?.map((row: any) => (
                <TableRow key={row?.id}>
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
                  <TableCell>
                    {row?.accessMenus?.length
                      ? row.accessMenus.map((menu: string) => getMenuLabel(menu)).join(", ")
                      : "_"}
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
                <TableCell colspan="10" className="flex justify-center !py-4">
                  <EmptyImage />
                </TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell colspan="10" className="flex justify-center !py-4">
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
