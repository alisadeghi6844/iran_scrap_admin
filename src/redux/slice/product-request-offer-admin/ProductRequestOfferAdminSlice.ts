import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CloseRequestAction,
  ExpireOfferAction,
} from "../../actions/product-request-offer-admin/ProductRequestOfferAdminActions";
import { PRODUCT_REQUEST_OFFER_ADMIN } from "../../types/product-request-offer-admin/ProductRequestOfferAdminTypes";

interface ProductRequestOfferAdminState {
  closeRequestError: string | null;
  closeRequestLoading: boolean;
  closeRequestData: any;

  expireOfferError: string | null;
  expireOfferLoading: boolean;
  expireOfferData: any;
}

const initialState: ProductRequestOfferAdminState = {
  closeRequestError: null,
  closeRequestLoading: false,
  closeRequestData: null,

  expireOfferError: null,
  expireOfferLoading: false,
  expireOfferData: null,
};

const productRequestOfferAdminSlice = createSlice({
  name: PRODUCT_REQUEST_OFFER_ADMIN,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Close Request
      .addCase(CloseRequestAction.pending, (state) => {
        state.closeRequestLoading = true;
        state.closeRequestData = null;
        state.closeRequestError = null;
      })
      .addCase(
        CloseRequestAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.closeRequestLoading = false;
          state.closeRequestData = action.payload;
          state.closeRequestError = null;
        }
      )
      .addCase(
        CloseRequestAction.rejected,
        (state, action: PayloadAction<any>) => {
          state.closeRequestLoading = false;
          state.closeRequestError = action.payload;
          state.closeRequestData = null;
        }
      )

      // Expire Offer
      .addCase(ExpireOfferAction.pending, (state) => {
        state.expireOfferLoading = true;
        state.expireOfferData = null;
        state.expireOfferError = null;
      })
      .addCase(
        ExpireOfferAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.expireOfferLoading = false;
          state.expireOfferData = action.payload;
          state.expireOfferError = null;
        }
      )
      .addCase(
        ExpireOfferAction.rejected,
        (state, action: PayloadAction<any>) => {
          state.expireOfferLoading = false;
          state.expireOfferError = action.payload;
          state.expireOfferData = null;
        }
      );
  },
});

// Selectors for Close Request
export const selectCloseRequestError = (state: any) =>
  state.productRequestOfferAdmin.closeRequestError;
export const selectCloseRequestLoading = (state: any) =>
  state.productRequestOfferAdmin.closeRequestLoading;
export const selectCloseRequestData = (state: any) =>
  state.productRequestOfferAdmin.closeRequestData;

// Selectors for Expire Offer
export const selectExpireOfferError = (state: any) =>
  state.productRequestOfferAdmin.expireOfferError;
export const selectExpireOfferLoading = (state: any) =>
  state.productRequestOfferAdmin.expireOfferLoading;
export const selectExpireOfferData = (state: any) =>
  state.productRequestOfferAdmin.expireOfferData;

export default productRequestOfferAdminSlice.reducer;