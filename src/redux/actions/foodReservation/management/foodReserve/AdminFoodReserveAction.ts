import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ADMIN_FOOD_RESERVE_GET_ALL,
  ADMIN_FOOD_RESERVE_CREATE,
  ADMIN_FOOD_RESERVE_DELETE,
  ADMIN_FOOD_RESERVE_ORIGINAL,
  ADMIN_FOOD_RESERVE_GET_BY_ID,
  ADMIN_FOOD_RESERVE_UPDATE,
  ADMIN_FOOD_RESERVE_EXPORT,
} from "../../../../types/foodReservation/management/foodReserve/AdminFoodReserveTypes";
import {
  createAdminFoodReserveService,
  deleteAdminFoodReserveService,
  exportFoodReserveService,
  getAllAdminFoodReserveService,
  getByIdAdminFoodReserveService,
  updateAdminFoodReserveService,
} from "../../../../service/foodReservation/management/foodReserve/AdminFoodReserveService";
import { toast } from "react-toastify";
import { PublicDictionary } from "../../../../../utils/dictionary";

interface FoodReserveCredentials {
  credentials?: any;
  onSubmitForm?: any;
  resetForm?: any;
}

let getAllQuery: any = null;

export const getAllAdminFoodReserveAction = createAsyncThunk(
  `${ADMIN_FOOD_RESERVE_ORIGINAL}/${ADMIN_FOOD_RESERVE_GET_ALL}`,
  async (credentials: any, { rejectWithValue }: any) => {
    getAllQuery = credentials;

    try {
      const response = await getAllAdminFoodReserveService(getAllQuery);
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

export const exportFoodReserveAction = createAsyncThunk(
  `${ADMIN_FOOD_RESERVE_ORIGINAL}/${ADMIN_FOOD_RESERVE_EXPORT}`,
  async (credentials: any, { rejectWithValue }: any) => {
    credentials = { ...credentials, ...getAllQuery };
    try {
      const response = await exportFoodReserveService(credentials);
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

export const getByIdAdminFoodReserveAction = createAsyncThunk(
  `${ADMIN_FOOD_RESERVE_ORIGINAL}/${ADMIN_FOOD_RESERVE_GET_BY_ID}`,
  async (credentials: any, { rejectWithValue }: any) => {
    try {
      const response = await getByIdAdminFoodReserveService(credentials);
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

export const createAdminFoodReserveAction = createAsyncThunk(
  `${ADMIN_FOOD_RESERVE_ORIGINAL}/${ADMIN_FOOD_RESERVE_CREATE}`,
  async (
    { credentials, onSubmitForm, resetForm }: FoodReserveCredentials,
    thunkAPI
  ) => {
    try {
      const response = await createAdminFoodReserveService(credentials);
      if (response?.status === 200 || response?.status === 201) {
        onSubmitForm();
        resetForm();
        toast.success(
          `${PublicDictionary.food_reserve} ${PublicDictionary.is_success_add}`
        );
        await thunkAPI.dispatch(getAllAdminFoodReserveAction(getAllQuery));

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

export const updateAdminFoodReserveAction = createAsyncThunk(
  `${ADMIN_FOOD_RESERVE_ORIGINAL}/${ADMIN_FOOD_RESERVE_UPDATE}`,
  async (
    { credentials, onSubmitForm, resetForm }: FoodReserveCredentials,
    thunkAPI
  ) => {
    try {
      const response = await updateAdminFoodReserveService(credentials);
      if (response?.status === 200 || response?.status === 201) {
        onSubmitForm();
        resetForm();
        toast.success(
          `${PublicDictionary.food_reserve} ${PublicDictionary.is_success_update}`
        );
        await thunkAPI.dispatch(getAllAdminFoodReserveAction(getAllQuery));

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

export const deleteAdminFoodReserveAction = createAsyncThunk(
  `${ADMIN_FOOD_RESERVE_ORIGINAL}/${ADMIN_FOOD_RESERVE_DELETE}`,
  async (
    { credentials }: { credentials: FoodReserveCredentials },
    thunkAPI
  ) => {
    try {
      const response = await deleteAdminFoodReserveService(credentials);
      if (response?.status === 200 || response?.status === 201) {
        toast.success(
          `${PublicDictionary.food_reserve} ${PublicDictionary.is_success_delete}`
        );
        await thunkAPI.dispatch(getAllAdminFoodReserveAction(getAllQuery));
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
