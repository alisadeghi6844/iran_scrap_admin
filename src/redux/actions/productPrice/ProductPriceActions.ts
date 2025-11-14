import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  PRODUCT_PRICE,
  CREATE_PRODUCT_PRICE,
  DELETE_PRODUCT_PRICE,
  GET_PRODUCT_PRICE,
  GET_PRODUCT_PRICE_BY_ID,
  UPDATE_PRODUCT_PRICE,
} from "../../types/productPrice/ProductPriceTypes";
import {
  createProductPriceService,
  deleteProductPriceService,
  getProductPriceService,
  getProductPriceByIdService,
  updateProductPriceService,
} from "../../service/productPrice/ProductPriceServices";
import { toast } from "react-toastify";

let query: any = null;

export const GetProductPriceAction = createAsyncThunk(
  `${PRODUCT_PRICE}/${GET_PRODUCT_PRICE}`,
  async (credentials: any, { rejectWithValue }: any) => {
    query = credentials;
    try {
      const response = await getProductPriceService(query);
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

export const GetProductPriceByIdAction = createAsyncThunk(
  `${PRODUCT_PRICE}/${GET_PRODUCT_PRICE_BY_ID}`,
  async (credentials: any, { rejectWithValue }: any) => {
    try {
      const response = await getProductPriceByIdService({ credentials });
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

export const CreateProductPriceAction = createAsyncThunk(
  `${PRODUCT_PRICE}/${CREATE_PRODUCT_PRICE}`,
  async ({ credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await createProductPriceService(credentials);
      if (response?.status == 201) {
        toast.success("قیمت محصول با موفقیت ساخته شد");
        onSubmitForm && onSubmitForm();
        resetForm && resetForm();
      }
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const UpdateProductPriceAction = createAsyncThunk(
  `${PRODUCT_PRICE}/${UPDATE_PRODUCT_PRICE}`,
  async ({ id, credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await updateProductPriceService(credentials, id);
      if (response?.status == 200) {
        toast.success("قیمت محصول با موفقیت ویرایش شد");
        onSubmitForm && onSubmitForm();
        resetForm && resetForm();
      }
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const DeleteProductPriceAction = createAsyncThunk(
  `${PRODUCT_PRICE}/${DELETE_PRODUCT_PRICE}`,
  async ({ id, onSubmitForm }: any, thunkAPI) => {
    try {
      const response = await deleteProductPriceService(id);
      if (response?.status == 200) {
        toast.success("قیمت محصول با موفقیت حذف شد");
        onSubmitForm && onSubmitForm();
      }
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);
