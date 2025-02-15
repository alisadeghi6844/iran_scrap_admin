import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CLIENT_FOOD_RESERVE_GET_ALL,
  CLIENT_FOOD_RESERVE_CREATE,
  CLIENT_FOOD_RESERVE_DELETE,
  FOOD_RESERVE_ORIGINAL,
  GET_CURRENT_USER_HISTORY,
} from "../../../../types/foodReservation/management/foodReserve/FoodReserveTypes";
import {
  createClientFoodReserveService,
  deleteClientFoodReserveService,
  getAllClientFoodReserveService,
  getCurrentUserHistoryService,
} from "../../../../service/foodReservation/management/foodReserve/FoodReserveService";
import { toast } from "react-toastify";
import { PublicDictionary } from "../../../../../utils/dictionary";
import { getAllClientFoodsAction } from "../foodShow/FoodShowAction";

interface FoodReserveCredentials {
  credentials?: any;
  onSubmitForm?: any;
  resetForm?: any;
}

let getAllQuery: any = null;

export const getAllClientFoodReserveAction = createAsyncThunk(
  `${FOOD_RESERVE_ORIGINAL}/${CLIENT_FOOD_RESERVE_GET_ALL}`,
  async (credentials: any, { rejectWithValue }: any) => {
    getAllQuery = credentials;

    try {
      const response = await getAllClientFoodReserveService(getAllQuery);
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

export const createClientFoodReserveAction = createAsyncThunk(
  `${FOOD_RESERVE_ORIGINAL}/${CLIENT_FOOD_RESERVE_CREATE}`,
  async (
    { credentials, query }: { credentials: FoodReserveCredentials; query: any },
    thunkAPI
  ) => {
    try {
      const response = await createClientFoodReserveService(credentials);
      if (response?.status === 200 || response?.status === 201) {
        toast.success(
          `${PublicDictionary.food_reserve} ${PublicDictionary.is_success_add}`
        );
        await thunkAPI.dispatch(getAllClientFoodsAction({ date: query }));
        await thunkAPI.dispatch(getAllClientFoodReserveAction({ date: query }));

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

export const deleteClientFoodReserveAction = createAsyncThunk(
  `${FOOD_RESERVE_ORIGINAL}/${CLIENT_FOOD_RESERVE_DELETE}`,
  async (
    {
      credentials,
      date,
      query,
    }: { credentials: FoodReserveCredentials; date: any; query: any },
    thunkAPI
  ) => {
    try {
      const response = await deleteClientFoodReserveService(credentials, date);
      if (response?.status === 200 || response?.status === 201) {
        toast.success(
          `${PublicDictionary.food_reserve} ${PublicDictionary.is_success_delete}`
        );
        await thunkAPI.dispatch(getAllClientFoodsAction({ date: query }));
        await thunkAPI.dispatch(getAllClientFoodReserveAction({ date: query }));
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

export const getCurrentUserHistoryAction = createAsyncThunk(
  `${FOOD_RESERVE_ORIGINAL}/${GET_CURRENT_USER_HISTORY}`,
  async (credentials: any, { rejectWithValue }: any) => {
    try {
      const response = await getCurrentUserHistoryService(credentials);
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
