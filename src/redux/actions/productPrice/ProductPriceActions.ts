import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  PRODUCT_PRICE,
  CREATE_PRODUCT_PRICE,
  DELETE_PRODUCT_PRICE,
  GET_PRODUCT_PRICE,
  GET_PRODUCT_PRICE_BY_ID,
  UPDATE_PRODUCT_PRICE,
  UPDATE_PURCHASE_PRICE,
  ProductPriceUpdatePayload,
} from "../../types/productPrice/ProductPriceTypes";
import {
  createProductPriceService,
  deleteProductPriceService,
  getProductPriceService,
  getProductPriceByIdService,
  updateProductPriceService,
  updatePurchasePriceService,
} from "../../service/productPrice/ProductPriceServices";
import { getProductStatusValue } from "../../../utils/ProductStatusCalculator";
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

export const UpdatePurchasePriceAction = createAsyncThunk(
  `${PRODUCT_PRICE}/${UPDATE_PURCHASE_PRICE}`,
  async ({ id, credentials, sellPrice, constant, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      // Validate required fields
      if (!id) {
        throw new Error('شناسه محصول الزامی است');
      }

      if (!credentials.buyPrice && credentials.buyPrice !== 0) {
        throw new Error('قیمت خرید الزامی است');
      }

      if (credentials.buyPrice < 0) {
        throw new Error('قیمت خرید نمی‌تواند منفی باشد');
      }

      // Prepare enhanced credentials with calculated values
      let enhancedCredentials: ProductPriceUpdatePayload = { ...credentials };
      
      // If sellPrice is provided in credentials, use it directly
      // Otherwise, calculate status if sellPrice and constant are provided as separate params
      if (credentials.sellPrice && credentials.status) {
        // Values already calculated and provided in credentials
        enhancedCredentials.sellPrice = credentials.sellPrice;
        enhancedCredentials.status = credentials.status;
        
        // Validate calculated values
        if (enhancedCredentials.sellPrice < 0) {
          throw new Error('قیمت فروش محاسبه شده نمی‌تواند منفی باشد');
        }
      } else if (sellPrice && constant) {
        // Fallback: calculate status using legacy method
        const status = getProductStatusValue(sellPrice, constant);
        enhancedCredentials.status = status;
        enhancedCredentials.sellPrice = sellPrice;
      }

      const response = await updatePurchasePriceService(enhancedCredentials, id);
      if (response?.status == 200) {
        toast.success("قیمت خرید با موفقیت ویرایش شد");
        onSubmitForm && onSubmitForm();
        resetForm && resetForm();
      }
      return response;
    } catch (error: any) {
      // Enhanced error handling
      let errorMessage = "خطا در ویرایش قیمت خرید";
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
      
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: errorMessage }
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
