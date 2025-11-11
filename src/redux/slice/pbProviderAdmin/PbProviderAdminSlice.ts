import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PB_PROVIDER_ADMIN } from "../../types/pbProviderAdmin/PbProviderAdminTypes";
import {
  CreatePbProviderAdminAction,
  DeletePbProviderAdminAction,
  GetPbProviderAdminAction,
  GetPbProviderAdminByIdAction,
  UpdatePbProviderAdminAction,
} from "../../actions/pbProviderAdmin/PbProviderAdminActions";

interface pbProviderAdminState {
  getPbProviderAdminError: string | null;
  getPbProviderAdminLoading: boolean;
  getPbProviderAdminData: any;

  getPbProviderAdminByIdError: string | null;
  getPbProviderAdminByIdLoading: boolean;
  getPbProviderAdminByIdData: any;

  createPbProviderAdminError: any;
  createPbProviderAdminLoading: any;
  createPbProviderAdminData: any;

  updatePbProviderAdminError: string | null;
  updatePbProviderAdminLoading: boolean;
  updatePbProviderAdminData: any;

  deletePbProviderAdminError: string | null;
  deletePbProviderAdminLoading: boolean;
  deletePbProviderAdminData: any;
}

const initialState: pbProviderAdminState = {
  getPbProviderAdminError: null,
  getPbProviderAdminLoading: false,
  getPbProviderAdminData: [],

  getPbProviderAdminByIdError: null,
  getPbProviderAdminByIdLoading: false,
  getPbProviderAdminByIdData: [],

  createPbProviderAdminError: null,
  createPbProviderAdminLoading: false,
  createPbProviderAdminData: [],

  updatePbProviderAdminError: null,
  updatePbProviderAdminLoading: false,
  updatePbProviderAdminData: [],

  deletePbProviderAdminError: null,
  deletePbProviderAdminLoading: false,
  deletePbProviderAdminData: [],
};

const pbProviderAdminSlice = createSlice({
  name: PB_PROVIDER_ADMIN,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get pb provider admin
      .addCase(GetPbProviderAdminAction.pending, (state) => {
        state.getPbProviderAdminLoading = true;
        state.getPbProviderAdminData = [];
        state.getPbProviderAdminError = null;
      })
      .addCase(
        GetPbProviderAdminAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getPbProviderAdminLoading = false;
          state.getPbProviderAdminData = action.payload;
          state.getPbProviderAdminError = null;
        }
      )
      .addCase(
        GetPbProviderAdminAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getPbProviderAdminLoading = false;
          state.getPbProviderAdminError = action.payload;
          state.getPbProviderAdminData = [];
        }
      )
      // Get pb provider admin by id
      .addCase(GetPbProviderAdminByIdAction.pending, (state) => {
        state.getPbProviderAdminByIdLoading = true;
        state.getPbProviderAdminByIdData = [];
        state.getPbProviderAdminByIdError = null;
      })
      .addCase(
        GetPbProviderAdminByIdAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getPbProviderAdminByIdLoading = false;
          state.getPbProviderAdminByIdData = action.payload;
          state.getPbProviderAdminByIdError = null;
        }
      )
      .addCase(
        GetPbProviderAdminByIdAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getPbProviderAdminByIdLoading = false;
          state.getPbProviderAdminByIdError = action.payload;
          state.getPbProviderAdminByIdData = [];
        }
      )
      // create pb provider admin
      .addCase(CreatePbProviderAdminAction.pending, (state) => {
        state.createPbProviderAdminLoading = true;
        state.createPbProviderAdminData = [];
        state.createPbProviderAdminError = null;
      })
      .addCase(CreatePbProviderAdminAction.fulfilled, (state, action) => {
        state.createPbProviderAdminLoading = false;
        state.createPbProviderAdminData = action.payload;
        state.createPbProviderAdminError = null;
      })
      .addCase(CreatePbProviderAdminAction.rejected, (state, action) => {
        state.createPbProviderAdminLoading = false;
        state.createPbProviderAdminError = action.payload;
        state.createPbProviderAdminData = [];
      })
      // update pb provider admin
      .addCase(UpdatePbProviderAdminAction.pending, (state) => {
        state.updatePbProviderAdminLoading = true;
        state.updatePbProviderAdminData = [];
        state.updatePbProviderAdminError = null;
      })
      .addCase(UpdatePbProviderAdminAction.fulfilled, (state, action) => {
        state.updatePbProviderAdminLoading = false;
        state.updatePbProviderAdminData = action.payload;
        state.updatePbProviderAdminError = null;
      })
      .addCase(UpdatePbProviderAdminAction.rejected, (state, action) => {
        state.updatePbProviderAdminLoading = false;
        state.updatePbProviderAdminError = action.payload;
        state.updatePbProviderAdminData = [];
      })
      // delete pb provider admin
      .addCase(DeletePbProviderAdminAction.pending, (state) => {
        state.deletePbProviderAdminLoading = true;
        state.deletePbProviderAdminData = [];
        state.deletePbProviderAdminError = null;
      })
      .addCase(DeletePbProviderAdminAction.fulfilled, (state, action) => {
        state.deletePbProviderAdminLoading = false;
        state.deletePbProviderAdminData = action.payload;
        state.deletePbProviderAdminError = null;
      })
      .addCase(DeletePbProviderAdminAction.rejected, (state, action) => {
        state.deletePbProviderAdminLoading = false;
        state.deletePbProviderAdminError = action.payload;
        state.deletePbProviderAdminData = [];
      });
  },
});

export const selectGetPbProviderAdminError = (state: any) =>
  state.pbProviderAdmin.getPbProviderAdminError;
export const selectGetPbProviderAdminLoading = (state: any) =>
  state.pbProviderAdmin.getPbProviderAdminLoading;
export const selectGetPbProviderAdminData = (state: any) => state.pbProviderAdmin.getPbProviderAdminData;

export const selectGetPbProviderAdminByIdError = (state: any) =>
  state.pbProviderAdmin.getPbProviderAdminByIdError;
export const selectGetPbProviderAdminByIdLoading = (state: any) =>
  state.pbProviderAdmin.getPbProviderAdminByIdLoading;
export const selectGetPbProviderAdminByIdData = (state: any) =>
  state.pbProviderAdmin.getPbProviderAdminByIdData;

export const selectCreatePbProviderAdminError = (state: any) =>
  state.pbProviderAdmin.createPbProviderAdminError;
export const selectCreatePbProviderAdminLoading = (state: any) =>
  state.pbProviderAdmin.createPbProviderAdminLoading;
export const selectCreatePbProviderAdminData = (state: any) =>
  state.pbProviderAdmin.createPbProviderAdminData;

export const selectUpdatePbProviderAdminError = (state: any) =>
  state.pbProviderAdmin.updatePbProviderAdminError;
export const selectUpdatePbProviderAdminLoading = (state: any) =>
  state.pbProviderAdmin.updatePbProviderAdminLoading;
export const selectUpdatePbProviderAdminData = (state: any) =>
  state.pbProviderAdmin.updatePbProviderAdminData;

export const selectDeletePbProviderAdminError = (state: any) =>
  state.pbProviderAdmin.deletePbProviderAdminError;
export const selectDeletePbProviderAdminLoading = (state: any) =>
  state.pbProviderAdmin.deletePbProviderAdminLoading;
export const selectDeletePbProviderAdminData = (state: any) =>
  state.pbProviderAdmin.deletePbProviderAdminData;

export default pbProviderAdminSlice.reducer;