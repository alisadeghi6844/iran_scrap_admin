import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CATEGORY,
  CEATE_CATEGORY_ATTRIBUTE,
  CREATE_CATEGORY,
  GET_CATEGORY,
  GET_CATEGORY_BY_ID,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_ATTRIBUTE,
} from "../../types/category/CategoryTypes";
import {
  createCategoryAttributeService,
  createCategoryService,
  getCategoryByIdService,
  getCategoryService,
  updateCategoryAttributeService,
  updateCategoryService,
} from "../../service/category/CategoryServices";
import { toast } from "react-toastify";

let query: any = null;

export const GetCategoryAction = createAsyncThunk(
  `${CATEGORY}/${GET_CATEGORY}`,
  async (credentials: any, { rejectWithValue }: any) => {
    query = credentials;
    try {
      const response = await getCategoryService(query);
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

export const GetCategoryByIdAction = createAsyncThunk(
  `${CATEGORY}/${GET_CATEGORY_BY_ID}`,
  async (credentials: any, { rejectWithValue }: any) => {

    try {
      const response = await getCategoryByIdService({credentials});
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

export const CreateCategoryAction = createAsyncThunk(
  `${CATEGORY}/${CREATE_CATEGORY}`,
  async ({ credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await createCategoryService(credentials);
      if (response?.status == 201) {
        toast.success("دسته بندی با موفقیت ساخته شد");
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

export const UpdateCategoryAction = createAsyncThunk(
  `${CATEGORY}/${UPDATE_CATEGORY}`,
  async ({ id,credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await updateCategoryService(credentials,id);
      if (response?.status == 200) {
        toast.success("دسته بندی با موفقیت ویرایش شد");
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

export const CreateCategoryAttributeAction = createAsyncThunk(
  `${CATEGORY}/${CEATE_CATEGORY_ATTRIBUTE}`,
  async ({ credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await createCategoryAttributeService(credentials);
      if (response?.status == 201) {
        toast.success("ویژگی دسته بندی با موفقیت ساخته شد");
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

export const UpdateCategoryAttributeAction = createAsyncThunk(
  `${CATEGORY}/${UPDATE_CATEGORY_ATTRIBUTE}`,
  async ({ credentials }: any, thunkAPI) => {
    try {
      const response = await updateCategoryAttributeService(credentials);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);
