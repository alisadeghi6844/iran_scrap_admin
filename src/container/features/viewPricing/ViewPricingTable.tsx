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
import TableFilterCell from "../../../components/table/TableFilterCell";
import TableCell from "../../../components/table/TableCell";
import EmptyImage from "../../../components/image/EmptyImage";
import TableSkeleton from "../../organism/skeleton/TableSkeleton";

import {
  selectGetProductPriceData,
  selectGetProductPriceLoading,
} from "../../../redux/slice/productPrice/ProductPriceSlice";
import { GetProductPriceAction } from "../../../redux/actions/productPrice/ProductPriceActions";

import { formatNumber } from "../../../utils/NumberFormated";
import { SelectOptionTypes } from "../../../types/features/FeatureSelectTypes";
import { convertToJalali } from "../../../utils/MomentConvertor";

// Import filter components
import ProductFilterSelect from "./filters/ProductFilterSelect";
import BrandFilterSelect from "./filters/BrandFilterSelect";
import ProviderFilterSelect from "./filters/ProviderFilterSelect";
import PortFilterSelect from "./filters/PortFilterSelect";
import PaymentTypeFilterSelect from "./filters/PaymentTypeFilterSelect";

import {
  buildProductPriceFilterQuery,
  calculateStatus,
  getLast10DaysRange,
  getPaymentTypeLabel,
} from "./viewPricingTable.utils";

interface ViewPricingItem {
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

type ViewPricingTypes = object;

const ViewPricingTable: React.FC<ViewPricingTypes> = () => {
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
  // Default sort: newest first
  const sortBy = "createdAt";
  const sortOrder = "desc";

  const getFilterInitialValues = () => ({
    Product: productFilter,
    Brand: brandFilter,
    Provider: providerFilter,
    Port: portFilter,
    PaymentType: paymentTypeFilter,
  });

  const loading = useSelector(selectGetProductPriceLoading);
  const productPriceData = useSelector(selectGetProductPriceData);

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
    };

    const filterString = handleFilterParameters(filterData);
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

  const handleFilterParameters = (data: unknown) =>
    buildProductPriceFilterQuery(data);

  // Get all data without status filtering
  const getFilteredData = () => {
    if (!productPriceData?.data) return [];
    return [...productPriceData.data];
  };

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



  return (
    <CollectionControls
      buttons={[]}
      hasBox={false}
      filterInitialValues={getFilterInitialValues()}
      onFilter={handleFilterParameters}
      data={productPriceData}
      onMetaChange={handleFilter}
    >
      <Table className="w-full" isLoading={false} shadow={false}>
        <TableHead className="w-full" isLoading={false} shadow={false}>
          <TableRow>
            <TableHeadCell>ردیف</TableHeadCell>
            <TableHeadCell>کالا</TableHeadCell>
            <TableHeadCell>برند</TableHeadCell>
            <TableHeadCell>محل بارگیری</TableHeadCell>
            <TableHeadCell>نوع پرداخت</TableHeadCell>
            <TableHeadCell>قیمت فروش</TableHeadCell>
            <TableHeadCell>وضعیت</TableHeadCell>
            <TableHeadCell>تاریخ درج قیمت</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell>
              <ProductFilterSelect
                name="Product"
                value={productFilter}
                onChange={handleProductFilterChange}
                placeholder="انتخاب کالا..."
              />
            </TableFilterCell>
            <TableFilterCell>
              <BrandFilterSelect
                name="Brand"
                value={brandFilter}
                onChange={handleBrandFilterChange}
                placeholder="انتخاب برند..."
              />
            </TableFilterCell>
            <TableFilterCell>
              <PortFilterSelect
                name="Port"
                value={portFilter}
                onChange={handlePortFilterChange}
                placeholder="انتخاب محل بارگیری..."
              />
            </TableFilterCell>
            <TableFilterCell>
              <PaymentTypeFilterSelect
                name="PaymentType"
                value={paymentTypeFilter}
                onChange={handlePaymentTypeFilterChange}
                placeholder="انتخاب نوع پرداخت..."
              />
            </TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
          </TableRow>
          {!loading ? (
            getFilteredData().length > 0 ? (
              getFilteredData().map((row: ViewPricingItem, index: number) => {
                const rowId = row._id || row.id || "";
                const statusInfo =
                  row?.sellPrice && row?.constant
                    ? calculateStatus(row.sellPrice, row.constant)
                    : null;

                return (
                  <TableRow key={rowId}>
                    <TableCell className={statusInfo?.textColor}>
                      {index + 1}
                    </TableCell>
                    <TableCell className={statusInfo?.textColor}>
                      {row?.productId?.name ?? "_"}
                    </TableCell>
                    <TableCell className={statusInfo?.textColor}>
                      {row?.brandId?.name ?? "_"}
                    </TableCell>
          
                    <TableCell className={statusInfo?.textColor}>
                      {row?.portId?.name ?? "_"}
                    </TableCell>
                    <TableCell className={statusInfo?.textColor}>
                      {getPaymentTypeLabel(row?.paymentType) ?? "_"}
                    </TableCell>
                    <TableCell className={statusInfo?.textColor}>
                      {row?.sellPrice
                        ? formatNumber(row?.sellPrice) + " تومان"
                        : "_"}
                    </TableCell>
                    <TableCell>
                      {statusInfo ? (
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
                        >
                          {statusInfo.label}
                        </span>
                      ) : (
                        "_"
                      )}
                    </TableCell>
                    <TableCell className={statusInfo?.textColor}>
                      {row?.updatedAt ? convertToJalali(row.updatedAt) : "_"}
                    </TableCell>
                  </TableRow>
                );
              })
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

export default ViewPricingTable;
