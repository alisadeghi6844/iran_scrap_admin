import { createSlice } from "@reduxjs/toolkit";
import { USERS } from "../../types/users/UsersTypes";
import {
  GetAuthHistoryAction,
  GetUsersAction,
  GetUsersProvidersAction,
  GetUsersStatisticAction,
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

  getAuthHistoryError: null,
  getAuthHistoryLoading: false,
  getAuthHistoryData: [],

  getUsersStatisticError: null,
  getUsersStatisticLoading: false,
  getUsersStatisticData: { userStats: { dailyGrowth: [], userTypeCategorization: [], userStatusCategorization: [], nationalCardCategorization: [], recognizanceCategorization: [], profileCompletion: [] }, totalUsers: 0, totalProducts: 0, totalProductRequests: 0, totalOrders: 0 },
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
      })

      // Get Auth History
      .addCase(GetAuthHistoryAction.pending, (state) => {
        state.getAuthHistoryLoading = true;
        state.getAuthHistoryData = [];
        state.getAuthHistoryError = null;
      })
      .addCase(GetAuthHistoryAction.fulfilled, (state, action) => {
        state.getAuthHistoryLoading = false;
        state.getAuthHistoryData = action.payload;
        state.getAuthHistoryError = null;
      })
      .addCase(GetAuthHistoryAction.rejected, (state, action) => {
        state.getAuthHistoryLoading = false;
        state.getAuthHistoryError = action.payload;
        state.getAuthHistoryData = [];
      })

      // Get Users Statistic
      .addCase(GetUsersStatisticAction.pending, (state) => {
        state.getUsersStatisticLoading = true;
        state.getUsersStatisticData = { userStats: { dailyGrowth: [], userTypeCategorization: [], userStatusCategorization: [], nationalCardCategorization: [], recognizanceCategorization: [], profileCompletion: [] }, totalUsers: 0, totalProducts: 0, totalProductRequests: 0, totalOrders: 0 };
        state.getUsersStatisticError = null;
      })
      .addCase(GetUsersStatisticAction.fulfilled, (state, action) => {
        state.getUsersStatisticLoading = false;
        state.getUsersStatisticData = action.payload;
        state.getUsersStatisticError = null;
      })
      .addCase(GetUsersStatisticAction.rejected, (state, action) => {
        state.getUsersStatisticLoading = false;
        state.getUsersStatisticError = action.payload;
        state.getUsersStatisticData = { userStats: { dailyGrowth: [], userTypeCategorization: [], userStatusCategorization: [], nationalCardCategorization: [], recognizanceCategorization: [], profileCompletion: [] }, totalUsers: 0, totalProducts: 0, totalProductRequests: 0, totalOrders: 0 };
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

export const selectGetAuthHistoryError = (state: any) =>
  state.users.getAuthHistoryError;
export const selectGetAuthHistoryLoading = (state: any) =>
  state.users.getAuthHistoryLoading;
export const selectGetAuthHistoryData = (state: any) =>
  state.users.getAuthHistoryData;

export const selectGetUsersStatisticError = (state: any) =>
  state.users.getUsersStatisticError;
export const selectGetUsersStatisticLoading = (state: any) =>
  state.users.getUsersStatisticLoading;
export const selectGetUsersStatisticData = (state: any) =>
  state.users.getUsersStatisticData;

export default usersSlice.reducer;
