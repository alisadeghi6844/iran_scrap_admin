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
import moment from "jalali-moment";

// Import filter components
import ProductFilterSelect from "./filters/ProductFilterSelect";
import BrandFilterSelect from "./filters/BrandFilterSelect";
import ProviderFilterSelect from "./filters/ProviderFilterSelect";
import PortFilterSelect from "./filters/PortFilterSelect";
import PaymentTypeFilterSelect from "./filters/PaymentTypeFilterSelect";


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

  const handleFilterParameters = (data: unknown) => {
    const { Product, Brand, Provider, Port, PaymentType } = data as {
      Product?: SelectOptionTypes;
      Brand?: SelectOptionTypes;
      Provider?: SelectOptionTypes;
      Port?: SelectOptionTypes;
      PaymentType?: SelectOptionTypes;
    };

    let queryParam = "";
    if (Product?.value) queryParam += "productId=" + Product.value + ",";
    if (Brand?.value) queryParam += "brandId=" + Brand.value + ",";
    if (Provider?.value) queryParam += "providerId=" + Provider.value + ",";
    if (Port?.value) queryParam += "portId=" + Port.value + ",";
    if (PaymentType?.value)
      queryParam += "paymentType=" + PaymentType.value + ",";

    return queryParam.substring(0, queryParam.length - 1);
  };

  // Get all data without status filtering
  const getFilteredData = () => {
    if (!productPriceData?.data) return [];
    return [...productPriceData.data];
  };

  const getPaymentTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      CASH: "نقدی",
      INSTALLMENT1: "1 ماهه",
      INSTALLMENT2: "2 ماهه",
      INSTALLMENT3: "3 ماهه",
      INSTALLMENT4: "4 ماهه",
      INSTALLMENT5: "5 ماهه",
      INSTALLMENT6: "6 ماهه",
    };
    return types[type] || type;
  };

  // Calculate status based on sellPrice and constant
  const calculateStatus = (sellPrice: number, constant: number) => {
    const S = sellPrice > 0 ? constant / sellPrice : 0;

    if (S >= 0.12)
      return {
        label: "سوپر الماسی",
        color: "text-purple-600 bg-purple-100",
        textColor: "text-purple-600",
        value: "SUPER_DIAMOND",
      };
    if (S >= 0.08)
      return {
        label: "الماسی",
        color: "text-blue-600 bg-blue-100",
        textColor: "text-blue-600",
        value: "DIAMOND",
      };
    if (S >= 0.05)
      return {
        label: "طلایی",
        color: "text-yellow-600 bg-yellow-100",
        textColor: "text-yellow-600",
        value: "GOLD",
      };
    if (S >= 0.03)
      return {
        label: "نقره‌ای",
        color: "text-gray-600 bg-gray-100",
        textColor: "text-gray-600",
        value: "SILVER",
      };
    return {
      label: "برنزی",
      color: "text-orange-600 bg-orange-100",
      textColor: "text-orange-600",
      value: "BRONZE",
    };
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



  // Get date range for last 10 days
  const getLast10DaysRange = () => {
    const today = moment();
    const tenDaysAgo = moment().subtract(10, "days");

    return {
      datef: tenDaysAgo.valueOf().toString(), // 10 روز قبل
      datet: today.valueOf().toString(), // امروز
    };
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
            <TableHeadCell>تامین کننده</TableHeadCell>
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
              <ProviderFilterSelect
                name="Provider"
                value={providerFilter}
                onChange={handleProviderFilterChange}
                placeholder="انتخاب تامین کننده..."
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
                      {row?.providerId?.name ?? "_"}
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
