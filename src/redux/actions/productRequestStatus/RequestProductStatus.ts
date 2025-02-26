import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProductRequestAdminByIdService,
  getProductRequestAdminService,
  getProductRequestStatusByIdService,
  getProductRequestStatusService,
  updateProductRequestStatusService,
} from "../../service/productRequestStatus/ProductRequestStatusServices";

import {
  GET_PRODUCT_REQUEST_ADMIN,
  GET_PRODUCT_REQUEST_ADMIN_BY_ID,
  GET_PRODUCT_REQUEST_BY_ID_STATUS,
  GET_PRODUCT_REQUEST_STATUS,
  PRODUCT_REQUEST_STATUS,
  UPDATE_PRODUCT_REQUEST_STATUS,
} from "../../types/productRequestStatus/ProductRequestStatusTypes";
import { toast } from "react-toastify";

let query: any = null;

export const GetRequestProductStatusAction = createAsyncThunk(
  `${PRODUCT_REQUEST_STATUS}/${GET_PRODUCT_REQUEST_STATUS}`,
  async (credentials: any, { rejectWithValue }: any) => {
    query = credentials;
    try {
      const response = await getProductRequestStatusService(query);
      if (response?.status === 200) {
        return response.data; // به درستی داده‌های کاربر را برمی‌گرداند
      } else {
        return rejectWithValue(response.data); // در صورت خطای غیر 200
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const GetRequestProductStatusByIdAction = createAsyncThunk(
  `${GET_PRODUCT_REQUEST_BY_ID_STATUS}`,
  async ({ credentials }: any, thunkAPI) => {
    try {
      const response = await getProductRequestStatusByIdService(credentials);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const UpdateRequestProductStatusAction = createAsyncThunk(
  `${UPDATE_PRODUCT_REQUEST_STATUS}`,
  async ({ credentials, id, handleSubmit }: any, thunkAPI) => {
    try {
      const response = await updateProductRequestStatusService(credentials, id);
      if (response?.status === 200) {
        handleSubmit(); // فراخوانی تابع handleSubmit
        toast.success("شرط با موفقیت اضافه شد");

        // دریافت دوباره داده‌ها پس از به‌روزرسانی
        await thunkAPI.dispatch(GetRequestProductStatusAction(query)); // استفاده از thunkAPI.dispatch برای دریافت دوباره داده‌ها
        return response.data; // برگرداندن داده‌های جدید
      }
      return thunkAPI.rejectWithValue("درخواست به‌روزرسانی موفق نبود");
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);


export const GetRequestProductAdminAction = createAsyncThunk(
  `${PRODUCT_REQUEST_STATUS}/${GET_PRODUCT_REQUEST_ADMIN}`,
  async (credentials: any, { rejectWithValue }: any) => {

    try {
      const response = await getProductRequestAdminService(credentials);
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

export const GetRequestProductAdminByIdAction = createAsyncThunk(
  `${PRODUCT_REQUEST_STATUS}/${GET_PRODUCT_REQUEST_ADMIN_BY_ID}`,
  async (credentials: any, { rejectWithValue }: any) => {

    try {
      const response = await getProductRequestAdminByIdService(credentials);
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