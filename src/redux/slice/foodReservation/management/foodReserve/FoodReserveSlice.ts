import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FOOD_RESERVE_ORIGINAL } from "../../../../types/foodReservation/management/foodReserve/FoodReserveTypes";
import {
  createClientFoodReserveAction,
  deleteClientFoodReserveAction,
  getAllClientFoodReserveAction,
  getCurrentUserHistoryAction,
} from "../../../../actions/foodReservation/management/foodReserve/FoodReserveAction";

interface ClientFoodReserveState {
  getAllClientFoodReserveError: string | null;
  getAllClientFoodReserveLoading: boolean;
  getAllClientFoodReserveData: any;

  getCurrentUserHistoryError: string | null;
  getCurrentUserHistoryLoading: boolean;
  getCurrentUserHistoryData: any;

  createClientFoodReserveError: string | null;
  createClientFoodReserveLoading: boolean;

  deleteClientFoodReserveError: string | null;
  deleteClientFoodReserveLoading: boolean;
}

const initialState: ClientFoodReserveState = {
  getAllClientFoodReserveError: null,
  getAllClientFoodReserveLoading: false,
  getAllClientFoodReserveData: [],

  getCurrentUserHistoryError: null,
  getCurrentUserHistoryLoading: false,
  getCurrentUserHistoryData: [],

  createClientFoodReserveError: null,
  createClientFoodReserveLoading: false,

  deleteClientFoodReserveError: null,
  deleteClientFoodReserveLoading: false,
};

const foodReserveSlice = createSlice({
  name: FOOD_RESERVE_ORIGINAL,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all
      .addCase(getAllClientFoodReserveAction.pending, (state) => {
        state.getAllClientFoodReserveLoading = true;
        state.getAllClientFoodReserveData = [];
        state.getAllClientFoodReserveError = null;
      })
      .addCase(
        getAllClientFoodReserveAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getAllClientFoodReserveLoading = false;
          state.getAllClientFoodReserveData = action.payload;
          state.getAllClientFoodReserveError = null;
        }
      )
      .addCase(
        getAllClientFoodReserveAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getAllClientFoodReserveLoading = false;
          state.getAllClientFoodReserveError = action.payload;
          state.getAllClientFoodReserveData = [];
        }
      )

      // get current user history
      .addCase(getCurrentUserHistoryAction.pending, (state) => {
        state.getCurrentUserHistoryLoading = true;
        state.getCurrentUserHistoryData = [];
        state.getCurrentUserHistoryError = null;
      })
      .addCase(
        getCurrentUserHistoryAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getCurrentUserHistoryLoading = false;
          state.getCurrentUserHistoryData = action.payload;
          state.getCurrentUserHistoryError = null;
        }
      )
      .addCase(
        getCurrentUserHistoryAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getCurrentUserHistoryLoading = false;
          state.getCurrentUserHistoryError = action.payload;
          state.getCurrentUserHistoryData = [];
        }
      )

      // Create
      .addCase(createClientFoodReserveAction.pending, (state) => {
        state.createClientFoodReserveLoading = true;
        state.createClientFoodReserveError = null;
      })
      .addCase(createClientFoodReserveAction.fulfilled, (state) => {
        state.createClientFoodReserveLoading = false;
        state.createClientFoodReserveError = null;
      })
      .addCase(
        createClientFoodReserveAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.createClientFoodReserveLoading = false;
          state.createClientFoodReserveError = action.payload;
        }
      )

      // Delete
      .addCase(deleteClientFoodReserveAction.pending, (state) => {
        state.deleteClientFoodReserveLoading = true;
        state.deleteClientFoodReserveError = null;
      })
      .addCase(deleteClientFoodReserveAction.fulfilled, (state) => {
        state.deleteClientFoodReserveLoading = false;
        state.deleteClientFoodReserveError = null;
      })
      .addCase(
        deleteClientFoodReserveAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.deleteClientFoodReserveLoading = false;
          state.deleteClientFoodReserveError = action.payload;
        }
      );
  },
});

// Selectors
export const selectGetAllClientFoodReserveError = (state: any) =>
  state.foodReserve.getAllClientFoodReserveError;
export const selectGetAllClientFoodReserveLoading = (state: any) =>
  state.foodReserve.getAllClientFoodReserveLoading;
export const selectGetAllClientFoodReserveData = (state: any) =>
  state.foodReserve.getAllClientFoodReserveData;

export const selectGetCurrentUserHistoryError = (state: any) =>
  state.foodReserve.getCurrentUserHistoryError;
export const selectGetCurrentUserHistoryLoading = (state: any) =>
  state.foodReserve.getCurrentUserHistoryLoading;
export const selectGetCurrentUserHistoryData = (state: any) =>
  state.foodReserve.getCurrentUserHistoryData;

export const selectCreateClientFoodReserveError = (state: any) =>
  state.foodReserve.createClientFoodReserveError;
export const selectCreateClientFoodReserveLoading = (state: any) =>
  state.foodReserve.createClientFoodReserveLoading;

export const selectDeleteClientFoodReserveError = (state: any) =>
  state.foodReserve.deleteClientFoodReserveError;
export const selectDeleteClientFoodReserveLoading = (state: any) =>
  state.foodReserve.deleteClientFoodReserveLoading;

export default foodReserveSlice.reducer;
