import { BASE_URL } from "../../../api/config";
import HttpServises from "../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../utils/AxiosQuery";
import {
  GET_REQUEST_ORDER_ADMIN_POINT,
  APPROVE_REQUEST_ORDER_POINT,
  REJECT_REQUEST_ORDER_POINT,
  VERIFY_REQUEST_PAYMENT_POINT,
  MAKE_REQUEST_DELIVERED_POINT,
} from "../../api/requestOrder/RequestOrderApi";

export const getRequestOrderAdminService = async (query: any) => {
  let queryParams;
  if (query) {
    queryParams = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_REQUEST_ORDER_ADMIN_POINT}?${queryParams || ""}`
  );
};

export const approveRequestOrderService = async (requestOrderId: string) => {
  return await HttpServises.put(`${BASE_URL}${APPROVE_REQUEST_ORDER_POINT}/${requestOrderId}`);
};

export const rejectRequestOrderService = async (requestOrderId: string, reason?: string) => {
  return await HttpServises.put(`${BASE_URL}${REJECT_REQUEST_ORDER_POINT}/${requestOrderId}`, {
    reason,
  });
};

export const verifyRequestPaymentService = async (requestOrderId: string, verified: boolean, comment: string) => {
  return await HttpServises.post(`${BASE_URL}${VERIFY_REQUEST_PAYMENT_POINT}`, {
    requestOrderId,
    verified,
    comment,
  });
};

export const makeRequestDeliveredService = async (requestOrderId: string, unloadingDate: string) => {
  return await HttpServises.post(`${BASE_URL}${MAKE_REQUEST_DELIVERED_POINT}`, {
    requestOrderId,
    unloadingDate,
  });
};