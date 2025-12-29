/**
 * Product Status Calculator Utility
 * 
 * This utility provides functions to calculate product status based on sellPrice and constant values.
 * The status is determined by the ratio S = constant / sellPrice.
 */

export type ProductStatusValue = 'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND' | 'SUPER_DIAMOND';

export interface ProductStatus {
  label: string;
  color: string;
  textColor: string;
  value: ProductStatusValue;
}

/**
 * Calculate product status based on sellPrice and constant values
 * @param sellPrice - The selling price of the product
 * @param constant - The constant value used in calculation
 * @returns ProductStatus object with label, colors, and value
 */
export const calculateProductStatus = (sellPrice: number, constant: number): ProductStatus => {
  const S = sellPrice > 0 ? constant / sellPrice : 0;

  if (S >= 0.12) {
    return {
      label: "سوپر الماسی",
      color: "text-purple-600 bg-purple-100",
      textColor: "text-purple-600",
      value: "SUPER_DIAMOND",
    };
  }
  
  if (S >= 0.08) {
    return {
      label: "الماسی",
      color: "text-blue-600 bg-blue-100",
      textColor: "text-blue-600",
      value: "DIAMOND",
    };
  }
  
  if (S >= 0.05) {
    return {
      label: "طلایی",
      color: "text-yellow-600 bg-yellow-100",
      textColor: "text-yellow-600",
      value: "GOLD",
    };
  }
  
  if (S >= 0.03) {
    return {
      label: "نقره‌ای",
      color: "text-gray-600 bg-gray-100",
      textColor: "text-gray-600",
      value: "SILVER",
    };
  }
  
  return {
    label: "برنزی",
    color: "text-orange-600 bg-orange-100",
    textColor: "text-orange-600",
    value: "BRONZE",
  };
};

/**
 * Get only the status value without UI-related properties
 * @param sellPrice - The selling price of the product
 * @param constant - The constant value used in calculation
 * @returns ProductStatusValue enum
 */
export const getProductStatusValue = (sellPrice: number, constant: number): ProductStatusValue => {
  return calculateProductStatus(sellPrice, constant).value;
};