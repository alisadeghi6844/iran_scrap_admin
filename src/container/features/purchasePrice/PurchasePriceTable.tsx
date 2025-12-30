import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
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
  selectGetProductPriceData,
  selectGetProductPriceLoading,
  selectUpdateProductPriceData,
} from "../../../redux/slice/productPrice/ProductPriceSlice";

import { PurchasePriceItem } from "./PurchasePriceTable.types";
import PurchasePriceFiltersRow from "./components/PurchasePriceTable/PurchasePriceFiltersRow";
import PurchasePriceDataRow from "./components/PurchasePriceTable/PurchasePriceDataRow";
import { usePurchasePriceTableQuery } from "./hooks/usePurchasePriceTableQuery";
import { usePurchasePriceInlineEdit } from "./hooks/usePurchasePriceInlineEdit";

type PurchasePriceTypes = object;

const PurchasePriceTable: React.FC<PurchasePriceTypes> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const loading = useSelector(selectGetProductPriceLoading);
  const productPriceData = useSelector(selectGetProductPriceData);
  const updateData = useSelector(selectUpdateProductPriceData);

  const {
    productFilter,
    brandFilter,
    providerFilter,
    portFilter,
    paymentTypeFilter,
    getFilterInitialValues,
    handleFilterParameters,
    handleFilter,
    handleProductFilterChange,
    handleBrandFilterChange,
    handleProviderFilterChange,
    handlePortFilterChange,
    handlePaymentTypeFilterChange,
  } = usePurchasePriceTableQuery({ dispatch, updateData });

  // Memoized filtered data to prevent unnecessary re-renders
  const filteredData = useMemo(() => {
    if (!productPriceData?.data) return [];
    return [...productPriceData.data];
  }, [productPriceData?.data]);

  // Get all data without status filtering
  const getFilteredData = useCallback(() => {
    return filteredData;
  }, [filteredData]);

  const {
    buyPrices,
    editingRows,
    calculatedValues,
    validationErrors,
    savingRows,
    handleBuyPriceChange,
    handleSavePrice,
    handleCancelPrice,
  } = usePurchasePriceInlineEdit({
    dispatch,
    rows: productPriceData?.data,
  });

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
          <PurchasePriceFiltersRow
            productFilter={productFilter}
            brandFilter={brandFilter}
            providerFilter={providerFilter}
            portFilter={portFilter}
            paymentTypeFilter={paymentTypeFilter}
            onProductFilterChange={handleProductFilterChange}
            onBrandFilterChange={handleBrandFilterChange}
            onProviderFilterChange={handleProviderFilterChange}
            onPortFilterChange={handlePortFilterChange}
            onPaymentTypeFilterChange={handlePaymentTypeFilterChange}
          />
          {!loading ? (
            getFilteredData().length > 0 ? (
              getFilteredData().map((row: PurchasePriceItem, index: number) => {
                const rowId = row._id || row.id || "";
                const calculatedData = calculatedValues[rowId];
                const isEditing = editingRows[rowId] || false;
                const validationError = validationErrors[rowId];
                const isSaving = savingRows[rowId] || false;

                return (
                  <PurchasePriceDataRow
                    key={rowId}
                    row={row}
                    index={index}
                    buyPriceValue={buyPrices[rowId] || ""}
                    calculatedData={calculatedData}
                    isEditing={isEditing}
                    validationError={validationError}
                    isSaving={isSaving}
                    getPaymentTypeLabel={getPaymentTypeLabel}
                    onBuyPriceChange={handleBuyPriceChange}
                    onSavePrice={handleSavePrice}
                    onCancelPrice={handleCancelPrice}
                  />
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
