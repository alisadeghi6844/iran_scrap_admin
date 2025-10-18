import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CloseRequestAction,
  ExpireOfferAction,
  GetProductRequestOfferAdminAction,
  GetProductRequestOfferAdminByIdAction,
  GetProductRequestOffersByRequestIdAction,
  VerifyPaymentAction,
  MakeDeliveredAction,
} from "../../actions/product-request-offer-admin/ProductRequestOfferAdminActions";
import { PRODUCT_REQUEST_OFFER_ADMIN } from "../../types/product-request-offer-admin/ProductRequestOfferAdminTypes";

interface ProductRequestOfferAdminState {
  closeRequestError: string | null;
  closeRequestLoading: boolean;
  closeRequestData: any;

  expireOfferError: string | null;
  expireOfferLoading: boolean;
  expireOfferData: any;

  getProductRequestOfferAdminError: string | null;
  getProductRequestOfferAdminLoading: boolean;
  getProductRequestOfferAdminData: any;

  getProductRequestOfferAdminByIdError: string | null;
  getProductRequestOfferAdminByIdLoading: boolean;
  getProductRequestOfferAdminByIdData: any;

  getProductRequestOffersByRequestIdError: string | null;
  getProductRequestOffersByRequestIdLoading: boolean;
  getProductRequestOffersByRequestIdData: any;

  verifyPaymentError: string | null;
  verifyPaymentLoading: boolean;
  verifyPaymentData: any;

  makeDeliveredError: string | null;
  makeDeliveredLoading: boolean;
  makeDeliveredData: any;
}

