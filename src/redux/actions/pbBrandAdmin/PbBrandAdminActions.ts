import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  PB_BRAND_ADMIN,
  CREATE_PB_BRAND_ADMIN,
  DELETE_PB_BRAND_ADMIN,
  GET_PB_BRAND_ADMIN,
  GET_PB_BRAND_ADMIN_BY_ID,
  UPDATE_PB_BRAND_ADMIN,
} from "../../types/pbBrandAdmin/PbBrandAdminTypes";
import {
  createPbBrandAdminService,
  deletePbBrandAdminService,
  getPbBrandAdminByIdService,
  getPbBrandAdminService,
  updatePbBrandAdminService,
} from "../../service/pbBrandAdmin/PbBrandAdminServices";
import { toast } from "react-toastify";

let query: any = null;

export const GetPbBrandAdminAction = createAsyncThunk(
  `${PB_BRAND_ADMIN}/${GET_PB_BRAND_ADMIN}`,
  async (credentials: any, { rejectWithValue }: any) => {
    query = credentials;
    try {
      const response = await getPbBrandAdminService(query);
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

export const GetPbBrandAdminByIdAction = createAsyncThunk(
  `${PB_BRAND_ADMIN}/${GET_PB_BRAND_ADMIN_BY_ID}`,
  async (credentials: any, { rejectWithValue }: any) => {
    try {
      const response = await getPbBrandAdminByIdService({ credentials });
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

export const CreatePbBrandAdminAction = createAsyncThunk(
  `${PB_BRAND_ADMIN}/${CREATE_PB_BRAND_ADMIN}`,
  async ({ credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await createPbBrandAdminService(credentials);
      if (response?.status == 201) {
        toast.success("برند با موفقیت ساخته شد");
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

export const UpdatePbBrandAdminAction = createAsyncThunk(
  `${PB_BRAND_ADMIN}/${UPDATE_PB_BRAND_ADMIN}`,
  async ({ id, credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await updatePbBrandAdminService(credentials, id);
      if (response?.status == 200) {
        toast.success("برند با موفقیت ویرایش شد");
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

export const DeletePbBrandAdminAction = createAsyncThunk(
  `${PB_BRAND_ADMIN}/${DELETE_PB_BRAND_ADMIN}`,
  async ({ id, onSubmitForm }: any, thunkAPI) => {
    try {
      const response = await deletePbBrandAdminService(id);
      if (response?.status == 200) {
        toast.success("برند با موفقیت حذف شد");
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