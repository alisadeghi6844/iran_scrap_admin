import { createSlice } from "@reduxjs/toolkit";
import { USERS } from "../../types/users/UsersTypes";
import {
  GetUserProfileAction,
  GetUsersAction,
} from "../../actions/users/UsersActions";

const initialState = {
  getUsersError: null,
  getUsersLoading: false,
  getUsersData: [],

  getUserProfileError: null,
  getUserProfileLoading: false,
  getUserProfileData: [],
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
      }) // Get User Profile
      .addCase(GetUserProfileAction.pending, (state) => {
        state.getUserProfileLoading = true;
        state.getUserProfileData = [];
        state.getUserProfileError = null;
      })
      .addCase(GetUserProfileAction.fulfilled, (state, action) => {
        state.getUserProfileLoading = false;
        state.getUserProfileData = action.payload;
        state.getUserProfileError = null;
      })
      .addCase(GetUserProfileAction.rejected, (state, action) => {
        state.getUserProfileLoading = false;
        state.getUserProfileError = action.payload;
        state.getUserProfileData = [];
      });
  },
});

export const selectGetUsersError = (state: any) => state.users.getUsersError;
export const selectGetUsersLoading = (state: any) =>
  state.users.getUsersLoading;
export const selectGetUsersData = (state: any) => state.users.getUsersData;

export const selectGetUserProfileError = (state: any) => state.users.getUserProfileError;
export const selectGetUserProfileLoading = (state: any) =>
  state.users.getUserProfileLoading;
export const selectGetUserProfileData = (state: any) => state.users.getUserProfileData;

export default usersSlice.reducer;
