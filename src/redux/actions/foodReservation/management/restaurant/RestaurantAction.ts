import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  RESTAURANT_MANAGEMENT_GET_ALL,
  RESTAURANT_MANAGEMENT_CREATE,
  RESTAURANT_MANAGEMENT_DELETE,
  RESTAURANT_MANAGEMENT_GET_BY_ID,
  RESTAURANT_MANAGEMENT_UPDATE,
  RESTAURANT_MANAGEMENT_ORIGINAL,
} from "../../../../types/foodReservation/management/restaurant/RestaurantTypes";
import {
  createRestaurantService,
  deleteRestaurantService,
  getAllRestaurantService,
  getByIdRestaurantService,
  updateRestaurantService,
} from "../../../../service/foodReservation/management/restaurant/RestaurantService";
import { toast } from "react-toastify";
import { PublicDictionary } from "../../../../../utils/dictionary";

interface RestaurantCredentials {
  credentials?: any;
  onSubmitForm?: any;
  resetForm?: any;
}

let getAllQuery: any = null;

export const getAllRestaurantAction = createAsyncThunk(
  `${RESTAURANT_MANAGEMENT_ORIGINAL}/${RESTAURANT_MANAGEMENT_GET_ALL}`,
  async (credentials: any, { rejectWithValue }: any) => {
    getAllQuery = credentials;
    try {
      const response = await getAllRestaurantService(getAllQuery);
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

export const createRestaurantAction = createAsyncThunk(
  `${RESTAURANT_MANAGEMENT_ORIGINAL}/${RESTAURANT_MANAGEMENT_CREATE}`,
  async (
    { credentials, onSubmitForm, resetForm }: RestaurantCredentials,
    thunkAPI
  ) => {
    try {
      const response = await createRestaurantService(credentials);
      if (response?.status === 200 || response?.status === 201) {
        onSubmitForm();
        resetForm();
        toast.success(
          `${PublicDictionary.food_restaurant} ${PublicDictionary.is_success_create}`
        );
        await thunkAPI.dispatch(getAllRestaurantAction(getAllQuery));
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

export const updateRestaurantAction = createAsyncThunk(
  `${RESTAURANT_MANAGEMENT_ORIGINAL}/${RESTAURANT_MANAGEMENT_UPDATE}`,
  async (
    { credentials, onSubmitForm, resetForm }: RestaurantCredentials,
    thunkAPI
  ) => {
    try {
      const response = await updateRestaurantService(credentials);
      if (response?.status === 200 || response?.status === 201) {
        onSubmitForm();
        resetForm();
        toast.success(
          `${PublicDictionary.food_restaurant} ${PublicDictionary.is_success_update}`
        );
        await thunkAPI.dispatch(getAllRestaurantAction(getAllQuery));
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

export const deleteRestaurantAction = createAsyncThunk(
  `${RESTAURANT_MANAGEMENT_ORIGINAL}/${RESTAURANT_MANAGEMENT_DELETE}`,
  async ({ credentials }: RestaurantCredentials, thunkAPI) => {
    try {
      const response = await deleteRestaurantService(credentials);
      if (response?.status === 200 || response?.status === 201) {
        toast.success(
          `${PublicDictionary.food_restaurant} ${PublicDictionary.is_success_delete}`
        );
        await thunkAPI.dispatch(getAllRestaurantAction(getAllQuery));
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

export const getByIdRestaurantAction = createAsyncThunk(
  `${RESTAURANT_MANAGEMENT_ORIGINAL}/${RESTAURANT_MANAGEMENT_GET_BY_ID}`,
  async ({ credentials }: RestaurantCredentials, thunkAPI) => {
    try {
      const response = await getByIdRestaurantService(credentials);
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
