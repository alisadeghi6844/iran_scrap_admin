import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { REQUEST_ORDER } from "../../types/requestOrder/RequestOrderTypes";
import {
  GetRequestOrderAdminAction,
  ApproveRequestOrderAction,
  RejectRequestOrderAction,
  VerifyRequestPaymentAction,
  MakeRequestDeliveredAction,
} from "../../actions/requestOrder/RequestOrderActions";

interface requestOrderState {
  getRequestOrderAdminError: string | null;
  getRequestOrderAdminLoading: boolean;
  getRequestOrderAdminData: any;

  approveRequestOrderError: string | null;
  approveRequestOrderLoading: boolean;
  approveRequestOrderData: any;

  rejectRequestOrderError: string | null;
  rejectRequestOrderLoading: boolean;
  rejectRequestOrderData: any;

  verifyRequestPaymentError: string | null;
  verifyRequestPaymentLoading: boolean;
  verifyRequestPaymentData: any;

  makeRequestDeliveredError: string | null;
  makeRequestDeliveredLoading: boolean;
  makeRequestDeliveredData: any;
}

const initialState: requestOrderState = {
  getRequestOrderAdminError: null,
  getRequestOrderAdminLoading: false,
  getRequestOrderAdminData: [],

  approveRequestOrderError: null,
  approveRequestOrderLoading: false,
  approveRequestOrderData: [],

  rejectRequestOrderError: null,
  rejectRequestOrderLoading: false,
  rejectRequestOrderData: [],

  verifyRequestPaymentError: null,
  verifyRequestPaymentLoading: false,
  verifyRequestPaymentData: [],

  makeRequestDeliveredError: null,
  makeRequestDeliveredLoading: false,
  makeRequestDeliveredData: [],
};

const requestOrderSlice = createSlice({
  name: REQUEST_ORDER,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get request order admin
      .addCase(GetRequestOrderAdminAction.pending, (state) => {
        state.getRequestOrderAdminLoading = true;
        state.getRequestOrderAdminData = [];
        state.getRequestOrderAdminError = null;
      })
      .addCase(
        GetRequestOrderAdminAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getRequestOrderAdminLoading = false;
          state.getRequestOrderAdminData = action.payload;
          state.getRequestOrderAdminError = null;
        }
      )
      .addCase(
        GetRequestOrderAdminAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getRequestOrderAdminLoading = false;
          state.getRequestOrderAdminError = action.payload;
          state.getRequestOrderAdminData = [];
        }
      )
      // Approve request order
      .addCase(ApproveRequestOrderAction.pending, (state) => {
        state.approveRequestOrderLoading = true;
        state.approveRequestOrderData = [];
        state.approveRequestOrderError = null;
      })
      .addCase(ApproveRequestOrderAction.fulfilled, (state, action) => {
        state.approveRequestOrderLoading = false;
        state.approveRequestOrderData = action.payload;
        state.approveRequestOrderError = null;
      })
      .addCase(ApproveRequestOrderAction.rejected, (state, action) => {
        state.approveRequestOrderLoading = false;
        state.approveRequestOrderError = action.payload;
        state.approveRequestOrderData = [];
      })
      // Reject request order
      .addCase(RejectRequestOrderAction.pending, (state) => {
        state.rejectRequestOrderLoading = true;
        state.rejectRequestOrderData = [];
        state.rejectRequestOrderError = null;
      })
      .addCase(RejectRequestOrderAction.fulfilled, (state, action) => {
        state.rejectRequestOrderLoading = false;
        state.rejectRequestOrderData = action.payload;
        state.rejectRequestOrderError = null;
      })
      .addCase(RejectRequestOrderAction.rejected, (state, action) => {
        state.rejectRequestOrderLoading = false;
        state.rejectRequestOrderError = action.payload;
        state.rejectRequestOrderData = [];
      })
      // Verify request payment
      .addCase(VerifyRequestPaymentAction.pending, (state) => {
        state.verifyRequestPaymentLoading = true;
        state.verifyRequestPaymentData = [];
        state.verifyRequestPaymentError = null;
      })
      .addCase(VerifyRequestPaymentAction.fulfilled, (state, action) => {
        state.verifyRequestPaymentLoading = false;
        state.verifyRequestPaymentData = action.payload;
        state.verifyRequestPaymentError = null;
      })
      .addCase(VerifyRequestPaymentAction.rejected, (state, action) => {
        state.verifyRequestPaymentLoading = false;
        state.verifyRequestPaymentError = action.payload;
        state.verifyRequestPaymentData = [];
      })
      // Make request delivered
      .addCase(MakeRequestDeliveredAction.pending, (state) => {
        state.makeRequestDeliveredLoading = true;
        state.makeRequestDeliveredData = [];
        state.makeRequestDeliveredError = null;
      })
      .addCase(MakeRequestDeliveredAction.fulfilled, (state, action) => {
        state.makeRequestDeliveredLoading = false;
        state.makeRequestDeliveredData = action.payload;
        state.makeRequestDeliveredError = null;
      })
      .addCase(MakeRequestDeliveredAction.rejected, (state, action) => {
        state.makeRequestDeliveredLoading = false;
        state.makeRequestDeliveredError = action.payload;
        state.makeRequestDeliveredData = [];
      });
  },
});

export const selectGetRequestOrderAdminError = (state: any) =>
  state.requestOrder.getRequestOrderAdminError;
export const selectGetRequestOrderAdminLoading = (state: any) =>
  state.requestOrder.getRequestOrderAdminLoading;
export const selectGetRequestOrderAdminData = (state: any) =>
  state.requestOrder.getRequestOrderAdminData;

export const selectApproveRequestOrderError = (state: any) =>
  state.requestOrder.approveRequestOrderError;
export const selectApproveRequestOrderLoading = (state: any) =>
  state.requestOrder.approveRequestOrderLoading;
export const selectApproveRequestOrderData = (state: any) =>
  state.requestOrder.approveRequestOrderData;

export const selectRejectRequestOrderError = (state: any) =>
  state.requestOrder.rejectRequestOrderError;
export const selectRejectRequestOrderLoading = (state: any) =>
  state.requestOrder.rejectRequestOrderLoading;
export const selectRejectRequestOrderData = (state: any) =>
  state.requestOrder.rejectRequestOrderData;

export const selectVerifyRequestPaymentError = (state: any) =>
  state.requestOrder.verifyRequestPaymentError;
export const selectVerifyRequestPaymentLoading = (state: any) =>
  state.requestOrder.verifyRequestPaymentLoading;
export const selectVerifyRequestPaymentData = (state: any) =>
  state.requestOrder.verifyRequestPaymentData;

export const selectMakeRequestDeliveredError = (state: any) =>
  state.requestOrder.makeRequestDeliveredError;
export const selectMakeRequestDeliveredLoading = (state: any) =>
  state.requestOrder.makeRequestDeliveredLoading;
export const selectMakeRequestDeliveredData = (state: any) =>
  state.requestOrder.makeRequestDeliveredData;

export default requestOrderSlice.reducer;