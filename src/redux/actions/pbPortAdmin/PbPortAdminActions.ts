import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  PB_PORT_ADMIN,
  CREATE_PB_PORT_ADMIN,
  DELETE_PB_PORT_ADMIN,
  GET_PB_PORT_ADMIN,
  GET_PB_PORT_ADMIN_BY_ID,
  UPDATE_PB_PORT_ADMIN,
} from "../../types/pbPortAdmin/PbPortAdminTypes";
import {
  createPbPortAdminService,
  deletePbPortAdminService,
  getPbPortAdminByIdService,
  getPbPortAdminService,
  updatePbPortAdminService,
} from "../../service/pbPortAdmin/PbPortAdminServices";
import { toast } from "react-toastify";

let query: any = null;

export const GetPbPortAdminAction = createAsyncThunk(
  `${PB_PORT_ADMIN}/${GET_PB_PORT_ADMIN}`,
  async (credentials: any, { rejectWithValue }: any) => {
    query = credentials;
    try {
      const response = await getPbPortAdminService(query);
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

export const GetPbPortAdminByIdAction = createAsyncThunk(
  `${PB_PORT_ADMIN}/${GET_PB_PORT_ADMIN_BY_ID}`,
  async (credentials: any, { rejectWithValue }: any) => {
    try {
      const response = await getPbPortAdminByIdService({ credentials });
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

export const CreatePbPortAdminAction = createAsyncThunk(
  `${PB_PORT_ADMIN}/${CREATE_PB_PORT_ADMIN}`,
  async ({ credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await createPbPortAdminService(credentials);
      if (response?.status == 201) {
        toast.success("محل بارگیری با موفقیت ساخته شد");
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

export const UpdatePbPortAdminAction = createAsyncThunk(
  `${PB_PORT_ADMIN}/${UPDATE_PB_PORT_ADMIN}`,
  async ({ id, credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await updatePbPortAdminService(credentials, id);
      if (response?.status == 200) {
        toast.success("محل بارگیری با موفقیت ویرایش شد");
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

export const DeletePbPortAdminAction = createAsyncThunk(
  `${PB_PORT_ADMIN}/${DELETE_PB_PORT_ADMIN}`,
  async ({ id, onSubmitForm }: any, thunkAPI) => {
    try {
      const response = await deletePbPortAdminService(id);
      if (response?.status == 200) {
        toast.success("محل بارگیری با موفقیت حذف شد");
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