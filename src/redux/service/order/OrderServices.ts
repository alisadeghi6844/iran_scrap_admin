import { BASE_URL } from "../../../api/config";
import HttpServises from "../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../utils/AxiosQuery";
import {
  GET_ORDER_ADMIN_POINT,
  APPROVE_ORDER_POINT,
  REJECT_ORDER_POINT,
  VERIFY_PAYMENT_POINT,
  MAKE_DELIVERED_POINT,
  UPDATE_ORDER_ADMIN_POINT,
} from "../../api/order/OrderApi";

export const getOrderAdminService = async (query: any) => {
  let queryParams;
  if (query) {
    queryParams = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_ORDER_ADMIN_POINT}?${queryParams || ""}`
  );
};

export const approveOrderService = async (orderId: string) => {
  return await HttpServises.put(`${BASE_URL}${APPROVE_ORDER_POINT}/${orderId}`);
};

export const rejectOrderService = async (orderId: string, reason?: string) => {
  return await HttpServises.put(`${BASE_URL}${REJECT_ORDER_POINT}/${orderId}`, {
    reason,
  });
};

export const verifyPaymentService = async (orderId: string, verified: boolean, comment: string) => {
  return await HttpServises.post(`${BASE_URL}${VERIFY_PAYMENT_POINT}`, {
    orderId,
    verified,
    comment,
  });
};

export const makeDeliveredService = async (orderId: string, unloadingDate: string) => {
  return await HttpServises.post(`${BASE_URL}${MAKE_DELIVERED_POINT}`, {
    orderId,
    unloadingDate,
  });
};

export const updateOrderAdminService = async (orderId: string, data: any) => {
  return await HttpServises.patch(`${BASE_URL}${UPDATE_ORDER_ADMIN_POINT}/${orderId}`, data);
};