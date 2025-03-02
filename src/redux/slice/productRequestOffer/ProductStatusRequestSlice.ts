import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import {
  GetRequestProductOfferAction,
  GetRequestProductOfferByIdAction,
  UpdateRequestProductOfferAction,
  UpdateRequestProductOfferSendToBuyerAction,
} from "../../actions/productRequestOffer/RequestProductOffer";
import { PRODUCT_REQUEST_OFFER } from "../../types/productRequestOffer/ProductRequestOfferTypes";

interface productRequestOfferState {
  getProductRequestOfferError: string | null;
  getProductRequestOfferLoading: boolean;
  getProductRequestOfferData: any;

  getProductRequestOfferByIdError: any;
  getProductRequestOfferByIdLoading: any;
  getProductRequestOfferByIdData: any;

  updateProductRequestOfferError: string | null;
  updateProductRequestOfferLoading: boolean;
  updateProductRequestOfferData: any;

  updateProductRequestOfferSendToBuyerError: string | null;
  updateProductRequestOfferSendToBuyerLoading: boolean;
  updateProductRequestOfferSendToBuyerData: any;
}

const initialState: productRequestOfferState = {
  getProductRequestOfferError: null,
  getProductRequestOfferLoading: false,
  getProductRequestOfferData: [],

  getProductRequestOfferByIdError: null,
  getProductRequestOfferByIdLoading: false,
  getProductRequestOfferByIdData: [],

  updateProductRequestOfferError: null,
  updateProductRequestOfferLoading: false,
  updateProductRequestOfferData: [],

  updateProductRequestOfferSendToBuyerError: null,
  updateProductRequestOfferSendToBuyerLoading: false,
  updateProductRequestOfferSendToBuyerData: [],
};

const productRequestOfferSlice = createSlice({
  name: PRODUCT_REQUEST_OFFER,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get products request offer
      .addCase(GetRequestProductOfferAction.pending, (state) => {
        state.getProductRequestOfferLoading = true;
        state.getProductRequestOfferData = [];
        state.getProductRequestOfferError = null;
      })
      .addCase(
        GetRequestProductOfferAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getProductRequestOfferLoading = false;
          state.getProductRequestOfferData = action.payload;
          state.getProductRequestOfferError = null;
        }
      )
      .addCase(
        GetRequestProductOfferAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getProductRequestOfferLoading = false;
          state.getProductRequestOfferError = action.payload;
          state.getProductRequestOfferData = [];
        }
      )

      // Get products request offer by id
      .addCase(GetRequestProductOfferByIdAction.pending, (state) => {
        state.getProductRequestOfferByIdLoading = true;
        state.getProductRequestOfferByIdData = [];
        state.getProductRequestOfferByIdError = null;
      })
      .addCase(GetRequestProductOfferByIdAction.fulfilled, (state, action) => {
        state.getProductRequestOfferByIdLoading = false;
        state.getProductRequestOfferByIdData = action.payload;
        state.getProductRequestOfferByIdError = null;
      })
      .addCase(GetRequestProductOfferByIdAction.rejected, (state, action) => {
        state.getProductRequestOfferByIdLoading = false;
        state.getProductRequestOfferByIdError = action.payload;
        state.getProductRequestOfferByIdData = [];
      })
      // update products request offer by id
      .addCase(UpdateRequestProductOfferAction.pending, (state) => {
        state.updateProductRequestOfferLoading = true;
        state.updateProductRequestOfferData = [];
        state.updateProductRequestOfferError = null;
      })
      .addCase(UpdateRequestProductOfferAction.fulfilled, (state, action) => {
        state.updateProductRequestOfferLoading = false;
        state.updateProductRequestOfferData = action.payload;
        state.updateProductRequestOfferError = null;
      })
      .addCase(UpdateRequestProductOfferAction.rejected, (state, action) => {
        state.updateProductRequestOfferLoading = false;
        state.updateProductRequestOfferError = action.payload;
        state.updateProductRequestOfferData = [];
      })
      // update products request offer by id
      .addCase(UpdateRequestProductOfferSendToBuyerAction.pending, (state) => {
        state.updateProductRequestOfferSendToBuyerLoading = true;
        state.updateProductRequestOfferSendToBuyerData = [];
        state.updateProductRequestOfferSendToBuyerError = null;
      })
      .addCase(
        UpdateRequestProductOfferSendToBuyerAction.fulfilled,
        (state, action) => {
          state.updateProductRequestOfferSendToBuyerLoading = false;
          state.updateProductRequestOfferSendToBuyerData = action.payload;
          state.updateProductRequestOfferSendToBuyerError = null;
        }
      )
      .addCase(
        UpdateRequestProductOfferSendToBuyerAction.rejected,
        (state, action) => {
          state.updateProductRequestOfferSendToBuyerLoading = false;
          state.updateProductRequestOfferSendToBuyerError = action.payload;
          state.updateProductRequestOfferSendToBuyerData = [];
        }
      );
  },
});

