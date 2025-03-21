import { createSlice } from "@reduxjs/toolkit";
import { USERS } from "../../types/users/UsersTypes";
import {
  GetUsersAction,
  GetUsersProvidersAction,
} from "../../actions/users/UsersActions";

const initialState = {
  getUsersError: null,
  getUsersLoading: false,
  getUsersData: [],

  getUsersProvidersError: null,
  getUsersProvidersLoading: false,
  getUsersProvidersData: [],
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

export default usersSlice.reducer;
