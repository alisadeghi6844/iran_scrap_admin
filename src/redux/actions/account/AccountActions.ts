import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CHANGE_CLIENT_PASSWORD,
  CHANGE_PASSWORD,
  GET_ALL_USERS,
  GET_CURRENT_USER_INFO,
  IS_TOKEN_VALID,
  LOG_OUT_AUTH,
  LOGIN_AUTH,
  SEND_CLIENT_OTP,
  VERIFY_OTP,
} from "../../types/account/AccountTypes";
import {
  ChangeClientPasswordService,
  ChangePasswordService,
  getAllUsersService,
  GetCurrentUserInfoService,
  IsTokenValidService,
  LoginService,
  LogOutService,
  SendClientOtpService,
  VerifyOtpService,
} from "../../service/account/AccountServises";
import { SetToken } from "../../../api/setToken";
import { toast } from "react-toastify";

interface changePasswordCredentials {
  credentials?: any;
  setIsPasswordChanged?: any;
}

export const LoginAction = createAsyncThunk(
  LOGIN_AUTH,
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await LoginService(credentials);
      if (response?.status === 200) {
        if (response?.data?.accessToken) {
          SetToken("token", response.data.accessToken, 2000 * 60 * 1000);

        }
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

export const LogOutAction = createAsyncThunk(
  LOG_OUT_AUTH,
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await LogOutService(credentials);
      if (response?.status === 200) {
        SetToken("token", null, 0);
        SetToken("refresh-token", null, 0);

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

export const ChangePasswordAction = createAsyncThunk(
  `${CHANGE_PASSWORD}`,
  async (
    { credentials, setIsPasswordChanged }: changePasswordCredentials,
    thunkAPI
  ) => {
    try {
      const response = await ChangePasswordService(credentials);
      if (response?.status === 200 || response?.status === 201) {
        setIsPasswordChanged && setIsPasswordChanged(true);
        toast.success(`رمز عبور با موفقیت ویرایش شد`);
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

export const IsTokenValidAction = createAsyncThunk(
  IS_TOKEN_VALID,
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await IsTokenValidService(credentials);
      return true;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllUsersAction = createAsyncThunk(
  GET_ALL_USERS,
  async (credentials: any, { rejectWithValue }: any) => {
    try {
      const response = await getAllUsersService(credentials);
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

export const getCurrentUserInfoAction = createAsyncThunk(
  GET_CURRENT_USER_INFO,
  async (credentials: any, { rejectWithValue }: any) => {
    try {
      const response = await GetCurrentUserInfoService(credentials);
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

export const SendClientOtpAction = createAsyncThunk(
  SEND_CLIENT_OTP,
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await SendClientOtpService(credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const VerifyOtpAction = createAsyncThunk(
  VERIFY_OTP,
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await VerifyOtpService(credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const ChangeClientPasswordAction = createAsyncThunk(
  CHANGE_CLIENT_PASSWORD,
  async ({ credentials, setIsPasswordChanged }, { rejectWithValue }) => {
    try {
      const response = await ChangeClientPasswordService(credentials);
      if (response?.status === 200) {
        setIsPasswordChanged(true);
        toast.success("رمز عبور با موفقیت ویرایش شد")
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);
