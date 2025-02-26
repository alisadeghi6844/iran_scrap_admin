import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_USERS } from "../../types/users/UsersTypes";
import { GetUsersService } from "../../service/users/UsersServices";

export const GetUsersAction = createAsyncThunk(
  `${GET_USERS}`,
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
