import React from "react";
import TableRow from "../../../../../components/table/TableRow";
import TableCell from "../../../../../components/table/TableCell";
import Input from "../../../../../components/input";
import { FaCheck, FaTimes } from "react-icons/fa";
import { formatNumber } from "../../../../../utils/NumberFormated";
import { convertToJalali } from "../../../../../utils/MomentConvertor";
import { calculateProductStatus } from "../../../../../utils/ProductStatusCalculator";
import { PurchasePriceCalculation } from "../../../../../utils/PurchasePriceCalculator";
import { PurchasePriceItem } from "../../PurchasePriceTable.types";

interface PurchasePriceDataRowProps {
  row: PurchasePriceItem;
  index: number;
  buyPriceValue: string;
  calculatedData: PurchasePriceCalculation | null;
  isEditing: boolean;
  validationError: string | null;
  isSaving: boolean;
  getPaymentTypeLabel: (type: string) => string;
  onBuyPriceChange: (
    rowId: string,
    value: string,
    row: PurchasePriceItem
  ) => void;
  onSavePrice: (row: PurchasePriceItem) => void;
  onCancelPrice: (rowId: string) => void;
}

const PurchasePriceDataRow: React.FC<PurchasePriceDataRowProps> = ({
  row,
  index,
  buyPriceValue,
  calculatedData,
  isEditing,
  validationError,
  isSaving,
  getPaymentTypeLabel,
  onBuyPriceChange,
  onSavePrice,
  onCancelPrice,
}) => {
  const rowId = row._id || row.id || "";

  // Use calculated values if available, otherwise use original values
  const displaySellPrice = calculatedData ? calculatedData.sellPrice : row.sellPrice;
  const displayStatus = calculatedData
    ? calculatedData.status
    : row?.sellPrice && row?.constant
    ? calculateProductStatus(row.sellPrice, row.constant)
    : null;

  return (
    <TableRow key={rowId} className={displayStatus ? displayStatus.textColor : ""}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{row?.productId?.name ?? "_"}</TableCell>
      <TableCell>{row?.brandId?.name ?? "_"}</TableCell>
      <TableCell>{row?.providerId?.name ?? "_"}</TableCell>
      <TableCell>{row?.portId?.name ?? "_"}</TableCell>
      <TableCell>{getPaymentTypeLabel(row?.paymentType) ?? "_"}</TableCell>
      <TableCell>
        <div className="flex flex-col gap-1 w-[200px]">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={buyPriceValue || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onBuyPriceChange(rowId, e.target.value, row)
              }
              placeholder="قیمت خرید"
              className={`w-32 ${validationError ? 'border-red-500' : ''}`}
              disabled={isSaving}
            />
            {isEditing && (
              <>
                <button
                  onClick={() => onSavePrice(row)}
                  className={`p-1 ${
                    !calculatedData || validationError || isSaving
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-secondary-600 hover:text-secondary-800'
                  }`}
                  title={isSaving ? "در حال ذخیره..." : "ذخیره"}
                  disabled={!calculatedData || !!validationError || isSaving}
                >
                  {isSaving ? (
                    <div className="animate-spin w-4 h-4 border-2 border-secondary-600 border-t-transparent rounded-full"></div>
                  ) : (
                    <FaCheck />
                  )}
                </button>
                <button
                  onClick={() => onCancelPrice(rowId)}
                  className={`p-1 ${
                    isSaving ? 'text-gray-400 cursor-not-allowed' : 'text-red-600 hover:text-red-800'
                  }`}
                  title="لغو"
                  disabled={isSaving}
                >
                  <FaTimes />
                </button>
              </>
            )}
          </div>
          {validationError && (
            <span className="text-xs text-red-500">{validationError}</span>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span
            className={`transition-all duration-300 ${
              isEditing && calculatedData
                ? "font-bold text-secondary-600 transform scale-105"
                : ""
            }`}
          >
            {displaySellPrice ? formatNumber(displaySellPrice) + " تومان" : "_"}
          </span>
          {isEditing && calculatedData && (
            <span className="text-xs text-secondary-500 animate-pulse">
              💰 محاسبه شده
            </span>
          )}
          {isEditing && !calculatedData && validationError && (
            <span className="text-xs text-red-500">❌ خطا در محاسبه</span>
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
              <span className="text-xs text-red-500 mt-1">❌ خطا در محاسبه</span>
            )}
          </div>
        ) : (
          "_"
        )}
      </TableCell>
      <TableCell>{row?.updatedAt ? convertToJalali(row.updatedAt) : "_"}</TableCell>
    </TableRow>
  );
};

export default PurchasePriceDataRow;


