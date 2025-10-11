import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SHIPMENT } from "../../types/shipment/ShipmentTypes";
import {
  CreateShipmentAdminAction,
  GetShipmentAdminAction,
  GetShipmentSuggestAction,
} from "../../actions/shipment/ShipmentActions";

interface shipmentState {
  createShipmentAdminError: string | null;
  createShipmentAdminLoading: boolean;
  createShipmentAdminData: any;

  getShipmentAdminError: string | null;
  getShipmentAdminLoading: boolean;
  getShipmentAdminData: any;

  getShipmentSuggestError: string | null;
  getShipmentSuggestLoading: boolean;
  getShipmentSuggestData: any;
}

const initialState: shipmentState = {
  createShipmentAdminError: null,
  createShipmentAdminLoading: false,
  createShipmentAdminData: null,

  getShipmentAdminError: null,
  getShipmentAdminLoading: false,
  getShipmentAdminData: [],

  getShipmentSuggestError: null,
  getShipmentSuggestLoading: false,
  getShipmentSuggestData: null,
};

const shipmentSlice = createSlice({
  name: SHIPMENT,
  initialState,
  reducers: {
    resetCreateShipmentAdmin: (state) => {
      state.createShipmentAdminData = null;
      state.createShipmentAdminError = null;
      state.createShipmentAdminLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create shipment admin
      .addCase(CreateShipmentAdminAction.pending, (state) => {
        state.createShipmentAdminLoading = true;
        state.createShipmentAdminData = null;
        state.createShipmentAdminError = null;
      })
      .addCase(
        CreateShipmentAdminAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.createShipmentAdminLoading = false;
          state.createShipmentAdminData = action.payload;
          state.createShipmentAdminError = null;
        }
      )
      .addCase(
        CreateShipmentAdminAction.rejected,
        (state, action: PayloadAction<any>) => {
          state.createShipmentAdminLoading = false;
          state.createShipmentAdminError = action.payload;
          state.createShipmentAdminData = null;
        }
      )
      // Get shipment admin
      .addCase(GetShipmentAdminAction.pending, (state) => {
        state.getShipmentAdminLoading = true;
        state.getShipmentAdminData = [];
        state.getShipmentAdminError = null;
      })
      .addCase(
        GetShipmentAdminAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getShipmentAdminLoading = false;
          state.getShipmentAdminData = action.payload;
          state.getShipmentAdminError = null;
        }
      )
      .addCase(
        GetShipmentAdminAction.rejected,
        (state, action: PayloadAction<any>) => {
          state.getShipmentAdminLoading = false;
          state.getShipmentAdminError = action.payload;
          state.getShipmentAdminData = [];
        }
      )
      // Get shipment suggest
      .addCase(GetShipmentSuggestAction.pending, (state) => {
        state.getShipmentSuggestLoading = true;
        state.getShipmentSuggestData = null;
        state.getShipmentSuggestError = null;
      })
      .addCase(
        GetShipmentSuggestAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getShipmentSuggestLoading = false;
          state.getShipmentSuggestData = action.payload;
          state.getShipmentSuggestError = null;
        }
      )
      .addCase(
        GetShipmentSuggestAction.rejected,
        (state, action: PayloadAction<any>) => {
          state.getShipmentSuggestLoading = false;
          state.getShipmentSuggestError = action.payload;
          state.getShipmentSuggestData = null;
        }
      );
  },
});

// Selectors
export const selectCreateShipmentAdminError = (state: any) =>
  state.shipment.createShipmentAdminError;
export const selectCreateShipmentAdminLoading = (state: any) =>
  state.shipment.createShipmentAdminLoading;
export const selectCreateShipmentAdminData = (state: any) =>
  state.shipment.createShipmentAdminData;

export const selectGetShipmentAdminError = (state: any) =>
  state.shipment.getShipmentAdminError;
export const selectGetShipmentAdminLoading = (state: any) =>
  state.shipment.getShipmentAdminLoading;
export const selectGetShipmentAdminData = (state: any) =>
  state.shipment.getShipmentAdminData;

export const selectGetShipmentSuggestError = (state: any) =>
  state.shipment.getShipmentSuggestError;
export const selectGetShipmentSuggestLoading = (state: any) =>
  state.shipment.getShipmentSuggestLoading;
export const selectGetShipmentSuggestData = (state: any) =>
  state.shipment.getShipmentSuggestData;

export const { resetCreateShipmentAdmin } = shipmentSlice.actions;
export default shipmentSlice.reducer;