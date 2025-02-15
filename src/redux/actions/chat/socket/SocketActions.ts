import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  SOCKET_GET_CURRENT_CHATS,
  SOCKET_GET_MESSAGE,
  SOCKET_GET_ONLINE_CONTACTS_USERS,
  SOCKET_IS_TYPING,
  SOCKET_ORIGINAL,
  SOCKET_PROGRESS_UPLOAD,
  SOCKET_REMOVE_MESSAGE,
} from "../../../types/chat/socket/SocketTypes";

export const getMessagesAction = createAsyncThunk(
  `${SOCKET_ORIGINAL}/${SOCKET_GET_MESSAGE}`,
  async (
    credentials: {
      /* نوع مشخص برای credentials */
    },
    { rejectWithValue }
  ) => {
    try {
      return credentials;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);


export const removeMessagesAction = createAsyncThunk(
  `${SOCKET_ORIGINAL}/${SOCKET_REMOVE_MESSAGE}`,
  async (
    credentials: {
    },
    { rejectWithValue }
  ) => {
    try {
      console.log("credentials",credentials)
      return credentials;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);


export const getCurrentChatsAction = createAsyncThunk(
  `${SOCKET_ORIGINAL}/${SOCKET_GET_CURRENT_CHATS}`,
  async (
    credentials: {
      /* نوع مشخص برای credentials */
    },
    { rejectWithValue }
  ) => {
    try {
      return credentials;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const socketIsTypingAction = createAsyncThunk(
  `${SOCKET_ORIGINAL}/${SOCKET_IS_TYPING}`,
  async (
    credentials: {
      /* نوع مشخص برای credentials */
    },
    { rejectWithValue }
  ) => {
    try {
      return credentials;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const socketGetOnlineContactUserAction = createAsyncThunk(
  `${SOCKET_ORIGINAL}/${SOCKET_GET_ONLINE_CONTACTS_USERS}`,
  async (
    credentials: {
      /* نوع مشخص برای credentials */
    },
    { rejectWithValue }
  ) => {
    try {
      return credentials;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);


export const socketProgressUploadAction = createAsyncThunk(
  `${SOCKET_ORIGINAL}/${SOCKET_PROGRESS_UPLOAD}`,
  async (
    credentials: {
    },
    { rejectWithValue }
  ) => {
    try {
      return credentials;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);
