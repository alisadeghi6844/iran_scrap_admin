import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  REQUEST_ORDER,
  GET_REQUEST_ORDER_ADMIN,
  APPROVE_REQUEST_ORDER,
  REJECT_REQUEST_ORDER,
  VERIFY_REQUEST_PAYMENT,
  MAKE_REQUEST_DELIVERED,
} from "../../types/requestOrder/RequestOrderTypes";
import {
  getRequestOrderAdminService,
  approveRequestOrderService,
  rejectRequestOrderService,
  verifyRequestPaymentService,
  makeRequestDeliveredService,
} from "../../service/requestOrder/RequestOrderServices";
import { toast } from "react-toastify";

let query: any = null;

export const GetRequestOrderAdminAction = createAsyncThunk(
  `${REQUEST_ORDER}/${GET_REQUEST_ORDER_ADMIN}`,
  async (credentials: any, { rejectWithValue }: any) => {
    query = credentials;
    try {
      const response = await getRequestOrderAdminService(query);
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

export const ApproveRequestOrderAction = createAsyncThunk(
  `${REQUEST_ORDER}/${APPROVE_REQUEST_ORDER}`,
  async ({ requestOrderId, onSubmitForm }: any, thunkAPI) => {
    try {
      const response = await approveRequestOrderService(requestOrderId);
      if (response?.status === 200) {
        toast.success("درخواست سفارش با موفقیت تایید شد");
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

export const RejectRequestOrderAction = createAsyncThunk(
  `${REQUEST_ORDER}/${REJECT_REQUEST_ORDER}`,
  async ({ requestOrderId, reason, onSubmitForm }: any, thunkAPI) => {
    try {
      const response = await rejectRequestOrderService(requestOrderId, reason);
      if (response?.status === 200) {
        toast.success("درخواست سفارش با موفقیت رد شد");
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

export const VerifyRequestPaymentAction = createAsyncThunk(
  `${REQUEST_ORDER}/${VERIFY_REQUEST_PAYMENT}`,
  async ({ requestOrderId, verified, comment, onSubmitForm }: any, thunkAPI) => {
    try {
      const response = await verifyRequestPaymentService(requestOrderId, verified, comment);
      if (response?.status === 200) {
        toast.success(verified ? "پرداخت درخواست با موفقیت تایید شد" : "پرداخت درخواست با موفقیت رد شد");
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

export const MakeRequestDeliveredAction = createAsyncThunk(
  `${REQUEST_ORDER}/${MAKE_REQUEST_DELIVERED}`,
  async ({ requestOrderId, unloadingDate, onSubmitForm }: any, thunkAPI) => {
    try {
      const response = await makeRequestDeliveredService(requestOrderId, unloadingDate);
      if (response?.status === 200 || response?.status === 201) {
        toast.success("درخواست سفارش با موفقیت تحویل داده شد");
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