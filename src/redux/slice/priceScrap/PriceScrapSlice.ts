import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PRICE_SCRAP } from "../../types/priceScrap/PriceScrapTypes";
import { GetPriceScrapProductsAction } from "../../actions/priceScrap/PriceScrapActions";

interface PriceScrapState {
  getPriceScrapProductsError: string | null;
  getPriceScrapProductsLoading: boolean;
  getPriceScrapProductsData: any; // Changed from array to object to support pagination
}

const initialState: PriceScrapState = {
  getPriceScrapProductsError: null,
  getPriceScrapProductsLoading: false,
  getPriceScrapProductsData: {},
};

const priceScrapSlice = createSlice({
  name: PRICE_SCRAP,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get price scrap products
      .addCase(GetPriceScrapProductsAction.pending, (state) => {
        state.getPriceScrapProductsLoading = true;
        state.getPriceScrapProductsData = {};
        state.getPriceScrapProductsError = null;
      })
      .addCase(
        GetPriceScrapProductsAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getPriceScrapProductsLoading = false;
          state.getPriceScrapProductsData = action.payload;
          state.getPriceScrapProductsError = null;
        }
      )
      .addCase(
        GetPriceScrapProductsAction.rejected,
        (state, action: PayloadAction<any>) => {
          state.getPriceScrapProductsLoading = false;
          state.getPriceScrapProductsError = action.payload?.message || "خطای ناشناخته";
          state.getPriceScrapProductsData = {};
        }
      );
  },
});

export const selectGetPriceScrapProductsError = (state: any) =>
  state.priceScrap.getPriceScrapProductsError;
export const selectGetPriceScrapProductsLoading = (state: any) =>
  state.priceScrap.getPriceScrapProductsLoading;
export const selectGetPriceScrapProductsData = (state: any) =>
  state.priceScrap.getPriceScrapProductsData;

export default priceScrapSlice.reducer;

