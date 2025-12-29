import { calculateProductStatus, ProductStatus } from './ProductStatusCalculator';

/**
 * Interface for purchase price calculation input
 */
export interface CalculationInput {
  buyPrice: number;
  constant: number;
  paymentType: string;
}

/**
 * Interface for purchase price calculation result
 */
export interface PurchasePriceCalculation {
  sellPrice: number;
  status: ProductStatus;
}

/**
 * Calculate purchase price and status based on buy price and constant
 * Uses the same formula as ProductPriceForm: sellPrice = buyPrice + constant
 * Then calculates status using: S = constant / sellPrice
 * 
 * @param input - Calculation input containing buyPrice, constant, and paymentType
 * @returns PurchasePriceCalculation object with sellPrice and status
 */
export const calculatePurchasePrice = (input: CalculationInput): PurchasePriceCalculation => {
  const { buyPrice, constant, paymentType } = input;

  // Validation
  if (buyPrice < 0) {
    throw new Error('قیمت خرید نمی‌تواند منفی باشد');
  }

  if (constant < 0) {
    throw new Error('قیمت ثابت نمی‌تواند منفی باشد');
  }

  // فرمول اصلی: قیمت خرید + قیمت ثابت = قیمت فروش
  // همان فرمول موجود در ProductPriceForm
  const sellPrice = buyPrice + constant;

  // محاسبه وضعیت با استفاده از utility موجود
  // فرمول: S = constant / sellPrice
  const status = calculateProductStatus(sellPrice, constant);

  return {
    sellPrice,
    status
  };
};

/**
 * Validate calculation input parameters
 * @param input - Input to validate
 * @returns boolean indicating if input is valid
 */
export const validateCalculationInput = (input: CalculationInput): boolean => {
  const { buyPrice, constant } = input;

  // Check if values are numbers
  if (isNaN(buyPrice) || isNaN(constant)) {
    return false;
  }

  // Check if values are non-negative
  if (buyPrice < 0 || constant < 0) {
    return false;
  }

  return true;
};

/**
 * Safe calculation wrapper that handles errors gracefully
 * @param input - Calculation input
 * @returns PurchasePriceCalculation or null if calculation fails
 */
export const safeCalculatePurchasePrice = (input: CalculationInput): PurchasePriceCalculation | null => {
  try {
    if (!validateCalculationInput(input)) {
      return null;
    }

    return calculatePurchasePrice(input);
  } catch (error) {
    console.error('Purchase price calculation error:', error);
    return null;
  }
};