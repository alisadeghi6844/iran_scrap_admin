import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ORDER } from "../../types/order/OrderTypes";
import {
  GetOrderAdminAction,
  ApproveOrderAction,
  RejectOrderAction,
  VerifyPaymentAction,
  MakeDeliveredAction,
  UpdateOrderAdminAction,
} from "../../actions/order/OrderActions";

interface orderState {
  getOrderAdminError: string | null;
  getOrderAdminLoading: boolean;
  getOrderAdminData: any;

  approveOrderError: string | null;
  approveOrderLoading: boolean;
  approveOrderData: any;

  rejectOrderError: string | null;
  rejectOrderLoading: boolean;
  rejectOrderData: any;

  verifyPaymentError: string | null;
  verifyPaymentLoading: boolean;
  verifyPaymentData: any;

  makeDeliveredError: string | null;
  makeDeliveredLoading: boolean;
  makeDeliveredData: any;

  updateOrderAdminError: string | null;
  updateOrderAdminLoading: boolean;
  updateOrderAdminData: any;
}

const initialState: orderState = {
  getOrderAdminError: null,
  getOrderAdminLoading: false,
  getOrderAdminData: [],

  approveOrderError: null,
  approveOrderLoading: false,
  approveOrderData: [],

  rejectOrderError: null,
  rejectOrderLoading: false,
  rejectOrderData: [],

  verifyPaymentError: null,
  verifyPaymentLoading: false,
  verifyPaymentData: [],

  makeDeliveredError: null,
  makeDeliveredLoading: false,
  makeDeliveredData: [],

  updateOrderAdminError: null,
  updateOrderAdminLoading: false,
  updateOrderAdminData: [],
};

const orderSlice = createSlice({
  name: ORDER,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get order admin
      .addCase(GetOrderAdminAction.pending, (state) => {
        state.getOrderAdminLoading = true;
        state.getOrderAdminData = [];
        state.getOrderAdminError = null;
      })
      .addCase(
        GetOrderAdminAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getOrderAdminLoading = false;
          state.getOrderAdminData = action.payload;
          state.getOrderAdminError = null;
        }
      )
      .addCase(
        GetOrderAdminAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getOrderAdminLoading = false;
          state.getOrderAdminError = action.payload;
          state.getOrderAdminData = [];
        }
      )
      // Approve order
      .addCase(ApproveOrderAction.pending, (state) => {
        state.approveOrderLoading = true;
        state.approveOrderData = [];
        state.approveOrderError = null;
      })
      .addCase(ApproveOrderAction.fulfilled, (state, action) => {
        state.approveOrderLoading = false;
        state.approveOrderData = action.payload;
        state.approveOrderError = null;
      })
      .addCase(ApproveOrderAction.rejected, (state, action) => {
        state.approveOrderLoading = false;
        state.approveOrderError = action.payload;
        state.approveOrderData = [];
      })
      // Reject order
      .addCase(RejectOrderAction.pending, (state) => {
        state.rejectOrderLoading = true;
        state.rejectOrderData = [];
        state.rejectOrderError = null;
      })
      .addCase(RejectOrderAction.fulfilled, (state, action) => {
        state.rejectOrderLoading = false;
        state.rejectOrderData = action.payload;
        state.rejectOrderError = null;
      })
      .addCase(RejectOrderAction.rejected, (state, action) => {
        state.rejectOrderLoading = false;
        state.rejectOrderError = action.payload;
        state.rejectOrderData = [];
      })
      // Verify payment
      .addCase(VerifyPaymentAction.pending, (state) => {
        state.verifyPaymentLoading = true;
        state.verifyPaymentData = [];
        state.verifyPaymentError = null;
      })
      .addCase(VerifyPaymentAction.fulfilled, (state, action) => {
        state.verifyPaymentLoading = false;
        state.verifyPaymentData = action.payload;
        state.verifyPaymentError = null;
      })
      .addCase(VerifyPaymentAction.rejected, (state, action) => {
        state.verifyPaymentLoading = false;
        state.verifyPaymentError = action.payload;
        state.verifyPaymentData = [];
      })
      // Make delivered
      .addCase(MakeDeliveredAction.pending, (state) => {
        state.makeDeliveredLoading = true;
        state.makeDeliveredData = [];
        state.makeDeliveredError = null;
      })
      .addCase(MakeDeliveredAction.fulfilled, (state, action) => {
        state.makeDeliveredLoading = false;
        state.makeDeliveredData = action.payload;
        state.makeDeliveredError = null;
      })
      .addCase(MakeDeliveredAction.rejected, (state, action) => {
        state.makeDeliveredLoading = false;
        state.makeDeliveredError = action.payload;
        state.makeDeliveredData = [];
      })
      // Update order admin
      .addCase(UpdateOrderAdminAction.pending, (state) => {
        state.updateOrderAdminLoading = true;
        state.updateOrderAdminData = [];
        state.updateOrderAdminError = null;
      })
      .addCase(UpdateOrderAdminAction.fulfilled, (state, action) => {
        state.updateOrderAdminLoading = false;
        state.updateOrderAdminData = action.payload;
        state.updateOrderAdminError = null;
      })
      .addCase(UpdateOrderAdminAction.rejected, (state, action) => {
        state.updateOrderAdminLoading = false;
        state.updateOrderAdminError = action.payload;
        state.updateOrderAdminData = [];
      });
  },
});

export const selectGetOrderAdminError = (state: any) =>
  state.order.getOrderAdminError;
export const selectGetOrderAdminLoading = (state: any) =>
  state.order.getOrderAdminLoading;
export const selectGetOrderAdminData = (state: any) =>
  state.order.getOrderAdminData;

export const selectApproveOrderError = (state: any) =>
  state.order.approveOrderError;
export const selectApproveOrderLoading = (state: any) =>
  state.order.approveOrderLoading;
export const selectApproveOrderData = (state: any) =>
  state.order.approveOrderData;

export const selectRejectOrderError = (state: any) =>
  state.order.rejectOrderError;
export const selectRejectOrderLoading = (state: any) =>
  state.order.rejectOrderLoading;
export const selectRejectOrderData = (state: any) =>
  state.order.rejectOrderData;

export const selectVerifyPaymentError = (state: any) =>
  state.order.verifyPaymentError;
export const selectVerifyPaymentLoading = (state: any) =>
  state.order.verifyPaymentLoading;
export const selectVerifyPaymentData = (state: any) =>
  state.order.verifyPaymentData;

export const selectMakeDeliveredError = (state: any) =>
  state.order.makeDeliveredError;
export const selectMakeDeliveredLoading = (state: any) =>
  state.order.makeDeliveredLoading;
export const selectMakeDeliveredData = (state: any) =>
  state.order.makeDeliveredData;

export const selectUpdateOrderAdminError = (state: any) =>
  state.order.updateOrderAdminError;
export const selectUpdateOrderAdminLoading = (state: any) =>
  state.order.updateOrderAdminLoading;
export const selectUpdateOrderAdminData = (state: any) =>
  state.order.updateOrderAdminData;

export default orderSlice.reducer;