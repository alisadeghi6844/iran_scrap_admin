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
  selectUpdateProductPriceData,
} from "../../../redux/slice/productPrice/ProductPriceSlice";
import {
  GetProductPriceAction,
  UpdateProductPriceAction,
} from "../../../redux/actions/productPrice/ProductPriceActions";

import { formatNumber } from "../../../utils/NumberFormated";
import { SelectOptionTypes } from "../../../types/features/FeatureSelectTypes";
import { convertToJalali } from "../../../utils/MomentConvertor";

import moment from "jalali-moment";
import Input from "../../../components/input";

// Import filter components
import ProductFilterSelect from "./filters/ProductFilterSelect";
import BrandFilterSelect from "./filters/BrandFilterSelect";
import ProviderFilterSelect from "./filters/ProviderFilterSelect";
import PortFilterSelect from "./filters/PortFilterSelect";
import PaymentTypeFilterSelect from "./filters/PaymentTypeFilterSelect";
import StatusFilterSelect from "./filters/StatusFilterSelect";
import { FaCheck, FaTimes } from "react-icons/fa";

interface PurchasePriceItem {
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

type PurchasePriceTypes = object;

const PurchasePriceTable: React.FC<PurchasePriceTypes> = () => {
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
  // State for buy price editing
  const [buyPrices, setBuyPrices] = useState<{ [key: string]: string }>({});
  const [editingRows, setEditingRows] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [originalPrices, setOriginalPrices] = useState<{
    [key: string]: string;
  }>({});

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

  // Filter data based on status (frontend filtering since status is calculated)
  const getFilteredData = () => {
    if (!productPriceData?.data) return [];

    let filteredData = [...productPriceData.data];

    // Filter by status if selected
    if (statusFilter?.value) {
      filteredData = filteredData.filter((item: PurchasePriceItem) => {
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
    if (updateData?.status == 200) {
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
  }, [updateData, dispatch]);

  // Initialize buy prices when data loads
  useEffect(() => {
    if (productPriceData?.data) {
      const initialPrices: { [key: string]: string } = {};
      const initialOriginalPrices: { [key: string]: string } = {};
      productPriceData.data.forEach((item: PurchasePriceItem) => {
        const id = item._id || item.id || "";
        const priceStr = item.buyPrice?.toString() || "";
        initialPrices[id] = priceStr;
        initialOriginalPrices[id] = priceStr;
      });
      setBuyPrices(initialPrices);
      setOriginalPrices(initialOriginalPrices);
    }
  }, [productPriceData]);

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

  // Handle buy price change
  const handleBuyPriceChange = (rowId: string, value: string) => {
    setBuyPrices((prev) => ({
      ...prev,
      [rowId]: value,
    }));

    // Set editing state when user starts typing
    setEditingRows((prev) => ({
      ...prev,
      [rowId]: true,
    }));
  };

  // Handle save (check button)
  const handleSavePrice = (row: PurchasePriceItem) => {
    const rowId = row._id || row.id || "";
    const newPrice = parseFloat(buyPrices[rowId] || "0");

    if (!isNaN(newPrice) && newPrice >= 0) {
      console.log("new price", newPrice);
      dispatch(
        UpdateProductPriceAction({
          id: rowId,
          credentials: { buyPrice: newPrice },
        })
      );

      // Update original price and clear editing state
      setOriginalPrices((prev) => ({
        ...prev,
        [rowId]: newPrice.toString(),
      }));

      setEditingRows((prev) => ({
        ...prev,
        [rowId]: false,
      }));
    }
  };

  // Handle cancel (X button)
  const handleCancelPrice = (rowId: string) => {
    // Restore original price
    setBuyPrices((prev) => ({
      ...prev,
      [rowId]: originalPrices[rowId] || "",
    }));

    // Clear editing state
    setEditingRows((prev) => ({
      ...prev,
      [rowId]: false,
    }));
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

  const handleStatusFilterChange = (value: SelectOptionTypes | null) => {
    setStatusFilter(value);
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
            <TableHeadCell>قیمت خرید</TableHeadCell>
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
            <TableFilterCell>
              <StatusFilterSelect
                name="Status"
                value={statusFilter}
                onChange={handleStatusFilterChange}
                placeholder="انتخاب وضعیت..."
              />
            </TableFilterCell>
            <TableFilterCell></TableFilterCell>
          </TableRow>
          {!loading ? (
            getFilteredData().length > 0 ? (
              getFilteredData().map((row: PurchasePriceItem, index: number) => {
                const rowId = row._id || row.id || "";
                const statusInfo =
                  row?.sellPrice && row?.constant
                    ? calculateStatus(row.sellPrice, row.constant)
                    : null;

                const isEditing = editingRows[rowId] || false;

                return (
                  <TableRow
                    key={rowId}
                    className={statusInfo ? statusInfo.textColor : ""}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row?.productId?.name ?? "_"}</TableCell>
                    <TableCell>{row?.brandId?.name ?? "_"}</TableCell>
                    <TableCell>{row?.providerId?.name ?? "_"}</TableCell>
                    <TableCell>{row?.portId?.name ?? "_"}</TableCell>
                    <TableCell>
                      {getPaymentTypeLabel(row?.paymentType) ?? "_"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 w-[200px]">
                        <Input
                          type="number"
                          value={buyPrices[rowId] || ""}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleBuyPriceChange(rowId, e.target.value)
                          }
                          placeholder="قیمت خرید"
                          className="w-32"
                        />
                        {isEditing && (
                          <>
                            <button
                              onClick={() => handleSavePrice(row)}
                              className="text-green-600 hover:text-green-800 p-1"
                              title="ذخیره"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleCancelPrice(rowId)}
                              className="text-red-600 hover:text-red-800 p-1"
                              title="لغو"
                            >
                              <FaTimes />
                            </button>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
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
                    <TableCell>
                      {row?.updatedAt ? convertToJalali(row.updatedAt) : "_"}
                    </TableCell>
                  </TableRow>
                );
              })
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

export default PurchasePriceTable;
