import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ORDER,
  GET_PENDING_ORDERS,
  APPROVE_ORDER,
  REJECT_ORDER,
} from "../../types/order/OrderTypes";
import {
  getPendingOrdersService,
  approveOrderService,
  rejectOrderService,
} from "../../service/order/OrderServices";
import { toast } from "react-toastify";

let query: any = null;

export const GetPendingOrdersAction = createAsyncThunk(
  `${ORDER}/${GET_PENDING_ORDERS}`,
  async (credentials: any, { rejectWithValue }: any) => {
    query = credentials;
    try {
      const response = await getPendingOrdersService(query);
      if (response?.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const ApproveOrderAction = createAsyncThunk(
  `${ORDER}/${APPROVE_ORDER}`,
  async ({ orderId, onSuccess }: any, thunkAPI) => {
    try {
      const response = await approveOrderService(orderId);
      if (response?.status === 200) {
        toast.success("سفارش با موفقیت تایید شد");
        onSuccess && onSuccess();
      }
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const RejectOrderAction = createAsyncThunk(
  `${ORDER}/${REJECT_ORDER}`,
  async ({ orderId, comments, onSuccess }: any, thunkAPI) => {
    try {
      const response = await rejectOrderService(orderId, comments);
      if (response?.status === 200) {
        toast.success("سفارش با موفقیت رد شد");
        onSuccess && onSuccess();
      }
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);