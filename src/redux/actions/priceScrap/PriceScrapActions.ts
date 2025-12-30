import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  PRICE_SCRAP,
  GET_PRICE_SCRAP_PRODUCTS,
} from "../../types/priceScrap/PriceScrapTypes";
import { getPriceScrapProductsService } from "../../service/priceScrap/PriceScrapServices";

let query: any = null;

export const GetPriceScrapProductsAction = createAsyncThunk(
  `${PRICE_SCRAP}/${GET_PRICE_SCRAP_PRODUCTS}`,
  async (credentials: any, { rejectWithValue }: any) => {
    query = credentials;
    try {
      const response = await getPriceScrapProductsService(query);
      if (response?.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

