import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PRODUCT_REQUEST_STATUS } from "../../types/productRequestStatus/ProductRequestStatusTypes";
import {
  GetRequestProductAdminAction,
  GetRequestProductAdminByIdAction,
  GetRequestProductStatusAction,
  GetRequestProductStatusByIdAction,
  UpdateRequestProductStatusAction,
} from "../../actions/productRequestStatus/RequestProductStatus";

interface productRequestStatusState {
  getProductRequestStatusError: string | null;
  getProductRequestStatusLoading: boolean;
  getProductRequestStatusData: any;

  getProductRequestStatusByIdError: any;
  getProductRequestStatusByIdLoading: any;
  getProductRequestStatusByIdData: any;

  updateProductRequestStatusError: any;
  updateProductRequestStatusLoading: any;
  updateProductRequestStatusData: any;

  getProductRequestAdminError: string | null;
  getProductRequestAdminLoading: boolean;
  getProductRequestAdminData: any;

  getProductRequestAdminByIdError: string | null;
  getProductRequestAdminByIdLoading: boolean;
  getProductRequestAdminByIdData: any;
}

const initialState: productRequestStatusState = {
  getProductRequestStatusError: null,
  getProductRequestStatusLoading: false,
  getProductRequestStatusData: [],

  getProductRequestStatusByIdError: null,
  getProductRequestStatusByIdLoading: false,
  getProductRequestStatusByIdData: [],

  updateProductRequestStatusError: null,
  updateProductRequestStatusLoading: false,
  updateProductRequestStatusData: [],

  getProductRequestAdminError: null,
  getProductRequestAdminLoading: false,
  getProductRequestAdminData: [],

  getProductRequestAdminByIdError: null,
  getProductRequestAdminByIdLoading: false,
  getProductRequestAdminByIdData: [],
};

const productRequestStatusSlice = createSlice({
  name: PRODUCT_REQUEST_STATUS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get products request status
      .addCase(GetRequestProductStatusAction.pending, (state) => {
        state.getProductRequestStatusLoading = true;
        state.getProductRequestStatusData = [];
        state.getProductRequestStatusError = null;
      })
      .addCase(
        GetRequestProductStatusAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getProductRequestStatusLoading = false;
          state.getProductRequestStatusData = action.payload;
          state.getProductRequestStatusError = null;
        }
      )
      .addCase(
        GetRequestProductStatusAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getProductRequestStatusLoading = false;
          state.getProductRequestStatusError = action.payload;
          state.getProductRequestStatusData = [];
        }
      )

      // Get products request status by id
      .addCase(GetRequestProductStatusByIdAction.pending, (state) => {
        state.getProductRequestStatusByIdLoading = true;
        state.getProductRequestStatusByIdData = [];
        state.getProductRequestStatusByIdError = null;
      })
      .addCase(GetRequestProductStatusByIdAction.fulfilled, (state, action) => {
        state.getProductRequestStatusByIdLoading = false;
        state.getProductRequestStatusByIdData = action.payload;
        state.getProductRequestStatusByIdError = null;
      })
      .addCase(GetRequestProductStatusByIdAction.rejected, (state, action) => {
        state.getProductRequestStatusByIdLoading = false;
        state.getProductRequestStatusByIdError = action.payload;
        state.getProductRequestStatusByIdData = [];
      }) // add products request status
      .addCase(UpdateRequestProductStatusAction.pending, (state) => {
        state.updateProductRequestStatusLoading = true;
        state.updateProductRequestStatusData = [];
        state.updateProductRequestStatusError = null;
      })
      .addCase(UpdateRequestProductStatusAction.fulfilled, (state, action) => {
        state.updateProductRequestStatusLoading = false;
        state.updateProductRequestStatusData = action.payload;
        state.updateProductRequestStatusError = null;
      })
      .addCase(UpdateRequestProductStatusAction.rejected, (state, action) => {
        state.updateProductRequestStatusLoading = false;
        state.updateProductRequestStatusError = action.payload;
        state.updateProductRequestStatusData = [];
      })

      // Get products request admin
      .addCase(GetRequestProductAdminAction.pending, (state) => {
        state.getProductRequestAdminLoading = true;
        state.getProductRequestAdminData = [];
        state.getProductRequestAdminError = null;
      })
      .addCase(
        GetRequestProductAdminAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getProductRequestAdminLoading = false;
          state.getProductRequestAdminData = action.payload;
          state.getProductRequestAdminError = null;
        }
      )
      .addCase(
        GetRequestProductAdminAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getProductRequestAdminLoading = false;
          state.getProductRequestAdminError = action.payload;
          state.getProductRequestAdminData = [];
        }
      ) // Get products request admin
      .addCase(GetRequestProductAdminByIdAction.pending, (state) => {
        state.getProductRequestAdminByIdLoading = true;
        state.getProductRequestAdminByIdData = [];
        state.getProductRequestAdminByIdError = null;
      })
      .addCase(
        GetRequestProductAdminByIdAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getProductRequestAdminByIdLoading = false;
          state.getProductRequestAdminByIdData = action.payload;
          state.getProductRequestAdminByIdError = null;
        }
      )
      .addCase(
        GetRequestProductAdminByIdAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getProductRequestAdminByIdLoading = false;
          state.getProductRequestAdminByIdError = action.payload;
          state.getProductRequestAdminByIdData = [];
        }
      );
  },
});

export const selectGetProductRequestStatusError = (state: any) =>
  state.productRequestStatus.getProductRequestStatusError;
export const selectGetProductRequestStatusLoading = (state: any) =>
  state.productRequestStatus.getProductRequestStatusLoading;
export const selectGetProductRequestStatusData = (state: any) =>
  state.productRequestStatus.getProductRequestStatusData;

export const selectGetProductRequestStatusByIdError = (state: any) =>
  state.productRequestStatus.getProductRequestStatusByIdError;
export const selectGetProductRequestStatusByIdLoading = (state: any) =>
  state.productRequestStatus.getProductRequestStatusByIdLoading;
export const selectGetProductRequestStatusByIdData = (state: any) =>
  state.productRequestStatus.getProductRequestStatusByIdData;

export const selectUpdateProductRequestStatusError = (state: any) =>
  state.productRequestStatus.updateProductRequestStatusError;
export const selectUpdateProductRequestStatusLoading = (state: any) =>
  state.productRequestStatus.updateProductRequestStatusLoading;
export const selectUpdateProductRequestStatusData = (state: any) =>
  state.productRequestStatus.updateProductRequestStatusData;

export const selectGetProductRequestAdminError = (state: any) =>
  state.productRequestStatus.getProductRequestAdminError;
export const selectGetProductRequestAdminLoading = (state: any) =>
  state.productRequestStatus.getProductRequestAdminLoading;
export const selectGetProductRequestAdminData = (state: any) =>
  state.productRequestStatus.getProductRequestAdminData;

export const selectGetProductRequestAdminByIdError = (state: any) =>
  state.productRequestStatus.getProductRequestAdminByIdError;
export const selectGetProductRequestAdminByIdLoading = (state: any) =>
  state.productRequestStatus.getProductRequestAdminByIdLoading;
export const selectGetProductRequestAdminByIdData = (state: any) =>
  state.productRequestStatus.getProductRequestAdminByIdData;

export default productRequestStatusSlice.reducer;
