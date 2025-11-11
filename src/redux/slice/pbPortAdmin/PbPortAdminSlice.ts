import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PB_PORT_ADMIN } from "../../types/pbPortAdmin/PbPortAdminTypes";
import {
  CreatePbPortAdminAction,
  DeletePbPortAdminAction,
  GetPbPortAdminAction,
  GetPbPortAdminByIdAction,
  UpdatePbPortAdminAction,
} from "../../actions/pbPortAdmin/PbPortAdminActions";

interface pbPortAdminState {
  getPbPortAdminError: string | null;
  getPbPortAdminLoading: boolean;
  getPbPortAdminData: any;

  getPbPortAdminByIdError: string | null;
  getPbPortAdminByIdLoading: boolean;
  getPbPortAdminByIdData: any;

  createPbPortAdminError: any;
  createPbPortAdminLoading: any;
  createPbPortAdminData: any;

  updatePbPortAdminError: string | null;
  updatePbPortAdminLoading: boolean;
  updatePbPortAdminData: any;

  deletePbPortAdminError: string | null;
  deletePbPortAdminLoading: boolean;
  deletePbPortAdminData: any;
}

const initialState: pbPortAdminState = {
  getPbPortAdminError: null,
  getPbPortAdminLoading: false,
  getPbPortAdminData: [],

  getPbPortAdminByIdError: null,
  getPbPortAdminByIdLoading: false,
  getPbPortAdminByIdData: [],

  createPbPortAdminError: null,
  createPbPortAdminLoading: false,
  createPbPortAdminData: [],

  updatePbPortAdminError: null,
  updatePbPortAdminLoading: false,
  updatePbPortAdminData: [],

  deletePbPortAdminError: null,
  deletePbPortAdminLoading: false,
  deletePbPortAdminData: [],
};

const pbPortAdminSlice = createSlice({
  name: PB_PORT_ADMIN,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get pb port admin
      .addCase(GetPbPortAdminAction.pending, (state) => {
        state.getPbPortAdminLoading = true;
        state.getPbPortAdminData = [];
        state.getPbPortAdminError = null;
      })
      .addCase(
        GetPbPortAdminAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getPbPortAdminLoading = false;
          state.getPbPortAdminData = action.payload;
          state.getPbPortAdminError = null;
        }
      )
      .addCase(
        GetPbPortAdminAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getPbPortAdminLoading = false;
          state.getPbPortAdminError = action.payload;
          state.getPbPortAdminData = [];
        }
      )
      // Get pb port admin by id
      .addCase(GetPbPortAdminByIdAction.pending, (state) => {
        state.getPbPortAdminByIdLoading = true;
        state.getPbPortAdminByIdData = [];
        state.getPbPortAdminByIdError = null;
      })
      .addCase(
        GetPbPortAdminByIdAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getPbPortAdminByIdLoading = false;
          state.getPbPortAdminByIdData = action.payload;
          state.getPbPortAdminByIdError = null;
        }
      )
      .addCase(
        GetPbPortAdminByIdAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getPbPortAdminByIdLoading = false;
          state.getPbPortAdminByIdError = action.payload;
          state.getPbPortAdminByIdData = [];
        }
      )
      // create pb port admin
      .addCase(CreatePbPortAdminAction.pending, (state) => {
        state.createPbPortAdminLoading = true;
        state.createPbPortAdminData = [];
        state.createPbPortAdminError = null;
      })
      .addCase(CreatePbPortAdminAction.fulfilled, (state, action) => {
        state.createPbPortAdminLoading = false;
        state.createPbPortAdminData = action.payload;
        state.createPbPortAdminError = null;
      })
      .addCase(CreatePbPortAdminAction.rejected, (state, action) => {
        state.createPbPortAdminLoading = false;
        state.createPbPortAdminError = action.payload;
        state.createPbPortAdminData = [];
      })
      // update pb port admin
      .addCase(UpdatePbPortAdminAction.pending, (state) => {
        state.updatePbPortAdminLoading = true;
        state.updatePbPortAdminData = [];
        state.updatePbPortAdminError = null;
      })
      .addCase(UpdatePbPortAdminAction.fulfilled, (state, action) => {
        state.updatePbPortAdminLoading = false;
        state.updatePbPortAdminData = action.payload;
        state.updatePbPortAdminError = null;
      })
      .addCase(UpdatePbPortAdminAction.rejected, (state, action) => {
        state.updatePbPortAdminLoading = false;
        state.updatePbPortAdminError = action.payload;
        state.updatePbPortAdminData = [];
      })
      // delete pb port admin
      .addCase(DeletePbPortAdminAction.pending, (state) => {
        state.deletePbPortAdminLoading = true;
        state.deletePbPortAdminData = [];
        state.deletePbPortAdminError = null;
      })
      .addCase(DeletePbPortAdminAction.fulfilled, (state, action) => {
        state.deletePbPortAdminLoading = false;
        state.deletePbPortAdminData = action.payload;
        state.deletePbPortAdminError = null;
      })
      .addCase(DeletePbPortAdminAction.rejected, (state, action) => {
        state.deletePbPortAdminLoading = false;
        state.deletePbPortAdminError = action.payload;
        state.deletePbPortAdminData = [];
      });
  },
});

export const selectGetPbPortAdminError = (state: any) =>
  state.pbPortAdmin.getPbPortAdminError;
export const selectGetPbPortAdminLoading = (state: any) =>
  state.pbPortAdmin.getPbPortAdminLoading;
export const selectGetPbPortAdminData = (state: any) => state.pbPortAdmin.getPbPortAdminData;

export const selectGetPbPortAdminByIdError = (state: any) =>
  state.pbPortAdmin.getPbPortAdminByIdError;
export const selectGetPbPortAdminByIdLoading = (state: any) =>
  state.pbPortAdmin.getPbPortAdminByIdLoading;
export const selectGetPbPortAdminByIdData = (state: any) =>
  state.pbPortAdmin.getPbPortAdminByIdData;

export const selectCreatePbPortAdminError = (state: any) =>
  state.pbPortAdmin.createPbPortAdminError;
export const selectCreatePbPortAdminLoading = (state: any) =>
  state.pbPortAdmin.createPbPortAdminLoading;
export const selectCreatePbPortAdminData = (state: any) =>
  state.pbPortAdmin.createPbPortAdminData;

export const selectUpdatePbPortAdminError = (state: any) =>
  state.pbPortAdmin.updatePbPortAdminError;
export const selectUpdatePbPortAdminLoading = (state: any) =>
  state.pbPortAdmin.updatePbPortAdminLoading;
export const selectUpdatePbPortAdminData = (state: any) =>
  state.pbPortAdmin.updatePbPortAdminData;

export const selectDeletePbPortAdminError = (state: any) =>
  state.pbPortAdmin.deletePbPortAdminError;
export const selectDeletePbPortAdminLoading = (state: any) =>
  state.pbPortAdmin.deletePbPortAdminLoading;
export const selectDeletePbPortAdminData = (state: any) =>
  state.pbPortAdmin.deletePbPortAdminData;

export default pbPortAdminSlice.reducer;