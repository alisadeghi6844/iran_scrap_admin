export const PRODUCT_PRICE = "PRODUCT_PRICE";

export const GET_PRODUCT_PRICE = "GET_PRODUCT_PRICE";
export const GET_PRODUCT_PRICE_BY_ID = "GET_PRODUCT_PRICE_BY_ID";
export const CREATE_PRODUCT_PRICE = "CREATE_PRODUCT_PRICE";
export const UPDATE_PRODUCT_PRICE = "UPDATE_PRODUCT_PRICE";
export const UPDATE_PURCHASE_PRICE = "UPDATE_PURCHASE_PRICE";
export const DELETE_PRODUCT_PRICE = "DELETE_PRODUCT_PRICE";

// Product Status Types
export type ProductStatusValue = 'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND' | 'SUPER_DIAMOND';

// Enhanced Product Price Update Payload
export interface ProductPriceUpdatePayload {
  buyPrice?: number;
  sellPrice?: number;
  constant?: number;
  showInApp?: boolean;
  showInPanel?: boolean;
  status?: ProductStatusValue;
}