const initialState: ProductRequestOfferAdminState = {
  closeRequestError: null,
  closeRequestLoading: false,
  closeRequestData: null,

  expireOfferError: null,
  expireOfferLoading: false,
  expireOfferData: null,

  getProductRequestOfferAdminError: null,
  getProductRequestOfferAdminLoading: false,
  getProductRequestOfferAdminData: null,

  getProductRequestOfferAdminByIdError: null,
  getProductRequestOfferAdminByIdLoading: false,
  getProductRequestOfferAdminByIdData: null,

  getProductRequestOffersByRequestIdError: null,
  getProductRequestOffersByRequestIdLoading: false,
  getProductRequestOffersByRequestIdData: null,

  verifyPaymentError: null,
  verifyPaymentLoading: false,
  verifyPaymentData: null,

  makeDeliveredError: null,
  makeDeliveredLoading: false,
  makeDeliveredData: null,
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
      )

      // Get Product Request Offer Admin
      .addCase(GetProductRequestOfferAdminAction.pending, (state) => {
        state.getProductRequestOfferAdminLoading = true;
        state.getProductRequestOfferAdminData = null;
        state.getProductRequestOfferAdminError = null;
      })
      .addCase(
        GetProductRequestOfferAdminAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getProductRequestOfferAdminLoading = false;
          state.getProductRequestOfferAdminData = action.payload;
          state.getProductRequestOfferAdminError = null;
        }
      )
      .addCase(
        GetProductRequestOfferAdminAction.rejected,
        (state, action: PayloadAction<any>) => {
          state.getProductRequestOfferAdminLoading = false;
          state.getProductRequestOfferAdminError = action.payload;
          state.getProductRequestOfferAdminData = null;
        }
      )

      // Get Product Request Offer Admin By ID
      .addCase(GetProductRequestOfferAdminByIdAction.pending, (state) => {
        state.getProductRequestOfferAdminByIdLoading = true;
        state.getProductRequestOfferAdminByIdData = null;
        state.getProductRequestOfferAdminByIdError = null;
      })
      .addCase(
        GetProductRequestOfferAdminByIdAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getProductRequestOfferAdminByIdLoading = false;
          state.getProductRequestOfferAdminByIdData = action.payload;
          state.getProductRequestOfferAdminByIdError = null;
        }
      )
      .addCase(
        GetProductRequestOfferAdminByIdAction.rejected,
        (state, action: PayloadAction<any>) => {
          state.getProductRequestOfferAdminByIdLoading = false;
          state.getProductRequestOfferAdminByIdError = action.payload;
          state.getProductRequestOfferAdminByIdData = null;
        }
      )

      // Get Product Request Offers By Request ID
      .addCase(GetProductRequestOffersByRequestIdAction.pending, (state) => {
        state.getProductRequestOffersByRequestIdLoading = true;
        state.getProductRequestOffersByRequestIdData = null;
        state.getProductRequestOffersByRequestIdError = null;
      })
      .addCase(
        GetProductRequestOffersByRequestIdAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getProductRequestOffersByRequestIdLoading = false;
          state.getProductRequestOffersByRequestIdData = action.payload;
          state.getProductRequestOffersByRequestIdError = null;
        }
      )
      .addCase(
        GetProductRequestOffersByRequestIdAction.rejected,
        (state, action: PayloadAction<any>) => {
          state.getProductRequestOffersByRequestIdLoading = false;
          state.getProductRequestOffersByRequestIdError = action.payload;
          state.getProductRequestOffersByRequestIdData = null;
        }
      )

      // Verify Payment
      .addCase(VerifyPaymentAction.pending, (state) => {
        state.verifyPaymentLoading = true;
        state.verifyPaymentData = null;
        state.verifyPaymentError = null;
      })
      .addCase(
        VerifyPaymentAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.verifyPaymentLoading = false;
          state.verifyPaymentData = action.payload;
          state.verifyPaymentError = null;
        }
      )
      .addCase(
        VerifyPaymentAction.rejected,
        (state, action: PayloadAction<any>) => {
          state.verifyPaymentLoading = false;
          state.verifyPaymentError = action.payload;
          state.verifyPaymentData = null;
        }
      )

      // Make Delivered
      .addCase(MakeDeliveredAction.pending, (state) => {
        state.makeDeliveredLoading = true;
        state.makeDeliveredData = null;
        state.makeDeliveredError = null;
      })
      .addCase(
        MakeDeliveredAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.makeDeliveredLoading = false;
          state.makeDeliveredData = action.payload;
          state.makeDeliveredError = null;
        }
      )
      .addCase(
        MakeDeliveredAction.rejected,
        (state, action: PayloadAction<any>) => {
          state.makeDeliveredLoading = false;
          state.makeDeliveredError = action.payload;
          state.makeDeliveredData = null;
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

// Selectors for Get Product Request Offer Admin
export const selectGetProductRequestOfferAdminError = (state: any) =>
  state.productRequestOfferAdmin.getProductRequestOfferAdminError;
export const selectGetProductRequestOfferAdminLoading = (state: any) =>
  state.productRequestOfferAdmin.getProductRequestOfferAdminLoading;
export const selectGetProductRequestOfferAdminData = (state: any) =>
  state.productRequestOfferAdmin.getProductRequestOfferAdminData;

// Selectors for Get Product Request Offer Admin By ID
export const selectGetProductRequestOfferAdminByIdError = (state: any) =>
  state.productRequestOfferAdmin.getProductRequestOfferAdminByIdError;
export const selectGetProductRequestOfferAdminByIdLoading = (state: any) =>
  state.productRequestOfferAdmin.getProductRequestOfferAdminByIdLoading;
export const selectGetProductRequestOfferAdminByIdData = (state: any) =>
  state.productRequestOfferAdmin.getProductRequestOfferAdminByIdData;

// Selectors for Get Product Request Offers By Request ID
export const selectGetProductRequestOffersByRequestIdError = (state: any) =>
  state.productRequestOfferAdmin.getProductRequestOffersByRequestIdError;
export const selectGetProductRequestOffersByRequestIdLoading = (state: any) =>
  state.productRequestOfferAdmin.getProductRequestOffersByRequestIdLoading;
export const selectGetProductRequestOffersByRequestIdData = (state: any) =>
  state.productRequestOfferAdmin.getProductRequestOffersByRequestIdData;

// Selectors for Verify Payment
export const selectVerifyPaymentError = (state: any) =>
  state.productRequestOfferAdmin.verifyPaymentError;
export const selectVerifyPaymentLoading = (state: any) =>
  state.productRequestOfferAdmin.verifyPaymentLoading;
export const selectVerifyPaymentData = (state: any) =>
  state.productRequestOfferAdmin.verifyPaymentData;

// Selectors for Make Delivered
export const selectMakeDeliveredError = (state: any) =>
  state.productRequestOfferAdmin.makeDeliveredError;
export const selectMakeDeliveredLoading = (state: any) =>
  state.productRequestOfferAdmin.makeDeliveredLoading;
export const selectMakeDeliveredData = (state: unknown) =>
  state.productRequestOfferAdmin.makeDeliveredData;

export default productRequestOfferAdminSlice.reducer;
