import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PB_PRODUCT_ADMIN } from "../../types/pbProductAdmin/PbProductAdminTypes";
import {
  CreatePbProductAdminAction,
  DeletePbProductAdminAction,
  GetPbProductAdminAction,
  GetPbProductAdminByIdAction,
  UpdatePbProductAdminAction,
} from "../../actions/pbProductAdmin/PbProductAdminActions";

interface pbProductAdminState {
  getPbProductAdminError: string | null;
  getPbProductAdminLoading: boolean;
  getPbProductAdminData: any;

  getPbProductAdminByIdError: string | null;
  getPbProductAdminByIdLoading: boolean;
  getPbProductAdminByIdData: any;

  createPbProductAdminError: any;
  createPbProductAdminLoading: any;
  createPbProductAdminData: any;

  updatePbProductAdminError: string | null;
  updatePbProductAdminLoading: boolean;
  updatePbProductAdminData: any;

  deletePbProductAdminError: string | null;
  deletePbProductAdminLoading: boolean;
  deletePbProductAdminData: any;
}

const initialState: pbProductAdminState = {
  getPbProductAdminError: null,
  getPbProductAdminLoading: false,
  getPbProductAdminData: [],

  getPbProductAdminByIdError: null,
  getPbProductAdminByIdLoading: false,
  getPbProductAdminByIdData: [],

  createPbProductAdminError: null,
  createPbProductAdminLoading: false,
  createPbProductAdminData: [],

  updatePbProductAdminError: null,
  updatePbProductAdminLoading: false,
  updatePbProductAdminData: [],

  deletePbProductAdminError: null,
  deletePbProductAdminLoading: false,
  deletePbProductAdminData: [],
};

const pbProductAdminSlice = createSlice({
  name: PB_PRODUCT_ADMIN,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get pb product admin
      .addCase(GetPbProductAdminAction.pending, (state) => {
        state.getPbProductAdminLoading = true;
        state.getPbProductAdminData = [];
        state.getPbProductAdminError = null;
      })
      .addCase(
        GetPbProductAdminAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getPbProductAdminLoading = false;
          state.getPbProductAdminData = action.payload;
          state.getPbProductAdminError = null;
        }
      )
      .addCase(
        GetPbProductAdminAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getPbProductAdminLoading = false;
          state.getPbProductAdminError = action.payload;
          state.getPbProductAdminData = [];
        }
      )
      // Get pb product admin by id
      .addCase(GetPbProductAdminByIdAction.pending, (state) => {
        state.getPbProductAdminByIdLoading = true;
        state.getPbProductAdminByIdData = [];
        state.getPbProductAdminByIdError = null;
      })
      .addCase(
        GetPbProductAdminByIdAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getPbProductAdminByIdLoading = false;
          state.getPbProductAdminByIdData = action.payload;
          state.getPbProductAdminByIdError = null;
        }
      )
      .addCase(
        GetPbProductAdminByIdAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getPbProductAdminByIdLoading = false;
          state.getPbProductAdminByIdError = action.payload;
          state.getPbProductAdminByIdData = [];
        }
      )
      // create pb product admin
      .addCase(CreatePbProductAdminAction.pending, (state) => {
        state.createPbProductAdminLoading = true;
        state.createPbProductAdminData = [];
        state.createPbProductAdminError = null;
      })
      .addCase(CreatePbProductAdminAction.fulfilled, (state, action) => {
        state.createPbProductAdminLoading = false;
        state.createPbProductAdminData = action.payload;
        state.createPbProductAdminError = null;
      })
      .addCase(CreatePbProductAdminAction.rejected, (state, action) => {
        state.createPbProductAdminLoading = false;
        state.createPbProductAdminError = action.payload;
        state.createPbProductAdminData = [];
      })
      // update pb product admin
      .addCase(UpdatePbProductAdminAction.pending, (state) => {
        state.updatePbProductAdminLoading = true;
        state.updatePbProductAdminData = [];
        state.updatePbProductAdminError = null;
      })
      .addCase(UpdatePbProductAdminAction.fulfilled, (state, action) => {
        state.updatePbProductAdminLoading = false;
        state.updatePbProductAdminData = action.payload;
        state.updatePbProductAdminError = null;
      })
      .addCase(UpdatePbProductAdminAction.rejected, (state, action) => {
        state.updatePbProductAdminLoading = false;
        state.updatePbProductAdminError = action.payload;
        state.updatePbProductAdminData = [];
      })
      // delete pb product admin
      .addCase(DeletePbProductAdminAction.pending, (state) => {
        state.deletePbProductAdminLoading = true;
        state.deletePbProductAdminData = [];
        state.deletePbProductAdminError = null;
      })
      .addCase(DeletePbProductAdminAction.fulfilled, (state, action) => {
        state.deletePbProductAdminLoading = false;
        state.deletePbProductAdminData = action.payload;
        state.deletePbProductAdminError = null;
      })
      .addCase(DeletePbProductAdminAction.rejected, (state, action) => {
        state.deletePbProductAdminLoading = false;
        state.deletePbProductAdminError = action.payload;
        state.deletePbProductAdminData = [];
      });
  },
});

export const selectGetPbProductAdminError = (state: any) =>
  state.pbProductAdmin.getPbProductAdminError;
export const selectGetPbProductAdminLoading = (state: any) =>
  state.pbProductAdmin.getPbProductAdminLoading;
export const selectGetPbProductAdminData = (state: any) => state.pbProductAdmin.getPbProductAdminData;

export const selectGetPbProductAdminByIdError = (state: any) =>
  state.pbProductAdmin.getPbProductAdminByIdError;
export const selectGetPbProductAdminByIdLoading = (state: any) =>
  state.pbProductAdmin.getPbProductAdminByIdLoading;
export const selectGetPbProductAdminByIdData = (state: any) =>
  state.pbProductAdmin.getPbProductAdminByIdData;

export const selectCreatePbProductAdminError = (state: any) =>
  state.pbProductAdmin.createPbProductAdminError;
export const selectCreatePbProductAdminLoading = (state: any) =>
  state.pbProductAdmin.createPbProductAdminLoading;
export const selectCreatePbProductAdminData = (state: any) =>
  state.pbProductAdmin.createPbProductAdminData;

export const selectUpdatePbProductAdminError = (state: any) =>
  state.pbProductAdmin.updatePbProductAdminError;
export const selectUpdatePbProductAdminLoading = (state: any) =>
  state.pbProductAdmin.updatePbProductAdminLoading;
export const selectUpdatePbProductAdminData = (state: any) =>
  state.pbProductAdmin.updatePbProductAdminData;

export const selectDeletePbProductAdminError = (state: any) =>
  state.pbProductAdmin.deletePbProductAdminError;
export const selectDeletePbProductAdminLoading = (state: any) =>
  state.pbProductAdmin.deletePbProductAdminLoading;
export const selectDeletePbProductAdminData = (state: any) =>
  state.pbProductAdmin.deletePbProductAdminData;

export default pbProductAdminSlice.reducer;