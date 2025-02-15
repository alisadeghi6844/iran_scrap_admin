import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FOOD_MANAGEMENT_GET_ALL,
  FOOD_MANAGEMENT_CREATE,
  FOOD_MANAGEMENT_DELETE,
  FOOD_MANAGEMENT_GET_BY_ID,
  FOOD_MANAGEMENT_UPDATE,
  FOOD_MANAGEMENT_ORIGINAL,
} from "../../../../types/foodReservation/management/food/FoodTypes";
import {
  createFoodService,
  deleteFoodService,
  getAllFoodService,
  getByIdFoodService,
  updateFoodService,
} from "../../../../service/foodReservation/management/food/FoodService";
import { toast } from "react-toastify";
import { PublicDictionary } from "../../../../../utils/dictionary";

interface FoodCredentials {
  credentials?: any;
  onSubmitForm?: any;
  resetForm?: any;
}

let getAllQuery: any = null;

export const getAllFoodAction = createAsyncThunk(
  `${FOOD_MANAGEMENT_ORIGINAL}/${FOOD_MANAGEMENT_GET_ALL}`,
  async (credentials: any, { rejectWithValue }: any) => {
    getAllQuery = credentials;
    try {
      const response = await getAllFoodService(getAllQuery);
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

export const createFoodAction = createAsyncThunk(
  `${FOOD_MANAGEMENT_ORIGINAL}/${FOOD_MANAGEMENT_CREATE}`,
  async (
    { credentials, onSubmitForm, resetForm }: FoodCredentials,
    thunkAPI
  ) => {
    try {
      const response = await createFoodService(credentials);
      if (response?.status === 200 || response?.status === 201) {
        onSubmitForm();
        resetForm();
        toast.success(
          `${PublicDictionary.food} ${PublicDictionary.is_success_create}`
        );
        await thunkAPI.dispatch(getAllFoodAction(getAllQuery));
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

export const updateFoodAction = createAsyncThunk(
  `${FOOD_MANAGEMENT_ORIGINAL}/${FOOD_MANAGEMENT_UPDATE}`,
  async (
    { credentials, onSubmitForm, resetForm }: FoodCredentials,
    thunkAPI
  ) => {
    try {
      const response = await updateFoodService(credentials);
      if (response?.status === 200 || response?.status === 201) {
        onSubmitForm();
        resetForm();
        toast.success(
          `${PublicDictionary.food} ${PublicDictionary.is_success_update}`
        );
        await thunkAPI.dispatch(getAllFoodAction(getAllQuery));
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

export const deleteFoodAction = createAsyncThunk(
  `${FOOD_MANAGEMENT_ORIGINAL}/${FOOD_MANAGEMENT_DELETE}`,
  async ({ credentials }: FoodCredentials, thunkAPI) => {
    try {
      const response = await deleteFoodService(credentials);
      if (response?.status === 200 || response?.status === 201) {
        toast.success(
          `${PublicDictionary.food} ${PublicDictionary.is_success_delete}`
        );
        await thunkAPI.dispatch(getAllFoodAction(getAllQuery));
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

export const getByIdFoodAction = createAsyncThunk(
  `${FOOD_MANAGEMENT_ORIGINAL}/${FOOD_MANAGEMENT_GET_BY_ID}`,
  async ({ credentials }: FoodCredentials, thunkAPI) => {
    try {
      const response = await getByIdFoodService(credentials);
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
