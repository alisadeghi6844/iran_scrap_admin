import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  APPETIZER_MANAGEMENT_GET_ALL,
  APPETIZER_MANAGEMENT_CREATE,
  APPETIZER_MANAGEMENT_DELETE,
  APPETIZER_MANAGEMENT_GET_BY_ID,
  APPETIZER_MANAGEMENT_UPDATE,
  APPETIZER_MANAGEMENT_ORIGINAL,
} from "../../../../types/foodReservation/management/appetizer/AppetizerTypes";
import {
  createAppetizerService,
  deleteAppetizerService,
  getAllAppetizerService,
  getByIdAppetizerService,
  updateAppetizerService,
} from "../../../../service/foodReservation/management/appetizer/AppetizerService";
import { toast } from "react-toastify";
import { PublicDictionary } from "../../../../../utils/dictionary";

interface AppetizerCredentials {
  credentials?: any;
  onSubmitForm?: any;
  resetForm?: any;
}

let getAllQuery: any = null;

export const getAllAppetizerAction = createAsyncThunk(
  `${APPETIZER_MANAGEMENT_ORIGINAL}/${APPETIZER_MANAGEMENT_GET_ALL}`,
  async (credentials: any, { rejectWithValue }: any) => {
    getAllQuery = credentials;
    try {
      const response = await getAllAppetizerService(getAllQuery);
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

export const createAppetizerAction = createAsyncThunk(
  `${APPETIZER_MANAGEMENT_ORIGINAL}/${APPETIZER_MANAGEMENT_CREATE}`,
  async (
    { credentials, onSubmitForm, resetForm }: AppetizerCredentials,
    thunkAPI
  ) => {
    try {
      const response = await createAppetizerService(credentials);
      if (response?.status === 200 || response?.status === 201) {
        onSubmitForm();
        resetForm();
        toast.success(
          `${PublicDictionary.appetizer} ${PublicDictionary.is_success_create}`
        );
        await thunkAPI.dispatch(getAllAppetizerAction(getAllQuery));
        return response.data; // به درستی داده‌های کاربر را برمی‌گرداند
      } else {
        return thunkAPI.rejectWithValue(response.data); // در صورت خطای غیر 200
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const updateAppetizerAction = createAsyncThunk(
  `${APPETIZER_MANAGEMENT_ORIGINAL}/${APPETIZER_MANAGEMENT_UPDATE}`,
  async (
    { credentials, onSubmitForm, resetForm }: AppetizerCredentials,
    thunkAPI
  ) => {
    try {
      const response = await updateAppetizerService(credentials);
      if (response?.status === 200 || response?.status === 201) {
        onSubmitForm();
        resetForm();
        toast.success(
          `${PublicDictionary.appetizer} ${PublicDictionary.is_success_update}`
        );
        await thunkAPI.dispatch(getAllAppetizerAction(getAllQuery));
        return response.data; // به درستی داده‌های کاربر را برمی‌گرداند
      } else {
        return thunkAPI.rejectWithValue(response.data); // در صورت خطای غیر 200
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const deleteAppetizerAction = createAsyncThunk(
  `${APPETIZER_MANAGEMENT_ORIGINAL}/${APPETIZER_MANAGEMENT_DELETE}`,
  async ({ credentials }: AppetizerCredentials, thunkAPI) => {
    try {
      const response = await deleteAppetizerService(credentials);
      if (response?.status === 200 || response?.status === 201) {
        toast.success(
          `${PublicDictionary.appetizer} ${PublicDictionary.is_success_delete}`
        );
        await thunkAPI.dispatch(getAllAppetizerAction(getAllQuery));
        return response.data; // به درستی داده‌های کاربر را برمی‌گرداند
      } else {
        return thunkAPI.rejectWithValue(response.data); // در صورت خطای غیر 200
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const getByIdAppetizerAction = createAsyncThunk(
  `${APPETIZER_MANAGEMENT_ORIGINAL}/${APPETIZER_MANAGEMENT_GET_BY_ID}`,
  async ({ credentials }: AppetizerCredentials, thunkAPI) => {
    try {
      const response = await getByIdAppetizerService(credentials);
      if (response?.status === 200 || response?.status === 201) {
        return response.data; // به درستی داده‌های کاربر را برمی‌گرداند
      } else {
        return thunkAPI.rejectWithValue(response.data); // در صورت خطای غیر 200
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);
