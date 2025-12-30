import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { HandleFilterParams } from "../../../types/FilterParams";
import CollectionControls from "../../organism/CollectionControls";
import Table from "../../../components/table";
import TableHead from "../../../components/table/TableHead";
import TableHeadCell from "../../../components/table/TableHeadCell";
import TableRow from "../../../components/table/TableRow";
import TableBody from "../../../components/table/TableBody";
import TableCell from "../../../components/table/TableCell";
import EmptyImage from "../../../components/image/EmptyImage";
import TableSkeleton from "../../organism/skeleton/TableSkeleton";

import {
  selectCreateProductPriceData,
  selectGetProductPriceData,
  selectGetProductPriceLoading,
  selectUpdateProductPriceData,
  selectDeleteProductPriceData,
} from "../../../redux/slice/productPrice/ProductPriceSlice";
import { GetProductPriceAction } from "../../../redux/actions/productPrice/ProductPriceActions";

import { SelectOptionTypes } from "../../../types/features/FeatureSelectTypes";
import {
  buildProductPriceFilterQuery,
  calculateStatus,
  getLast10DaysRange,
  getPaymentTypeLabel,
} from "./components/ProductPriceTable/utils";

// Import filter components
import FiltersRow from "./components/ProductPriceTable/FiltersRow";
import ProductPriceRow from "./components/ProductPriceTable/ProductPriceRow";

interface ProductPriceItem {
  _id?: string;
  id?: string;
  productId: {
    id: string;
    name: string;
  };
  brandId: {
    id: string;
    name: string;
  };
  providerId: {
    id: string;
    name: string;
  };
  portId: {
    id: string;
    name: string;
  };
  paymentType: string;
  showInApp: boolean;
  showInPanel: boolean;
  buyPrice: number;
  constant: number;
  sellPrice: number;
  createdAt: number;
  updatedAt: number;
}

interface ProductPriceTypes {
  onRowClick?: (action: string, row: ProductPriceItem) => void;
}

