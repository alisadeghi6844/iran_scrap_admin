import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ADMIN_FOOD_RESERVE_ORIGINAL } from "../../../../types/foodReservation/management/foodReserve/AdminFoodReserveTypes";
import {
  createAdminFoodReserveAction,
  deleteAdminFoodReserveAction,
  exportFoodReserveAction,
  getAllAdminFoodReserveAction,
  getByIdAdminFoodReserveAction,
  updateAdminFoodReserveAction,
} from "../../../../actions/foodReservation/management/foodReserve/AdminFoodReserveAction";

interface AdminFoodReserveState {
  getAllAdminFoodReserveError: string | null;
  getAllAdminFoodReserveLoading: boolean;
  getAllAdminFoodReserveData: any;

  exportFoodReserveError: string | null;
  exportFoodReserveLoading: boolean;
  exportFoodReserveData: any;

  getByIdAdminFoodReserveError: string | null;
  getByIdAdminFoodReserveLoading: boolean;
  getByIdAdminFoodReserveData: any;

  createAdminFoodReserveError: string | null;
  createAdminFoodReserveLoading: boolean;

  updateAdminFoodReserveError: string | null;
  updateAdminFoodReserveLoading: boolean;

  deleteAdminFoodReserveError: string | null;
  deleteAdminFoodReserveLoading: boolean;
}

const initialState: AdminFoodReserveState = {
  getAllAdminFoodReserveError: null,
  getAllAdminFoodReserveLoading: false,
  getAllAdminFoodReserveData: [],

  exportFoodReserveError: null,
  exportFoodReserveLoading: false,
  exportFoodReserveData: [],

  getByIdAdminFoodReserveError: null,
  getByIdAdminFoodReserveLoading: false,
  getByIdAdminFoodReserveData: [],

  createAdminFoodReserveError: null,
  createAdminFoodReserveLoading: false,

  updateAdminFoodReserveError: null,
  updateAdminFoodReserveLoading: false,

  deleteAdminFoodReserveError: null,
  deleteAdminFoodReserveLoading: false,
};

const adminFoodReserveSlice = createSlice({
  name: ADMIN_FOOD_RESERVE_ORIGINAL,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all
      .addCase(getAllAdminFoodReserveAction.pending, (state) => {
        state.getAllAdminFoodReserveLoading = true;
        state.getAllAdminFoodReserveData = [];
        state.getAllAdminFoodReserveError = null;
      })
      .addCase(
        getAllAdminFoodReserveAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getAllAdminFoodReserveLoading = false;
          state.getAllAdminFoodReserveData = action.payload;
          state.getAllAdminFoodReserveError = null;
        }
      )
      .addCase(
        getAllAdminFoodReserveAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getAllAdminFoodReserveLoading = false;
          state.getAllAdminFoodReserveError = action.payload;
          state.getAllAdminFoodReserveData = [];
        }
      )
      //export
      .addCase(exportFoodReserveAction.pending, (state) => {
        state.exportFoodReserveLoading = true;
        state.exportFoodReserveData = [];
        state.exportFoodReserveError = null;
      })
      .addCase(
        exportFoodReserveAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.exportFoodReserveLoading = false;
          state.exportFoodReserveData = action.payload;
          state.exportFoodReserveError = null;
        }
      )
      .addCase(
        exportFoodReserveAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.exportFoodReserveLoading = false;
          state.exportFoodReserveError = action.payload;
          state.exportFoodReserveData = [];
        }
      )

      // Get by id
      .addCase(getByIdAdminFoodReserveAction.pending, (state) => {
        state.getByIdAdminFoodReserveLoading = true;
        state.getByIdAdminFoodReserveData = [];
        state.getByIdAdminFoodReserveError = null;
      })
      .addCase(
        getByIdAdminFoodReserveAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getByIdAdminFoodReserveLoading = false;
          state.getByIdAdminFoodReserveData = action.payload;
          state.getByIdAdminFoodReserveError = null;
        }
      )
      .addCase(
        getByIdAdminFoodReserveAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getByIdAdminFoodReserveLoading = false;
          state.getByIdAdminFoodReserveError = action.payload;
          state.getByIdAdminFoodReserveData = [];
        }
      )

      // Create
      .addCase(createAdminFoodReserveAction.pending, (state) => {
        state.createAdminFoodReserveLoading = true;
        state.createAdminFoodReserveError = null;
      })
      .addCase(createAdminFoodReserveAction.fulfilled, (state) => {
        state.createAdminFoodReserveLoading = false;
        state.createAdminFoodReserveError = null;
      })
      .addCase(
        createAdminFoodReserveAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.createAdminFoodReserveLoading = false;
          state.createAdminFoodReserveError = action.payload;
        }
      )

      // update
      .addCase(updateAdminFoodReserveAction.pending, (state) => {
        state.updateAdminFoodReserveLoading = true;
        state.updateAdminFoodReserveError = null;
      })
      .addCase(updateAdminFoodReserveAction.fulfilled, (state) => {
        state.updateAdminFoodReserveLoading = false;
        state.updateAdminFoodReserveError = null;
      })
      .addCase(
        updateAdminFoodReserveAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.updateAdminFoodReserveLoading = false;
          state.updateAdminFoodReserveError = action.payload;
        }
      )

      // Delete
      .addCase(deleteAdminFoodReserveAction.pending, (state) => {
        state.deleteAdminFoodReserveLoading = true;
        state.deleteAdminFoodReserveError = null;
      })
      .addCase(deleteAdminFoodReserveAction.fulfilled, (state) => {
        state.deleteAdminFoodReserveLoading = false;
        state.deleteAdminFoodReserveError = null;
      })
      .addCase(
        deleteAdminFoodReserveAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.deleteAdminFoodReserveLoading = false;
          state.deleteAdminFoodReserveError = action.payload;
        }
      );
  },
});

