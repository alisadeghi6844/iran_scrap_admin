import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  CLOSE_REQUEST,
  EXPIRE_OFFER,
  PRODUCT_REQUEST_OFFER_ADMIN,
} from "../../types/product-request-offer-admin/ProductRequestOfferAdminTypes";
import {
  closeRequestService,
  expireOfferService,
} from "../../service/product-request-offer-admin/ProductRequestOfferAdminServices";

export const CloseRequestAction = createAsyncThunk(
  `${PRODUCT_REQUEST_OFFER_ADMIN}/${CLOSE_REQUEST}`,
  async ({ requestId }: { requestId: string }, { rejectWithValue }: any) => {
    try {
      const response = await closeRequestService(requestId);
      if (response?.status === 200 || response?.status === 201) {
        toast.success("درخواست با موفقیت بسته شد");
        return response;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      toast.error("خطا در بستن درخواست");
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const ExpireOfferAction = createAsyncThunk(
  `${PRODUCT_REQUEST_OFFER_ADMIN}/${EXPIRE_OFFER}`,
  async ({ offerId }: { offerId: string }, { rejectWithValue }: any) => {
    try {
      const response = await expireOfferService(offerId);
      if (response?.status === 200 || response?.status === 201) {
        toast.success("پیشنهاد با موفقیت منقضی شد");
        return response;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: unknown) {
      toast.error("خطا در منقضی کردن پیشنهاد");
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);
