import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GET_USER_PROFILE,
  GET_USERS,
  USERS,
} from "../../types/users/UsersTypes";
import {
  GetUserProfileService,
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

export const GetUserProfileAction = createAsyncThunk(
  `${USERS}/${GET_USER_PROFILE}`,
  async ({ credentials }: any, thunkAPI) => {
    try {
      const response = await GetUserProfileService(credentials);

      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);
