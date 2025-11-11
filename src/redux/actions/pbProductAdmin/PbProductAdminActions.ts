import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  PB_PRODUCT_ADMIN,
  CREATE_PB_PRODUCT_ADMIN,
  DELETE_PB_PRODUCT_ADMIN,
  GET_PB_PRODUCT_ADMIN,
  GET_PB_PRODUCT_ADMIN_BY_ID,
  UPDATE_PB_PRODUCT_ADMIN,
} from "../../types/pbProductAdmin/PbProductAdminTypes";
import {
  createPbProductAdminService,
  deletePbProductAdminService,
  getPbProductAdminByIdService,
  getPbProductAdminService,
  updatePbProductAdminService,
} from "../../service/pbProductAdmin/PbProductAdminServices";
import { toast } from "react-toastify";

let query: any = null;

export const GetPbProductAdminAction = createAsyncThunk(
  `${PB_PRODUCT_ADMIN}/${GET_PB_PRODUCT_ADMIN}`,
  async (credentials: any, { rejectWithValue }: any) => {
    query = credentials;
    try {
      const response = await getPbProductAdminService(query);
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

export const GetPbProductAdminByIdAction = createAsyncThunk(
  `${PB_PRODUCT_ADMIN}/${GET_PB_PRODUCT_ADMIN_BY_ID}`,
  async (credentials: any, { rejectWithValue }: any) => {
    try {
      const response = await getPbProductAdminByIdService({ credentials });
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

export const CreatePbProductAdminAction = createAsyncThunk(
  `${PB_PRODUCT_ADMIN}/${CREATE_PB_PRODUCT_ADMIN}`,
  async ({ credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await createPbProductAdminService(credentials);
      if (response?.status == 201) {
        toast.success("کالا با موفقیت ساخته شد");
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

export const UpdatePbProductAdminAction = createAsyncThunk(
  `${PB_PRODUCT_ADMIN}/${UPDATE_PB_PRODUCT_ADMIN}`,
  async ({ id, credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await updatePbProductAdminService(credentials, id);
      if (response?.status == 200) {
        toast.success("کالا با موفقیت ویرایش شد");
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

export const DeletePbProductAdminAction = createAsyncThunk(
  `${PB_PRODUCT_ADMIN}/${DELETE_PB_PRODUCT_ADMIN}`,
  async ({ id, onSubmitForm }: any, thunkAPI) => {
    try {
      const response = await deletePbProductAdminService(id);
      if (response?.status == 200) {
        toast.success("کالا با موفقیت حذف شد");
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