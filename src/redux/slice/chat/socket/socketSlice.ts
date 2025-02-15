import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getCurrentChatsAction,
  getMessagesAction,
  removeMessagesAction,
  socketGetOnlineContactUserAction,
  socketIsTypingAction,
  socketProgressUploadAction,
} from "../../../actions/chat/socket/SocketActions";
import { SOCKET_ORIGINAL } from "../../../types/chat/socket/SocketTypes";
import {
  runFileDataAction,
  socketProgressDownloadAction,
} from "../../../actions/chat/socket/DownloadActions";

interface UsersChatState {
  getSendMessageError: string | null;
  getSendMessageLoading: boolean;
  getSendMessageData: any[];

  removeSendMessageError: string | null;
  removeSendMessageLoading: boolean;
  removeSendMessageData: any[];

  getCurrentChatsError: string | null;
  getCurrentChatsLoading: boolean;
  getCurrentChatsData: any[];

  socketIsTypingError: string | null;
  socketIsTypingLoading: boolean;
  socketIsTypingData: any[];

  getSocketOnlineContactUserError: string | null;
  getSocketOnlineContactUserLoading: boolean;
  getSocketOnlineContactUserData: any[];

  socketProgressUploadError: string | null;
  socketProgressUploadLoading: boolean;
  socketProgressUploadData: any[];

  socketProgressDownloadError: string | null;
  socketProgressDownloadLoading: boolean;
  socketProgressDownloadData: any[];

  runFileDataError: string | null;
  runFileDataLoading: boolean;
  runFileDataData: any[];
}

const initialState: UsersChatState = {
  getSendMessageError: null,
  getSendMessageLoading: false,
  getSendMessageData: [],

  removeSendMessageError: null,
  removeSendMessageLoading: false,
  removeSendMessageData: [],

  getCurrentChatsError: null,
  getCurrentChatsLoading: false,
  getCurrentChatsData: [],

  socketIsTypingError: null,
  socketIsTypingLoading: false,
  socketIsTypingData: [],

  getSocketOnlineContactUserError: null,
  getSocketOnlineContactUserLoading: false,
  getSocketOnlineContactUserData: [],

  socketProgressUploadError: null,
  socketProgressUploadLoading: false,
  socketProgressUploadData: [],

  socketProgressDownloadError: null,
  socketProgressDownloadLoading: false,
  socketProgressDownloadData: [],

  runFileDataError: null,
  runFileDataLoading: false,
  runFileDataData: [],
};

const socketSlice = createSlice({
  name: SOCKET_ORIGINAL,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMessagesAction.pending, (state) => {
        state.getSendMessageLoading = true;
        state.getSendMessageError = null;
      })
      .addCase(
        getMessagesAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getSendMessageLoading = false;
          state.getSendMessageData = action.payload;
          state.getSendMessageError = null;
        }
      )
      .addCase(
        getMessagesAction.rejected,
        (state, action: PayloadAction<any>) => {
          state.getSendMessageLoading = false;
          state.getSendMessageError = action.payload;
        }
      )

      // remove send message
      .addCase(removeMessagesAction.pending, (state) => {
        state.removeSendMessageLoading = true;
        state.removeSendMessageError = null;
      })
      .addCase(
        removeMessagesAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.removeSendMessageLoading = false;
          state.removeSendMessageData = [
            ...state.removeSendMessageData,
            action.payload,
          ];
          state.removeSendMessageError = null;
        }
      )
      .addCase(
        removeMessagesAction.rejected,
        (state, action: PayloadAction<any>) => {
          state.removeSendMessageLoading = false;
          state.removeSendMessageError = action.payload;
        }
      )

      // current chat data
      .addCase(getCurrentChatsAction.pending, (state) => {
        state.getCurrentChatsLoading = true;
        state.getCurrentChatsError = null;
      })
      .addCase(
        getCurrentChatsAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getCurrentChatsLoading = false;
          state.getCurrentChatsData = action.payload;
          state.getCurrentChatsError = null;
        }
      )
      .addCase(
        getCurrentChatsAction.rejected,
        (state, action: PayloadAction<any>) => {
          state.getCurrentChatsLoading = false;
          state.getCurrentChatsError = action.payload;

        }
      )

      // current chat data
      .addCase(socketIsTypingAction.pending, (state) => {
        state.socketIsTypingLoading = true;
        state.socketIsTypingError = null;
      })
      .addCase(
        socketIsTypingAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.socketIsTypingLoading = false;
          state.socketIsTypingData = action.payload; 
          state.socketIsTypingError = null;
        }
      )
      .addCase(
        socketIsTypingAction.rejected,
        (state, action: PayloadAction<any>) => {
          state.socketIsTypingLoading = false;
          state.socketIsTypingError = action.payload;
          
        }
      )

      // get socket online contact user
      .addCase(socketGetOnlineContactUserAction.pending, (state) => {
        state.getSocketOnlineContactUserLoading = true;
        state.getSocketOnlineContactUserError = null;
      })
      .addCase(
        socketGetOnlineContactUserAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getSocketOnlineContactUserLoading = false;
          state.getSocketOnlineContactUserData = action.payload;
          state.getSocketOnlineContactUserError = null;
        }
      )
      .addCase(
        socketGetOnlineContactUserAction.rejected,
        (state, action: PayloadAction<any>) => {
          state.getSocketOnlineContactUserLoading = false;
          state.getSocketOnlineContactUserError = action.payload;
        }
      )

      // socket progress upload
      .addCase(socketProgressUploadAction.pending, (state) => {
        state.socketProgressUploadLoading = true;
        state.socketProgressUploadError = null;
      })
      .addCase(
        socketProgressUploadAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.socketProgressUploadLoading = false;
          state.socketProgressUploadData = action.payload;
          state.socketProgressUploadError = null;
        }
      )
      .addCase(
        socketProgressUploadAction.rejected,
        (state, action: PayloadAction<any>) => {
          state.socketProgressUploadLoading = false;
          state.socketProgressUploadError = action.payload;
        }
      )

      // socket progress download
      .addCase(socketProgressDownloadAction.pending, (state) => {
        state.socketProgressDownloadLoading = true;
        state.socketProgressDownloadError = null;
      })
      .addCase(
        socketProgressDownloadAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.socketProgressDownloadLoading = false;
          state.socketProgressDownloadData = action.payload;
          state.socketProgressDownloadError = null;
        }
      )
      .addCase(
        socketProgressDownloadAction.rejected,
        (state, action: PayloadAction<any>) => {
          state.socketProgressDownloadLoading = false;
          state.socketProgressDownloadError = action.payload;
        }
      )

      // run file data
      .addCase(runFileDataAction.pending, (state) => {
        state.runFileDataLoading = true;
        state.runFileDataError = null;
      })
      .addCase(
        runFileDataAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.runFileDataLoading = false;
          state.runFileDataData = action.payload;
          state.runFileDataError = null;
        }
      )
      .addCase(
        runFileDataAction.rejected,
        (state, action: PayloadAction<any>) => {
          state.runFileDataLoading = false;
          state.runFileDataError = action.payload;
        }
      );
  },
});

