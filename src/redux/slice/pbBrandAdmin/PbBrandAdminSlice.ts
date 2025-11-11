import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PB_BRAND_ADMIN } from "../../types/pbBrandAdmin/PbBrandAdminTypes";
import {
  CreatePbBrandAdminAction,
  DeletePbBrandAdminAction,
  GetPbBrandAdminAction,
  GetPbBrandAdminByIdAction,
  UpdatePbBrandAdminAction,
} from "../../actions/pbBrandAdmin/PbBrandAdminActions";

interface pbBrandAdminState {
  getPbBrandAdminError: string | null;
  getPbBrandAdminLoading: boolean;
  getPbBrandAdminData: any;

  getPbBrandAdminByIdError: string | null;
  getPbBrandAdminByIdLoading: boolean;
  getPbBrandAdminByIdData: any;

  createPbBrandAdminError: any;
  createPbBrandAdminLoading: any;
  createPbBrandAdminData: any;

  updatePbBrandAdminError: string | null;
  updatePbBrandAdminLoading: boolean;
  updatePbBrandAdminData: any;

  deletePbBrandAdminError: string | null;
  deletePbBrandAdminLoading: boolean;
  deletePbBrandAdminData: any;
}

const initialState: pbBrandAdminState = {
  getPbBrandAdminError: null,
  getPbBrandAdminLoading: false,
  getPbBrandAdminData: [],

  getPbBrandAdminByIdError: null,
  getPbBrandAdminByIdLoading: false,
  getPbBrandAdminByIdData: [],

  createPbBrandAdminError: null,
  createPbBrandAdminLoading: false,
  createPbBrandAdminData: [],

  updatePbBrandAdminError: null,
  updatePbBrandAdminLoading: false,
  updatePbBrandAdminData: [],

  deletePbBrandAdminError: null,
  deletePbBrandAdminLoading: false,
  deletePbBrandAdminData: [],
};

const pbBrandAdminSlice = createSlice({
  name: PB_BRAND_ADMIN,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get pb brand admin
      .addCase(GetPbBrandAdminAction.pending, (state) => {
        state.getPbBrandAdminLoading = true;
        state.getPbBrandAdminData = [];
        state.getPbBrandAdminError = null;
      })
      .addCase(
        GetPbBrandAdminAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getPbBrandAdminLoading = false;
          state.getPbBrandAdminData = action.payload;
          state.getPbBrandAdminError = null;
        }
      )
      .addCase(
        GetPbBrandAdminAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getPbBrandAdminLoading = false;
          state.getPbBrandAdminError = action.payload;
          state.getPbBrandAdminData = [];
        }
      )
      // Get pb brand admin by id
      .addCase(GetPbBrandAdminByIdAction.pending, (state) => {
        state.getPbBrandAdminByIdLoading = true;
        state.getPbBrandAdminByIdData = [];
        state.getPbBrandAdminByIdError = null;
      })
      .addCase(
        GetPbBrandAdminByIdAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getPbBrandAdminByIdLoading = false;
          state.getPbBrandAdminByIdData = action.payload;
          state.getPbBrandAdminByIdError = null;
        }
      )
      .addCase(
        GetPbBrandAdminByIdAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getPbBrandAdminByIdLoading = false;
          state.getPbBrandAdminByIdError = action.payload;
          state.getPbBrandAdminByIdData = [];
        }
      )
      // create pb brand admin
      .addCase(CreatePbBrandAdminAction.pending, (state) => {
        state.createPbBrandAdminLoading = true;
        state.createPbBrandAdminData = [];
        state.createPbBrandAdminError = null;
      })
      .addCase(CreatePbBrandAdminAction.fulfilled, (state, action) => {
        state.createPbBrandAdminLoading = false;
        state.createPbBrandAdminData = action.payload;
        state.createPbBrandAdminError = null;
      })
      .addCase(CreatePbBrandAdminAction.rejected, (state, action) => {
        state.createPbBrandAdminLoading = false;
        state.createPbBrandAdminError = action.payload;
        state.createPbBrandAdminData = [];
      })
      // update pb brand admin
      .addCase(UpdatePbBrandAdminAction.pending, (state) => {
        state.updatePbBrandAdminLoading = true;
        state.updatePbBrandAdminData = [];
        state.updatePbBrandAdminError = null;
      })
      .addCase(UpdatePbBrandAdminAction.fulfilled, (state, action) => {
        state.updatePbBrandAdminLoading = false;
        state.updatePbBrandAdminData = action.payload;
        state.updatePbBrandAdminError = null;
      })
      .addCase(UpdatePbBrandAdminAction.rejected, (state, action) => {
        state.updatePbBrandAdminLoading = false;
        state.updatePbBrandAdminError = action.payload;
        state.updatePbBrandAdminData = [];
      })
      // delete pb brand admin
      .addCase(DeletePbBrandAdminAction.pending, (state) => {
        state.deletePbBrandAdminLoading = true;
        state.deletePbBrandAdminData = [];
        state.deletePbBrandAdminError = null;
      })
      .addCase(DeletePbBrandAdminAction.fulfilled, (state, action) => {
        state.deletePbBrandAdminLoading = false;
        state.deletePbBrandAdminData = action.payload;
        state.deletePbBrandAdminError = null;
      })
      .addCase(DeletePbBrandAdminAction.rejected, (state, action) => {
        state.deletePbBrandAdminLoading = false;
        state.deletePbBrandAdminError = action.payload;
        state.deletePbBrandAdminData = [];
      });
  },
});

export const selectGetPbBrandAdminError = (state: any) =>
  state.pbBrandAdmin.getPbBrandAdminError;
export const selectGetPbBrandAdminLoading = (state: any) =>
  state.pbBrandAdmin.getPbBrandAdminLoading;
export const selectGetPbBrandAdminData = (state: any) => state.pbBrandAdmin.getPbBrandAdminData;

export const selectGetPbBrandAdminByIdError = (state: any) =>
  state.pbBrandAdmin.getPbBrandAdminByIdError;
export const selectGetPbBrandAdminByIdLoading = (state: any) =>
  state.pbBrandAdmin.getPbBrandAdminByIdLoading;
export const selectGetPbBrandAdminByIdData = (state: any) =>
  state.pbBrandAdmin.getPbBrandAdminByIdData;

export const selectCreatePbBrandAdminError = (state: any) =>
  state.pbBrandAdmin.createPbBrandAdminError;
export const selectCreatePbBrandAdminLoading = (state: any) =>
  state.pbBrandAdmin.createPbBrandAdminLoading;
export const selectCreatePbBrandAdminData = (state: any) =>
  state.pbBrandAdmin.createPbBrandAdminData;

export const selectUpdatePbBrandAdminError = (state: any) =>
  state.pbBrandAdmin.updatePbBrandAdminError;
export const selectUpdatePbBrandAdminLoading = (state: any) =>
  state.pbBrandAdmin.updatePbBrandAdminLoading;
export const selectUpdatePbBrandAdminData = (state: any) =>
  state.pbBrandAdmin.updatePbBrandAdminData;

export const selectDeletePbBrandAdminError = (state: any) =>
  state.pbBrandAdmin.deletePbBrandAdminError;
export const selectDeletePbBrandAdminLoading = (state: any) =>
  state.pbBrandAdmin.deletePbBrandAdminLoading;
export const selectDeletePbBrandAdminData = (state: any) =>
  state.pbBrandAdmin.deletePbBrandAdminData;

export default pbBrandAdminSlice.reducer;