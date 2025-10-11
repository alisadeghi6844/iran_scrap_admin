import { BASE_URL } from "../../../api/config";
import HttpServises from "../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../utils/AxiosQuery";
import {
  CREATE_SHIPMENT_ADMIN_POINT,
  GET_SHIPMENT_ADMIN_POINT,
  GET_SHIPMENT_SUGGEST_POINT,
} from "../../api/shipment/ShipmentApi";
import { CreateShipmentRequest, GetShipmentAdminQuery, GetShipmentSuggestQuery } from "../../types/shipment/ShipmentTypes";

export const createShipmentAdminService = async (data: CreateShipmentRequest) => {
  return await HttpServises.post(`${BASE_URL}${CREATE_SHIPMENT_ADMIN_POINT}`, data);
};

export const getShipmentAdminService = async (query: GetShipmentAdminQuery) => {
  let queryParams;
  if (query) {
    queryParams = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_SHIPMENT_ADMIN_POINT}?${queryParams || ""}`
  );
};

export const getShipmentSuggestService = async (query: GetShipmentSuggestQuery) => {
  const queryParams = AxiosQueryCustom(query);
  return await HttpServises.get(
    `${BASE_URL}${GET_SHIPMENT_SUGGEST_POINT}?${queryParams}`
  );
};