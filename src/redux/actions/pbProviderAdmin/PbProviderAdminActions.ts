import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  PB_PROVIDER_ADMIN,
  CREATE_PB_PROVIDER_ADMIN,
  DELETE_PB_PROVIDER_ADMIN,
  GET_PB_PROVIDER_ADMIN,
  GET_PB_PROVIDER_ADMIN_BY_ID,
  UPDATE_PB_PROVIDER_ADMIN,
} from "../../types/pbProviderAdmin/PbProviderAdminTypes";
import {
  createPbProviderAdminService,
  deletePbProviderAdminService,
  getPbProviderAdminByIdService,
  getPbProviderAdminService,
  updatePbProviderAdminService,
} from "../../service/pbProviderAdmin/PbProviderAdminServices";
import { toast } from "react-toastify";

let query: any = null;

export const GetPbProviderAdminAction = createAsyncThunk(
  `${PB_PROVIDER_ADMIN}/${GET_PB_PROVIDER_ADMIN}`,
  async (credentials: any, { rejectWithValue }: any) => {
    query = credentials;
    try {
      const response = await getPbProviderAdminService(query);
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

export const GetPbProviderAdminByIdAction = createAsyncThunk(
  `${PB_PROVIDER_ADMIN}/${GET_PB_PROVIDER_ADMIN_BY_ID}`,
  async (credentials: any, { rejectWithValue }: any) => {
    try {
      const response = await getPbProviderAdminByIdService({ credentials });
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

export const CreatePbProviderAdminAction = createAsyncThunk(
  `${PB_PROVIDER_ADMIN}/${CREATE_PB_PROVIDER_ADMIN}`,
  async ({ credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await createPbProviderAdminService(credentials);
      if (response?.status == 201) {
        toast.success("تامین کننده با موفقیت ساخته شد");
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

export const UpdatePbProviderAdminAction = createAsyncThunk(
  `${PB_PROVIDER_ADMIN}/${UPDATE_PB_PROVIDER_ADMIN}`,
  async ({ id, credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await updatePbProviderAdminService(credentials, id);
      if (response?.status == 200) {
        toast.success("تامین کننده با موفقیت ویرایش شد");
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

export const DeletePbProviderAdminAction = createAsyncThunk(
  `${PB_PROVIDER_ADMIN}/${DELETE_PB_PROVIDER_ADMIN}`,
  async ({ id, onSubmitForm }: any, thunkAPI) => {
    try {
      const response = await deletePbProviderAdminService(id);
      if (response?.status == 200) {
        toast.success("تامین کننده با موفقیت حذف شد");
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