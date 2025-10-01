import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ORDER, OrderState } from "../../types/order/OrderTypes";
import {
  GetPendingOrdersAction,
  ApproveOrderAction,
  RejectOrderAction,
} from "../../actions/order/OrderActions";

const initialState: OrderState = {
  getPendingOrdersError: null,
  getPendingOrdersLoading: false,
  getPendingOrdersData: [],

  approveOrderError: null,
  approveOrderLoading: false,
  approveOrderData: null,

  rejectOrderError: null,
  rejectOrderLoading: false,
  rejectOrderData: null,
};

const orderSlice = createSlice({
  name: ORDER,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get pending orders
      .addCase(GetPendingOrdersAction.pending, (state) => {
        state.getPendingOrdersLoading = true;
        state.getPendingOrdersData = [];
        state.getPendingOrdersError = null;
      })
      .addCase(
        GetPendingOrdersAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getPendingOrdersLoading = false;
          state.getPendingOrdersData = action.payload;
          state.getPendingOrdersError = null;
        }
      )
      .addCase(
        GetPendingOrdersAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getPendingOrdersLoading = false;
          state.getPendingOrdersError = action.payload;
          state.getPendingOrdersData = [];
        }
      )
      // Approve order
      .addCase(ApproveOrderAction.pending, (state) => {
        state.approveOrderLoading = true;
        state.approveOrderData = null;
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
        state.approveOrderData = null;
      })
      // Reject order
      .addCase(RejectOrderAction.pending, (state) => {
        state.rejectOrderLoading = true;
        state.rejectOrderData = null;
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
        state.rejectOrderData = null;
      });
  },
});

// Selectors
export const selectGetPendingOrdersError = (state: any) =>
  state.order.getPendingOrdersError;
export const selectGetPendingOrdersLoading = (state: any) =>
  state.order.getPendingOrdersLoading;
export const selectGetPendingOrdersData = (state: any) =>
  state.order.getPendingOrdersData;

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

export default orderSlice.reducer;