import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TICKET } from "../../types/ticket/TicketTypes";
import {
  CreateTicketAction,
  GetTicketAction,
  GetTicketByIdAction,
  UpdateTicketAction,
  AnswerTicketAction,
  CloseTicketAction,
} from "../../actions/ticket/TicketActions";

interface ticketState {
  getTicketError: string | null;
  getTicketLoading: boolean;
  getTicketData: any;

  getTicketByIdError: string | null;
  getTicketByIdLoading: boolean;
  getTicketByIdData: any;

  createTicketError: any;
  createTicketLoading: any;
  createTicketData: any;

  updateTicketError: string | null;
  updateTicketLoading: boolean;
  updateTicketData: any;

  answerTicketError: string | null;
  answerTicketLoading: boolean;
  answerTicketData: any;

  closeTicketError: string | null;
  closeTicketLoading: boolean;
  closeTicketData: any;
}

const initialState: ticketState = {
  getTicketError: null,
  getTicketLoading: false,
  getTicketData: [],

  getTicketByIdError: null,
  getTicketByIdLoading: false,
  getTicketByIdData: [],

  createTicketError: null,
  createTicketLoading: false,
  createTicketData: [],

  updateTicketError: null,
  updateTicketLoading: false,
  updateTicketData: [],

  answerTicketError: null,
  answerTicketLoading: false,
  answerTicketData: [],

  closeTicketError: null,
  closeTicketLoading: false,
  closeTicketData: [],
};

const ticketSlice = createSlice({
  name: TICKET,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get ticket
      .addCase(GetTicketAction.pending, (state) => {
        state.getTicketLoading = true;
        state.getTicketData = [];
        state.getTicketError = null;
      })
      .addCase(
        GetTicketAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getTicketLoading = false;
          state.getTicketData = action.payload;
          state.getTicketError = null;
        }
      )
      .addCase(
        GetTicketAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getTicketLoading = false;
          state.getTicketError = action.payload;
          state.getTicketData = [];
        }
      )
      // Get ticket
      .addCase(GetTicketByIdAction.pending, (state) => {
        state.getTicketByIdLoading = true;
        state.getTicketByIdData = [];
        state.getTicketByIdError = null;
      })
      .addCase(
        GetTicketByIdAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getTicketByIdLoading = false;
          state.getTicketByIdData = action.payload;
          state.getTicketByIdError = null;
        }
      )
      .addCase(
        GetTicketByIdAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getTicketByIdLoading = false;
          state.getTicketByIdError = action.payload;
          state.getTicketByIdData = [];
        }
      )
      // create ticket
      .addCase(CreateTicketAction.pending, (state) => {
        state.createTicketLoading = true;
        state.createTicketData = [];
        state.createTicketError = null;
      })
      .addCase(CreateTicketAction.fulfilled, (state, action) => {
        state.createTicketLoading = false;
        state.createTicketData = action.payload;
        state.createTicketError = null;
      })
      .addCase(CreateTicketAction.rejected, (state, action) => {
        state.createTicketLoading = false;
        state.createTicketError = action.payload;
        state.createTicketData = [];
      })

      // update ticket
      .addCase(UpdateTicketAction.pending, (state) => {
        state.updateTicketLoading = true;
        state.updateTicketData = [];
        state.updateTicketError = null;
      })
      .addCase(UpdateTicketAction.fulfilled, (state, action) => {
        state.updateTicketLoading = false;
        state.updateTicketData = action.payload;
        state.updateTicketError = null;
      })
      .addCase(UpdateTicketAction.rejected, (state, action) => {
        state.updateTicketLoading = false;
        state.updateTicketError = action.payload;
        state.updateTicketData = [];
      })

      // answer ticket
      .addCase(AnswerTicketAction.pending, (state) => {
        state.answerTicketLoading = true;
        state.answerTicketData = [];
        state.answerTicketError = null;
      })
      .addCase(AnswerTicketAction.fulfilled, (state, action) => {
        state.answerTicketLoading = false;
        state.answerTicketData = action.payload;
        state.answerTicketError = null;
      })
      .addCase(AnswerTicketAction.rejected, (state, action) => {
        state.answerTicketLoading = false;
        state.answerTicketError = action.payload;
        state.answerTicketData = [];
      })

      // close ticket
      .addCase(CloseTicketAction.pending, (state) => {
        state.closeTicketLoading = true;
        state.closeTicketData = [];
        state.closeTicketError = null;
      })
      .addCase(CloseTicketAction.fulfilled, (state, action) => {
        state.closeTicketLoading = false;
        state.closeTicketData = action.payload;
        state.closeTicketError = null;
      })
      .addCase(CloseTicketAction.rejected, (state, action) => {
        state.closeTicketLoading = false;
        state.closeTicketError = action.payload;
        state.closeTicketData = [];
      });
  },
});

export const selectGetTicketError = (state: any) => state.ticket.getTicketError;
export const selectGetTicketLoading = (state: any) =>
  state.ticket.getTicketLoading;
export const selectGetTicketData = (state: any) => state.ticket.getTicketData;

export const selectGetTicketByIdError = (state: any) =>
  state.ticket.getTicketByIdError;
export const selectGetTicketByIdLoading = (state: any) =>
  state.ticket.getTicketByIdLoading;
export const selectGetTicketByIdData = (state: any) =>
  state.ticket.getTicketByIdData;

export const selectCreateTicketError = (state: any) =>
  state.ticket.createTicketError;
export const selectCreateTicketLoading = (state: any) =>
  state.ticket.createTicketLoading;
export const selectCreateTicketData = (state: any) =>
  state.ticket.createTicketData;

export const selectUpdateTicketError = (state: any) =>
  state.ticket.updateTicketError;
export const selectUpdateTicketLoading = (state: any) =>
  state.ticket.updateTicketLoading;
export const selectUpdateTicketData = (state: any) =>
  state.ticket.updateTicketData;

export const selectAnswerTicketError = (state: any) =>
  state.ticket.answerTicketError;
export const selectAnswerTicketLoading = (state: any) =>
  state.ticket.answerTicketLoading;
export const selectAnswerTicketData = (state: any) =>
  state.ticket.answerTicketData;

export const selectCloseTicketError = (state: any) =>
  state.ticket.closeTicketError;
export const selectCloseTicketLoading = (state: any) =>
  state.ticket.closeTicketLoading;
export const selectCloseTicketData = (state: any) =>
  state.ticket.closeTicketData;

export default ticketSlice.reducer;
