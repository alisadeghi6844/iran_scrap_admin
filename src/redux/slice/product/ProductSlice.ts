import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PRODUCT } from "../../types/product/ProductTypes";
import {
  CreateProductAction,
  DeleteProductAction,
  GetProductAction,
  GetProductByIdAction,
  UpdateProductAction,
  UpdateProductStatusAction,
  ChangeProductStatusAction,
} from "../../actions/product/ProductActions";

interface productState {
  getProductError: string | null;
  getProductLoading: boolean;
  getProductData: any;

  getProductByIdError: string | null;
  getProductByIdLoading: boolean;
  getProductByIdData: any;

  createProductError: any;
  createProductLoading: any;
  createProductData: any;

  updateProductError: string | null;
  updateProductLoading: boolean;
  updateProductData: any;

  deleteProductError: string | null;
  deleteProductLoading: boolean;
  deleteProductData: any;

  updateProductStatusError: string | null;
  updateProductStatusLoading: boolean;
  updateProductStatusData: any;

  changeProductStatusError: string | null;
  changeProductStatusLoading: boolean;
  changeProductStatusData: any;
}

const initialState: productState = {
  getProductError: null,
  getProductLoading: false,
  getProductData: [],

  getProductByIdError: null,
  getProductByIdLoading: false,
  getProductByIdData: [],

  createProductError: null,
  createProductLoading: false,
  createProductData: [],

  updateProductError: null,
  updateProductLoading: false,
  updateProductData: [],

  deleteProductError: null,
  deleteProductLoading: false,
  deleteProductData: [],

  updateProductStatusError: null,
  updateProductStatusLoading: false,
  updateProductStatusData: [],

  changeProductStatusError: null,
  changeProductStatusLoading: false,
  changeProductStatusData: [],
};

const productSlice = createSlice({
  name: PRODUCT,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get product
      .addCase(GetProductAction.pending, (state) => {
        state.getProductLoading = true;
        state.getProductData = [];
        state.getProductError = null;
      })
      .addCase(
        GetProductAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getProductLoading = false;
          state.getProductData = action.payload;
          state.getProductError = null;
        }
      )
      .addCase(
        GetProductAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getProductLoading = false;
          state.getProductError = action.payload;
          state.getProductData = [];
        }
      )
      // Get product by id
      .addCase(GetProductByIdAction.pending, (state) => {
        state.getProductByIdLoading = true;
        state.getProductByIdData = [];
        state.getProductByIdError = null;
      })
      .addCase(
        GetProductByIdAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getProductByIdLoading = false;
          state.getProductByIdData = action.payload;
          state.getProductByIdError = null;
        }
      )
      .addCase(
        GetProductByIdAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getProductByIdLoading = false;
          state.getProductByIdError = action.payload;
          state.getProductByIdData = [];
        }
      )
      // create product
      .addCase(CreateProductAction.pending, (state) => {
        state.createProductLoading = true;
        state.createProductData = [];
        state.createProductError = null;
      })
      .addCase(CreateProductAction.fulfilled, (state, action) => {
        state.createProductLoading = false;
        state.createProductData = action.payload;
        state.createProductError = null;
      })
      .addCase(CreateProductAction.rejected, (state, action) => {
        state.createProductLoading = false;
        state.createProductError = action.payload;
        state.createProductData = [];
      })
      // update product
      .addCase(UpdateProductAction.pending, (state) => {
        state.updateProductLoading = true;
        state.updateProductData = [];
        state.updateProductError = null;
      })
      .addCase(UpdateProductAction.fulfilled, (state, action) => {
        state.updateProductLoading = false;
        state.updateProductData = action.payload;
        state.updateProductError = null;
      })
      .addCase(UpdateProductAction.rejected, (state, action) => {
        state.updateProductLoading = false;
        state.updateProductError = action.payload;
        state.updateProductData = [];
      })
      // delete product
      .addCase(DeleteProductAction.pending, (state) => {
        state.deleteProductLoading = true;
        state.deleteProductData = [];
        state.deleteProductError = null;
      })
      .addCase(DeleteProductAction.fulfilled, (state, action) => {
        state.deleteProductLoading = false;
        state.deleteProductData = action.payload;
        state.deleteProductError = null;
      })
      .addCase(DeleteProductAction.rejected, (state, action) => {
        state.deleteProductLoading = false;
        state.deleteProductError = action.payload;
        state.deleteProductData = [];
      })
      // update product status
      .addCase(UpdateProductStatusAction.pending, (state) => {
        state.updateProductStatusLoading = true;
        state.updateProductStatusData = [];
        state.updateProductStatusError = null;
      })
      .addCase(UpdateProductStatusAction.fulfilled, (state, action) => {
        state.updateProductStatusLoading = false;
        state.updateProductStatusData = action.payload;
        state.updateProductStatusError = null;
      })
      .addCase(UpdateProductStatusAction.rejected, (state, action) => {
        state.updateProductStatusLoading = false;
        state.updateProductStatusError = action.payload;
        state.updateProductStatusData = [];
      })
      // change product status
      .addCase(ChangeProductStatusAction.pending, (state) => {
        state.changeProductStatusLoading = true;
        state.changeProductStatusData = [];
        state.changeProductStatusError = null;
      })
      .addCase(ChangeProductStatusAction.fulfilled, (state, action) => {
        state.changeProductStatusLoading = false;
        state.changeProductStatusData = action.payload;
        state.changeProductStatusError = null;
      })
      .addCase(ChangeProductStatusAction.rejected, (state, action) => {
        state.changeProductStatusLoading = false;
        state.changeProductStatusError = action.payload;
        state.changeProductStatusData = [];
      });
  },
});

export const selectGetProductError = (state: any) =>
  state.product.getProductError;
export const selectGetProductLoading = (state: any) =>
  state.product.getProductLoading;
export const selectGetProductData = (state: any) => state.product.getProductData;

export const selectGetProductByIdError = (state: any) =>
  state.product.getProductByIdError;
export const selectGetProductByIdLoading = (state: any) =>
  state.product.getProductByIdLoading;
export const selectGetProductByIdData = (state: any) =>
  state.product.getProductByIdData;

export const selectCreateProductError = (state: any) =>
  state.product.createProductError;
export const selectCreateProductLoading = (state: any) =>
  state.product.createProductLoading;
export const selectCreateProductData = (state: any) =>
  state.product.createProductData;

export const selectUpdateProductError = (state: any) =>
  state.product.updateProductError;
export const selectUpdateProductLoading = (state: any) =>
  state.product.updateProductLoading;
export const selectUpdateProductData = (state: any) =>
  state.product.updateProductData;

export const selectDeleteProductError = (state: any) =>
  state.product.deleteProductError;
export const selectDeleteProductLoading = (state: any) =>
  state.product.deleteProductLoading;
export const selectDeleteProductData = (state: any) =>
  state.product.deleteProductData;

export const selectUpdateProductStatusError = (state: any) =>
  state.product.updateProductStatusError;
export const selectUpdateProductStatusLoading = (state: any) =>
  state.product.updateProductStatusLoading;
export const selectUpdateProductStatusData = (state: any) =>
  state.product.updateProductStatusData;

export const selectChangeProductStatusError = (state: any) =>
  state.product.changeProductStatusError;
export const selectChangeProductStatusLoading = (state: any) =>
  state.product.changeProductStatusLoading;
export const selectChangeProductStatusData = (state: any) =>
  state.product.changeProductStatusData;

export default productSlice.reducer;