import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FAQ } from "../../types/faq/FaqTypes";
import {
  CreateFaqAction,
  DeleteFaqAction,
  GetFaqAction,
  UpdateFaqAction,
} from "../../actions/faq/FaqActions";

interface faqState {
  getFaqError: string | null;
  getFaqLoading: boolean;
  getFaqData: any;

  createFaqError: any;
  createFaqLoading: any;
  createFaqData: any;

  updateFaqError: string | null;
  updateFaqLoading: boolean;
  updateFaqData: any;

  deleteFaqError: string | null;
  deleteFaqLoading: boolean;
  deleteFaqData: any;
}

const initialState: faqState = {
  getFaqError: null,
  getFaqLoading: false,
  getFaqData: [],

  createFaqError: null,
  createFaqLoading: false,
  createFaqData: [],

  updateFaqError: null,
  updateFaqLoading: false,
  updateFaqData: [],

  deleteFaqError: null,
  deleteFaqLoading: false,
  deleteFaqData: [],
};

const faqSlice = createSlice({
  name: FAQ,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get faq
      .addCase(GetFaqAction.pending, (state) => {
        state.getFaqLoading = true;
        state.getFaqData = [];
        state.getFaqError = null;
      })
      .addCase(GetFaqAction.fulfilled, (state, action: PayloadAction<any>) => {
        state.getFaqLoading = false;
        state.getFaqData = action.payload;
        state.getFaqError = null;
      })
      .addCase(
        GetFaqAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getFaqLoading = false;
          state.getFaqError = action.payload;
          state.getFaqData = [];
        }
      )
      // create faq
      .addCase(CreateFaqAction.pending, (state) => {
        state.createFaqLoading = true;
        state.createFaqData = [];
        state.createFaqError = null;
      })
      .addCase(CreateFaqAction.fulfilled, (state, action) => {
        state.createFaqLoading = false;
        state.createFaqData = action.payload;
        state.createFaqError = null;
      })
      .addCase(CreateFaqAction.rejected, (state, action) => {
        state.createFaqLoading = false;
        state.createFaqError = action.payload;
        state.createFaqData = [];
      })

      // update faq
      .addCase(UpdateFaqAction.pending, (state) => {
        state.updateFaqLoading = true;
        state.updateFaqData = [];
        state.updateFaqError = null;
      })
      .addCase(UpdateFaqAction.fulfilled, (state, action) => {
        state.updateFaqLoading = false;
        state.updateFaqData = action.payload;
        state.updateFaqError = null;
      })
      .addCase(UpdateFaqAction.rejected, (state, action) => {
        state.updateFaqLoading = false;
        state.updateFaqError = action.payload;
        state.updateFaqData = [];
      })

      // delete faq
      .addCase(DeleteFaqAction.pending, (state) => {
        state.deleteFaqLoading = true;
        state.deleteFaqData = [];
        state.deleteFaqError = null;
      })
      .addCase(DeleteFaqAction.fulfilled, (state, action) => {
        state.deleteFaqLoading = false;
        state.deleteFaqData = action.payload;
        state.deleteFaqError = null;
      })
      .addCase(DeleteFaqAction.rejected, (state, action) => {
        state.deleteFaqLoading = false;
        state.deleteFaqError = action.payload;
        state.deleteFaqData = [];
      });
  },
});

export const selectGetFaqError = (state: any) => state.faq.getFaqError;
export const selectGetFaqLoading = (state: any) => state.faq.getFaqLoading;
export const selectGetFaqData = (state: any) => state.faq.getFaqData;

export const selectCreateFaqError = (state: any) => state.faq.createFaqError;
export const selectCreateFaqLoading = (state: any) =>
  state.faq.createFaqLoading;
export const selectCreateFaqData = (state: any) => state.faq.createFaqData;

export const selectUpdateFaqError = (state: any) => state.faq.updateFaqError;
export const selectUpdateFaqLoading = (state: any) =>
  state.faq.updateFaqLoading;
export const selectUpdateFaqData = (state: any) => state.faq.updateFaqData;

export const selectDeleteFaqError = (state: any) => state.faq.deleteFaqError;
export const selectDeleteFaqLoading = (state: any) =>
  state.faq.deleteFaqLoading;
export const selectDeleteFaqData = (state: any) => state.faq.deleteFaqData;

export default faqSlice.reducer;
