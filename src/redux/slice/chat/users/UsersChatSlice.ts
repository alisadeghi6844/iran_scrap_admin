import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { USERS_CHAT_ORIGINAL } from "../../../types/chat/users/UsersChatTypes";
import {
  getContactByIdAction,
  getAllUsersChatAction,
  getMessagesAction,
  getContactsForDmAction,
} from "../../../actions/chat/users/UsersChatActions";

interface UsersChatState {
  getAllUsersChatError: string | null;
  getAllUsersChatLoading: boolean;
  getAllUsersChatData: any;

  getContactByIdError: string | null;
  getContactByIdLoading: boolean;
  getContactByIdData: any;

  getMessagesError: string | null;
  getMessagesLoading: boolean;
  getMessagesData: any;

  getContactsForDmError: string | null;
  getContactsForDmLoading: boolean;
  getContactsForDmData: any;
}

const initialState: UsersChatState = {
  getAllUsersChatError: null,
  getAllUsersChatLoading: false,
  getAllUsersChatData: [],

  getContactByIdError: null,
  getContactByIdLoading: false,
  getContactByIdData: [],

  getMessagesError: null,
  getMessagesLoading: false,
  getMessagesData: [],

  getContactsForDmError: null,
  getContactsForDmLoading: false,
  getContactsForDmData: [],
};

const usersChatSlice = createSlice({
  name: USERS_CHAT_ORIGINAL,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all
      .addCase(getAllUsersChatAction.pending, (state) => {
        state.getAllUsersChatLoading = true;

        state.getAllUsersChatError = null;
      })
      .addCase(
        getAllUsersChatAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getAllUsersChatLoading = false;
          state.getAllUsersChatData = action.payload;
          state.getAllUsersChatError = null;
        }
      )
      .addCase(
        getAllUsersChatAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getAllUsersChatLoading = false;
          state.getAllUsersChatError = action.payload;
          state.getAllUsersChatData = [];
        }
      ) // check has chat
      .addCase(getContactByIdAction.pending, (state) => {
        state.getContactByIdLoading = true;

        state.getContactByIdError = null;
      })
      .addCase(
        getContactByIdAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getContactByIdLoading = false;
          state.getContactByIdData = action.payload;
          state.getContactByIdError = null;
        }
      )
      .addCase(
        getContactByIdAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getContactByIdLoading = false;
          state.getContactByIdError = action.payload;
          state.getContactByIdData = [];
        }
      )
      // get messages
      .addCase(getMessagesAction.pending, (state) => {
        state.getMessagesLoading = true;

        state.getMessagesError = null;
      })
      .addCase(
        getMessagesAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getMessagesLoading = false;
          state.getMessagesData = action.payload;
          state.getMessagesError = null;
        }
      )
      .addCase(
        getMessagesAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getMessagesLoading = false;
          state.getMessagesError = action.payload;
          state.getMessagesData = [];
        }
      )

            // get contacts for dm
            .addCase(getContactsForDmAction.pending, (state) => {
              state.getContactsForDmLoading = true;
      
              state.getContactsForDmError = null;
            })
            .addCase(
              getContactsForDmAction.fulfilled,
              (state, action: PayloadAction<any>) => {
                state.getContactsForDmLoading = false;
                state.getContactsForDmData = action.payload;
                state.getContactsForDmError = null;
              }
            )
            .addCase(
              getContactsForDmAction.rejected,
              (state, action: PayloadAction<string>) => {
                state.getContactsForDmLoading = false;
                state.getContactsForDmError = action.payload;
                state.getContactsForDmData = [];
              }
            );
  },
});

// Selectors
export const selectGetAllUsersChatError = (state: any) =>
  state.usersChat.getAllUsersChatError;
export const selectGetAllUsersChatLoading = (state: any) =>
  state.usersChat.getAllUsersChatLoading;
export const selectGetAllUsersChatData = (state: any) =>
  state.usersChat.getAllUsersChatData;

export const selectGetContactByIdError = (state: any) =>
  state.usersChat.getContactByIdError;
export const selectGetContactByIdLoading = (state: any) =>
  state.usersChat.getContactByIdLoading;
export const selectGetContactByIdData = (state: any) =>
  state.usersChat.getContactByIdData;

export const selectGetMessagesError = (state: any) =>
  state.usersChat.getMessagesError;
export const selectGetMessagesLoading = (state: any) =>
  state.usersChat.getMessagesLoading;
export const selectGetMessagesData = (state: any) =>
  state.usersChat.getMessagesData;

export const selectGetContactsForDmError = (state: any) =>
  state.usersChat.getContactsForDmError;
export const selectGetContactsForDmLoading = (state: any) =>
  state.usersChat.getContactsForDmLoading;
export const selectGetContactsForDmData = (state: any) =>
  state.usersChat.getContactsForDmData;

export default usersChatSlice.reducer;
