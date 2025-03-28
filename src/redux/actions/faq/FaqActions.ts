import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FAQ,
  CREATE_FAQ,
  DELETE_FAQ,
  GET_FAQ,
  UPDATE_FAQ,
} from "../../types/faq/FaqTypes";
import {
  createFaqService,
  deleteFaqService,
  getFaqService,
  updateFaqService,
} from "../../service/faq/FaqServices";
import { toast } from "react-toastify";

let query: any = null;

export const GetFaqAction = createAsyncThunk(
  `${FAQ}/${GET_FAQ}`,
  async (credentials: any, { rejectWithValue }: any) => {
    query = credentials;
    try {
      const response = await getFaqService(query);
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

export const CreateFaqAction = createAsyncThunk(
  `${FAQ}/${CREATE_FAQ}`,
  async ({ credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await createFaqService(credentials);
      if (response?.status == 201) {
        toast.success("سوالات متداول با موفقیت ساخته شد");
        onSubmitForm && onSubmitForm();
        resetForm && resetForm();
      }
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const UpdateFaqAction = createAsyncThunk(
  `${FAQ}/${UPDATE_FAQ}`,
  async ({ id, credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await updateFaqService(credentials, id);
      if (response?.status == 200) {
        toast.success("سوالات متداول با موفقیت ویرایش شد");
        onSubmitForm && onSubmitForm();
        resetForm && resetForm();
      }
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const DeleteFaqAction = createAsyncThunk(
  `${FAQ}/${DELETE_FAQ}`,
  async ({ credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await deleteFaqService(credentials);
      if (response?.status == 200) {
        toast.success("سوالات متداول با موفقیت حذف شد");
        onSubmitForm && onSubmitForm();
        resetForm && resetForm();
        thunkAPI.dispatch(GetFaqAction(query));
      }
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);
