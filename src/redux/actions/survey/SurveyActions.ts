import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  CREATE_SURVEY,
  GET_ALL_SURVEYS,
  GET_SURVEY_BY_ID,
  UPDATE_SURVEY,
  DELETE_SURVEY,
} from "../../types/survey/SurveyTypes";
import {
  CreateSurveyService,
  GetAllSurveysService,
  GetSurveyByIdService,
  UpdateSurveyService,
  DeleteSurveyService,
} from "../../service/survey/SurveyServices";

export const CreateSurveyAction = createAsyncThunk(
  CREATE_SURVEY,
  async (credentials: any, { rejectWithValue }) => {
    try {
      const response = await CreateSurveyService(credentials);
      if (response?.status === 200 || response?.status === 201) {
        toast.success("نظرسنجی با موفقیت ایجاد شد");
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      toast.error("خطا در ایجاد نظرسنجی");
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const GetAllSurveysAction = createAsyncThunk(
  GET_ALL_SURVEYS,
  async (credentials: any, { rejectWithValue }) => {
    try {
      const response = await GetAllSurveysService(credentials);
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

export const GetSurveyByIdAction = createAsyncThunk(
  GET_SURVEY_BY_ID,
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await GetSurveyByIdService(id);
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

export const UpdateSurveyAction = createAsyncThunk(
  UPDATE_SURVEY,
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await UpdateSurveyService(id, data);
      if (response?.status === 200 || response?.status === 201) {
        toast.success("نظرسنجی با موفقیت ویرایش شد");
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      toast.error("خطا در ویرایش نظرسنجی");
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const DeleteSurveyAction = createAsyncThunk(
  DELETE_SURVEY,
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await DeleteSurveyService(id);
      if (response?.status === 200 || response?.status === 204) {
        toast.success("نظرسنجی با موفقیت حذف شد");
        return { id };
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      toast.error("خطا در حذف نظرسنجی");
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);