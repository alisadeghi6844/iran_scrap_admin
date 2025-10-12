export const SHIPMENT = "shipment";
export const CREATE_SHIPMENT_ADMIN = "CREATE_SHIPMENT_ADMIN";
export const GET_SHIPMENT_ADMIN = "GET_SHIPMENT_ADMIN";
export const GET_SHIPMENT_SUGGEST = "GET_SHIPMENT_SUGGEST";

export interface CreateShipmentRequest {
  price: number;
  originProvince: string;
  originCity: string;
  destProvince: string;
  destCity: string;
  weight: number;
  vehicle: string;
}

export interface GetShipmentAdminQuery {
  page?: number;
  limit?: number;
  filter?: string;
}

export interface GetShipmentSuggestQuery {
  originProvince: number;
  originCity: number;
  destProvince: number;
  destCity: number;
  weight: number;
}