const ProductPriceTable: React.FC<ProductPriceTypes> = (props) => {
  const { onRowClick } = props;

  const dispatch = useDispatch<AppDispatch>();

  // Filter states
  const [productFilter, setProductFilter] = useState<SelectOptionTypes | null>(
    null
  );
  const [brandFilter, setBrandFilter] = useState<SelectOptionTypes | null>(
    null
  );
  const [providerFilter, setProviderFilter] =
    useState<SelectOptionTypes | null>(null);
  const [portFilter, setPortFilter] = useState<SelectOptionTypes | null>(null);
  const [paymentTypeFilter, setPaymentTypeFilter] =
    useState<SelectOptionTypes | null>(null);
  const [statusFilter, setStatusFilter] = useState<SelectOptionTypes | null>(
    null
  );

  // Default sort: newest first
  const sortBy = "createdAt";
  const sortOrder = "desc";

  const getFilterInitialValues = () => ({
    Product: productFilter,
    Brand: brandFilter,
    Provider: providerFilter,
    Port: portFilter,
    PaymentType: paymentTypeFilter,
    Status: statusFilter,
  });

  const loading = useSelector(selectGetProductPriceLoading);
  const productPriceData = useSelector(selectGetProductPriceData);
  const updateData = useSelector(selectUpdateProductPriceData);
  const createData = useSelector(selectCreateProductPriceData);
  const deleteData = useSelector(selectDeleteProductPriceData);

  useEffect(() => {
    const dateRange = getLast10DaysRange();
    dispatch(
      GetProductPriceAction({
        page: 0,
        size: 10,
        include: ["brand", "provider", "product", "port"],
        sortBy: sortBy,
        sortOrder: sortOrder,
        datef: dateRange.datef,
        datet: dateRange.datet,
      })
    );
  }, [dispatch]);

  // Trigger filtering when filter values change
  useEffect(() => {
    const filterData = {
      Product: productFilter,
      Brand: brandFilter,
      Provider: providerFilter,
      Port: portFilter,
      PaymentType: paymentTypeFilter,
      Status: statusFilter,
    };

    const filterString = buildProductPriceFilterQuery(filterData);
    const dateRange = getLast10DaysRange();

    // Always dispatch the action - if no filters are applied, it will load all data
    dispatch(
      GetProductPriceAction({
        filter: filterString || undefined, // Pass undefined instead of empty string when no filters
        page: 0,
        size: 10,
        include: ["brand", "provider", "product", "port"],
        sortBy: sortBy,
        sortOrder: sortOrder,
        datef: dateRange.datef,
        datet: dateRange.datet,
      })
    );
  }, [
    productFilter,
    brandFilter,
    providerFilter,
    portFilter,
    paymentTypeFilter,
    statusFilter,
    dispatch,
  ]);

  const handleFilter = ({ filter, page, pageSize }: HandleFilterParams) => {
    const dateRange = getLast10DaysRange();
    dispatch(
      GetProductPriceAction({
        filter,
        page: page ?? 0,
        size: pageSize ?? 10,
        include: ["brand", "provider", "product", "port"],
        sortBy: sortBy,
        sortOrder: sortOrder,
        datef: dateRange.datef,
        datet: dateRange.datet,
      })
    );
  };

  // Filter data based on status (frontend filtering since status is calculated)
  const getFilteredData = () => {
    if (!productPriceData?.data) return [];

    let filteredData = [...productPriceData.data];

    // Filter by status if selected
    if (statusFilter?.value) {
      filteredData = filteredData.filter((item: ProductPriceItem) => {
        if (item.sellPrice && item.constant) {
          const status = calculateStatus(item.sellPrice, item.constant);
          return status.value === statusFilter.value;
        }
        return false;
      });
    }

    return filteredData;
  };

  useEffect(() => {
    if (
      updateData?.status == 200 ||
      createData?.status == 201 ||
      deleteData?.status == 200
    ) {
      const dateRange = getLast10DaysRange();
      dispatch(
        GetProductPriceAction({
          page: 0,
          size: 10,
          include: ["brand", "provider", "product", "port"],
          sortBy: sortBy,
          sortOrder: sortOrder,
          datef: dateRange.datef,
          datet: dateRange.datet,
        })
      );
    }
  }, [updateData, createData, deleteData, dispatch]);

  // Handle filter changes
  const handleProductFilterChange = (value: SelectOptionTypes | null) => {
    setProductFilter(value);
  };

  const handleBrandFilterChange = (value: SelectOptionTypes | null) => {
    setBrandFilter(value);
  };

  const handleProviderFilterChange = (value: SelectOptionTypes | null) => {
    setProviderFilter(value);
  };

  const handlePortFilterChange = (value: SelectOptionTypes | null) => {
    setPortFilter(value);
  };

  const handlePaymentTypeFilterChange = (value: SelectOptionTypes | null) => {
    setPaymentTypeFilter(value);
  };

  const handleStatusFilterChange = (value: SelectOptionTypes | null) => {
    setStatusFilter(value);
  };

  return (
    <CollectionControls
      buttons={["create"]}
      createTitle="ساخت قیمت گذاری جدید"
      hasBox={false}
      filterInitialValues={getFilterInitialValues()}
      onFilter={buildProductPriceFilterQuery}
      data={productPriceData}
      onMetaChange={handleFilter}
      onButtonClick={(button) => {
        if (onRowClick) {
          if (button === "create") {
            onRowClick("create", {} as ProductPriceItem);
          }
        }
      }}
    >
      <Table className="w-full" isLoading={false} shadow={false}>
        <TableHead className="w-full" isLoading={false} shadow={false}>
          <TableRow>
            <TableHeadCell>ردیف</TableHeadCell>
            <TableHeadCell>کالا</TableHeadCell>
            <TableHeadCell>برند</TableHeadCell>
            <TableHeadCell>تامین کننده</TableHeadCell>
            <TableHeadCell>محل بارگیری</TableHeadCell>
            <TableHeadCell>نوع پرداخت</TableHeadCell>
            <TableHeadCell>قیمت ثابت</TableHeadCell>
            <TableHeadCell>قیمت خرید</TableHeadCell>
            <TableHeadCell>قیمت فروش</TableHeadCell>
            <TableHeadCell>وضعیت</TableHeadCell>
            <TableHeadCell>تاریخ ایجاد</TableHeadCell>
            <TableHeadCell>عملیات</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <FiltersRow
            productFilter={productFilter}
            onProductChange={handleProductFilterChange}
            brandFilter={brandFilter}
            onBrandChange={handleBrandFilterChange}
            providerFilter={providerFilter}
            onProviderChange={handleProviderFilterChange}
            portFilter={portFilter}
            onPortChange={handlePortFilterChange}
            paymentTypeFilter={paymentTypeFilter}
            onPaymentTypeChange={handlePaymentTypeFilterChange}
            statusFilter={statusFilter}
            onStatusChange={handleStatusFilterChange}
          />
          {!loading ? (
            getFilteredData().length > 0 ? (
              getFilteredData().map((row: ProductPriceItem, index: number) => {
                const statusInfo =
                  row?.sellPrice && row?.constant
                    ? calculateStatus(row.sellPrice, row.constant)
                    : null;

                return (
                  <ProductPriceRow
                    row={row}
                    index={index}
                    statusInfo={statusInfo}
                    getPaymentTypeLabel={getPaymentTypeLabel}
                    onEdit={() => {
                      if (onRowClick) {
                        onRowClick("update", row);
                      }
                    }}
                    onDelete={() => {
                      if (onRowClick) {
                        onRowClick("delete", row);
                      }
                    }}
                  />
                );
              })
            ) : (
              <TableRow>
                <TableCell colspan="11" className="flex justify-center !py-4">
                  <EmptyImage />
                </TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell colspan="11" className="flex justify-center !py-4">
                <TableSkeleton />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CollectionControls>
  );
};

export default ProductPriceTable;
