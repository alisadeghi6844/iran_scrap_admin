import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ROLE_MANAGEMENT } from "../../types/roleManagement/RoleManagementTypes";
import {
  CreateRoleManagementAction,
  DeleteRoleManagementAction,
  GetRoleManagementAction,
  GetRoleManagementByIdAction,
  UpdateRoleManagementAction,
  AssignRoleManagementAction,
  RevokeRoleManagementAction,
  GetPermissionsAction,
} from "../../actions/roleManagement/RoleManagementActions";

interface roleManagementState {
  getRoleManagementError: string | null;
  getRoleManagementLoading: boolean;
  getRoleManagementData: any;

  getRoleManagementByIdError: string | null;
  getRoleManagementByIdLoading: boolean;
  getRoleManagementByIdData: any;

  createRoleManagementError: any;
  createRoleManagementLoading: any;
  createRoleManagementData: any;

  updateRoleManagementError: string | null;
  updateRoleManagementLoading: boolean;
  updateRoleManagementData: any;

  deleteRoleManagementError: string | null;
  deleteRoleManagementLoading: boolean;
  deleteRoleManagementData: any;

  assignRoleManagementError: string | null;
  assignRoleManagementLoading: boolean;
  assignRoleManagementData: any;

  revokeRoleManagementError: string | null;
  revokeRoleManagementLoading: boolean;
  revokeRoleManagementData: any;

  getPermissionsError: string | null;
  getPermissionsLoading: boolean;
  getPermissionsData: any;
}

const initialState: roleManagementState = {
  getRoleManagementError: null,
  getRoleManagementLoading: false,
  getRoleManagementData: [],

  getRoleManagementByIdError: null,
  getRoleManagementByIdLoading: false,
  getRoleManagementByIdData: [],

  createRoleManagementError: null,
  createRoleManagementLoading: false,
  createRoleManagementData: [],

  updateRoleManagementError: null,
  updateRoleManagementLoading: false,
  updateRoleManagementData: [],

  deleteRoleManagementError: null,
  deleteRoleManagementLoading: false,
  deleteRoleManagementData: [],

  assignRoleManagementError: null,
  assignRoleManagementLoading: false,
  assignRoleManagementData: [],

  revokeRoleManagementError: null,
  revokeRoleManagementLoading: false,
  revokeRoleManagementData: [],

  getPermissionsError: null,
  getPermissionsLoading: false,
  getPermissionsData: [],
};

const roleManagementSlice = createSlice({
  name: ROLE_MANAGEMENT,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get roleManagement
      .addCase(GetRoleManagementAction.pending, (state) => {
        state.getRoleManagementLoading = true;
        state.getRoleManagementData = [];
        state.getRoleManagementError = null;
      })
      .addCase(GetRoleManagementAction.fulfilled, (state, action: PayloadAction<any>) => {
        state.getRoleManagementLoading = false;
        state.getRoleManagementData = action.payload;
        state.getRoleManagementError = null;
      })
      .addCase(
        GetRoleManagementAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getRoleManagementLoading = false;
          state.getRoleManagementError = action.payload;
          state.getRoleManagementData = [];
        }
      )
      // Get roleManagement
      .addCase(GetRoleManagementByIdAction.pending, (state) => {
        state.getRoleManagementByIdLoading = true;
        state.getRoleManagementByIdData = [];
        state.getRoleManagementByIdError = null;
      })
      .addCase(
        GetRoleManagementByIdAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getRoleManagementByIdLoading = false;
          state.getRoleManagementByIdData = action.payload;
          state.getRoleManagementByIdError = null;
        }
      )
      .addCase(
        GetRoleManagementByIdAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getRoleManagementByIdLoading = false;
          state.getRoleManagementByIdError = action.payload;
          state.getRoleManagementByIdData = [];
        }
      )
      // create roleManagement
      .addCase(CreateRoleManagementAction.pending, (state) => {
        state.createRoleManagementLoading = true;
        state.createRoleManagementData = [];
        state.createRoleManagementError = null;
      })
      .addCase(CreateRoleManagementAction.fulfilled, (state, action) => {
        state.createRoleManagementLoading = false;
        state.createRoleManagementData = action.payload;
        state.createRoleManagementError = null;
      })
      .addCase(CreateRoleManagementAction.rejected, (state, action) => {
        state.createRoleManagementLoading = false;
        state.createRoleManagementError = action.payload;
        state.createRoleManagementData = [];
      })

      // update roleManagement
      .addCase(UpdateRoleManagementAction.pending, (state) => {
        state.updateRoleManagementLoading = true;
        state.updateRoleManagementData = [];
        state.updateRoleManagementError = null;
      })
      .addCase(UpdateRoleManagementAction.fulfilled, (state, action) => {
        state.updateRoleManagementLoading = false;
        state.updateRoleManagementData = action.payload;
        state.updateRoleManagementError = null;
      })
      .addCase(UpdateRoleManagementAction.rejected, (state, action) => {
        state.updateRoleManagementLoading = false;
        state.updateRoleManagementError = action.payload;
        state.updateRoleManagementData = [];
      })

      // delete roleManagement
      .addCase(DeleteRoleManagementAction.pending, (state) => {
        state.deleteRoleManagementLoading = true;
        state.deleteRoleManagementData = [];
        state.deleteRoleManagementError = null;
      })
      .addCase(DeleteRoleManagementAction.fulfilled, (state, action) => {
        state.deleteRoleManagementLoading = false;
        state.deleteRoleManagementData = action.payload;
        state.deleteRoleManagementError = null;
      })
      .addCase(DeleteRoleManagementAction.rejected, (state, action) => {
        state.deleteRoleManagementLoading = false;
        state.deleteRoleManagementError = action.payload;
        state.deleteRoleManagementData = [];
      })
       
      // assign roleManagement
      .addCase(AssignRoleManagementAction.pending, (state) => {
        state.assignRoleManagementLoading = true;
        state.assignRoleManagementData = [];
        state.assignRoleManagementError = null;
      })
      .addCase(AssignRoleManagementAction.fulfilled, (state, action) => {
        state.assignRoleManagementLoading = false;
        state.assignRoleManagementData = action.payload;
        state.assignRoleManagementError = null;
      })
      .addCase(AssignRoleManagementAction.rejected, (state, action) => {
        state.assignRoleManagementLoading = false;
        state.assignRoleManagementError = action.payload;
        state.assignRoleManagementData = [];
      })

      // revoke roleManagement
      .addCase(RevokeRoleManagementAction.pending, (state) => {
        state.revokeRoleManagementLoading = true;
        state.revokeRoleManagementData = [];
        state.revokeRoleManagementError = null;
      })
      
      .addCase(RevokeRoleManagementAction.fulfilled, (state, action) => {
        state.revokeRoleManagementLoading = false;
        state.revokeRoleManagementData = action.payload;
        state.revokeRoleManagementError = null;
      })
      
      .addCase(RevokeRoleManagementAction.rejected, (state, action) => {
        state.revokeRoleManagementLoading = false;
        state.revokeRoleManagementError = action.payload;
        state.revokeRoleManagementData = [];
      })

      // get permissions
      .addCase(GetPermissionsAction.pending, (state) => {
        state.getPermissionsLoading = true;
        state.getPermissionsData = [];
        state.getPermissionsError = null;
      })
      .addCase(GetPermissionsAction.fulfilled, (state, action) => {
        state.getPermissionsLoading = false;
        state.getPermissionsData = action.payload;
        state.getPermissionsError = null;
      })
      .addCase(GetPermissionsAction.rejected, (state, action) => {
        state.getPermissionsLoading = false;
        state.getPermissionsError = action.payload;
        state.getPermissionsData = [];
      })      
    },
});

