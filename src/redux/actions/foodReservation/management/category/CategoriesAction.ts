import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FOOD_CATEGORY_GET_ALL,
  FOOD_CATEGORY_CREATE,
  FOOD_CATEGORY_DELETE,
  FOOD_CATEGORY_GET_BY_ID,
  FOOD_CATEGORY_UPDATE,
  FOOD_CATEGORY_ORIGINAL,
} from "../../../../types/foodReservation/management/category/CategoriesTypes";
import {
  createFoodCategoriesService,
  deleteFoodCategoriesService,
  getAllFoodCategoriesService,
  getByIdFoodCategoriesService,
  updateFoodCategoriesService,
} from "../../../../service/foodReservation/management/category/CategoriesService";
import { toast } from "react-toastify";
import { PublicDictionary } from "../../../../../utils/dictionary";

interface FoodCategoryCredentials {
  credentials?: any;
  onSubmitForm?: any;
  resetForm?: any;
}

let getAllFoodQuery: any = null;

export const getAllFoodCategoryAction = createAsyncThunk(
  `${FOOD_CATEGORY_ORIGINAL}/${FOOD_CATEGORY_GET_ALL}`,
  async (credentials: any, { rejectWithValue }: any) => {
    getAllFoodQuery = credentials;
    try {
      const response = await getAllFoodCategoriesService(getAllFoodQuery);
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

export const createFoodCategoryAction = createAsyncThunk(
  `${FOOD_CATEGORY_ORIGINAL}/${FOOD_CATEGORY_CREATE}`,
  async (
    { credentials, onSubmitForm, resetForm }: FoodCategoryCredentials,
    thunkAPI
  ) => {
    try {
      const response = await createFoodCategoriesService(credentials);
      if (response?.status === 200 || response?.status === 201) {
        onSubmitForm();
        resetForm();
        toast.success(
          `${PublicDictionary.food_category} ${PublicDictionary.is_success_create}`
        );
        await thunkAPI.dispatch(getAllFoodCategoryAction(getAllFoodQuery));
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

export const updateFoodCategoryAction = createAsyncThunk(
  `${FOOD_CATEGORY_ORIGINAL}/${FOOD_CATEGORY_UPDATE}`,
  async (
    { credentials, onSubmitForm, resetForm }: FoodCategoryCredentials,
    thunkAPI
  ) => {
    try {
      const response = await updateFoodCategoriesService(credentials);
      if (response?.status === 200 || response?.status === 201) {
        onSubmitForm();
        resetForm();
        toast.success(
          `${PublicDictionary.food_category} ${PublicDictionary.is_success_update}`
        );
        await thunkAPI.dispatch(getAllFoodCategoryAction(getAllFoodQuery));
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

export const deleteFoodCategoryAction = createAsyncThunk(
  `${FOOD_CATEGORY_ORIGINAL}/${FOOD_CATEGORY_DELETE}`,
  async ({ credentials }: FoodCategoryCredentials, thunkAPI) => {
    try {
      const response = await deleteFoodCategoriesService(credentials);
      if (response?.status === 200 || response?.status === 201) {
        toast.success(
          `${PublicDictionary.food_category} ${PublicDictionary.is_success_delete}`
        );
        await thunkAPI.dispatch(getAllFoodCategoryAction(getAllFoodQuery));
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

export const getByIdFoodCategoryAction = createAsyncThunk(
  `${FOOD_CATEGORY_ORIGINAL}/${FOOD_CATEGORY_GET_BY_ID}`,
  async ({ credentials }: FoodCategoryCredentials, thunkAPI) => {
    try {
      const response = await getByIdFoodCategoriesService(credentials);
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
