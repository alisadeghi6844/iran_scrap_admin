import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  PRODUCT,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT,
  GET_PRODUCT_BY_ID,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_STATUS,
  CHANGE_PRODUCT_STATUS,
  EDIT_PRODUCT_ADMIN,
} from "../../types/product/ProductTypes";
import {
  createProductService,
  deleteProductService,
  getProductByIdService,
  getProductService,
  updateProductService,
  updateProductStatusService,
  changeProductStatusService,
  editProductAdminService,
} from "../../service/product/ProductServices";
import { toast } from "react-toastify";

let query: any = null;

export const GetProductAction = createAsyncThunk(
  `${PRODUCT}/${GET_PRODUCT}`,
  async (credentials: any, { rejectWithValue }: any) => {
    query = credentials;
    try {
      const response = await getProductService(query);
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

export const GetProductByIdAction = createAsyncThunk(
  `${PRODUCT}/${GET_PRODUCT_BY_ID}`,
  async (credentials: any, { rejectWithValue }: any) => {
    try {
      const response = await getProductByIdService({ credentials });
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

export const CreateProductAction = createAsyncThunk(
  `${PRODUCT}/${CREATE_PRODUCT}`,
  async ({ credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await createProductService(credentials);
      if (response?.status == 201) {
        toast.success("محصول با موفقیت ساخته شد");
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

export const UpdateProductAction = createAsyncThunk(
  `${PRODUCT}/${UPDATE_PRODUCT}`,
  async ({ id, credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await updateProductService(credentials, id);
      if (response?.status == 200) {
        toast.success("محصول با موفقیت ویرایش شد");
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

export const DeleteProductAction = createAsyncThunk(
  `${PRODUCT}/${DELETE_PRODUCT}`,
  async ({ id, onSubmitForm }: any, thunkAPI) => {
    try {
      const response = await deleteProductService(id);
      if (response?.status == 200) {
        toast.success("محصول با موفقیت حذف شد");
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

export const UpdateProductStatusAction = createAsyncThunk(
  `${PRODUCT}/${UPDATE_PRODUCT_STATUS}`,
  async ({ id, credentials, onSubmitForm }: any, thunkAPI) => {
    try {
      const response = await updateProductStatusService(credentials, id);
      if (response?.status == 200) {
        toast.success("وضعیت محصول با موفقیت تغییر کرد");
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

export const ChangeProductStatusAction = createAsyncThunk(
  `${PRODUCT}/${CHANGE_PRODUCT_STATUS}`,
  async ({ productId, status, onSuccess }: any, thunkAPI) => {
    try {
      const response = await changeProductStatusService({ productId, status });
      if (response?.status == 200) {
        toast.success("وضعیت محصول با موفقیت تغییر کرد");
        onSuccess && onSuccess();
      }
      return response;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const EditProductAdminAction = createAsyncThunk(
  `${PRODUCT}/${EDIT_PRODUCT_ADMIN}`,
  async ({ productId, credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await editProductAdminService(productId, credentials);
      if (response?.status == 200) {
        toast.success("محصول با موفقیت ویرایش شد");
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