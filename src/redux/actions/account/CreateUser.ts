import { createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import {
  CREATE_USER_CREATE,
  CREATE_USER_DELETE,
  CREATE_USER_GET_ALL,
  CREATE_USER_GET_BY_ID,
  CREATE_USER_ORIGINAL,
  CREATE_USER_UPDATE,
  UPDATE_USER_PASSWORD,
} from "../../types/account/createUser";
import {
  createCreateUserService,
  deleteCreateUserService,
  getAllCreateUserService,
  getByIdCreateUserService,
  updateCreateUserService,
  updateUserPasswordService,
} from "../../service/account/CreateUserService";
import { PublicDictionary } from "../../../utils/dictionary";

interface CreateUserCredentials {
  credentials?: any;
  onSubmitForm?: any;
  resetForm?: any;
}

let getAllQuery: any = null;

export const getAllCreateUserAction = createAsyncThunk(
  `${CREATE_USER_ORIGINAL}/${CREATE_USER_GET_ALL}`,
  async (credentials: any, { rejectWithValue }: any) => {
    getAllQuery = credentials;
    try {
      const response = await getAllCreateUserService(getAllQuery);
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

export const createCreateUserAction = createAsyncThunk(
  `${CREATE_USER_ORIGINAL}/${CREATE_USER_CREATE}`,
  async (
    { credentials, onSubmitForm, resetForm }: CreateUserCredentials,
    thunkAPI
  ) => {
    try {
      const response = await createCreateUserService(credentials);
      if (response?.status === 200 || response?.status === 201) {
        onSubmitForm();
        resetForm();
        toast.success(
          `${PublicDictionary.food_createUser} ${PublicDictionary.is_success_create}`
        );
        await thunkAPI.dispatch(getAllCreateUserAction(getAllQuery));
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

export const updateCreateUserAction = createAsyncThunk(
  `${CREATE_USER_ORIGINAL}/${CREATE_USER_UPDATE}`,
  async (
    { credentials, onSubmitForm, resetForm }: CreateUserCredentials,
    thunkAPI
  ) => {
    try {
      const response = await updateCreateUserService(credentials);
      if (response?.status === 200 || response?.status === 201) {
        onSubmitForm();
        resetForm();
        toast.success(
          `${PublicDictionary.food_createUser} ${PublicDictionary.is_success_update}`
        );
        await thunkAPI.dispatch(getAllCreateUserAction(getAllQuery));
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

export const deleteCreateUserAction = createAsyncThunk(
  `${CREATE_USER_ORIGINAL}/${CREATE_USER_DELETE}`,
  async ({ credentials }: CreateUserCredentials, thunkAPI) => {
    try {
      const response = await deleteCreateUserService(credentials);
      if (response?.status === 200 || response?.status === 201) {
        toast.success(
          `${PublicDictionary.food_createUser} ${PublicDictionary.is_success_delete}`
        );
        await thunkAPI.dispatch(getAllCreateUserAction(getAllQuery));
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

export const getByIdCreateUserAction = createAsyncThunk(
  `${CREATE_USER_ORIGINAL}/${CREATE_USER_GET_BY_ID}`,
  async ({ credentials }: CreateUserCredentials, thunkAPI) => {
    try {
      const response = await getByIdCreateUserService(credentials);
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


export const updateUserPasswordAction = createAsyncThunk(
  `${CREATE_USER_ORIGINAL}/${UPDATE_USER_PASSWORD}`,
  async (
    { credentials, onSubmitForm, resetForm }: CreateUserCredentials,
    thunkAPI
  ) => {
    try {
      const response = await updateUserPasswordService(credentials);
      if (response?.status === 200 || response?.status === 201) {
        onSubmitForm();
        resetForm();
        toast.success(
          `${PublicDictionary.user_password} ${PublicDictionary.is_success_update}`
        );
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);