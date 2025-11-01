import { createSlice } from "@reduxjs/toolkit";
import { USERS } from "../../types/users/UsersTypes";
import {
  GetUsersAction,
  GetUsersProvidersAction,
  GetUserByIdAction,
  UpdateUserProfileAction,
} from "../../actions/users/UsersActions";

const initialState = {
  getUsersError: null,
  getUsersLoading: false,
  getUsersData: [],

  getUsersProvidersError: null,
  getUsersProvidersLoading: false,
  getUsersProvidersData: [],

  getUserByIdError: null,
  getUserByIdLoading: false,
  getUserByIdData: null,

  updateUserProfileError: null,
  updateUserProfileLoading: false,
  updateUserProfileData: null,
};

const usersSlice = createSlice({
  name: USERS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Users
      .addCase(GetUsersAction.pending, (state) => {
        state.getUsersLoading = true;
        state.getUsersData = [];
        state.getUsersError = null;
      })
      .addCase(GetUsersAction.fulfilled, (state, action) => {
        state.getUsersLoading = false;
        state.getUsersData = action.payload;
        state.getUsersError = null;
      })
      .addCase(GetUsersAction.rejected, (state, action) => {
        state.getUsersLoading = false;
        state.getUsersError = action.payload;
        state.getUsersData = [];
      })

      // Get Users Providers
      .addCase(GetUsersProvidersAction.pending, (state) => {
        state.getUsersProvidersLoading = true;
        state.getUsersProvidersData = [];
        state.getUsersProvidersError = null;
      })
      .addCase(GetUsersProvidersAction.fulfilled, (state, action) => {
        state.getUsersProvidersLoading = false;
        state.getUsersProvidersData = action.payload;
        state.getUsersProvidersError = null;
      })
      .addCase(GetUsersProvidersAction.rejected, (state, action) => {
        state.getUsersProvidersLoading = false;
        state.getUsersProvidersError = action.payload;
        state.getUsersProvidersData = [];
      })

      // Get User By ID
      .addCase(GetUserByIdAction.pending, (state) => {
        state.getUserByIdLoading = true;
        state.getUserByIdData = null;
        state.getUserByIdError = null;
      })
      .addCase(GetUserByIdAction.fulfilled, (state, action) => {
        state.getUserByIdLoading = false;
        state.getUserByIdData = action.payload;
        state.getUserByIdError = null;
      })
      .addCase(GetUserByIdAction.rejected, (state, action) => {
        state.getUserByIdLoading = false;
        state.getUserByIdError = action.payload;
        state.getUserByIdData = null;
      })

      // Update User Profile
      .addCase(UpdateUserProfileAction.pending, (state) => {
        state.updateUserProfileLoading = true;
        state.updateUserProfileData = null;
        state.updateUserProfileError = null;
      })
      .addCase(UpdateUserProfileAction.fulfilled, (state, action) => {
        state.updateUserProfileLoading = false;
        state.updateUserProfileData = action.payload;
        state.updateUserProfileError = null;
      })
      .addCase(UpdateUserProfileAction.rejected, (state, action) => {
        state.updateUserProfileLoading = false;
        state.updateUserProfileError = action.payload;
        state.updateUserProfileData = null;
      });
  },
});

export const selectGetUsersError = (state: any) => state.users.getUsersError;
export const selectGetUsersLoading = (state: any) =>
  state.users.getUsersLoading;
export const selectGetUsersData = (state: any) => state.users.getUsersData;

export const selectGetUsersProvidersError = (state: any) =>
  state.users.getUsersProvidersError;
export const selectGetUsersProvidersLoading = (state: any) =>
  state.users.getUsersProvidersLoading;
export const selectGetUsersProvidersData = (state: any) =>
  state.users.getUsersProvidersData;

export const selectGetUserByIdError = (state: any) =>
  state.users.getUserByIdError;
export const selectGetUserByIdLoading = (state: any) =>
  state.users.getUserByIdLoading;
export const selectGetUserByIdData = (state: any) =>
  state.users.getUserByIdData;

export const selectUpdateUserProfileError = (state: any) =>
  state.users.updateUserProfileError;
export const selectUpdateUserProfileLoading = (state: any) =>
  state.users.updateUserProfileLoading;
export const selectUpdateUserProfileData = (state: any) =>
  state.users.updateUserProfileData;

export default usersSlice.reducer;
