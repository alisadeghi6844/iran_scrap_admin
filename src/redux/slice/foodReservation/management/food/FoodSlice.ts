import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FOOD_MANAGEMENT_ORIGINAL } from "../../../../types/foodReservation/management/food/FoodTypes";
import {
  createFoodAction,
  deleteFoodAction,
  getAllFoodAction,
  getByIdFoodAction,
  updateFoodAction,
} from "../../../../actions/foodReservation/management/food/FoodAction";

interface FoodState {
  getAllFoodError: string | null;
  getAllFoodLoading: boolean;
  getAllFoodData: any;

  getByIdFoodError: string | null;
  getByIdFoodLoading: boolean;
  getByIdFoodData: any;

  createFoodError: string | null;
  createFoodLoading: boolean;

  updateFoodError: string | null;
  updateFoodLoading: boolean;

  deleteFoodError: string | null;
  deleteFoodLoading: boolean;
}

const initialState: FoodState = {
  getAllFoodError: null,
  getAllFoodLoading: false,
  getAllFoodData: [],

  getByIdFoodError: null,
  getByIdFoodLoading: false,
  getByIdFoodData: {},

  createFoodError: null,
  createFoodLoading: false,

  updateFoodError: null,
  updateFoodLoading: false,

  deleteFoodError: null,
  deleteFoodLoading: false,
};

const foodSlice = createSlice({
  name: FOOD_MANAGEMENT_ORIGINAL,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all
      .addCase(getAllFoodAction.pending, (state) => {
        state.getAllFoodLoading = true;
        state.getAllFoodData = [];
        state.getAllFoodError = null;
      })
      .addCase(
        getAllFoodAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getAllFoodLoading = false;
          state.getAllFoodData = action.payload;
          state.getAllFoodError = null;
        }
      )
      .addCase(
        getAllFoodAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getAllFoodLoading = false;
          state.getAllFoodError = action.payload;
          state.getAllFoodData = [];
        }
      )

      // Get by id
      .addCase(getByIdFoodAction.pending, (state) => {
        state.getByIdFoodLoading = true;
        state.getByIdFoodData = [];
        state.getByIdFoodError = null;
      })
      .addCase(
        getByIdFoodAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getByIdFoodLoading = false;
          state.getByIdFoodData = action.payload;
          state.getByIdFoodError = null;
        }
      )
      .addCase(
        getByIdFoodAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getByIdFoodLoading = false;
          state.getByIdFoodError = action.payload;
          state.getByIdFoodData = [];
        }
      )

      // Create
      .addCase(createFoodAction.pending, (state) => {
        state.createFoodLoading = true;
        state.createFoodError = null;
      })
      .addCase(createFoodAction.fulfilled, (state) => {
        state.createFoodLoading = false;
        state.createFoodError = null;
      })
      .addCase(
        createFoodAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.createFoodLoading = false;
          state.createFoodError = action.payload;
        }
      )

      // update
      .addCase(updateFoodAction.pending, (state) => {
        state.updateFoodLoading = true;
        state.updateFoodError = null;
      })
      .addCase(updateFoodAction.fulfilled, (state) => {
        state.updateFoodLoading = false;
        state.updateFoodError = null;
      })
      .addCase(
        updateFoodAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.updateFoodLoading = false;
          state.updateFoodError = action.payload;
        }
      )

      // Delete
      .addCase(deleteFoodAction.pending, (state) => {
        state.deleteFoodLoading = true;
        state.deleteFoodError = null;
      })
      .addCase(deleteFoodAction.fulfilled, (state) => {
        state.deleteFoodLoading = false;
        state.deleteFoodError = null;
      })
      .addCase(
        deleteFoodAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.deleteFoodLoading = false;
          state.deleteFoodError = action.payload;
        }
      );
  },
});

// Selectors
export const selectGetAllFoodError = (state: any) => state.food.getAllFoodError;
export const selectGetAllFoodLoading = (state: any) =>
  state.food.getAllFoodLoading;
export const selectGetAllFoodData = (state: any) => state.food.getAllFoodData;

export const selectGetByIdFoodError = (state: any) =>
  state.food.getByIdFoodError;
export const selectGetByIdFoodLoading = (state: any) =>
  state.food.getByIdFoodLoading;
export const selectGetByIdFoodData = (state: any) => state.food.getByIdFoodData;

export const selectCreateFoodError = (state: any) => state.food.createFoodError;
export const selectCreateFoodLoading = (state: any) =>
  state.food.createFoodLoading;

export const selectUpdateFoodError = (state: any) => state.food.updateFoodError;
export const selectUpdateFoodLoading = (state: any) =>
  state.food.updateFoodLoading;

export const selectDeleteFoodError = (state: any) => state.food.deleteFoodError;
export const selectDeleteFoodLoading = (state: any) =>
  state.food.deleteFoodLoading;

export default foodSlice.reducer;
