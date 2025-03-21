import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GET_USERS,
  GET_USERS_PROVIDERS,
  USERS,
} from "../../types/users/UsersTypes";
import {
  GetUsersProvidersService,
  GetUsersService,
} from "../../service/users/UsersServices";

export const GetUsersAction = createAsyncThunk(
  `${USERS}/${GET_USERS}`,
  async ({ credentials }: any, thunkAPI) => {
    try {
      const response = await GetUsersService(credentials);

      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const GetUsersProvidersAction = createAsyncThunk(
  `${USERS}/${GET_USERS_PROVIDERS}`,
  async ({ credentials }: any, thunkAPI) => {
    try {
      const response = await GetUsersProvidersService(credentials);

      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);


