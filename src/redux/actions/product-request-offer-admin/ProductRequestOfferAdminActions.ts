import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  CLOSE_REQUEST,
  EXPIRE_OFFER,
  GET_PRODUCT_REQUEST_OFFER_ADMIN,
  GET_PRODUCT_REQUEST_OFFER_ADMIN_BY_ID,
  GET_PRODUCT_REQUEST_OFFERS_BY_REQUEST_ID,
  PRODUCT_REQUEST_OFFER_ADMIN,
  VERIFY_PAYMENT,
  MAKE_DELIVERED,
  SEND_OFFER_TO_BUYER,
  UPDATE_PRODUCT_REQUEST_OFFER_ADMIN,
} from "../../types/product-request-offer-admin/ProductRequestOfferAdminTypes";
import {
  closeRequestService,
  expireOfferService,
  getProductRequestOfferAdminService,
  getProductRequestOfferAdminByIdService,
  getProductRequestOffersByRequestIdService,
  verifyPaymentService,
  makeDeliveredService,
  sendOfferToBuyerService,
  updateProductRequestOfferAdminService,
} from "../../service/product-request-offer-admin/ProductRequestOfferAdminServices";

export const CloseRequestAction = createAsyncThunk(
  `${PRODUCT_REQUEST_OFFER_ADMIN}/${CLOSE_REQUEST}`,
  async ({ requestId }: { requestId: string }, { rejectWithValue }: any) => {
    try {
      const response = await closeRequestService(requestId);
      if (response?.status === 200 || response?.status === 201) {
        toast.success("درخواست با موفقیت تحویل داده شد");
        return response;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      toast.error("خطا در تحویل درخواست");
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

export const GetProductRequestOfferAdminAction = createAsyncThunk(
  `${PRODUCT_REQUEST_OFFER_ADMIN}/${GET_PRODUCT_REQUEST_OFFER_ADMIN}`,
  async (params: any, { rejectWithValue }: any) => {
    try {
      const response = await getProductRequestOfferAdminService(params);
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

export const GetProductRequestOfferAdminByIdAction = createAsyncThunk(
  `${PRODUCT_REQUEST_OFFER_ADMIN}/${GET_PRODUCT_REQUEST_OFFER_ADMIN_BY_ID}`,
  async ({ offerId }: { offerId: string }, { rejectWithValue }: any) => {
    try {
      const response = await getProductRequestOfferAdminByIdService(offerId);
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

export const GetProductRequestOffersByRequestIdAction = createAsyncThunk(
  `${PRODUCT_REQUEST_OFFER_ADMIN}/${GET_PRODUCT_REQUEST_OFFERS_BY_REQUEST_ID}`,
  async ({ requestId }: { requestId: string }, { rejectWithValue }: any) => {
    try {
      const response = await getProductRequestOffersByRequestIdService(requestId);
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

export const VerifyPaymentAction = createAsyncThunk(
  `${PRODUCT_REQUEST_OFFER_ADMIN}/${VERIFY_PAYMENT}`,
  async (
    { offerId, verified, comment }: { offerId: string; verified: boolean; comment: string },
    { rejectWithValue }: any
  ) => {
    try {
      const response = await verifyPaymentService({ offerId, verified, comment });
      if (response?.status === 200 || response?.status === 201) {
        toast.success(verified ? "پرداخت با موفقیت تایید شد" : "پرداخت با موفقیت رد شد");
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      toast.error(verified ? "خطا در تایید پرداخت" : "خطا در رد پرداخت");
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const MakeDeliveredAction = createAsyncThunk(
  `${PRODUCT_REQUEST_OFFER_ADMIN}/${MAKE_DELIVERED}`,
  async (
    { orderId, unloadingDate }: { orderId: string; unloadingDate: string },
    { rejectWithValue }: any
  ) => {
    try {
      const response = await makeDeliveredService({ orderId, unloadingDate });
      if (response?.status === 200 || response?.status === 201) {
        toast.success("سفارش با موفقیت به عنوان تحویل شده علامت‌گذاری شد");
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      toast.error("خطا در علامت‌گذاری سفارش به عنوان تحویل شده");
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const SendOfferToBuyerAction = createAsyncThunk(
  `${PRODUCT_REQUEST_OFFER_ADMIN}/${SEND_OFFER_TO_BUYER}`,
  async ({ offerId }: { offerId: string }, { rejectWithValue }: any) => {
    try {
      const response = await sendOfferToBuyerService(offerId);
      if (response?.status === 200 || response?.status === 201) {
        toast.success("پیشنهاد با موفقیت به خریدار ارسال شد");
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      toast.error("خطا در ارسال پیشنهاد به خریدار");
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const UpdateProductRequestOfferAdminAction = createAsyncThunk(
  `${PRODUCT_REQUEST_OFFER_ADMIN}/${UPDATE_PRODUCT_REQUEST_OFFER_ADMIN}`,
  async ({ offerId, data }: { offerId: string; data: any }, { rejectWithValue }: any) => {
    try {
      const response = await updateProductRequestOfferAdminService(offerId, data);
      if (response?.status === 200 || response?.status === 201) {
        toast.success("اطلاعات با موفقیت به‌روزرسانی شد");
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      toast.error("خطا در به‌روزرسانی اطلاعات");
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);
