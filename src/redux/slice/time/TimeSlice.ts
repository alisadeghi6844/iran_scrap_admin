import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTimeAction } from "../../actions/time/TimeAction";
import { TIME_ORIGINAL } from "../../types/time/TimeTypes";



interface RestaurantState {
  getTimeError: string | null;
  getTimeLoading: boolean;
  getTimeData: any;
}

const initialState: RestaurantState = {
  getTimeError: null,
  getTimeLoading: false,
  getTimeData: [],
};

const timeSlice = createSlice({
  name: TIME_ORIGINAL,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all
      .addCase(getTimeAction.pending, (state) => {
        state.getTimeLoading = true;
        state.getTimeData = [];
        state.getTimeError = null;
      })
      .addCase(
        getTimeAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getTimeLoading = false;
          state.getTimeData = action.payload;
          state.getTimeError = null;
        }
      )
      .addCase(
        getTimeAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getTimeLoading = false;
          state.getTimeError = action.payload;
          state.getTimeData = [];
        }
      )
  },
});

// Selectors
export const selectGetTimeError = (state: any) =>
  state.time.getTimeError;
export const selectGetTimeLoading = (state: any) =>
  state.time.getTimeLoading;
export const selectGetTimeData = (state: any) =>
  state.time.getTimeData;

export default timeSlice.reducer;
