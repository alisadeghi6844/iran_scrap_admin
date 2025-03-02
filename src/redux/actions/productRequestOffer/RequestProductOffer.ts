import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GET_PRODUCT_REQUEST_BY_ID_OFFER,
  GET_PRODUCT_REQUEST_OFFER,
  PRODUCT_REQUEST_OFFER,
  UPDATE_PRODUCT_REQUEST_OFFER,
} from "../../types/productRequestOffer/ProductRequestOfferTypes";
import {
  getProductRequestOfferByIdService,
  getProductRequestOfferService,
  updateProductRequestOfferService,
  updateProductRequestOfferToBuyerService,
} from "../../service/productRequestOffer/ProductRequestStatusServices";
import { UPDATE_PRODUCT_REQUEST_OFFER_SEND_TO_BUYER_POINT } from "../../api/productRequestOffer/ProductRequestStatusApi";
import { toast } from "react-toastify";

let query: any = null;

export const GetRequestProductOfferAction = createAsyncThunk(
  `${PRODUCT_REQUEST_OFFER}/${GET_PRODUCT_REQUEST_OFFER}`,
  async (credentials: any, { rejectWithValue }: any) => {
    query = credentials;
    try {
      const response = await getProductRequestOfferService(query);
      if (response?.status === 200) {
        return response.data; // به درستی داده‌های کاربر را برمی‌گرداند
      } else {
        return rejectWithValue(response.data); // در صورت خطای غیر 200
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const GetRequestProductOfferByIdAction = createAsyncThunk(
  `${GET_PRODUCT_REQUEST_BY_ID_OFFER}`,
  async ({ credentials }: any, thunkAPI) => {
    try {
      const response = await getProductRequestOfferByIdService(credentials);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const UpdateRequestProductOfferAction = createAsyncThunk(
  `${UPDATE_PRODUCT_REQUEST_OFFER}`,
  async ({ credentials }: any, thunkAPI) => {
    try {
      const response = await updateProductRequestOfferService(credentials);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const UpdateRequestProductOfferSendToBuyerAction = createAsyncThunk(
  `${UPDATE_PRODUCT_REQUEST_OFFER_SEND_TO_BUYER_POINT}`,
  async ({ credentials,onSubmitForm }: any, thunkAPI) => {
    try {
      const response = await updateProductRequestOfferToBuyerService(credentials);
      if(response?.status==200){
        toast.success("عملیات با موفقیت انجام شد");
        onSubmitForm()
      }
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);
