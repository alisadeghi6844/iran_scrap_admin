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
import ProviderDetailModal from "./ProviderDetailModal";
import { GetUsersProvidersAction } from "../../../redux/actions/users/UsersActions";
import SearchInputField from "../../../components/molcols/formik-fields/SearchInputField";
import Button from "../../../components/button";
import { FaSort, FaSortUp, FaSortDown, FaEye } from "react-icons/fa";
import { debounce } from "lodash";
import {
  selectGetUsersProvidersData,
  selectGetUsersProvidersLoading,
} from "../../../redux/slice/users/UsersSlice";

interface ProviderTypes {
  onRowClick?: any;
}

interface SortState {
  field: string;
  direction: "ASC" | "DESC" | null;
}

const ProviderTable: React.FC<ProviderTypes> = (props) => {
  const { onRowClick } = props;

  const dispatch: any = useDispatch();
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [sortState, setSortState] = useState<SortState>({
    field: "",
    direction: null,
  });
  const [currentFilter, setCurrentFilter] = useState<any>({});

  const filterDefaultInitialValues = {
    firstName: "",
    lastName: "",
    mobile: "",
    username: "",
    userSort: "",
  };

  const loading = useSelector(selectGetUsersProvidersLoading);
  const usersData = useSelector(selectGetUsersProvidersData);

  const fetchData = useCallback(
    (filter = {}, sort = sortState) => {
      dispatch(
        GetUsersProvidersAction({
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

  const debouncedFetchData = useCallback(
    debounce((filter, sort) => fetchData(filter, sort), 500),
    [fetchData]
  );

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = ({ filter, page, pageSize }: HandleFilterParams) => {
    const newFilter = {
      ...filter,
      page: page ?? 0,
      size: pageSize ?? 20,
    };

    setCurrentFilter(newFilter);
    debouncedFetchData(newFilter, sortState);
  };

  const handleFilterParameters = (data: any) => {
    const { firstName, lastName, mobile, username, userSort } = data;
    const queryParams: { [key: string]: string | null } = {};

    if (firstName) queryParams.firstName = firstName;
    if (lastName) queryParams.lastName = lastName;
    if (mobile) queryParams.mobile = mobile;
    if (username) queryParams.username = username;
    if (userSort) queryParams.userSort = userSort;

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

  const handleOpenDetailModal = (user: any) => {
    setSelectedProvider(user);
    setDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setDetailModalOpen(false);
    setSelectedProvider(null);
  };

  return (
    <>
      <ProviderDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        data={selectedProvider}
      />
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
                onClick={() => handleSort("username")}
                className="cursor-pointer"
              >
                نام کاربری {getSortIcon("username")}
              </TableHeadCell>
              <TableHeadCell
                onClick={() => handleSort("userSort")}
                className="cursor-pointer"
              >
                نوع کاربر {getSortIcon("userSort")}
              </TableHeadCell>
              <TableHeadCell
                onClick={() => handleSort("createdAt")}
                className="cursor-pointer"
              >
                تاریخ ایجاد {getSortIcon("createdAt")}
              </TableHeadCell>
              <TableHeadCell className="min-w-[150px]">عملیات</TableHeadCell>
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
                <SearchInputField name="mobile" />
              </TableFilterCell>
              <TableFilterCell>
                <SearchInputField name="username" />
              </TableFilterCell>
              <TableFilterCell>
                <SearchInputField name="userSort" />
              </TableFilterCell>
              <TableFilterCell></TableFilterCell> {/* For Created At */}
              <TableFilterCell></TableFilterCell> {/* For Actions */}
            </TableRow>
            {!loading ? (
              usersData?.data?.data?.length > 0 ? (
                usersData?.data?.data?.map((row: any) => (
                  <TableRow key={row?.id}>
                    <TableCell>{row?.firstName ?? "_"}</TableCell>
                    <TableCell>{row?.lastName ?? "_"}</TableCell>
                    <TableCell>{row?.mobile ?? "_"}</TableCell>
                    <TableCell>{row?.username ?? "_"}</TableCell>
                    <TableCell>
                      {row?.userSort === "Hagh"
                        ? "حقیقی"
                        : row?.userSort === "Hogh"
                        ? "حقوقی"
                        : "نامشخص"}
                    </TableCell>
                    <TableCell>
                      {new Date(row.createdAt).toLocaleDateString("fa-IR")}
                    </TableCell>
                    <TableCell
                      onClick={(e: any) => {
                        e.stopPropagation();
                      }}
                      className="justify-center gap-x-2"
                    >
                      <Button
                        startIcon={<FaEye />}
                        type="button"
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleOpenDetailModal(row)}
                      >
                        مشاهده جزئیات
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="flex justify-center !py-4">
                    <EmptyImage />
                  </TableCell>
                </TableRow>
              )
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="flex justify-center !py-4">
                  <TableSkeleton />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CollectionControls>
    </>
  );
};

export default ProviderTable;
