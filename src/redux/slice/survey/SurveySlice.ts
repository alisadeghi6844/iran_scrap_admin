import { createSlice } from "@reduxjs/toolkit";
import { SURVEY } from "../../types/survey/SurveyTypes";
import {
  CreateSurveyAction,
  GetAllSurveysAction,
  GetSurveyByIdAction,
  UpdateSurveyAction,
  DeleteSurveyAction,
  CreateQuestionAction,
  UpdateQuestionAction,
  DeleteQuestionAction,
  GetUserSurveyByIdAction,
  GetUserSurveysAction,
} from "../../actions/survey/SurveyActions";

const initialState = {
  // Create Survey
  createSurveyLoading: false,
  createSurveyError: null,
  createSurveyData: null,

  // Get All Surveys
  getAllSurveysLoading: false,
  getAllSurveysError: null,
  getAllSurveysData: [],

  // Get Survey By ID
  getSurveyByIdLoading: false,
  getSurveyByIdError: null,
  getSurveyByIdData: null,

  // Update Survey
  updateSurveyLoading: false,
  updateSurveyError: null,
  updateSurveyData: null,

  // Delete Survey
  deleteSurveyLoading: false,
  deleteSurveyError: null,
  deleteSurveyData: null,

  // Question Management
  createQuestionLoading: false,
  createQuestionError: null,
  createQuestionData: null,

  updateQuestionLoading: false,
  updateQuestionError: null,
  updateQuestionData: null,

  deleteQuestionLoading: false,
  deleteQuestionError: null,
  deleteQuestionData: null,

  // User Surveys
  getUserSurveyByIdLoading: false,
  getUserSurveyByIdError: null,
  getUserSurveyByIdData: null,

  getUserSurveysLoading: false,
  getUserSurveysError: null,
  getUserSurveysData: [],
};

