import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FOOD_SHOW_ORIGINAL } from "../../../../types/foodReservation/management/foodShow/FoodShowTypes";
import {
  createFoodShowAction,
  deleteFoodShowAction,
  getAllClientFoodsAction,
  getAllFoodShowAction,
  getByIdFoodShowAction,
  updateFoodShowAction,
} from "../../../../actions/foodReservation/management/foodShow/FoodShowAction";

interface FoodShowState {
  getAllFoodShowError: string | null;
  getAllFoodShowLoading: boolean;
  getAllFoodShowData: any;

  getAllClientFoodsError: string | null;
  getAllClientFoodsLoading: boolean;
  getAllClientFoodsData: any;

  getByIdFoodShowError: string | null;
  getByIdFoodShowLoading: boolean;
  getByIdFoodShowData: any;

  createFoodShowError: string | null;
  createFoodShowLoading: boolean;

  updateFoodShowError: string | null;
  updateFoodShowLoading: boolean;

  deleteFoodShowError: string | null;
  deleteFoodShowLoading: boolean;
}

const initialState: FoodShowState = {
  getAllFoodShowError: null,
  getAllFoodShowLoading: false,
  getAllFoodShowData: [],

  getAllClientFoodsError: null,
  getAllClientFoodsLoading: false,
  getAllClientFoodsData: [],

  getByIdFoodShowError: null,
  getByIdFoodShowLoading: false,
  getByIdFoodShowData: {},

  createFoodShowError: null,
  createFoodShowLoading: false,

  updateFoodShowError: null,
  updateFoodShowLoading: false,

  deleteFoodShowError: null,
  deleteFoodShowLoading: false,
};

const foodShowSlice = createSlice({
  name: FOOD_SHOW_ORIGINAL,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all
      .addCase(getAllFoodShowAction.pending, (state) => {
        state.getAllFoodShowLoading = true;
        state.getAllFoodShowData = [];
        state.getAllFoodShowError = null;
      })
      .addCase(
        getAllFoodShowAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getAllFoodShowLoading = false;
          state.getAllFoodShowData = action.payload;
          state.getAllFoodShowError = null;
        }
      )
      .addCase(
        getAllFoodShowAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getAllFoodShowLoading = false;
          state.getAllFoodShowError = action.payload;
          state.getAllFoodShowData = [];
        }
      )

      // Get client foods
      .addCase(getAllClientFoodsAction.pending, (state) => {
        state.getAllClientFoodsLoading = true;
        state.getAllClientFoodsData = [];
        state.getAllClientFoodsError = null;
      })
      .addCase(
        getAllClientFoodsAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getAllClientFoodsLoading = false;
          state.getAllClientFoodsData = action.payload;
          state.getAllClientFoodsError = null;
        }
      )
      .addCase(
        getAllClientFoodsAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getAllClientFoodsLoading = false;
          state.getAllClientFoodsError = action.payload;
          state.getAllClientFoodsData = [];
        }
      )

      // Get by id
      .addCase(getByIdFoodShowAction.pending, (state) => {
        state.getByIdFoodShowLoading = true;
        state.getByIdFoodShowData = [];
        state.getByIdFoodShowError = null;
      })
      .addCase(
        getByIdFoodShowAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getByIdFoodShowLoading = false;
          state.getByIdFoodShowData = action.payload;
          state.getByIdFoodShowError = null;
        }
      )
      .addCase(
        getByIdFoodShowAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getByIdFoodShowLoading = false;
          state.getByIdFoodShowError = action.payload;
          state.getByIdFoodShowData = [];
        }
      )

      // Create
      .addCase(createFoodShowAction.pending, (state) => {
        state.createFoodShowLoading = true;
        state.createFoodShowError = null;
      })
      .addCase(createFoodShowAction.fulfilled, (state) => {
        state.createFoodShowLoading = false;
        state.createFoodShowError = null;
      })
      .addCase(
        createFoodShowAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.createFoodShowLoading = false;
          state.createFoodShowError = action.payload;
        }
      )

      // update
      .addCase(updateFoodShowAction.pending, (state) => {
        state.updateFoodShowLoading = true;
        state.updateFoodShowError = null;
      })
      .addCase(updateFoodShowAction.fulfilled, (state) => {
        state.updateFoodShowLoading = false;
        state.updateFoodShowError = null;
      })
      .addCase(
        updateFoodShowAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.updateFoodShowLoading = false;
          state.updateFoodShowError = action.payload;
        }
      )

      // Delete
      .addCase(deleteFoodShowAction.pending, (state) => {
        state.deleteFoodShowLoading = true;
        state.deleteFoodShowError = null;
      })
      .addCase(deleteFoodShowAction.fulfilled, (state) => {
        state.deleteFoodShowLoading = false;
        state.deleteFoodShowError = null;
      })
      .addCase(
        deleteFoodShowAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.deleteFoodShowLoading = false;
          state.deleteFoodShowError = action.payload;
        }
      );
  },
});

// Selectors
export const selectGetAllFoodShowError = (state: any) =>
  state.foodShow.getAllFoodShowError;
export const selectGetAllFoodShowLoading = (state: any) =>
  state.foodShow.getAllFoodShowLoading;
export const selectGetAllFoodShowData = (state: any) =>
  state.foodShow.getAllFoodShowData;

export const selectGetAllClientFoodsError = (state: any) =>
  state.foodShow.getAllClientFoodsError;
export const selectGetAllClientFoodsLoading = (state: any) =>
  state.foodShow.getAllClientFoodsLoading;
export const selectGetAllClientFoodsData = (state: any) =>
  state.foodShow.getAllClientFoodsData;

export const selectGetByIdFoodShowError = (state: any) =>
  state.foodShow.getByIdFoodShowError;
export const selectGetByIdFoodShowLoading = (state: any) =>
  state.foodShow.getByIdFoodShowLoading;
export const selectGetByIdFoodShowData = (state: any) =>
  state.foodShow.getByIdFoodShowData;

export const selectCreateFoodShowError = (state: any) =>
  state.foodShow.createFoodShowError;
export const selectCreateFoodShowLoading = (state: any) =>
  state.foodShow.createFoodShowLoading;

export const selectUpdateFoodShowError = (state: any) =>
  state.foodShow.updateFoodShowError;
export const selectUpdateFoodShowLoading = (state: any) =>
  state.foodShow.updateFoodShowLoading;

export const selectDeleteFoodShowError = (state: any) =>
  state.foodShow.deleteFoodShowError;
export const selectDeleteFoodShowLoading = (state: any) =>
  state.foodShow.deleteFoodShowLoading;

export default foodShowSlice.reducer;
