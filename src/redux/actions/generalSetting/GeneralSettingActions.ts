import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GENERAL_SETTING,
  CREATE_GENERAL_SETTING,
  DELETE_GENERAL_SETTING,
  GET_GENERAL_SETTING,
  UPDATE_GENERAL_SETTING,
} from "../../types/generalSetting/GeneralSettingTypes";
import {
  createGeneralSettingService,
  deleteGeneralSettingService,
  getGeneralSettingService,
  updateGeneralSettingService,
} from "../../service/generalSetting/GeneralSettingServices";
import { toast } from "react-toastify";

let query: any = null;

export const GetGeneralSettingAction = createAsyncThunk(
  `${GENERAL_SETTING}/${GET_GENERAL_SETTING}`,
  async (credentials: any, { rejectWithValue }: any) => {
    query = credentials;
    try {
      const response = await getGeneralSettingService(query);
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

export const CreateGeneralSettingAction = createAsyncThunk(
  `${GENERAL_SETTING}/${CREATE_GENERAL_SETTING}`,
  async ({ credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await createGeneralSettingService(credentials);
      if (response?.status == 201) {
        toast.success("تنظیمات با موفقیت ساخته شد");
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

export const UpdateGeneralSettingAction = createAsyncThunk(
  `${GENERAL_SETTING}/${UPDATE_GENERAL_SETTING}`,
  async ({ id, credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await updateGeneralSettingService(credentials, id);
      if (response?.status == 200) {
        toast.success("تنظیمات با موفقیت ویرایش شد");
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

export const DeleteGeneralSettingAction = createAsyncThunk(
  `${GENERAL_SETTING}/${DELETE_GENERAL_SETTING}`,
  async ({ credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await deleteGeneralSettingService(credentials);
      if (response?.status == 200) {
        toast.success("تنظیمات با موفقیت حذف شد");
        onSubmitForm && onSubmitForm();
        resetForm && resetForm();
        thunkAPI.dispatch(GetGeneralSettingAction(query));
      }
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);
