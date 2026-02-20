import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { GetAuthHistoryAction } from "../../../redux/actions/users/UsersActions";
import {
  selectGetAuthHistoryData,
  selectGetAuthHistoryLoading,
} from "../../../redux/slice/users/UsersSlice";
import Table from "../../../components/table";
import TableHead from "../../../components/table/TableHead";
import TableRow from "../../../components/table/TableRow";
import TableHeadCell from "../../../components/table/TableHeadCell";
import TableBody from "../../../components/table/TableBody";
import TableCell from "../../../components/table/TableCell";
import TableSkeleton from "../../organism/skeleton/TableSkeleton";
import EmptyImage from "../../../components/image/EmptyImage";
import CollectionControls from "../../organism/CollectionControls";
import SearchInputField from "../../../components/molcols/formik-fields/SearchInputField";
import { FaSort, FaSortUp, FaSortDown, FaEye } from "react-icons/fa";
import { HandleFilterParams } from "../../../types/FilterParams";
import AuthHistoryDetailModal from "./AuthHistoryDetailModal";
import Button from "../../../components/button";

interface SortState {
  field: string;
  direction: "ASC" | "DESC" | null;
}

const typeToPersian = (type: string) => {
  switch (type) {
    case "LOGIN":
      return "ورود به سیستم";
    case "LOGOUT":
      return "خروج از سیستم";
    default:
      return type;
  }
};

const AuthHistoryTable: React.FC = () => {
  const dispatch: any = useDispatch();
  const [sortState, setSortState] = useState<SortState>({ field: "", direction: null });
  const [currentFilter, setCurrentFilter] = useState<any>({});
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<any>(null);

  const loading = useSelector(selectGetAuthHistoryLoading);
  const authHistoryData = useSelector(selectGetAuthHistoryData);

  const fetchData = useCallback(
    (filter = {}, sort = sortState) => {
      dispatch(
        GetAuthHistoryAction({
          credentials: {
            ...filter,
            page: filter?.page ?? 0,
            size: 20,
            ...(sort.field && sort.direction
              ? { orderBy: sort.field, order: sort.direction }
              : {}),
          },
        })
      );
    },
    [dispatch, sortState]
  );

  const debouncedFetchData = useCallback(debounce(fetchData, 500), [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
    const { firstName, ip, type } = data;
    const queryParams: { [key: string]: string | null } = {};

    if (firstName) queryParams.firstName = firstName;
    if (ip) queryParams.ip = ip;
    if (type) queryParams.type = type;

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
    if (sortState.direction === "ASC") return <FaSortUp className="inline ml-1" />;
    if (sortState.direction === "DESC") return <FaSortDown className="inline ml-1" />;
    return <FaSort className="inline ml-1" />;
  };

  const handleOpenDetailModal = (history: any) => {
    setSelectedHistory(history);
    setDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setDetailModalOpen(false);
    setSelectedHistory(null);
  };

  const filterInitialValues = {
    ip: "",
    type: "",
    firstName: "",
  };

  return (
    <>
      <AuthHistoryDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        data={selectedHistory}
      />
      <CollectionControls
        hasBox={false}
        filterInitialValues={filterInitialValues}
        onFilter={handleFilterParameters}
        data={authHistoryData?.data}
        onMetaChange={handleFilter}
      >
        <Table className="w-full" isLoading={false} shadow={false}>
          <TableHead>
            <TableRow>
              <TableHeadCell onClick={() => handleSort("firstName")} className="cursor-pointer">کاربر {getSortIcon("firstName")}</TableHeadCell>
              <TableHeadCell onClick={() => handleSort("ip")} className="cursor-pointer">IP {getSortIcon("ip")}</TableHeadCell>
              <TableHeadCell onClick={() => handleSort("type")} className="cursor-pointer">نوع {getSortIcon("type")}</TableHeadCell>
              <TableHeadCell>User Agent</TableHeadCell>
              <TableHeadCell onClick={() => handleSort("createdAt")} className="cursor-pointer">تاریخ {getSortIcon("createdAt")}</TableHeadCell>
              <TableHeadCell>عملیات</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell><SearchInputField name="firstName" placeholder="جستجو کاربر..." /></TableCell>
              <TableCell><SearchInputField name="ip" placeholder="جستجو IP..." /></TableCell>
              <TableCell><SearchInputField name="type" placeholder="LOGIN / LOGOUT" /></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            {!loading ? (
              authHistoryData?.data?.data?.length > 0 ? (
                authHistoryData.data.data.map((row: any) => (
                  <TableRow key={row.id}>
                    <TableCell>{`${row.user?.firstName || ""} ${row.user?.lastName || ""}`.trim() || "-"}</TableCell>
                    <TableCell>{row.ip}</TableCell>
                    <TableCell>{typeToPersian(row.type)}</TableCell>
                    <TableCell className="max-w-xs truncate" title={row.userAgent}>{row.userAgent}</TableCell>
                    <TableCell>{new Date(row.createdAt).toLocaleString("fa-IR")}</TableCell>
                    <TableCell>
                      <Button
                        variant="secondary"
                        onClick={() => handleOpenDetailModal(row)}
                     
                      >
                        <FaEye className="ml-2"/>
                        مشاهده جزئیات
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    <EmptyImage />
                  </TableCell>
                </TableRow>
              )
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
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

export default AuthHistoryTable;
