import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  TICKET,
  CREATE_TICKET,
  GET_TICKET,
  GET_TICKET_BY_ID,
  UPDATE_TICKET,
  ANSWER_TICKET,
  CLOSE_TICKET,
} from "../../types/ticket/TicketTypes";
import {
  createTicketService,
  getTicketByIdService,
  getTicketService,
  updateTicketService,
  answerTicketService,
  closeTicketService,
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

export const GetTicketByIdAction = createAsyncThunk(
  `${TICKET}/${GET_TICKET_BY_ID}`,
  async (ticketId: any, { rejectWithValue }: any) => {
    try {
      const response = await getTicketByIdService(ticketId);
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

export const AnswerTicketAction = createAsyncThunk(
  `${TICKET}/${ANSWER_TICKET}`,
  async ({ ticketId, message, onSuccess }: any, thunkAPI) => {
    try {
      const response = await answerTicketService(ticketId, message);
      if (response?.status === 200 || response?.status === 201) {
        toast.success("پاسخ با موفقیت ارسال شد");
        onSuccess && onSuccess();
      }
      return response;
    } catch (error: any) {
      toast.error("خطا در ارسال پاسخ");
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const CloseTicketAction = createAsyncThunk(
  `${TICKET}/${CLOSE_TICKET}`,
  async ({ ticketId, onSuccess }: any, thunkAPI) => {
    try {
      const response = await closeTicketService(ticketId);
      if (response?.status === 200) {
        toast.success("تیکت با موفقیت بسته شد");
        onSuccess && onSuccess();
      }
      return response;
    } catch (error: any) {
      toast.error("خطا در بستن تیکت");
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);
