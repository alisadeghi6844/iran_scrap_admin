import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GET_CONTACT_BY_ID,
  GET_CONTACTS_FOR_DM,
  GET_MESSAGES,
  USERS_CHAT_GET_ALL,
  USERS_CHAT_ORIGINAL,
} from "../../../types/chat/users/UsersChatTypes";
import {  getAllUsersChatService, getContactByIdService, getContactsForDmService, getMessagesService } from "../../../service/chat/users/UsersChatServise";

let getAllQuery: any = null;

export const getAllUsersChatAction = createAsyncThunk(
  `${USERS_CHAT_ORIGINAL}/${USERS_CHAT_GET_ALL}`,
  async (credentials: any, { rejectWithValue }: any) => {
    getAllQuery = credentials;
    try {
      const response = await getAllUsersChatService(getAllQuery);
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

export const getContactByIdAction = createAsyncThunk(
  `${USERS_CHAT_ORIGINAL}/${GET_CONTACT_BY_ID}`,
  async (credentials: any, { rejectWithValue }: any) => {
    try {
      const response = await getContactByIdService(credentials);
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

export const getMessagesAction = createAsyncThunk(
  `${USERS_CHAT_ORIGINAL}/${GET_MESSAGES}`,
  async (credentials: any, { rejectWithValue }: any) => {
    try {
      const response = await getMessagesService(credentials);
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

export const getContactsForDmAction = createAsyncThunk(
  `${USERS_CHAT_ORIGINAL}/${GET_CONTACTS_FOR_DM}`,
  async (credentials: any, { rejectWithValue }: any) => {
    try {
      const response = await getContactsForDmService(credentials);
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