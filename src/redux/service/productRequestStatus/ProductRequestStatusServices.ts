import { BASE_URL } from "../../../api/config";
import HttpServises from "../../../api/HttpServises";
import {
  GET_PRODUCT_REQUEST_STATUS_BY_ID_POINT,
  GET_PRODUCT_REQUEST_STATUS_POINT,
  UPDATE_PRODUCT_REQUEST_STATUS_POINT,
} from "../../api/productRequestStatus/ProductRequestStatusApi";

export const getProductRequestStatusService = async (items: any) => {
  return await HttpServises.get(
    `${BASE_URL}${GET_PRODUCT_REQUEST_STATUS_POINT}`
  );
};

export const getProductRequestStatusByIdService = async (items: any) => {
  return await HttpServises.get(
    `${BASE_URL}${GET_PRODUCT_REQUEST_STATUS_BY_ID_POINT}`
  );
};

export const updateProductRequestStatusService = async (items: any,id:any) => {
  return await HttpServises.put(
    `${BASE_URL}${UPDATE_PRODUCT_REQUEST_STATUS_POINT}/${id}`,items
  );
};