export const selectGetProductRequestOfferError = (state: any) =>
  state.productRequestOffer.getProductRequestOfferError;
export const selectGetProductRequestOfferLoading = (state: any) =>
  state.productRequestOffer.getProductRequestOfferLoading;
export const selectGetProductRequestOfferData = (state: any) =>
  state.productRequestOffer.getProductRequestOfferData;

export const selectGetProductRequestOfferByIdError = (state: any) =>
  state.productRequestOffer.getProductRequestOfferByIdError;
export const selectGetProductRequestOfferByIdLoading = (state: any) =>
  state.productRequestOffer.getProductRequestOfferByIdLoading;
export const selectGetProductRequestOfferByIdData = (state: any) =>
  state.productRequestOffer.getProductRequestOfferByIdData;

export const selectUpdateProductRequestOfferError = (state: any) =>
  state.productRequestOffer.updateProductRequestOfferError;
export const selectUpdateProductRequestOfferLoading = (state: any) =>
  state.productRequestOffer.updateProductRequestOfferLoading;
export const selectUpdateProductRequestOfferData = (state: any) =>
  state.productRequestOffer.updateProductRequestOfferData;

export const selectGetProductRequestAdminError = (state: any) =>
  state.productRequestOffer.getProductRequestAdminError;
export const selectGetProductRequestAdminLoading = (state: any) =>
  state.productRequestOffer.getProductRequestAdminLoading;
export const selectGetProductRequestAdminData = (state: any) =>
  state.productRequestOffer.getProductRequestAdminData;

export const selectGetProductRequestAdminByIdError = (state: any) =>
  state.productRequestOffer.getProductRequestAdminByIdError;
export const selectGetProductRequestAdminByIdLoading = (state: any) =>
  state.productRequestOffer.getProductRequestAdminByIdLoading;
export const selectGetProductRequestAdminByIdData = (state: any) =>
  state.productRequestOffer.getProductRequestAdminByIdData;

export const selectUpdateProductRequestAdminError = (state: any) =>
  state.productRequestOffer.updateProductRequestAdminError;
export const selectUpdateProductRequestAdminLoading = (state: any) =>
  state.productRequestOffer.updateProductRequestAdminLoading;
export const selectUpdateProductRequestAdminData = (state: any) =>
  state.productRequestOffer.updateProductRequestAdminData;

export const selectUpdateRequestProductOfferError = (state: any) =>
  state.productRequestOffer.updateProductRequestOfferError;
export const selectUpdateRequestProductOfferLoading = (state: any) =>
  state.productRequestOffer.updateProductRequestOfferLoading;
export const selectUpdateRequestProductOfferData = (state: any) =>
  state.productRequestOffer.updateProductRequestOfferData;

export const selectUpdateRequestProductOfferSendToBuyerError = (state: any) =>
  state.productRequestOffer.updateProductRequestOfferSendToBuyerError;
export const selectUpdateRequestProductOfferSendToBuyerLoading = (state: any) =>
  state.productRequestOffer.updateProductRequestOfferSendToBuyerLoading;
export const selectUpdateRequestProductOfferSendToBuyerData = (state: any) =>
  state.productRequestOffer.updateProductRequestOfferSendToBuyerData;

export default productRequestOfferSlice.reducer;
