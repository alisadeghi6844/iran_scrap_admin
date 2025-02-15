import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CREATE_USER_ORIGINAL } from "../../types/account/createUser";
import {
  createCreateUserAction,
  deleteCreateUserAction,
  getAllCreateUserAction,
  getByIdCreateUserAction,
  updateCreateUserAction,
  updateUserPasswordAction,
} from "../../actions/account/CreateUser";

interface CreateUserState {
  getAllCreateUserError: string | null;
  getAllCreateUserLoading: boolean;
  getAllCreateUserData: any;

  getByIdCreateUserError: string | null;
  getByIdCreateUserLoading: boolean;
  getByIdCreateUserData: any;

  createCreateUserError: string | null;
  createCreateUserLoading: boolean;

  updateCreateUserError: string | null;
  updateCreateUserLoading: boolean;

  deleteCreateUserError: string | null;
  deleteCreateUserLoading: boolean;

  updateUserPasswordError: string | null;
  updateUserPasswordLoading: boolean;
}

const initialState: CreateUserState = {
  getAllCreateUserError: null,
  getAllCreateUserLoading: false,
  getAllCreateUserData: [],

  getByIdCreateUserError: null,
  getByIdCreateUserLoading: false,
  getByIdCreateUserData: {},

  createCreateUserError: null,
  createCreateUserLoading: false,

  updateCreateUserError: null,
  updateCreateUserLoading: false,

  deleteCreateUserError: null,
  deleteCreateUserLoading: false,

  updateUserPasswordError: null,
  updateUserPasswordLoading: false,
};

const createUserSlice = createSlice({
  name: CREATE_USER_ORIGINAL,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all
      .addCase(getAllCreateUserAction.pending, (state) => {
        state.getAllCreateUserLoading = true;
        state.getAllCreateUserData = [];
        state.getAllCreateUserError = null;
      })
      .addCase(
        getAllCreateUserAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getAllCreateUserLoading = false;
          state.getAllCreateUserData = action.payload;
          state.getAllCreateUserError = null;
        }
      )
      .addCase(
        getAllCreateUserAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getAllCreateUserLoading = false;
          state.getAllCreateUserError = action.payload;
          state.getAllCreateUserData = [];
        }
      )

      // Get by id
      .addCase(getByIdCreateUserAction.pending, (state) => {
        state.getByIdCreateUserLoading = true;
        state.getByIdCreateUserData = [];
        state.getByIdCreateUserError = null;
      })
      .addCase(
        getByIdCreateUserAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getByIdCreateUserLoading = false;
          state.getByIdCreateUserData = action.payload;
          state.getByIdCreateUserError = null;
        }
      )
      .addCase(
        getByIdCreateUserAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getByIdCreateUserLoading = false;
          state.getByIdCreateUserError = action.payload;
          state.getByIdCreateUserData = [];
        }
      )

      // Create
      .addCase(createCreateUserAction.pending, (state) => {
        state.createCreateUserLoading = true;
        state.createCreateUserError = null;
      })
      .addCase(createCreateUserAction.fulfilled, (state) => {
        state.createCreateUserLoading = false;
        state.createCreateUserError = null;
      })
      .addCase(
        createCreateUserAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.createCreateUserLoading = false;
          state.createCreateUserError = action.payload;
        }
      )

      // update
      .addCase(updateCreateUserAction.pending, (state) => {
        state.updateCreateUserLoading = true;
        state.updateCreateUserError = null;
      })
      .addCase(updateCreateUserAction.fulfilled, (state) => {
        state.updateCreateUserLoading = false;
        state.updateCreateUserError = null;
      })
      .addCase(
        updateCreateUserAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.updateCreateUserLoading = false;
          state.updateCreateUserError = action.payload;
        }
      )

      // Delete
      .addCase(deleteCreateUserAction.pending, (state) => {
        state.deleteCreateUserLoading = true;
        state.deleteCreateUserError = null;
      })
      .addCase(deleteCreateUserAction.fulfilled, (state) => {
        state.deleteCreateUserLoading = false;
        state.deleteCreateUserError = null;
      })
      .addCase(
        deleteCreateUserAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.deleteCreateUserLoading = false;
          state.deleteCreateUserError = action.payload;
        }
      )

      // update user password
      .addCase(updateUserPasswordAction.pending, (state) => {
        state.updateUserPasswordLoading = true;
        state.updateUserPasswordError = null;
      })
      .addCase(updateUserPasswordAction.fulfilled, (state) => {
        state.updateUserPasswordLoading = false;
        state.updateUserPasswordError = null;
      })
      .addCase(
        updateUserPasswordAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.updateUserPasswordLoading = false;
          state.updateUserPasswordError = action.payload;
        }
      );
  },
});

// Selectors
export const selectGetAllCreateUserError = (state: any) =>
  state.createUser.getAllCreateUserError;
export const selectGetAllCreateUserLoading = (state: any) =>
  state.createUser.getAllCreateUserLoading;
export const selectGetAllCreateUserData = (state: any) =>
  state.createUser.getAllCreateUserData;

export const selectGetByIdCreateUserError = (state: any) =>
  state.createUser.getByIdCreateUserError;
export const selectGetByIdCreateUserLoading = (state: any) =>
  state.createUser.getByIdCreateUserLoading;
export const selectGetByIdCreateUserData = (state: any) =>
  state.createUser.getByIdCreateUserData;

export const selectCreateCreateUserError = (state: any) =>
  state.createUser.createCreateUserError;
export const selectCreateCreateUserLoading = (state: any) =>
  state.createUser.createCreateUserLoading;

export const selectUpdateCreateUserError = (state: any) =>
  state.createUser.updateCreateUserError;
export const selectUpdateCreateUserLoading = (state: any) =>
  state.createUser.updateCreateUserLoading;

export const selectDeleteCreateUserError = (state: any) =>
  state.createUser.deleteCreateUserError;
export const selectDeleteCreateUserLoading = (state: any) =>
  state.createUser.deleteCreateUserLoading;

export const selectUpdateUserPasswordError = (state: any) =>
  state.createUser.updateUserPasswordError;
export const selectUpdateUserPasswordLoading = (state: any) =>
  state.createUser.updateUserPasswordLoading;

export default createUserSlice.reducer;