// Selectors
export const selectGetSendMessageError = (state: { socket: UsersChatState }) =>
  state.socket.getSendMessageError;
export const selectGetSendMessageLoading = (state: {
  socket: UsersChatState;
}) => state.socket.getSendMessageLoading;
export const selectGetSendMessageData = (state: { socket: UsersChatState }) =>
  state.socket.getSendMessageData;

export const selectRemoveSendMessageError = (state: {
  socket: UsersChatState;
}) => state.socket.removeSendMessageError;
export const selectRemoveSendMessageLoading = (state: {
  socket: UsersChatState;
}) => state.socket.removeSendMessageLoading;
export const selectRemoveSendMessageData = (state: {
  socket: UsersChatState;
}) => state.socket.removeSendMessageData;

export const selectCurrentChatsError = (state: { socket: UsersChatState }) =>
  state.socket.getCurrentChatsError;
export const selectCurrentChatsLoading = (state: { socket: UsersChatState }) =>
  state.socket.getCurrentChatsLoading;
export const selectCurrentChatsData = (state: { socket: UsersChatState }) =>
  state.socket.getCurrentChatsData;

export const selectSocketIsTypingError = (state: { socket: UsersChatState }) =>
  state.socket.socketIsTypingError;
export const selectSocketIsTypingLoading = (state: {
  socket: UsersChatState;
}) => state.socket.socketIsTypingLoading;
export const selectSocketIsTypingData = (state: { socket: UsersChatState }) =>
  state.socket.socketIsTypingData;

export const selectSocketOnlineContactUserError = (state: {
  socket: UsersChatState;
}) => state.socket.getSocketOnlineContactUserError;
export const selectSocketOnlineContactUserLoading = (state: {
  socket: UsersChatState;
}) => state.socket.getSocketOnlineContactUserLoading;
export const selectSocketOnlineContactUserData = (state: {
  socket: UsersChatState;
}) => state.socket.getSocketOnlineContactUserData;

export const selectSocketProgressUploadError = (state: {
  socket: UsersChatState;
}) => state.socket.socketProgressUploadError;
export const selectSocketProgressUploadLoading = (state: {
  socket: UsersChatState;
}) => state.socket.socketProgressUploadLoading;
export const selectSocketProgressUploadData = (state: {
  socket: UsersChatState;
}) => state.socket.socketProgressUploadData;

export const selectSocketProgressDownloadError = (state: {
  socket: UsersChatState;
}) => state.socket.socketProgressDownloadError;
export const selectSocketProgressDownloadLoading = (state: {
  socket: UsersChatState;
}) => state.socket.socketProgressDownloadLoading;
export const selectSocketProgressDownloadData = (state: {
  socket: UsersChatState;
}) => state.socket.socketProgressDownloadData;

export const selectRunFileDataError = (state: { socket: UsersChatState }) =>
  state.socket.runFileDataError;
export const selectRunFileDataLoading = (state: { socket: UsersChatState }) =>
  state.socket.runFileDataLoading;
export const selectRunFileDataData = (state: { socket: UsersChatState }) =>
  state.socket.runFileDataData;

export default socketSlice.reducer;
