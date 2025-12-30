import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppDispatch } from "../../../../redux/store";
import { UpdatePurchasePriceAction } from "../../../../redux/actions/productPrice/ProductPriceActions";
import {
  PurchasePriceCalculation,
  safeCalculatePurchasePrice,
} from "../../../../utils/PurchasePriceCalculator";
import { useDebounce } from "./useDebounce";
import { PurchasePriceItem } from "../PurchasePriceTable.types";

interface UsePurchasePriceInlineEditParams {
  dispatch: AppDispatch;
  rows: PurchasePriceItem[] | undefined;
}

export const usePurchasePriceInlineEdit = ({
  dispatch,
  rows,
}: UsePurchasePriceInlineEditParams) => {
  // State for buy price editing and calculations
  const [buyPrices, setBuyPrices] = useState<{ [key: string]: string }>({});
  const [editingRows, setEditingRows] = useState<{ [key: string]: boolean }>({});
  const [originalPrices, setOriginalPrices] = useState<{ [key: string]: string }>(
    {}
  );

  // State for calculated values and validation
  const [calculatedValues, setCalculatedValues] = useState<{
    [key: string]: PurchasePriceCalculation | null;
  }>({});

  // State for validation errors and loading
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string | null;
  }>({});

  // State for loading individual rows
  const [savingRows, setSavingRows] = useState<{ [key: string]: boolean }>({});

  // Debounced buy prices for calculation
  const debouncedBuyPrices = useDebounce(buyPrices, 300);

  // Initialize buy prices when data loads
  useEffect(() => {
    if (rows) {
      const initialPrices: { [key: string]: string } = {};
      const initialOriginalPrices: { [key: string]: string } = {};
      rows.forEach((item: PurchasePriceItem) => {
        const id = item._id || item.id || "";
        const priceStr = item.buyPrice?.toString() || "";
        initialPrices[id] = priceStr;
        initialOriginalPrices[id] = priceStr;
      });
      setBuyPrices(initialPrices);
      setOriginalPrices(initialOriginalPrices);
    }
  }, [rows]);

  // Cleanup calculation state for rows that are no longer being edited
  useEffect(() => {
    const activeRowIds = Object.keys(editingRows).filter((id) => editingRows[id]);
    const calculatedRowIds = Object.keys(calculatedValues);
    const validationRowIds = Object.keys(validationErrors);

    // Clean up calculated values for inactive rows
    calculatedRowIds.forEach((rowId) => {
      if (!activeRowIds.includes(rowId)) {
        setCalculatedValues((prev) => {
          const newState = { ...prev };
          delete newState[rowId];
          return newState;
        });
      }
    });

    // Clean up validation errors for inactive rows
    validationRowIds.forEach((rowId) => {
      if (!activeRowIds.includes(rowId)) {
        setValidationErrors((prev) => {
          const newState = { ...prev };
          delete newState[rowId];
          return newState;
        });
      }
    });
  }, [editingRows]);

  // Memoized validation function for buy price
  const validateBuyPrice = useCallback((value: string): string | null => {
    if (!value || value.trim() === "") {
      return "قیمت خرید الزامی است";
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      return "قیمت خرید باید عدد باشد";
    }

    if (numValue < 0) {
      return "قیمت خرید نمی‌تواند منفی باشد";
    }

    if (numValue > 999999999) {
      return "قیمت خرید خیلی زیاد است";
    }

    return null;
  }, []);

  // Memoized calculation function
  const performCalculation = useCallback(
    (rowId: string, buyPrice: number, row: PurchasePriceItem) => {
      const constant = row.constant || 0;

      if (buyPrice >= 0 && constant >= 0) {
        const calculation = safeCalculatePurchasePrice({
          buyPrice,
          constant,
          paymentType: row.paymentType,
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
    },
    []
  );

  // Effect for debounced calculations
  useEffect(() => {
    const currentData = rows || [];

    Object.entries(debouncedBuyPrices).forEach(([rowId, value]) => {
      if (editingRows[rowId] && value) {
        const row = currentData.find(
          (item: PurchasePriceItem) => (item._id || item.id) === rowId
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
  }, [debouncedBuyPrices, editingRows, rows, validateBuyPrice, performCalculation]);

  // Optimized buy price change handler (no immediate calculation)
  const handleBuyPriceChange = useCallback(
    (rowId: string, value: string, row: PurchasePriceItem) => {
      setBuyPrices((prev) => ({
        ...prev,
        [rowId]: value,
      }));

      // Set editing state when user starts typing
      setEditingRows((prev) => ({
        ...prev,
        [rowId]: true,
      }));
    },
    []
  );

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
      toast.error("خطا در محاسبه قیمت فروش و وضعیت");
      return;
    }

    if (isNaN(newBuyPrice) || newBuyPrice < 0) {
      toast.error("قیمت خرید نامعتبر است");
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
        status: calculatedData.status.value,
      });

      await dispatch(
        UpdatePurchasePriceAction({
          id: rowId,
          credentials: {
            buyPrice: newBuyPrice,
            sellPrice: calculatedData.sellPrice,
            status: calculatedData.status.value,
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
      toast.success("قیمت با موفقیت به‌روزرسانی شد");
    } catch (error) {
      console.error("Error saving price:", error);
      toast.error("خطا در ذخیره قیمت");

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

  return {
    buyPrices,
    editingRows,
    calculatedValues,
    validationErrors,
    savingRows,
    handleBuyPriceChange,
    handleSavePrice,
    handleCancelPrice,
  };
};


