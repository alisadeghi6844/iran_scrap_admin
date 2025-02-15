import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APPETIZER_MANAGEMENT_ORIGINAL } from "../../../../types/foodReservation/management/appetizer/AppetizerTypes";
import {
  createAppetizerAction,
  deleteAppetizerAction,
  getAllAppetizerAction,
  getByIdAppetizerAction,
  updateAppetizerAction,
} from "../../../../actions/foodReservation/management/appetizer/AppetizerAction";

interface AppetizerState {
  getAllAppetizerError: string | null;
  getAllAppetizerLoading: boolean;
  getAllAppetizerData: any;

  getByIdAppetizerError: string | null;
  getByIdAppetizerLoading: boolean;
  getByIdAppetizerData: any;

  createAppetizerError: string | null;
  createAppetizerLoading: boolean;

  updateAppetizerError: string | null;
  updateAppetizerLoading: boolean;

  deleteAppetizerError: string | null;
  deleteAppetizerLoading: boolean;
}

const initialState: AppetizerState = {
  getAllAppetizerError: null,
  getAllAppetizerLoading: false,
  getAllAppetizerData: [],

  getByIdAppetizerError: null,
  getByIdAppetizerLoading: false,
  getByIdAppetizerData: {},

  createAppetizerError: null,
  createAppetizerLoading: false,

  updateAppetizerError: null,
  updateAppetizerLoading: false,

  deleteAppetizerError: null,
  deleteAppetizerLoading: false,
};

const appetizerSlice = createSlice({
  name: APPETIZER_MANAGEMENT_ORIGINAL,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all
      .addCase(getAllAppetizerAction.pending, (state) => {
        state.getAllAppetizerLoading = true;
        state.getAllAppetizerData = [];
        state.getAllAppetizerError = null;
      })
      .addCase(
        getAllAppetizerAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getAllAppetizerLoading = false;
          state.getAllAppetizerData = action.payload;
          state.getAllAppetizerError = null;
        }
      )
      .addCase(
        getAllAppetizerAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getAllAppetizerLoading = false;
          state.getAllAppetizerError = action.payload;
          state.getAllAppetizerData = [];
        }
      )

      // Get by id
      .addCase(getByIdAppetizerAction.pending, (state) => {
        state.getByIdAppetizerLoading = true;
        state.getByIdAppetizerData = [];
        state.getByIdAppetizerError = null;
      })
      .addCase(
        getByIdAppetizerAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getByIdAppetizerLoading = false;
          state.getByIdAppetizerData = action.payload;
          state.getByIdAppetizerError = null;
        }
      )
      .addCase(
        getByIdAppetizerAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getByIdAppetizerLoading = false;
          state.getByIdAppetizerError = action.payload;
          state.getByIdAppetizerData = [];
        }
      )

      // Create
      .addCase(createAppetizerAction.pending, (state) => {
        state.createAppetizerLoading = true;
        state.createAppetizerError = null;
      })
      .addCase(createAppetizerAction.fulfilled, (state) => {
        state.createAppetizerLoading = false;
        state.createAppetizerError = null;
      })
      .addCase(
        createAppetizerAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.createAppetizerLoading = false;
          state.createAppetizerError = action.payload;
        }
      )

      // update
      .addCase(updateAppetizerAction.pending, (state) => {
        state.updateAppetizerLoading = true;
        state.updateAppetizerError = null;
      })
      .addCase(updateAppetizerAction.fulfilled, (state) => {
        state.updateAppetizerLoading = false;
        state.updateAppetizerError = null;
      })
      .addCase(
        updateAppetizerAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.updateAppetizerLoading = false;
          state.updateAppetizerError = action.payload;
        }
      )

      // Delete
      .addCase(deleteAppetizerAction.pending, (state) => {
        state.deleteAppetizerLoading = true;
        state.deleteAppetizerError = null;
      })
      .addCase(deleteAppetizerAction.fulfilled, (state) => {
        state.deleteAppetizerLoading = false;
        state.deleteAppetizerError = null;
      })
      .addCase(
        deleteAppetizerAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.deleteAppetizerLoading = false;
          state.deleteAppetizerError = action.payload;
        }
      );
  },
});

// Selectors
export const selectGetAllAppetizerError = (state: any) =>
  state.appetizer.getAllAppetizerError;
export const selectGetAllAppetizerLoading = (state: any) =>
  state.appetizer.getAllAppetizerLoading;
export const selectGetAllAppetizerData = (state: any) =>
  state.appetizer.getAllAppetizerData;

export const selectGetByIdAppetizerError = (state: any) =>
  state.appetizer.getByIdAppetizerError;
export const selectGetByIdAppetizerLoading = (state: any) =>
  state.appetizer.getByIdAppetizerLoading;
export const selectGetByIdAppetizerData = (state: any) =>
  state.appetizer.getByIdAppetizerData;

export const selectCreateAppetizerError = (state: any) =>
  state.appetizer.createAppetizerError;
export const selectCreateAppetizerLoading = (state: any) =>
  state.appetizer.createAppetizerLoading;

export const selectUpdateAppetizerError = (state: any) =>
  state.appetizer.updateAppetizerError;
export const selectUpdateAppetizerLoading = (state: any) =>
  state.appetizer.updateAppetizerLoading;

export const selectDeleteAppetizerError = (state: any) =>
  state.appetizer.deleteAppetizerError;
export const selectDeleteAppetizerLoading = (state: any) =>
  state.appetizer.deleteAppetizerLoading;

export default appetizerSlice.reducer;
