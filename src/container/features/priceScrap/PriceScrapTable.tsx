import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import CollectionControls from "../../organism/CollectionControls";
import Table from "../../../components/table";
import TableHead from "../../../components/table/TableHead";
import TableHeadCell from "../../../components/table/TableHeadCell";
import TableRow from "../../../components/table/TableRow";
import TableBody from "../../../components/table/TableBody";
import TableCell from "../../../components/table/TableCell";
import TableFilterCell from "../../../components/table/TableFilterCell";
import EmptyImage from "../../../components/image/EmptyImage";
import TableSkeleton from "../../organism/skeleton/TableSkeleton";
import Input from "../../../components/input";
import JalaliDatepicker from "../../../components/jalaliDatepicker";
import moment from "jalali-moment";
import useDebounce from "../../../hooks/UseDebounce";

import {
  selectGetPriceScrapProductsLoading,
  selectGetPriceScrapProductsData,
} from "../../../redux/slice/priceScrap/PriceScrapSlice";
import { GetPriceScrapProductsAction } from "../../../redux/actions/priceScrap/PriceScrapActions";

interface PriceDto {
  _id: string;
  product_id: string;
  wholesale_price: number;
  retail_price: number;
  createdAt: string;
  updatedAt: string;
}

interface CategoryDto {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  parent_id?: string | null;
  source?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductItem {
  _id: string;
  name: string;
  slug: string;
  category_id: string;
  createdAt: string;
  updatedAt: string;
  category: CategoryDto | null;
  prices: PriceDto[];
}

interface PriceScrapTableTypes {
  onRowClick?: (action: string, row: ProductItem) => void;
}

const PriceScrapTable: React.FC<PriceScrapTableTypes> = (props) => {
  const { onRowClick } = props;

  const dispatch = useDispatch<AppDispatch>();

  // Filter states
  const [nameFilter, setNameFilter] = useState<string>("");
  const [debouncedNameFilter, setDebouncedNameFilter] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  const loading = useSelector(selectGetPriceScrapProductsLoading);
  const productsData = useSelector(selectGetPriceScrapProductsData);

  // Debounce name filter
  useDebounce(
    () => {
      setDebouncedNameFilter(nameFilter);
    },
    [nameFilter],
    500
  );

  // Convert Jalali date to ISO format
  const convertJalaliToISO = (jalaliDate: string): string => {
    if (!jalaliDate) return "";
    try {
      const m = moment(jalaliDate, "jYYYY/jMM/jDD");
      if (!m.isValid()) return "";
      // Set time to start of day (00:00:00)
      const startOfDay = m.toDate();
      startOfDay.setHours(0, 0, 0, 0);
      return startOfDay.toISOString();
    } catch (error) {
      console.error("Error converting Jalali date:", error);
      return "";
    }
  };

  // Convert Jalali date to ISO format for end of day
  const convertJalaliToISOEnd = (jalaliDate: string): string => {
    if (!jalaliDate) return "";
    try {
      const m = moment(jalaliDate, "jYYYY/jMM/jDD");
      if (!m.isValid()) return "";
      // Set time to end of day (23:59:59.999)
      const endOfDay = m.toDate();
      endOfDay.setHours(23, 59, 59, 999);
      return endOfDay.toISOString();
    } catch (error) {
      console.error("Error converting Jalali date:", error);
      return "";
    }
  };

  // Build query parameters
  const buildQuery = useMemo(() => {
    const params: any = {};
    if (debouncedNameFilter.trim()) {
      params.name = debouncedNameFilter.trim();
    }
    if (fromDate) {
      const isoDate = convertJalaliToISO(fromDate);
      if (isoDate) {
        params.from_date = isoDate;
      }
    }
    if (toDate) {
      const isoDate = convertJalaliToISOEnd(toDate);
      if (isoDate) {
        params.to_date = isoDate;
      }
    }
    return params;
  }, [debouncedNameFilter, fromDate, toDate]);

  // Load data on mount
  useEffect(() => {
    dispatch(GetPriceScrapProductsAction({}));
    setIsInitialLoad(false);
  }, [dispatch]);

  // Load data when filters change (after initial load)
  useEffect(() => {
    if (!isInitialLoad) {
      dispatch(GetPriceScrapProductsAction(buildQuery));
    }
  }, [dispatch, buildQuery, isInitialLoad]);

  // Format date for display
  const formatDate = (dateString: string): string => {
    if (!dateString) return "-";
    try {
      const m = moment(dateString);
      return m.locale("fa").format("jYYYY/jMM/jDD HH:mm");
    } catch (error) {
      return dateString;
    }
  };

  // Format price with thousand separators
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  // Get latest price (first item in prices array as it's sorted descending)
  const getLatestPrice = (prices: PriceDto[]): PriceDto | null => {
    if (!prices || prices.length === 0) return null;
    return prices[0];
  };

  return (
    <CollectionControls
      hasBox={false}
      isLoading={loading}
      data={productsData}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>نام محصول</TableHeadCell>
            <TableHeadCell>دسته‌بندی</TableHeadCell>
            <TableHeadCell>قیمت عمده (آخرین)</TableHeadCell>
            <TableHeadCell>قیمت خرده (آخرین)</TableHeadCell>
            <TableHeadCell>تاریخ آخرین قیمت</TableHeadCell>
            <TableHeadCell>تعداد قیمت‌ها</TableHeadCell>
            <TableHeadCell>تاریخ ایجاد محصول</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableFilterCell>
              <Input
                placeholder="جستجو در نام محصول..."
                value={nameFilter}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNameFilter(e.target.value)
                }
                noBorder
                size="full"
              />
            </TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell>
              <div className="flex gap-2">
                <JalaliDatepicker
                  value={fromDate}
                  onChange={(date: string) => setFromDate(date)}
                  placeholder="از تاریخ"
                  noBorder
                  size="full"
                />
                <JalaliDatepicker
                  value={toDate}
                  onChange={(date: string) => setToDate(date)}
                  placeholder="تا تاریخ"
                  noBorder
                  size="full"
                />
              </div>
            </TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
          </TableRow>
          {!loading ? (
            productsData && productsData.length > 0 ? (
              productsData.map((row: ProductItem) => {
                const latestPrice = getLatestPrice(row.prices);
                return (
                  <TableRow
                    key={row._id}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => onRowClick && onRowClick("view", row)}
                  >
                    <TableCell>
                      <div className="font-medium text-gray-900">{row.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {row.slug}
                      </div>
                    </TableCell>
                    <TableCell>
                      {row.category ? (
                        <div>
                          <div className="font-medium">{row.category.name}</div>
                          {row.category.description && (
                            <div className="text-xs text-gray-500 mt-1">
                              {row.category.description}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {latestPrice ? (
                        <div className="font-semibold text-green-600">
                          {formatPrice(latestPrice.wholesale_price)} تومان
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {latestPrice ? (
                        <div className="font-semibold text-blue-600">
                          {formatPrice(latestPrice.retail_price)} تومان
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {latestPrice ? (
                        <div className="text-sm">
                          {formatDate(latestPrice.createdAt)}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          {row.prices?.length || 0}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600">
                        {formatDate(row.createdAt)}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="flex justify-center !py-8">
                  <EmptyImage />
                </TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="flex justify-center !py-8">
                <TableSkeleton />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CollectionControls>
  );
};

export default PriceScrapTable;

