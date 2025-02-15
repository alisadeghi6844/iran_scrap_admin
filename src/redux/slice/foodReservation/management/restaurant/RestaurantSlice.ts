import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RESTAURANT_MANAGEMENT_ORIGINAL } from "../../../../types/foodReservation/management/restaurant/RestaurantTypes";
import {
  createRestaurantAction,
  deleteRestaurantAction,
  getAllRestaurantAction,
  getByIdRestaurantAction,
  updateRestaurantAction,
} from "../../../../actions/foodReservation/management/restaurant/RestaurantAction";

interface RestaurantState {
  getAllRestaurantError: string | null;
  getAllRestaurantLoading: boolean;
  getAllRestaurantData: any;

  getByIdRestaurantError: string | null;
  getByIdRestaurantLoading: boolean;
  getByIdRestaurantData: any;

  createRestaurantError: string | null;
  createRestaurantLoading: boolean;

  updateRestaurantError: string | null;
  updateRestaurantLoading: boolean;

  deleteRestaurantError: string | null;
  deleteRestaurantLoading: boolean;
}

const initialState: RestaurantState = {
  getAllRestaurantError: null,
  getAllRestaurantLoading: false,
  getAllRestaurantData: [],

  getByIdRestaurantError: null,
  getByIdRestaurantLoading: false,
  getByIdRestaurantData: {},

  createRestaurantError: null,
  createRestaurantLoading: false,

  updateRestaurantError: null,
  updateRestaurantLoading: false,

  deleteRestaurantError: null,
  deleteRestaurantLoading: false,
};

const restaurantSlice = createSlice({
  name: RESTAURANT_MANAGEMENT_ORIGINAL,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all
      .addCase(getAllRestaurantAction.pending, (state) => {
        state.getAllRestaurantLoading = true;
        state.getAllRestaurantData = [];
        state.getAllRestaurantError = null;
      })
      .addCase(
        getAllRestaurantAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getAllRestaurantLoading = false;
          state.getAllRestaurantData = action.payload;
          state.getAllRestaurantError = null;
        }
      )
      .addCase(
        getAllRestaurantAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getAllRestaurantLoading = false;
          state.getAllRestaurantError = action.payload;
          state.getAllRestaurantData = [];
        }
      )

      // Get by id
      .addCase(getByIdRestaurantAction.pending, (state) => {
        state.getByIdRestaurantLoading = true;
        state.getByIdRestaurantData = [];
        state.getByIdRestaurantError = null;
      })
      .addCase(
        getByIdRestaurantAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getByIdRestaurantLoading = false;
          state.getByIdRestaurantData = action.payload;
          state.getByIdRestaurantError = null;
        }
      )
      .addCase(
        getByIdRestaurantAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getByIdRestaurantLoading = false;
          state.getByIdRestaurantError = action.payload;
          state.getByIdRestaurantData = [];
        }
      )

      // Create
      .addCase(createRestaurantAction.pending, (state) => {
        state.createRestaurantLoading = true;
        state.createRestaurantError = null;
      })
      .addCase(createRestaurantAction.fulfilled, (state) => {
        state.createRestaurantLoading = false;
        state.createRestaurantError = null;
      })
      .addCase(
        createRestaurantAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.createRestaurantLoading = false;
          state.createRestaurantError = action.payload;
        }
      )

      // update
      .addCase(updateRestaurantAction.pending, (state) => {
        state.updateRestaurantLoading = true;
        state.updateRestaurantError = null;
      })
      .addCase(updateRestaurantAction.fulfilled, (state) => {
        state.updateRestaurantLoading = false;
        state.updateRestaurantError = null;
      })
      .addCase(
        updateRestaurantAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.updateRestaurantLoading = false;
          state.updateRestaurantError = action.payload;
        }
      )

      // Delete
      .addCase(deleteRestaurantAction.pending, (state) => {
        state.deleteRestaurantLoading = true;
        state.deleteRestaurantError = null;
      })
      .addCase(deleteRestaurantAction.fulfilled, (state) => {
        state.deleteRestaurantLoading = false;
        state.deleteRestaurantError = null;
      })
      .addCase(
        deleteRestaurantAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.deleteRestaurantLoading = false;
          state.deleteRestaurantError = action.payload;
        }
      );
  },
});

// Selectors
export const selectGetAllRestaurantError = (state: any) =>
  state.restaurant.getAllRestaurantError;
export const selectGetAllRestaurantLoading = (state: any) =>
  state.restaurant.getAllRestaurantLoading;
export const selectGetAllRestaurantData = (state: any) =>
  state.restaurant.getAllRestaurantData;

export const selectGetByIdRestaurantError = (state: any) =>
  state.restaurant.getByIdRestaurantError;
export const selectGetByIdRestaurantLoading = (state: any) =>
  state.restaurant.getByIdRestaurantLoading;
export const selectGetByIdRestaurantData = (state: any) =>
  state.restaurant.getByIdRestaurantData;

export const selectCreateRestaurantError = (state: any) =>
  state.restaurant.createRestaurantError;
export const selectCreateRestaurantLoading = (state: any) =>
  state.restaurant.createRestaurantLoading;

export const selectUpdateRestaurantError = (state: any) =>
  state.restaurant.updateRestaurantError;
export const selectUpdateRestaurantLoading = (state: any) =>
  state.restaurant.updateRestaurantLoading;

export const selectDeleteRestaurantError = (state: any) =>
  state.restaurant.deleteRestaurantError;
export const selectDeleteRestaurantLoading = (state: any) =>
  state.restaurant.deleteRestaurantLoading;

export default restaurantSlice.reducer;
