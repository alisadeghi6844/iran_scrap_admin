import React, { useEffect, useState, useCallback } from "react";
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
import { MdAccessibility, MdEdit } from "react-icons/md";
import UserEditModal from "./UserEditModal";

import {
  selectGetUsersData,
  selectGetUsersLoading,
} from "../../../redux/slice/users/UsersSlice";
import { GetUsersAction } from "../../../redux/actions/users/UsersActions";
import SearchInputField from "../../../components/molcols/formik-fields/SearchInputField";
import Button from "../../../components/button";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { debounce } from "lodash";

interface AllUsersTypes {
  onRowClick?: any;
  id?: any;
  setCloseModal?: any;
  setUserIds?: any;
  setDefaultRolesId?: any;
}

interface SortState {
  field: string;
  direction: "ASC" | "DESC" | null;
}

const AllUsersTable: React.FC<AllUsersTypes> = (props) => {
  const { onRowClick, id, setUserIds, setCloseModal, setDefaultRolesId } =
    props;

  const dispatch: any = useDispatch();
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [sortState, setSortState] = useState<SortState>({
    field: "",
    direction: null,
  });
  const [currentFilter, setCurrentFilter] = useState<any>({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const filterDefaultInitialValues = {
    firstName: "",
    lastName: null,
    phoneNumber: null,
  };

  const loading = useSelector(selectGetUsersLoading);
  const usersData = useSelector(selectGetUsersData);

  // ایجاد تابع fetchData برای ترکیب منطق فیلتر و مرتب‌سازی
  const fetchData = useCallback(
    (filter = {}, sort = sortState) => {
      dispatch(
        GetUsersAction({
          credentials: {
            ...filter,
            page: filter?.page ?? 0,
            size: 20,
            ...(sort.field && sort.direction
              ? {
                  orderBy: sort.field,
                  order: sort.direction,
                }
              : {}),
          },
        })
      );
    },
    [dispatch]
  );

  // ایجاد نسخه debounce شده از fetchData
  const debouncedFetchData = useCallback(
    debounce((filter, sort) => fetchData(filter, sort), 500),
    [fetchData]
  );

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = ({ filter, page, pageSize }: HandleFilterParams) => {
    const newFilter = {
      filter,
      page: page ?? 0,
      size: pageSize ?? 20,
      firstName: filter.firstName,
      lastName: filter.lastName,
      mobile: filter.phoneNumber,
    };
    console.log("newFilter", newFilter);
    setCurrentFilter(newFilter);
    debouncedFetchData(newFilter, sortState);
  };

  const handleFilterParameters = (data: any) => {
    const { firstName, lastName, phoneNumber } = data;
    const queryParams: { [key: string]: string | null } = {};

    if (firstName) queryParams.firstName = firstName;
    if (lastName) queryParams.lastName = lastName;
    if (phoneNumber) queryParams.phoneNumber = phoneNumber;

    return queryParams;
  };

  const handleSort = (field: string) => {
    const newSortState = {
      field,
      direction:
        sortState.field === field
          ? sortState.direction === "ASC"
            ? "DESC"
            : sortState.direction === "DESC"
            ? null
            : "ASC"
          : "ASC",
    };
    setSortState(newSortState);
    debouncedFetchData(currentFilter, newSortState);
  };

  const getSortIcon = (field: string) => {
    if (sortState.field !== field) return <FaSort className="inline ml-1" />;
    if (sortState.direction === "ASC")
      return <FaSortUp className="inline ml-1" />;
    if (sortState.direction === "DESC")
      return <FaSortDown className="inline ml-1" />;
    return <FaSort className="inline ml-1" />;
  };

  const handleEditUser = (userId: string) => {
    setSelectedUserId(userId);
    setEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    // Refresh the users list after successful edit
    fetchData(currentFilter, sortState);
  };
  return (
    <>
      <CollectionControls
        hasBox={false}
        filterInitialValues={filterDefaultInitialValues}
        onFilter={handleFilterParameters}
        data={usersData?.data}
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
              <TableHeadCell
                onClick={() => handleSort("firstName")}
                className="cursor-pointer"
              >
                نام {getSortIcon("firstName")}
              </TableHeadCell>
              <TableHeadCell
                onClick={() => handleSort("lastName")}
                className="cursor-pointer"
              >
                نام خانوادگی {getSortIcon("lastName")}
              </TableHeadCell>
              <TableHeadCell
                onClick={() => handleSort("mobile")}
                className="cursor-pointer"
              >
                تلفن همراه {getSortIcon("mobile")}
              </TableHeadCell>
              <TableHeadCell
                onClick={() => handleSort("usertype")}
                className="cursor-pointer"
              >
                نوع کاربر {getSortIcon("usertype")}
              </TableHeadCell>
              <TableHeadCell
                onClick={() => handleSort("userSort")}
                className="cursor-pointer"
              >
                نوع شخص {getSortIcon("userSort")}
              </TableHeadCell>
              <TableHeadCell />
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableFilterCell>
                <SearchInputField name="firstName" />
              </TableFilterCell>
              <TableFilterCell>
                <SearchInputField name="lastName" />
              </TableFilterCell>
              <TableFilterCell>
                <SearchInputField name="phoneNumber" />
              </TableFilterCell>
              <TableFilterCell></TableFilterCell>
              <TableFilterCell></TableFilterCell>
              <TableFilterCell></TableFilterCell>
            </TableRow>
            {!loading ? (
              usersData?.data?.data?.length > 0 ? (
                usersData?.data?.data?.map((row: any) => (
                  <TableRow key={row?.id}>
                    <TableCell
                      style={{
                        backgroundColor: selectedUserIds.includes(row?.id)
                          ? "#f0fdf4"
                          : "transparent",
                        transition: "background-color 0.2s",
                      }}
                    >
                      {row?.firstName ?? "_"}
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: selectedUserIds.includes(row?.id)
                          ? "#f0fdf4"
                          : "transparent",
                        transition: "background-color 0.2s",
                      }}
                    >
                      {row?.lastName ?? "_"}
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: selectedUserIds.includes(row?.id)
                          ? "#f0fdf4"
                          : "transparent",
                        transition: "background-color 0.2s",
                      }}
                    >
                      {row?.mobile ?? "_"}
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: selectedUserIds.includes(row?.id)
                          ? "#f0fdf4"
                          : "transparent",
                        transition: "background-color 0.2s",
                      }}
                    >
                      {row?.usertype === "Buyer"
                        ? "خریدار"
                        : row?.usertype === "Provider"
                        ? "تامین کننده"
                        : row?.usertype === "Both"
                        ? "هردو"
                        : "نامشخص"}
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: selectedUserIds.includes(row?.id)
                          ? "#f0fdf4"
                          : "transparent",
                        transition: "background-color 0.2s",
                      }}
                    >
                      {row?.userSort === "Hagh"
                        ? "حقیقی"
                        : row?.userSort === "Hogh"
                        ? "حقوقی"
                        : "نامشخص"}
                    </TableCell>
                    <TableCell
                      onClick={(e: any) => {
                        e.stopPropagation();
                      }}
                      className="justify-center gap-x-2"
                    >
                      <Button
                        startIcon={<MdEdit className="text-xl" />}
                        type="button"
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEditUser(row?.id)}
                      >
                        ویرایش
                      </Button>
                      <Button
                        startIcon={<MdAccessibility className="text-xl" />}
                        type="button"
                        variant="outline-success"
                        size="sm"
                        onClick={() => {
                          setUserIds([row?.id]);
                          setDefaultRolesId(row?.roles);
                          onRowClick && onRowClick("update", row);
                        }}
                      >
                        دسترسی ها
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colspan="6" className="flex justify-center !py-4">
                    <EmptyImage />
                  </TableCell>
                </TableRow>
              )
            ) : (
              <TableRow>
                <TableCell colspan="6" className="flex justify-center !py-4">
                  <TableSkeleton />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CollectionControls>
      
      <UserEditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        userId={selectedUserId}
        onSuccess={handleEditSuccess}
      />
    </>
  );
};

export default AllUsersTable;
