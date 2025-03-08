import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CATEGORY } from "../../types/category/CategoryTypes";
import {
  CreateCategoryAction,
  CreateCategoryAttributeAction,
  GetCategoryAction,
  GetCategoryByIdAction,
  UpdateCategoryAction,
  UpdateCategoryAttributeAction,
} from "../../actions/category/CategoryActions";

interface categoryState {
  getCategoryError: string | null;
  getCategoryLoading: boolean;
  getCategoryData: any;

  getCategoryByIdError: string | null;
  getCategoryByIdLoading: boolean;
  getCategoryByIdData: any;

  createCategoryError: any;
  createCategoryLoading: any;
  createCategoryData: any;

  updateCategoryError: string | null;
  updateCategoryLoading: boolean;
  updateCategoryData: any;

  createCategoryAttributeError: any;
  createCategoryAttributeLoading: any;
  createCategoryAttributeData: any;

  updateCategoryAttributeError: string | null;
  updateCategoryAttributeLoading: boolean;
  updateCategoryAttributeData: any;
}

const initialState: categoryState = {
  getCategoryError: null,
  getCategoryLoading: false,
  getCategoryData: [],

  getCategoryByIdError: null,
  getCategoryByIdLoading: false,
  getCategoryByIdData: [],

  createCategoryError: null,
  createCategoryLoading: false,
  createCategoryData: [],

  updateCategoryError: null,
  updateCategoryLoading: false,
  updateCategoryData: [],

  createCategoryAttributeError: null,
  createCategoryAttributeLoading: false,
  createCategoryAttributeData: [],

  updateCategoryAttributeError: null,
  updateCategoryAttributeLoading: false,
  updateCategoryAttributeData: [],
};

const categorySlice = createSlice({
  name: CATEGORY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get category
      .addCase(GetCategoryAction.pending, (state) => {
        state.getCategoryLoading = true;
        state.getCategoryData = [];
        state.getCategoryError = null;
      })
      .addCase(
        GetCategoryAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getCategoryLoading = false;
          state.getCategoryData = action.payload;
          state.getCategoryError = null;
        }
      )
      .addCase(
        GetCategoryAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getCategoryLoading = false;
          state.getCategoryError = action.payload;
          state.getCategoryData = [];
        }
      )
      // Get category
      .addCase(GetCategoryByIdAction.pending, (state) => {
        state.getCategoryByIdLoading = true;
        state.getCategoryByIdData = [];
        state.getCategoryByIdError = null;
      })
      .addCase(
        GetCategoryByIdAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getCategoryByIdLoading = false;
          state.getCategoryByIdData = action.payload;
          state.getCategoryByIdError = null;
        }
      )
      .addCase(
        GetCategoryByIdAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getCategoryByIdLoading = false;
          state.getCategoryByIdError = action.payload;
          state.getCategoryByIdData = [];
        }
      )
      // create category
      .addCase(CreateCategoryAction.pending, (state) => {
        state.createCategoryLoading = true;
        state.createCategoryData = [];
        state.createCategoryError = null;
      })
      .addCase(CreateCategoryAction.fulfilled, (state, action) => {
        state.createCategoryLoading = false;
        state.createCategoryData = action.payload;
        state.createCategoryError = null;
      })
      .addCase(CreateCategoryAction.rejected, (state, action) => {
        state.createCategoryLoading = false;
        state.createCategoryError = action.payload;
        state.createCategoryData = [];
      })

      // update category
      .addCase(UpdateCategoryAction.pending, (state) => {
        state.updateCategoryLoading = true;
        state.updateCategoryData = [];
        state.updateCategoryError = null;
      })
      .addCase(UpdateCategoryAction.fulfilled, (state, action) => {
        state.updateCategoryLoading = false;
        state.updateCategoryData = action.payload;
        state.updateCategoryError = null;
      })
      .addCase(UpdateCategoryAction.rejected, (state, action) => {
        state.updateCategoryLoading = false;
        state.updateCategoryError = action.payload;
        state.updateCategoryData = [];
      })

      // create attribute category
      .addCase(CreateCategoryAttributeAction.pending, (state) => {
        state.createCategoryAttributeLoading = true;
        state.createCategoryAttributeData = [];
        state.createCategoryAttributeError = null;
      })
      .addCase(CreateCategoryAttributeAction.fulfilled, (state, action) => {
        state.createCategoryAttributeLoading = false;
        state.createCategoryAttributeData = action.payload;
        state.createCategoryAttributeError = null;
      })
      .addCase(CreateCategoryAttributeAction.rejected, (state, action) => {
        state.createCategoryAttributeLoading = false;
        state.createCategoryAttributeError = action.payload;
        state.createCategoryAttributeData = [];
      })

      // update attribute category
      .addCase(UpdateCategoryAttributeAction.pending, (state) => {
        state.updateCategoryAttributeLoading = true;
        state.updateCategoryAttributeData = [];
        state.updateCategoryAttributeError = null;
      })
      .addCase(UpdateCategoryAttributeAction.fulfilled, (state, action) => {
        state.updateCategoryAttributeLoading = false;
        state.updateCategoryAttributeData = action.payload;
        state.updateCategoryAttributeError = null;
      })
      .addCase(UpdateCategoryAttributeAction.rejected, (state, action) => {
        state.updateCategoryAttributeLoading = false;
        state.updateCategoryAttributeError = action.payload;
        state.updateCategoryAttributeData = [];
      });
  },
});

export const selectGetCategoryError = (state: any) =>
  state.category.getCategoryError;
export const selectGetCategoryLoading = (state: any) =>
  state.category.getCategoryLoading;
export const selectGetCategoryData = (state: any) =>
  state.category.getCategoryData;

export const selectGetCategoryByIdError = (state: any) =>
  state.category.getCategoryByIdError;
export const selectGetCategoryByIdLoading = (state: any) =>
  state.category.getCategoryByIdLoading;
export const selectGetCategoryByIdData = (state: any) =>
  state.category.getCategoryByIdData;

export const selectCreateCategoryError = (state: any) =>
  state.category.createCategoryError;
export const selectCreateCategoryLoading = (state: any) =>
  state.category.createCategoryLoading;
export const selectCreateCategoryData = (state: any) =>
  state.category.createCategoryData;

export const selectUpdateCategoryError = (state: any) =>
  state.category.updateCategoryError;
export const selectUpdateCategoryLoading = (state: any) =>
  state.category.updateCategoryLoading;
export const selectUpdateCategoryData = (state: any) =>
  state.category.updateCategoryData;

export const selectCreateCategoryAttributeError = (state: any) =>
  state.category.createCategoryAttributeError;
export const selectCreateCategoryAttributeLoading = (state: any) =>
  state.category.createCategoryAttributeLoading;
export const selectCreateCategoryAttributeData = (state: any) =>
  state.category.createCategoryAttributeData;

export const selectUpdateCategoryAttributeError = (state: any) =>
  state.category.updateCategoryAttributeError;
export const selectUpdateCategoryAttributeLoading = (state: any) =>
  state.category.updateCategoryAttributeLoading;
export const selectUpdateCategoryAttributeData = (state: any) =>
  state.category.updateCategoryAttributeData;

export default categorySlice.reducer;