const surveySlice = createSlice({
  name: SURVEY,
  initialState,
  reducers: {
    clearSurveyErrors: (state) => {
      state.createSurveyError = null;
      state.getAllSurveysError = null;
      state.getSurveyByIdError = null;
      state.updateSurveyError = null;
      state.deleteSurveyError = null;
      state.createQuestionError = null;
      state.updateQuestionError = null;
      state.deleteQuestionError = null;
      state.getUserSurveyByIdError = null;
      state.getUserSurveysError = null;
    },
    clearSurveyData: (state) => {
      state.createSurveyData = null;
      state.getSurveyByIdData = null;
      state.updateSurveyData = null;
      state.deleteSurveyData = null;
      state.createQuestionData = null;
      state.updateQuestionData = null;
      state.deleteQuestionData = null;
      state.getUserSurveyByIdData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Survey
      .addCase(CreateSurveyAction.pending, (state) => {
        state.createSurveyLoading = true;
        state.createSurveyError = null;
      })
      .addCase(CreateSurveyAction.fulfilled, (state, action) => {
        state.createSurveyLoading = false;
        state.createSurveyData = action.payload;
        state.createSurveyError = null;
      })
      .addCase(CreateSurveyAction.rejected, (state, action) => {
        state.createSurveyLoading = false;
        state.createSurveyError = action.payload;
      })

      // Get All Surveys
      .addCase(GetAllSurveysAction.pending, (state) => {
        state.getAllSurveysLoading = true;
        state.getAllSurveysError = null;
      })
      .addCase(GetAllSurveysAction.fulfilled, (state, action) => {
        state.getAllSurveysLoading = false;
        // Handle both array and object response
        state.getAllSurveysData = Array.isArray(action.payload) 
          ? action.payload 
          : (action.payload?.data || action.payload?.surveys || []);
        state.getAllSurveysError = null;
      })
      .addCase(GetAllSurveysAction.rejected, (state, action) => {
        state.getAllSurveysLoading = false;
        state.getAllSurveysError = action.payload;
      })

      // Get Survey By ID
      .addCase(GetSurveyByIdAction.pending, (state) => {
        state.getSurveyByIdLoading = true;
        state.getSurveyByIdError = null;
      })
      .addCase(GetSurveyByIdAction.fulfilled, (state, action) => {
        state.getSurveyByIdLoading = false;
        state.getSurveyByIdData = action.payload;
        state.getSurveyByIdError = null;
      })
      .addCase(GetSurveyByIdAction.rejected, (state, action) => {
        state.getSurveyByIdLoading = false;
        state.getSurveyByIdError = action.payload;
      })

      // Update Survey
      .addCase(UpdateSurveyAction.pending, (state) => {
        state.updateSurveyLoading = true;
        state.updateSurveyError = null;
      })
      .addCase(UpdateSurveyAction.fulfilled, (state, action) => {
        state.updateSurveyLoading = false;
        state.updateSurveyData = action.payload;
        state.updateSurveyError = null;
      })
      .addCase(UpdateSurveyAction.rejected, (state, action) => {
        state.updateSurveyLoading = false;
        state.updateSurveyError = action.payload;
      })

      // Delete Survey
      .addCase(DeleteSurveyAction.pending, (state) => {
        state.deleteSurveyLoading = true;
        state.deleteSurveyError = null;
      })
      .addCase(DeleteSurveyAction.fulfilled, (state, action) => {
        state.deleteSurveyLoading = false;
        state.deleteSurveyData = action.payload;
        state.deleteSurveyError = null;
        // Remove deleted survey from list - ensure it's an array
        if (Array.isArray(state.getAllSurveysData)) {
          state.getAllSurveysData = state.getAllSurveysData.filter(
            (survey: any) => survey.id !== action.payload.id
          );
        }
      })
      .addCase(DeleteSurveyAction.rejected, (state, action) => {
        state.deleteSurveyLoading = false;
        state.deleteSurveyError = action.payload;
      })

      // Create Question
      .addCase(CreateQuestionAction.pending, (state) => {
        state.createQuestionLoading = true;
        state.createQuestionError = null;
      })
      .addCase(CreateQuestionAction.fulfilled, (state, action) => {
        state.createQuestionLoading = false;
        state.createQuestionData = action.payload;
        state.createQuestionError = null;
      })
      .addCase(CreateQuestionAction.rejected, (state, action) => {
        state.createQuestionLoading = false;
        state.createQuestionError = action.payload;
      })

      // Update Question
      .addCase(UpdateQuestionAction.pending, (state) => {
        state.updateQuestionLoading = true;
        state.updateQuestionError = null;
      })
      .addCase(UpdateQuestionAction.fulfilled, (state, action) => {
        state.updateQuestionLoading = false;
        state.updateQuestionData = action.payload;
        state.updateQuestionError = null;
      })
      .addCase(UpdateQuestionAction.rejected, (state, action) => {
        state.updateQuestionLoading = false;
        state.updateQuestionError = action.payload;
      })

      // Delete Question
      .addCase(DeleteQuestionAction.pending, (state) => {
        state.deleteQuestionLoading = true;
        state.deleteQuestionError = null;
      })
      .addCase(DeleteQuestionAction.fulfilled, (state, action) => {
        state.deleteQuestionLoading = false;
        state.deleteQuestionData = action.payload;
        state.deleteQuestionError = null;
      })
      .addCase(DeleteQuestionAction.rejected, (state, action) => {
        state.deleteQuestionLoading = false;
        state.deleteQuestionError = action.payload;
      })

      // Get User Survey By ID
      .addCase(GetUserSurveyByIdAction.pending, (state) => {
        state.getUserSurveyByIdLoading = true;
        state.getUserSurveyByIdError = null;
      })
      .addCase(GetUserSurveyByIdAction.fulfilled, (state, action) => {
        state.getUserSurveyByIdLoading = false;
        state.getUserSurveyByIdData = action.payload;
        state.getUserSurveyByIdError = null;
      })
      .addCase(GetUserSurveyByIdAction.rejected, (state, action) => {
        state.getUserSurveyByIdLoading = false;
        state.getUserSurveyByIdError = action.payload;
      })

      // Get User Surveys
      .addCase(GetUserSurveysAction.pending, (state) => {
        state.getUserSurveysLoading = true;
        state.getUserSurveysError = null;
      })
      .addCase(GetUserSurveysAction.fulfilled, (state, action) => {
        state.getUserSurveysLoading = false;
        // Handle pagination response structure
        state.getUserSurveysData = action.payload;
        state.getUserSurveysError = null;
      })
      .addCase(GetUserSurveysAction.rejected, (state, action) => {
        state.getUserSurveysLoading = false;
        state.getUserSurveysError = action.payload;
      });
  },
});

export const { clearSurveyErrors, clearSurveyData } = surveySlice.actions;

// Selectors
export const selectCreateSurveyLoading = (state: any) => state.survey.createSurveyLoading;
export const selectCreateSurveyError = (state: any) => state.survey.createSurveyError;
export const selectCreateSurveyData = (state: any) => state.survey.createSurveyData;

export const selectGetAllSurveysLoading = (state: any) => state.survey.getAllSurveysLoading;
export const selectGetAllSurveysError = (state: any) => state.survey.getAllSurveysError;
export const selectGetAllSurveysData = (state: any) => state.survey.getAllSurveysData;

export const selectGetSurveyByIdLoading = (state: any) => state.survey.getSurveyByIdLoading;
export const selectGetSurveyByIdError = (state: any) => state.survey.getSurveyByIdError;
export const selectGetSurveyByIdData = (state: any) => state.survey.getSurveyByIdData;

export const selectUpdateSurveyLoading = (state: any) => state.survey.updateSurveyLoading;
export const selectUpdateSurveyError = (state: any) => state.survey.updateSurveyError;
export const selectUpdateSurveyData = (state: any) => state.survey.updateSurveyData;

export const selectDeleteSurveyLoading = (state: any) => state.survey.deleteSurveyLoading;
export const selectDeleteSurveyError = (state: any) => state.survey.deleteSurveyError;
export const selectDeleteSurveyData = (state: any) => state.survey.deleteSurveyData;

// Question selectors
export const selectCreateQuestionLoading = (state: any) => state.survey.createQuestionLoading;
export const selectCreateQuestionError = (state: any) => state.survey.createQuestionError;
export const selectCreateQuestionData = (state: any) => state.survey.createQuestionData;

export const selectUpdateQuestionLoading = (state: any) => state.survey.updateQuestionLoading;
export const selectUpdateQuestionError = (state: any) => state.survey.updateQuestionError;
export const selectUpdateQuestionData = (state: any) => state.survey.updateQuestionData;

export const selectDeleteQuestionLoading = (state: any) => state.survey.deleteQuestionLoading;
export const selectDeleteQuestionError = (state: any) => state.survey.deleteQuestionError;
export const selectDeleteQuestionData = (state: any) => state.survey.deleteQuestionData;

// User survey selectors
export const selectGetUserSurveyByIdLoading = (state: any) => state.survey.getUserSurveyByIdLoading;
export const selectGetUserSurveyByIdError = (state: any) => state.survey.getUserSurveyByIdError;
export const selectGetUserSurveyByIdData = (state: any) => state.survey.getUserSurveyByIdData;

export const selectGetUserSurveysLoading = (state: any) => state.survey.getUserSurveysLoading;
export const selectGetUserSurveysError = (state: any) => state.survey.getUserSurveysError;
export const selectGetUserSurveysData = (state: any) => state.survey.getUserSurveysData;

export default surveySlice.reducer;