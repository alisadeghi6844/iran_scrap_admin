import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  TICKET,
  CREATE_TICKET,
  GET_TICKET,
  GET_TICKET_BY_ID,
  UPDATE_TICKET,
} from "../../types/ticket/TicketTypes";
import {
  createTicketService,
  getTicketByIdService,
  getTicketService,
  updateTicketService,
} from "../../service/ticket/TicketServices";
import { toast } from "react-toastify";

let query: any = null;

export const GetTicketAction = createAsyncThunk(
  `${TICKET}/${GET_TICKET}`,
  async (credentials: any, { rejectWithValue }: any) => {
    query = credentials;
    try {
      const response = await getTicketService(query);
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

export const GetTicketByIdAction = createAsyncThunk(
  `${TICKET}/${GET_TICKET_BY_ID}`,
  async (credentials: any, { rejectWithValue }: any) => {
    try {
      const response = await getTicketByIdService({ credentials });
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

export const CreateTicketAction = createAsyncThunk(
  `${TICKET}/${CREATE_TICKET}`,
  async ({ credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await createTicketService(credentials);
      if (response?.status == 201) {
        toast.success("تیکت با موفقیت ساخته شد");
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

export const UpdateTicketAction = createAsyncThunk(
  `${TICKET}/${UPDATE_TICKET}`,
  async ({ id, credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await updateTicketService(credentials, id);
      if (response?.status == 200) {
        toast.success("تیکت با موفقیت ویرایش شد");
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
