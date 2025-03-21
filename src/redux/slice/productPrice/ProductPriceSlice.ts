import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PRODUCT_PRICE } from "../../types/productPrice/ProductPriceTypes";
import {
  CreateProductPriceAction,
  DeleteProductPriceAction,
  GetProductPriceAction,
  UpdateProductPriceAction,
} from "../../actions/productPrice/ProductPriceActions";

interface productPriceState {
  getProductPriceError: string | null;
  getProductPriceLoading: boolean;
  getProductPriceData: any;

  createProductPriceError: any;
  createProductPriceLoading: any;
  createProductPriceData: any;

  updateProductPriceError: string | null;
  updateProductPriceLoading: boolean;
  updateProductPriceData: any;

  deleteProductPriceError: string | null;
  deleteProductPriceLoading: boolean;
  deleteProductPriceData: any;
}

const initialState: productPriceState = {
  getProductPriceError: null,
  getProductPriceLoading: false,
  getProductPriceData: [],

  createProductPriceError: null,
  createProductPriceLoading: false,
  createProductPriceData: [],

  updateProductPriceError: null,
  updateProductPriceLoading: false,
  updateProductPriceData: [],

  deleteProductPriceError: null,
  deleteProductPriceLoading: false,
  deleteProductPriceData: [],
};

const productPriceSlice = createSlice({
  name: PRODUCT_PRICE,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get productPrice
      .addCase(GetProductPriceAction.pending, (state) => {
        state.getProductPriceLoading = true;
        state.getProductPriceData = [];
        state.getProductPriceError = null;
      })
      .addCase(GetProductPriceAction.fulfilled, (state, action: PayloadAction<any>) => {
        state.getProductPriceLoading = false;
        state.getProductPriceData = action.payload;
        state.getProductPriceError = null;
      })
      .addCase(
        GetProductPriceAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getProductPriceLoading = false;
          state.getProductPriceError = action.payload;
          state.getProductPriceData = [];
        }
      )
      // create productPrice
      .addCase(CreateProductPriceAction.pending, (state) => {
        state.createProductPriceLoading = true;
        state.createProductPriceData = [];
        state.createProductPriceError = null;
      })
      .addCase(CreateProductPriceAction.fulfilled, (state, action) => {
        state.createProductPriceLoading = false;
        state.createProductPriceData = action.payload;
        state.createProductPriceError = null;
      })
      .addCase(CreateProductPriceAction.rejected, (state, action) => {
        state.createProductPriceLoading = false;
        state.createProductPriceError = action.payload;
        state.createProductPriceData = [];
      })

      // update productPrice
      .addCase(UpdateProductPriceAction.pending, (state) => {
        state.updateProductPriceLoading = true;
        state.updateProductPriceData = [];
        state.updateProductPriceError = null;
      })
      .addCase(UpdateProductPriceAction.fulfilled, (state, action) => {
        state.updateProductPriceLoading = false;
        state.updateProductPriceData = action.payload;
        state.updateProductPriceError = null;
      })
      .addCase(UpdateProductPriceAction.rejected, (state, action) => {
        state.updateProductPriceLoading = false;
        state.updateProductPriceError = action.payload;
        state.updateProductPriceData = [];
      })

      // delete productPrice
      .addCase(DeleteProductPriceAction.pending, (state) => {
        state.deleteProductPriceLoading = true;
        state.deleteProductPriceData = [];
        state.deleteProductPriceError = null;
      })
      .addCase(DeleteProductPriceAction.fulfilled, (state, action) => {
        state.deleteProductPriceLoading = false;
        state.deleteProductPriceData = action.payload;
        state.deleteProductPriceError = null;
      })
      .addCase(DeleteProductPriceAction.rejected, (state, action) => {
        state.deleteProductPriceLoading = false;
        state.deleteProductPriceError = action.payload;
        state.deleteProductPriceData = [];
      });
  },
});

export const selectGetProductPriceError = (state: any) => state.productPrice.getProductPriceError;
export const selectGetProductPriceLoading = (state: any) => state.productPrice.getProductPriceLoading;
export const selectGetProductPriceData = (state: any) => state.productPrice.getProductPriceData;

export const selectGetProductPriceByIdError = (state: any) =>
  state.productPrice.getProductPriceByIdError;
export const selectGetProductPriceByIdLoading = (state: any) =>
  state.productPrice.getProductPriceByIdLoading;
export const selectGetProductPriceByIdData = (state: any) => state.productPrice.getProductPriceByIdData;

export const selectCreateProductPriceError = (state: any) => state.productPrice.createProductPriceError;
export const selectCreateProductPriceLoading = (state: any) =>
  state.productPrice.createProductPriceLoading;
export const selectCreateProductPriceData = (state: any) => state.productPrice.createProductPriceData;

export const selectUpdateProductPriceError = (state: any) => state.productPrice.updateProductPriceError;
export const selectUpdateProductPriceLoading = (state: any) =>
  state.productPrice.updateProductPriceLoading;
export const selectUpdateProductPriceData = (state: any) => state.productPrice.updateProductPriceData;

export const selectDeleteProductPriceError = (state: any) => state.productPrice.deleteProductPriceError;
export const selectDeleteProductPriceLoading = (state: any) =>
  state.productPrice.deleteProductPriceLoading;
export const selectDeleteProductPriceData = (state: any) => state.productPrice.deleteProductPriceData;

export default productPriceSlice.reducer;