// Selectors
export const selectGetAllAdminFoodReserveError = (state: any) =>
  state.adminFoodReserve.getAllAdminFoodReserveError;
export const selectGetAllAdminFoodReserveLoading = (state: any) =>
  state.adminFoodReserve.getAllAdminFoodReserveLoading;
export const selectGetAllAdminFoodReserveData = (state: any) =>
  state.adminFoodReserve.getAllAdminFoodReserveData;

export const selectExportFoodReserveError = (state: any) =>
  state.adminFoodReserve.exportFoodReserveError;
export const selectExportFoodReserveLoading = (state: any) =>
  state.adminFoodReserve.exportFoodReserveLoading;
export const selectExportFoodReserveData = (state: any) =>
  state.adminFoodReserve.exportFoodReserveData;

export const selectGetByIdAdminFoodReserveError = (state: any) =>
  state.adminFoodReserve.getByIdAdminFoodReserveError;
export const selectGetByIdAdminFoodReserveLoading = (state: any) =>
  state.adminFoodReserve.getByIdAdminFoodReserveLoading;
export const selectGetByIdAdminFoodReserveData = (state: any) =>
  state.adminFoodReserve.getByIdAdminFoodReserveData;

export const selectCreateAdminFoodReserveError = (state: any) =>
  state.adminFoodReserve.createAdminFoodReserveError;
export const selectCreateAdminFoodReserveLoading = (state: any) =>
  state.adminFoodReserve.createAdminFoodReserveLoading;

export const selectUpdateeAdminFoodReserveError = (state: any) =>
  state.adminFoodReserve.updateAdminFoodReserveError;
export const selectUpdateeAdminFoodReserveLoading = (state: any) =>
  state.adminFoodReserve.updateAdminFoodReserveLoading;

export const selectDeleteAdminFoodReserveError = (state: any) =>
  state.adminFoodReserve.deleteAdminFoodReserveError;
export const selectDeleteAdminFoodReserveLoading = (state: any) =>
  state.adminFoodReserve.deleteAdminFoodReserveLoading;

export default adminFoodReserveSlice.reducer;
