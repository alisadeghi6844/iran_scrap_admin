import React, { useEffect, useState, useCallback, useMemo } from "react";
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
  UpdatePurchasePriceAction,
} from "../../../redux/actions/productPrice/ProductPriceActions";

import { formatNumber } from "../../../utils/NumberFormated";
import { SelectOptionTypes } from "../../../types/features/FeatureSelectTypes";
import { convertToJalali } from "../../../utils/MomentConvertor";
import { calculateProductStatus } from "../../../utils/ProductStatusCalculator";
import { 
  calculatePurchasePrice, 
  safeCalculatePurchasePrice,
  PurchasePriceCalculation 
} from "../../../utils/PurchasePriceCalculator";

import moment from "jalali-moment";
import Input from "../../../components/input";
import { toast } from "react-toastify";

// Import filter components
import ProductFilterSelect from "./filters/ProductFilterSelect";
import BrandFilterSelect from "./filters/BrandFilterSelect";
import ProviderFilterSelect from "./filters/ProviderFilterSelect";
import PortFilterSelect from "./filters/PortFilterSelect";
import PaymentTypeFilterSelect from "./filters/PaymentTypeFilterSelect";

import { FaCheck, FaTimes } from "react-icons/fa";

// Custom hook for debouncing
const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

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
  // State for buy price editing and calculations
  const [buyPrices, setBuyPrices] = useState<{ [key: string]: string }>({});
  const [editingRows, setEditingRows] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [originalPrices, setOriginalPrices] = useState<{
    [key: string]: string;
  }>({});
  
  // State for calculated values and validation
  const [calculatedValues, setCalculatedValues] = useState<{
    [key: string]: PurchasePriceCalculation | null;
  }>({});
  
  // State for validation errors and loading
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string | null;
  }>({});
  
  // State for loading individual rows
  const [savingRows, setSavingRows] = useState<{
    [key: string]: boolean;
  }>({});

  // Debounced buy prices for calculation
  const debouncedBuyPrices = useDebounce(buyPrices, 300);

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

  // Memoized filtered data to prevent unnecessary re-renders
  const filteredData = useMemo(() => {
    if (!productPriceData?.data) return [];
    return [...productPriceData.data];
  }, [productPriceData?.data]);

  // Get all data without status filtering
  const getFilteredData = useCallback(() => {
    return filteredData;
  }, [filteredData]);

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

  // Cleanup calculation state for rows that are no longer being edited
  useEffect(() => {
    const activeRowIds = Object.keys(editingRows).filter(id => editingRows[id]);
    const calculatedRowIds = Object.keys(calculatedValues);
    const validationRowIds = Object.keys(validationErrors);

    // Clean up calculated values for inactive rows
    calculatedRowIds.forEach(rowId => {
      if (!activeRowIds.includes(rowId)) {
        setCalculatedValues(prev => {
          const newState = { ...prev };
          delete newState[rowId];
          return newState;
        });
      }
    });

    // Clean up validation errors for inactive rows
    validationRowIds.forEach(rowId => {
      if (!activeRowIds.includes(rowId)) {
        setValidationErrors(prev => {
          const newState = { ...prev };
          delete newState[rowId];
          return newState;
        });
      }
    });
  }, [editingRows]);

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

  // Memoized validation function for buy price
  const validateBuyPrice = useCallback((value: string): string | null => {
    if (!value || value.trim() === '') {
      return 'قیمت خرید الزامی است';
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      return 'قیمت خرید باید عدد باشد';
    }

    if (numValue < 0) {
      return 'قیمت خرید نمی‌تواند منفی باشد';
    }

    if (numValue > 999999999) {
      return 'قیمت خرید خیلی زیاد است';
    }

    return null;
  }, []);

  // Memoized calculation function
  const performCalculation = useCallback((rowId: string, buyPrice: number, row: PurchasePriceItem) => {
    const constant = row.constant || 0;
    
    if (buyPrice >= 0 && constant >= 0) {
      const calculation = safeCalculatePurchasePrice({
        buyPrice,
        constant,
        paymentType: row.paymentType
      });

      setCalculatedValues((prev) => ({
        ...prev,
        [rowId]: calculation,
      }));
    } else {
      setCalculatedValues((prev) => ({
        ...prev,
        [rowId]: null,
      }));
    }
  }, []);

  // Effect for debounced calculations
  useEffect(() => {
    const currentData = productPriceData?.data || [];
    
    Object.entries(debouncedBuyPrices).forEach(([rowId, value]) => {
      if (editingRows[rowId] && value) {
        const row = currentData.find((item: PurchasePriceItem) => 
          (item._id || item.id) === rowId
        );
        
        if (row) {
          const validationError = validateBuyPrice(value);
          setValidationErrors((prev) => ({
            ...prev,
            [rowId]: validationError,
          }));

          if (!validationError) {
            const buyPrice = parseFloat(value) || 0;
            performCalculation(rowId, buyPrice, row);
          } else {
            setCalculatedValues((prev) => ({
              ...prev,
              [rowId]: null,
            }));
          }
        }
      }
    });
  }, [debouncedBuyPrices, editingRows, productPriceData?.data, validateBuyPrice, performCalculation]);

  // Optimized buy price change handler (no immediate calculation)
  const handleBuyPriceChange = useCallback((rowId: string, value: string, row: PurchasePriceItem) => {
    setBuyPrices((prev) => ({
      ...prev,
      [rowId]: value,
    }));

    // Set editing state when user starts typing
    setEditingRows((prev) => ({
      ...prev,
      [rowId]: true,
    }));
  }, []);

  // Handle save (check button) with validation, error handling, and loading states
  const handleSavePrice = async (row: PurchasePriceItem) => {
    const rowId = row._id || row.id || "";
    const newBuyPrice = parseFloat(buyPrices[rowId] || "0");
    const calculatedData = calculatedValues[rowId];
    const validationError = validationErrors[rowId];

    // Check validation
    if (validationError) {
      toast.error(validationError);
      return;
    }

    if (!calculatedData) {
      toast.error('خطا در محاسبه قیمت فروش و وضعیت');
      return;
    }

    if (isNaN(newBuyPrice) || newBuyPrice < 0) {
      toast.error('قیمت خرید نامعتبر است');
      return;
    }

    // Set loading state
    setSavingRows((prev) => ({
      ...prev,
      [rowId]: true,
    }));

    try {
      console.log("Saving with calculated values:", {
        buyPrice: newBuyPrice,
        sellPrice: calculatedData.sellPrice,
        status: calculatedData.status.value
      });
      
      await dispatch(
        UpdatePurchasePriceAction({
          id: rowId,
          credentials: { 
            buyPrice: newBuyPrice,
            sellPrice: calculatedData.sellPrice,
            status: calculatedData.status.value
          },
          sellPrice: calculatedData.sellPrice,
          constant: row.constant,
        })
      );

      // Update original price and clear editing state
      setOriginalPrices((prev) => ({
        ...prev,
        [rowId]: newBuyPrice.toString(),
      }));

      setEditingRows((prev) => ({
        ...prev,
        [rowId]: false,
      }));

      // Clear calculated values and validation errors
      setCalculatedValues((prev) => ({
        ...prev,
        [rowId]: null,
      }));

      setValidationErrors((prev) => ({
        ...prev,
        [rowId]: null,
      }));

      // Success feedback
      toast.success('قیمت با موفقیت به‌روزرسانی شد');

    } catch (error) {
      console.error('Error saving price:', error);
      toast.error('خطا در ذخیره قیمت');
      
      // Restore original values on error
      setBuyPrices((prev) => ({
        ...prev,
        [rowId]: originalPrices[rowId] || "",
      }));

      setCalculatedValues((prev) => ({
        ...prev,
        [rowId]: null,
      }));

      setValidationErrors((prev) => ({
        ...prev,
        [rowId]: null,
      }));
    } finally {
      // Clear loading state
      setSavingRows((prev) => ({
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

    // Clear calculated values and validation errors
    setCalculatedValues((prev) => ({
      ...prev,
      [rowId]: null,
    }));

    setValidationErrors((prev) => ({
      ...prev,
      [rowId]: null,
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
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
          </TableRow>
          {!loading ? (
            getFilteredData().length > 0 ? (
              getFilteredData().map((row: PurchasePriceItem, index: number) => {
                const rowId = row._id || row.id || "";
                const calculatedData = calculatedValues[rowId];
                const isEditing = editingRows[rowId] || false;
                const validationError = validationErrors[rowId];
                const isSaving = savingRows[rowId] || false;
                
                // Use calculated values if available, otherwise use original values
                const displaySellPrice = calculatedData ? calculatedData.sellPrice : row.sellPrice;
                const displayStatus = calculatedData ? calculatedData.status : (
                  row?.sellPrice && row?.constant
                    ? calculateProductStatus(row.sellPrice, row.constant)
                    : null
                );

                return (
                  <TableRow
                    key={rowId}
                    className={displayStatus ? displayStatus.textColor : ""}
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
                      <div className="flex flex-col gap-1 w-[200px]">
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={buyPrices[rowId] || ""}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              handleBuyPriceChange(rowId, e.target.value, row)
                            }
                            placeholder="قیمت خرید"
                            className={`w-32 ${validationErrors[rowId] ? 'border-red-500' : ''}`}
                            disabled={isSaving}
                          />
                          {isEditing && (
                            <>
                              <button
                                onClick={() => handleSavePrice(row)}
                                className={`p-1 ${
                                  !calculatedData || validationErrors[rowId] || isSaving
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-secondary-600 hover:text-secondary-800'
                                }`}
                                title={isSaving ? "در حال ذخیره..." : "ذخیره"}
                                disabled={!calculatedData || !!validationErrors[rowId] || isSaving}
                              >
                                {isSaving ? (
                                  <div className="animate-spin w-4 h-4 border-2 border-secondary-600 border-t-transparent rounded-full"></div>
                                ) : (
                                  <FaCheck />
                                )}
                              </button>
                              <button
                                onClick={() => handleCancelPrice(rowId)}
                                className={`p-1 ${
                                  isSaving 
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-red-600 hover:text-red-800'
                                }`}
                                title="لغو"
                                disabled={isSaving}
                              >
                                <FaTimes />
                              </button>
                            </>
                          )}
                        </div>
                        {validationErrors[rowId] && (
                          <span className="text-xs text-red-500">
                            {validationErrors[rowId]}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className={`transition-all duration-300 ${
                          isEditing && calculatedData 
                            ? "font-bold text-secondary-600 transform scale-105" 
                            : ""
                        }`}>
                          {displaySellPrice
                            ? formatNumber(displaySellPrice) + " تومان"
                            : "_"}
                        </span>
                        {isEditing && calculatedData && (
                          <span className="text-xs text-secondary-500 animate-pulse">
                            💰 محاسبه شده
                          </span>
                        )}
                        {isEditing && !calculatedData && validationError && (
                          <span className="text-xs text-red-500">
                            ❌ خطا در محاسبه
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {displayStatus ? (
                        <div className="flex flex-col">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                              displayStatus.color
                            } ${
                              isEditing && calculatedData 
                                ? "ring-2 ring-secondary-300 transform scale-105 shadow-lg" 
                                : ""
                            }`}
                          >
                            {displayStatus.label}
                          </span>
                          {isEditing && calculatedData && (
                            <span className="text-xs text-secondary-500 mt-1 animate-pulse">
                              ✨ محاسبه شده
                            </span>
                          )}
                          {isEditing && !calculatedData && validationError && (
                            <span className="text-xs text-red-500 mt-1">
                              ❌ خطا در محاسبه
                            </span>
                          )}
                        </div>
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