export const selectGetRoleManagementError = (state: any) => state.roleManagement.getRoleManagementError;
export const selectGetRoleManagementLoading = (state: any) => state.roleManagement.getRoleManagementLoading;
export const selectGetRoleManagementData = (state: any) => state.roleManagement.getRoleManagementData;

export const selectGetRoleManagementByIdError = (state: any) =>
  state.roleManagement.getRoleManagementByIdError;
export const selectGetRoleManagementByIdLoading = (state: any) =>
  state.roleManagement.getRoleManagementByIdLoading;
export const selectGetRoleManagementByIdData = (state: any) => state.roleManagement.getRoleManagementByIdData;

export const selectCreateRoleManagementError = (state: any) => state.roleManagement.createRoleManagementError;
export const selectCreateRoleManagementLoading = (state: any) =>
  state.roleManagement.createRoleManagementLoading;
export const selectCreateRoleManagementData = (state: any) => state.roleManagement.createRoleManagementData;

export const selectUpdateRoleManagementError = (state: any) => state.roleManagement.updateRoleManagementError;
export const selectUpdateRoleManagementLoading = (state: any) =>
  state.roleManagement.updateRoleManagementLoading;
export const selectUpdateRoleManagementData = (state: any) => state.roleManagement.updateRoleManagementData;

export const selectDeleteRoleManagementError = (state: any) => state.roleManagement.deleteRoleManagementError;
export const selectDeleteRoleManagementLoading = (state: any) =>
  state.roleManagement.deleteRoleManagementLoading;
export const selectDeleteRoleManagementData = (state: any) => state.roleManagement.deleteRoleManagementData;

export const selectAssignRoleManagementError = (state: any) => state.roleManagement.assignRoleManagementError;
export const selectAssignRoleManagementLoading = (state: any) =>
  state.roleManagement.assignRoleManagementLoading;
export const selectAssignRoleManagementData = (state: any) => state.roleManagement.assignRoleManagementData;

export const selectRevokeRoleManagementError = (state: any) => state.roleManagement.revokeRoleManagementError;  
export const selectRevokeRoleManagementLoading = (state: any) =>
  state.roleManagement.revokeRoleManagementLoading;
export const selectRevokeRoleManagementData = (state: any) => state.roleManagement.revokeRoleManagementData;

export const selectGetPermissionsError = (state: any) => state.roleManagement.getPermissionsError;
export const selectGetPermissionsLoading = (state: any) => state.roleManagement.getPermissionsLoading;
export const selectGetPermissionsData = (state: any) => state.roleManagement.getPermissionsData;    

export default roleManagementSlice.reducer;
