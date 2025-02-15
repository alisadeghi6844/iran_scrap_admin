import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FOOD_SHOW_GET_ALL,
  FOOD_SHOW_CREATE,
  FOOD_SHOW_DELETE,
  FOOD_SHOW_GET_BY_ID,
  FOOD_SHOW_UPDATE,
  FOOD_SHOW_ORIGINAL,
  FOOD_SHOW_GET_CLIENT_FOODS,
} from "../../../../types/foodReservation/management/foodShow/FoodShowTypes";
import {
  createFoodShowService,
  deleteFoodShowService,
  getAllClientFoodsService,
  getAllFoodShowService,
  getByIdFoodShowService,
  updateFoodShowService,
} from "../../../../service/foodReservation/management/foodShow/FoodShowService";
import { toast } from "react-toastify";
import { PublicDictionary } from "../../../../../utils/dictionary";

interface FoodShowCredentials {
  credentials?: any;
  onSubmitForm?: any;
  resetForm?: any;
}

let getAllQuery: any = null;

export const getAllFoodShowAction = createAsyncThunk(
  `${FOOD_SHOW_ORIGINAL}/${FOOD_SHOW_GET_ALL}`,
  async (credentials: any, { rejectWithValue }: any) => {
    getAllQuery = credentials;

    try {
      const response = await getAllFoodShowService(getAllQuery);
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

export const getAllClientFoodsAction = createAsyncThunk(
  `${FOOD_SHOW_ORIGINAL}/${FOOD_SHOW_GET_CLIENT_FOODS}`,
  async (credentials: any, { rejectWithValue }: any) => {
    getAllQuery = credentials;
    try {
      const response = await getAllClientFoodsService(getAllQuery);
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

export const createFoodShowAction = createAsyncThunk(
  `${FOOD_SHOW_ORIGINAL}/${FOOD_SHOW_CREATE}`,
  async (
    { credentials, onSubmitForm, resetForm }: FoodShowCredentials,
    thunkAPI
  ) => {
    try {
      const response = await createFoodShowService(credentials);
      if (response?.status === 200 || response?.status === 201) {
        onSubmitForm();
        resetForm();
        toast.success(
          `${PublicDictionary.food_show} ${PublicDictionary.is_success_create}`
        );
        await thunkAPI.dispatch(getAllFoodShowAction(getAllQuery));
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

export const updateFoodShowAction = createAsyncThunk(
  `${FOOD_SHOW_ORIGINAL}/${FOOD_SHOW_UPDATE}`,
  async (
    { credentials, onSubmitForm, resetForm }: FoodShowCredentials,
    thunkAPI
  ) => {
    try {
      const response = await updateFoodShowService(credentials);
      if (response?.status === 200 || response?.status === 201) {
        onSubmitForm();
        resetForm();
        toast.success(
          `${PublicDictionary.food_show} ${PublicDictionary.is_success_update}`
        );
        await thunkAPI.dispatch(getAllFoodShowAction(getAllQuery));
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

export const deleteFoodShowAction = createAsyncThunk(
  `${FOOD_SHOW_ORIGINAL}/${FOOD_SHOW_DELETE}`,
  async ({ credentials }: FoodShowCredentials, thunkAPI) => {
    try {
      const response = await deleteFoodShowService(credentials);
      if (response?.status === 200 || response?.status === 201) {
        toast.success(
          `${PublicDictionary.food_show} ${PublicDictionary.is_success_delete}`
        );
        await thunkAPI.dispatch(getAllFoodShowAction(getAllQuery));
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

export const getByIdFoodShowAction = createAsyncThunk(
  `${FOOD_SHOW_ORIGINAL}/${FOOD_SHOW_GET_BY_ID}`,
  async ({ credentials }: FoodShowCredentials, thunkAPI) => {
    try {
      const response = await getByIdFoodShowService(credentials);
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
