import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ORDER,
  GET_ORDER_ADMIN,
  APPROVE_ORDER,
  REJECT_ORDER,
  VERIFY_PAYMENT,
  MAKE_DELIVERED,
  UPDATE_ORDER_ADMIN,
} from "../../types/order/OrderTypes";
import {
  getOrderAdminService,
  approveOrderService,
  rejectOrderService,
  verifyPaymentService,
  makeDeliveredService,
  updateOrderAdminService,
} from "../../service/order/OrderServices";
import { toast } from "react-toastify";

let query: any = null;

export const GetOrderAdminAction = createAsyncThunk(
  `${ORDER}/${GET_ORDER_ADMIN}`,
  async (credentials: any, { rejectWithValue }: any) => {
    query = credentials;
    try {
      const response = await getOrderAdminService(query);
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
  async ({ orderId, onSubmitForm }: any, thunkAPI) => {
    try {
      const response = await approveOrderService(orderId);
      if (response?.status === 200) {
        toast.success("سفارش با موفقیت تایید شد");
        onSubmitForm && onSubmitForm();
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
  async ({ orderId, reason, onSubmitForm }: any, thunkAPI) => {
    try {
      const response = await rejectOrderService(orderId, reason);
      if (response?.status === 200) {
        toast.success("سفارش با موفقیت رد شد");
        onSubmitForm && onSubmitForm();
      }
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const VerifyPaymentAction = createAsyncThunk(
  `${ORDER}/${VERIFY_PAYMENT}`,
  async ({ orderId, verified, comment, onSubmitForm }: any, thunkAPI) => {
    try {
      const response = await verifyPaymentService(orderId, verified, comment);
      if (response?.status === 200) {
        toast.success(verified ? "پرداخت با موفقیت تایید شد" : "پرداخت با موفقیت رد شد");
        onSubmitForm && onSubmitForm();
      }
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const MakeDeliveredAction = createAsyncThunk(
  `${ORDER}/${MAKE_DELIVERED}`,
  async ({ orderId, unloadingDate, onSubmitForm }: any, thunkAPI) => {
    try {
      const response = await makeDeliveredService(orderId, unloadingDate);
      if (response?.status === 200 || response?.status === 201) {
        toast.success("سفارش با موفقیت تحویل داده شد");
        onSubmitForm && onSubmitForm();
      }
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const UpdateOrderAdminAction = createAsyncThunk(
  `${ORDER}/${UPDATE_ORDER_ADMIN}`,
  async ({ orderId, data, onSubmitForm }: any, thunkAPI) => {
    try {
      const response = await updateOrderAdminService(orderId, data);
      if (response?.status === 200 || response?.status === 201) {
        toast.success("سفارش با موفقیت به‌روزرسانی شد");
        onSubmitForm && onSubmitForm();
      }
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);