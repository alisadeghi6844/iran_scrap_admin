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
import SearchInputField from "../../../components/molcols/formik-fields/SearchInputField";
import Checkbox from "../../../components/checkbox";
import Button from "../../../components/button";
import { UpdateRequestProductAdminAction } from "../../../redux/actions/productRequestStatus/RequestProductStatus";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { debounce } from "lodash";
import {
  selectGetTicketData,
  selectGetTicketLoading,
} from "../../../redux/slice/ticket/TicketSlice";
import { GetTicketAction } from "../../../redux/actions/ticket/TicketActions";

interface TicketTableTypes {
  onRowClick?: any;
  id?: any;
  setCloseModal?: any;
}

interface SortState {
  field: string;
  direction: "ASC" | "DESC" | null;
}

const TicketTable: React.FC<TicketTableTypes> = (props) => {
  const { onRowClick, id, setCloseModal } = props;

  const dispatch: any = useDispatch();
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [sortState, setSortState] = useState<SortState>({
    field: "",
    direction: null,
  });
  const [currentFilter, setCurrentFilter] = useState<any>({});

  const filterDefaultInitialValues = {
    firstName: "",
    lastName: null,
    phoneNumber: null,
  };

  const loading = useSelector(selectGetTicketLoading);
  const ticketData = useSelector(selectGetTicketData);

  // ایجاد تابع fetchData برای ترکیب منطق فیلتر و مرتب‌سازی
  const fetchData = useCallback(
    (filter = {}, sort = sortState) => {
      dispatch(
        GetTicketAction({
          credentials: {
            ...filter,
            page: 0,
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

  const handleCheckboxChange = (userId: string) => {
    setSelectedUserIds(
      (prevSelected) =>
        prevSelected.includes(userId)
          ? prevSelected.filter((id) => id !== userId) // اگر کاربر قبلاً انتخاب شده بود، آن را حذف کن
          : [...prevSelected, userId] // در غیر این صورت، آن را اضافه کن
    );
  };

  const onSuccess = () => {
    setCloseModal(false);
  };

  const handleRegisterBuyers = () => {
    dispatch(
      UpdateRequestProductAdminAction({
        credentials: id,
        item: {
          providerIds: selectedUserIds,
        },
        onSuccess,
      })
    );
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
  console.log("ticketData", ticketData);
  return (
    <>
      <CollectionControls
        hasBox={false}
        filterInitialValues={filterDefaultInitialValues}
        onFilter={handleFilterParameters}
        data={ticketData?.data}
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
              <TableHeadCell>انتخاب</TableHeadCell>
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
                onClick={() => handleSort("userSort")}
                className="cursor-pointer"
              >
                نوع کاربر {getSortIcon("userSort")}
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableFilterCell />
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
            </TableRow>
            {!loading ? (
              ticketData?.data?.data?.length > 0 ? (
                ticketData?.data?.data?.map((row: any) => (
                  <TableRow key={row?.id}>
                    <TableCell
                      style={{
                        backgroundColor: selectedUserIds.includes(row?.id)
                          ? "#f0fdf4"
                          : "transparent",
                        transition: "background-color 0.2s",
                      }}
                    >
                      <Checkbox
                        checked={selectedUserIds.includes(row?.id)}
                        onChange={() => handleCheckboxChange(row?.id)}
                      />
                    </TableCell>
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
                      {row?.userSort === "Hagh"
                        ? "حقیقی"
                        : row?.userSort === "Hogh"
                        ? "حقوقی"
                        : "نامشخص"}
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
    </>
  );
};

export default TicketTable;
