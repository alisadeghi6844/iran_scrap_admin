import { BASE_URL } from "../../../api/config";
import HttpServises from "../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../utils/AxiosQuery";
import {
  GET_PENDING_ORDERS_POINT,
  APPROVE_ORDER_POINT,
  REJECT_ORDER_POINT,
} from "../../api/order/OrderApi";
import { GetPendingOrdersRequest, ApproveOrderRequest, RejectOrderRequest } from "../../types/order/OrderTypes";

export const getPendingOrdersService = async (query: GetPendingOrdersRequest) => {
  let queryText;
  if (!!query) {
    queryText = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_PENDING_ORDERS_POINT}?${queryText ? queryText : ""}`
  );
};

export const approveOrderService = async (orderId: string) => {
  return await HttpServises.patch(
    `${BASE_URL}${APPROVE_ORDER_POINT}/${orderId}`,
    { status: "approved" }
  );
};

export const rejectOrderService = async (orderId: string, comments: string) => {
  return await HttpServises.patch(
    `${BASE_URL}${REJECT_ORDER_POINT}/${orderId}`,
    { status: "rejected", comments }
  );
};