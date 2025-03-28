import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { GENERAL_SETTING } from "../../types/generalSetting/GeneralSettingTypes";
import {
  CreateGeneralSettingAction,
  DeleteGeneralSettingAction,
  GetGeneralSettingAction,
  UpdateGeneralSettingAction,
} from "../../actions/generalSetting/GeneralSettingActions";

interface generalSettingState {
  getGeneralSettingError: string | null;
  getGeneralSettingLoading: boolean;
  getGeneralSettingData: any;

  createGeneralSettingError: any;
  createGeneralSettingLoading: any;
  createGeneralSettingData: any;

  updateGeneralSettingError: string | null;
  updateGeneralSettingLoading: boolean;
  updateGeneralSettingData: any;

  deleteGeneralSettingError: string | null;
  deleteGeneralSettingLoading: boolean;
  deleteGeneralSettingData: any;
}

const initialState: generalSettingState = {
  getGeneralSettingError: null,
  getGeneralSettingLoading: false,
  getGeneralSettingData: [],

  createGeneralSettingError: null,
  createGeneralSettingLoading: false,
  createGeneralSettingData: [],

  updateGeneralSettingError: null,
  updateGeneralSettingLoading: false,
  updateGeneralSettingData: [],

  deleteGeneralSettingError: null,
  deleteGeneralSettingLoading: false,
  deleteGeneralSettingData: [],
};

const generalSettingSlice = createSlice({
  name: GENERAL_SETTING,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get generalSetting
      .addCase(GetGeneralSettingAction.pending, (state) => {
        state.getGeneralSettingLoading = true;
        state.getGeneralSettingData = [];
        state.getGeneralSettingError = null;
      })
      .addCase(GetGeneralSettingAction.fulfilled, (state, action: PayloadAction<any>) => {
        state.getGeneralSettingLoading = false;
        state.getGeneralSettingData = action.payload;
        state.getGeneralSettingError = null;
      })
      .addCase(
        GetGeneralSettingAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getGeneralSettingLoading = false;
          state.getGeneralSettingError = action.payload;
          state.getGeneralSettingData = [];
        }
      )
      // create generalSetting
      .addCase(CreateGeneralSettingAction.pending, (state) => {
        state.createGeneralSettingLoading = true;
        state.createGeneralSettingData = [];
        state.createGeneralSettingError = null;
      })
      .addCase(CreateGeneralSettingAction.fulfilled, (state, action) => {
        state.createGeneralSettingLoading = false;
        state.createGeneralSettingData = action.payload;
        state.createGeneralSettingError = null;
      })
      .addCase(CreateGeneralSettingAction.rejected, (state, action) => {
        state.createGeneralSettingLoading = false;
        state.createGeneralSettingError = action.payload;
        state.createGeneralSettingData = [];
      })

      // update generalSetting
      .addCase(UpdateGeneralSettingAction.pending, (state) => {
        state.updateGeneralSettingLoading = true;
        state.updateGeneralSettingData = [];
        state.updateGeneralSettingError = null;
      })
      .addCase(UpdateGeneralSettingAction.fulfilled, (state, action) => {
        state.updateGeneralSettingLoading = false;
        state.updateGeneralSettingData = action.payload;
        state.updateGeneralSettingError = null;
      })
      .addCase(UpdateGeneralSettingAction.rejected, (state, action) => {
        state.updateGeneralSettingLoading = false;
        state.updateGeneralSettingError = action.payload;
        state.updateGeneralSettingData = [];
      })

      // delete generalSetting
      .addCase(DeleteGeneralSettingAction.pending, (state) => {
        state.deleteGeneralSettingLoading = true;
        state.deleteGeneralSettingData = [];
        state.deleteGeneralSettingError = null;
      })
      .addCase(DeleteGeneralSettingAction.fulfilled, (state, action) => {
        state.deleteGeneralSettingLoading = false;
        state.deleteGeneralSettingData = action.payload;
        state.deleteGeneralSettingError = null;
      })
      .addCase(DeleteGeneralSettingAction.rejected, (state, action) => {
        state.deleteGeneralSettingLoading = false;
        state.deleteGeneralSettingError = action.payload;
        state.deleteGeneralSettingData = [];
      });
  },
});

export const selectGetGeneralSettingError = (state: any) => state.generalSetting.getGeneralSettingError;
export const selectGetGeneralSettingLoading = (state: any) => state.generalSetting.getGeneralSettingLoading;
export const selectGetGeneralSettingData = (state: any) => state.generalSetting.getGeneralSettingData;

export const selectCreateGeneralSettingError = (state: any) => state.generalSetting.createGeneralSettingError;
export const selectCreateGeneralSettingLoading = (state: any) =>
  state.generalSetting.createGeneralSettingLoading;
export const selectCreateGeneralSettingData = (state: any) => state.generalSetting.createGeneralSettingData;

export const selectUpdateGeneralSettingError = (state: any) => state.generalSetting.updateGeneralSettingError;
export const selectUpdateGeneralSettingLoading = (state: any) =>
  state.generalSetting.updateGeneralSettingLoading;
export const selectUpdateGeneralSettingData = (state: any) => state.generalSetting.updateGeneralSettingData;

export const selectDeleteGeneralSettingError = (state: any) => state.generalSetting.deleteGeneralSettingError;
export const selectDeleteGeneralSettingLoading = (state: any) =>
  state.generalSetting.deleteGeneralSettingLoading;
export const selectDeleteGeneralSettingData = (state: any) => state.generalSetting.deleteGeneralSettingData;

export default generalSettingSlice.reducer;
