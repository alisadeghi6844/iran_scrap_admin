import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  CREATE_SURVEY,
  GET_ALL_SURVEYS,
  GET_SURVEY_BY_ID,
  UPDATE_SURVEY,
  DELETE_SURVEY,
  CREATE_QUESTION,
  UPDATE_QUESTION,
  DELETE_QUESTION,
  GET_USER_SURVEY_BY_ID,
  GET_USER_SURVEYS,
} from "../../types/survey/SurveyTypes";
import {
  CreateSurveyService,
  GetAllSurveysService,
  GetSurveyByIdService,
  UpdateSurveyService,
  DeleteSurveyService,
  CreateQuestionService,
  UpdateQuestionService,
  DeleteQuestionService,
  GetUserSurveyByIdService,
  GetUserSurveysService,
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

// Question Actions
export const CreateQuestionAction = createAsyncThunk(
  CREATE_QUESTION,
  async (
    { surveyId, data }: { surveyId: string; data: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await CreateQuestionService(surveyId, data);
      if (response?.status === 200 || response?.status === 201) {
        toast.success("سوال با موفقیت اضافه شد");
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      toast.error("خطا در اضافه کردن سوال");
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const UpdateQuestionAction = createAsyncThunk(
  UPDATE_QUESTION,
  async (
    { questionId, data }: { questionId: string; data: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await UpdateQuestionService(questionId, data);
      if (response?.status === 200 || response?.status === 201) {
        toast.success("سوال با موفقیت ویرایش شد");
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      toast.error("خطا در ویرایش سوال");
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const DeleteQuestionAction = createAsyncThunk(
  DELETE_QUESTION,
  async (
    { surveyId, questionId }: { surveyId: string; questionId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await DeleteQuestionService(surveyId, questionId);
      if (response?.status === 200 || response?.status === 204) {
        toast.success("سوال با موفقیت حذف شد");
        return { questionId };
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      toast.error("خطا در حذف سوال");
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

// User Survey Actions
export const GetUserSurveyByIdAction = createAsyncThunk(
  GET_USER_SURVEY_BY_ID,
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await GetUserSurveyByIdService(id);
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

export const GetUserSurveysAction = createAsyncThunk(
  GET_USER_SURVEYS,
  async (params: { surveyId: string; page?: number; size?: number }, { rejectWithValue }) => {
    try {
      const response = await GetUserSurveysService(params);
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
