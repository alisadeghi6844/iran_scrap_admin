// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/account/AccountSlice";
import productRequestStatusSlice from './slice/productRequestStatus/ProductStatusRequestSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    productRequestStatus:productRequestStatusSlice
  },
});
