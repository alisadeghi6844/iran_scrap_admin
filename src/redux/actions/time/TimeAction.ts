import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_TIME, TIME_ORIGINAL } from "../../types/time/TimeTypes";
import { getTimeService } from "../../service/time/TimeService";

let getAllQuery: any = null;

export const getTimeAction = createAsyncThunk(
  `${TIME_ORIGINAL}/${GET_TIME}`,
  async (credentials: any, { rejectWithValue }: any) => {
    getAllQuery = credentials;
    try {
      const response = await getTimeService(getAllQuery);
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

