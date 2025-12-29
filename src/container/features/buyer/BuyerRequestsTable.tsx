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
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { debounce } from "lodash";

import {
  selectGetProductRequestAdminData,
  selectGetProductRequestAdminLoading,
  selectGetProductRequestAdminError,
} from "../../../redux/slice/productRequestStatus/ProductStatusRequestSlice";
import { GetRequestProductAdminAction } from "../../../redux/actions/productRequestStatus/RequestProductStatus";

interface ProductRequestItem {
  _id: string;
  id?: string;
  address: string;
  amount: number;
  amountType: string;
  category: {
    _id: string;
    name: string;
    code: string;
    image: string;
  };
  categoryId: {
    id: string;
    name: string;
    code: string;
    isLast: boolean;
    catRoute: string;
    createdAt: number;
    image: string;
    parentId: string;
    updatedAt: number;
  };
  city: string;
  createdAt: number;
  description: string;
  expectedDate: number;
  expireDate: number;
  paymentType: string;
  postalCode: string;
  province: string;
  requestType: string;
  status: string;
  statusTitle: string;
  updatedAt: number;
  user: {
    id: string;
    mobile: string;
    firstName: string;
    lastName: string;
    userSort: string;
    usertype: string;
  };
  userId: {
    id: string;
    mobile: string;
    firstName: string;
    lastName: string;
    userSort: string;
    usertype: string;
  };
}

interface BuyerRequestsTableProps {
  userId: string;
}

interface SortState {
  field: string;
  direction: "ASC" | "DESC" | null;
}

const BuyerRequestsTable: React.FC<BuyerRequestsTableProps> = ({ userId }) => {
  const dispatch: any = useDispatch();
  const [sortState, setSortState] = useState<SortState>({
    field: "",
    direction: null,
  });
  const [currentFilter, setCurrentFilter] = useState<any>({});

  const filterDefaultInitialValues = {
    description: "",
    status: "",
    category: "",
  };

  const loading = useSelector(selectGetProductRequestAdminLoading);
  const requestsData = useSelector(selectGetProductRequestAdminData);
  const error = useSelector(selectGetProductRequestAdminError);

  // ایجاد تابع fetchData برای ترکیب منطق فیلتر و مرتب‌سازی
  const fetchData = useCallback(
    (filter = {}, sort = sortState) => {
      dispatch(
        GetRequestProductAdminAction({
          ...filter,
          userId: userId, // فیلتر کردن بر اساس userId
          page: filter?.page ?? 0,
          size: 20,
          ...(sort.field && sort.direction
            ? {
                orderBy: sort.field,
                order: sort.direction,
              }
            : {}),
        })
      );
    },
    [dispatch, userId]
  );

  // ایجاد نسخه debounce شده از fetchData
  const debouncedFetchData = useCallback(
    debounce((filter, sort) => fetchData(filter, sort), 500),
    [fetchData]
  );

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId, fetchData]);

  const handleFilter = ({ filter, page, pageSize }: HandleFilterParams) => {
    const newFilter = {
      filter,
      page: page ?? 0,
      size: pageSize ?? 20,
      userId: userId,
      description: filter.description,
      status: filter.status,
      category: filter.category,
    };

    setCurrentFilter(newFilter);
    debouncedFetchData(newFilter, sortState);
  };

  const handleFilterParameters = (data: any) => {
    const { description, status, category } = data;
    const queryParams: { [key: string]: string | null } = {};

    if (description) queryParams.description = description;
    if (status) queryParams.status = status;
    if (category) queryParams.category = category;

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

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "در انتظار";
      case "APPROVED":
        return "تایید شده";
      case "REJECTED":
        return "رد شده";
      case "COMPLETED":
        return "تکمیل شده";
      default:
        return status || "نامشخص";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "text-yellow-600 bg-yellow-100";
      case "APPROVED":
        return "text-secondary-600 bg-secondary-100";
      case "REJECTED":
        return "text-red-600 bg-red-100";
      case "COMPLETED":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="w-full">
      <CollectionControls
        hasBox={false}
        filterInitialValues={filterDefaultInitialValues}
        onFilter={handleFilterParameters}
        data={requestsData?.data}
        onMetaChange={handleFilter}
      >
        <Table className="w-full" isLoading={false} shadow={false}>
          <TableHead className="w-full" isLoading={false} shadow={false}>
            <TableRow>
              <TableHeadCell
                onClick={() => handleSort("description")}
                className="cursor-pointer"
              >
                توضیحات درخواست {getSortIcon("description")}
              </TableHeadCell>
              <TableHeadCell
                onClick={() => handleSort("category")}
                className="cursor-pointer"
              >
                دسته‌بندی {getSortIcon("category")}
              </TableHeadCell>
              <TableHeadCell
                onClick={() => handleSort("amount")}
                className="cursor-pointer"
              >
                مقدار {getSortIcon("amount")}
              </TableHeadCell>
              <TableHeadCell
                onClick={() => handleSort("status")}
                className="cursor-pointer"
              >
                وضعیت {getSortIcon("status")}
              </TableHeadCell>
              <TableHeadCell
                onClick={() => handleSort("createdAt")}
                className="cursor-pointer"
              >
                تاریخ ایجاد {getSortIcon("createdAt")}
              </TableHeadCell>
              <TableHeadCell>شهر</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableFilterCell>
                <SearchInputField name="description" placeholder="جستجو در توضیحات..." />
              </TableFilterCell>
              <TableFilterCell>
                <SearchInputField name="category" placeholder="جستجو در دسته‌بندی..." />
              </TableFilterCell>
              <TableFilterCell></TableFilterCell>
              <TableFilterCell>
                <SearchInputField name="status" placeholder="جستجو در وضعیت..." />
              </TableFilterCell>
              <TableFilterCell></TableFilterCell>
              <TableFilterCell></TableFilterCell>
            </TableRow>
            {!loading ? (
              requestsData?.data?.data?.length > 0 ? (
                requestsData?.data?.data?.map((row: ProductRequestItem) => (
                  <TableRow key={row?._id || row?.id}>
                    <TableCell>
                      {row?.description
                        ? row.description.length > 50
                          ? `${row.description.substring(0, 50)}...`
                          : row.description
                        : "_"}
                    </TableCell>
                    <TableCell>
                      {row?.category?.name || row?.categoryId?.name || "_"}
                    </TableCell>
                    <TableCell>
                      {row?.amount ? `${row.amount} ${row?.amountType || ""}` : "_"}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          row?.status
                        )}`}
                      >
                        {getStatusText(row?.status)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {row?.createdAt
                        ? new Date(row.createdAt).toLocaleDateString("fa-IR")
                        : "_"}
                    </TableCell>
                    <TableCell>{row?.city || "_"}</TableCell>
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

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          خطا در بارگذاری درخواست ها: {error}
        </div>
      )}
    </div>
  );
};

export default BuyerRequestsTable;