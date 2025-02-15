import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FOOD_CATEGORY_ORIGINAL } from "../../../../types/foodReservation/management/category/CategoriesTypes";
import {
  createFoodCategoryAction,
  deleteFoodCategoryAction,
  getAllFoodCategoryAction,
  getByIdFoodCategoryAction,
  updateFoodCategoryAction,
} from "../../../../actions/foodReservation/management/category/CategoriesAction";

interface FoodCategoryState {
  getAllFoodCategoryError: string | null;
  getAllFoodCategoryLoading: boolean;
  getAllFoodCategoryData: any;

  getByIdFoodCategoryError: string | null;
  getByIdFoodCategoryLoading: boolean;
  getByIdFoodCategoryData: any;

  createFoodCategoryError: string | null;
  createFoodCategoryLoading: boolean;

  updateFoodCategoryError: string | null;
  updateFoodCategoryLoading: boolean;

  deleteFoodCategoryError: string | null;
  deleteFoodCategoryLoading: boolean;
}

const initialState: FoodCategoryState = {
  getAllFoodCategoryError: null,
  getAllFoodCategoryLoading: false,
  getAllFoodCategoryData: [],

  getByIdFoodCategoryError: null,
  getByIdFoodCategoryLoading: false,
  getByIdFoodCategoryData: {},

  createFoodCategoryError: null,
  createFoodCategoryLoading: false,

  updateFoodCategoryError: null,
  updateFoodCategoryLoading: false,

  deleteFoodCategoryError: null,
  deleteFoodCategoryLoading: false,
};

const foodCategorySlice = createSlice({
  name: FOOD_CATEGORY_ORIGINAL,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all
      .addCase(getAllFoodCategoryAction.pending, (state) => {
        state.getAllFoodCategoryLoading = true;
        state.getAllFoodCategoryData = [];
        state.getAllFoodCategoryError = null;
      })
      .addCase(
        getAllFoodCategoryAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getAllFoodCategoryLoading = false;
          state.getAllFoodCategoryData = action.payload;
          state.getAllFoodCategoryError = null;
        }
      )
      .addCase(
        getAllFoodCategoryAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getAllFoodCategoryLoading = false;
          state.getAllFoodCategoryError = action.payload;
          state.getAllFoodCategoryData = [];
        }
      )

      // Get by id
      .addCase(getByIdFoodCategoryAction.pending, (state) => {
        state.getByIdFoodCategoryLoading = true;
        state.getByIdFoodCategoryData = [];
        state.getByIdFoodCategoryError = null;
      })
      .addCase(
        getByIdFoodCategoryAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getByIdFoodCategoryLoading = false;
          state.getByIdFoodCategoryData = action.payload;
          state.getByIdFoodCategoryError = null;
        }
      )
      .addCase(
        getByIdFoodCategoryAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getByIdFoodCategoryLoading = false;
          state.getByIdFoodCategoryError = action.payload;
          state.getByIdFoodCategoryData = [];
        }
      )

      // Create
      .addCase(createFoodCategoryAction.pending, (state) => {
        state.createFoodCategoryLoading = true;
        state.createFoodCategoryError = null;
      })
      .addCase(createFoodCategoryAction.fulfilled, (state) => {
        state.createFoodCategoryLoading = false;
        state.createFoodCategoryError = null;
      })
      .addCase(
        createFoodCategoryAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.createFoodCategoryLoading = false;
          state.createFoodCategoryError = action.payload;
        }
      )

      // update
      .addCase(updateFoodCategoryAction.pending, (state) => {
        state.updateFoodCategoryLoading = true;
        state.updateFoodCategoryError = null;
      })
      .addCase(updateFoodCategoryAction.fulfilled, (state) => {
        state.updateFoodCategoryLoading = false;
        state.updateFoodCategoryError = null;
      })
      .addCase(
        updateFoodCategoryAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.updateFoodCategoryLoading = false;
          state.updateFoodCategoryError = action.payload;
        }
      )

      // Delete
      .addCase(deleteFoodCategoryAction.pending, (state) => {
        state.deleteFoodCategoryLoading = true;
        state.deleteFoodCategoryError = null;
      })
      .addCase(deleteFoodCategoryAction.fulfilled, (state) => {
        state.deleteFoodCategoryLoading = false;
        state.deleteFoodCategoryError = null;
      })
      .addCase(
        deleteFoodCategoryAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.deleteFoodCategoryLoading = false;
          state.deleteFoodCategoryError = action.payload;
        }
      );
  },
});

// Selectors
export const selectGetAllFoodCategoryError = (state: any) =>
  state.foodCategory.getAllFoodCategoryError;
export const selectGetAllFoodCategoryLoading = (state: any) =>
  state.foodCategory.getAllFoodCategoryLoading;
export const selectGetAllFoodCategoryData = (state: any) =>
  state.foodCategory.getAllFoodCategoryData;

export const selectGetByIdFoodCategoryError = (state: any) =>
  state.foodCategory.getByIdFoodCategoryError;
export const selectGetByIdFoodCategoryLoading = (state: any) =>
  state.foodCategory.getByIdFoodCategoryLoading;
export const selectGetByIdFoodCategoryData = (state: any) =>
  state.foodCategory.getByIdFoodCategoryData;

export const selectCreateFoodCategoryError = (state: any) =>
  state.foodCategory.createFoodCategoryError;
export const selectCreateFoodCategoryLoading = (state: any) =>
  state.foodCategory.createFoodCategoryLoading;

export const selectUpdateFoodCategoryError = (state: any) =>
  state.foodCategory.updateFoodCategoryError;
export const selectUpdateFoodCategoryLoading = (state: any) =>
  state.foodCategory.updateFoodCategoryLoading;

export const selectDeleteFoodCategoryError = (state: any) =>
  state.foodCategory.deleteFoodCategoryError;
export const selectDeleteFoodCategoryLoading = (state: any) =>
  state.foodCategory.deleteFoodCategoryLoading;

export default foodCategorySlice.reducer;
