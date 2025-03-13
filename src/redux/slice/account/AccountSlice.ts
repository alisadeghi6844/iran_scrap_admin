// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

import { AUTH } from "../../types/account/AccountTypes";

import {
  ChangeClientPasswordAction,
  ChangePasswordAction,
  getAllUsersAction,
  getCurrentUserInfoAction,
  GetUserProfileAction,
  LoginAction,
  LogOutAction,
  SendClientOtpAction,
  VerifyOtpAction,
} from "../../actions/account/AccountActions";


const initialState = {
  user: null,
  isAuthenticated: false,
  roles: [],
  permissions: [],
  loginLoading: false,
  loginError: null,
  logOutLoading: false,
  logOut: null,


  getAllUsersError: null,
  getAllUsersLoading: false,
  getAllUsersData: [],

  getCurrentUserError: null,
  getCurrentUserLoading: false,
  getCurrentUserData: [],

  sendClientOtpError: null,
  sendClientOtpLoading: false,
  sendClientOtpData: [],

  verifyOtpError: null,
  verifyOtpLoading: false,
  verifyOtpData: [],

  changeClientPasswordError: null,
  changeClientPasswordLoading: false,
  changeClientPasswordData: [],

  changePasswordLoading: false,
  changePasswordError: null,

  getUserProfileError: null,
  getUserProfileLoading: false,
  getUserProfileData: [],
};

const authSlice = createSlice({
  name: AUTH,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginAction.pending, (state: any) => {
        state.loginLoading = true;
        state.isAuthenticated = false;
        state.loginError = null;
      })
      .addCase(LoginAction.fulfilled, (state: any, action: any) => {
        state.loginLoading = false;
        state.isAuthenticated = true;
        state.loginError = null;
      })
      .addCase(LoginAction.rejected, (state: any, action: any) => {
        state.loginLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // log out
      .addCase(LogOutAction.pending, (state: any) => {
        state.logOutLoading = true;
        state.isAuthenticated = false;
        state.logOutError = null;
      })
      .addCase(LogOutAction.fulfilled, (state: any, action: any) => {
        state.user = null;
        state.isAuthenticated = false;
        state.roles = [];
        state.permissions = [];
        state.getCurrentUserData = [];
      })
      .addCase(LogOutAction.rejected, (state: any, action: any) => {
        state.logOutLoading = false;
        state.logOutError = action.payload;
        state.isAuthenticated = false;
      })  
         // Get User Profile
      .addCase(GetUserProfileAction.pending, (state) => {
        state.getUserProfileLoading = true;
        state.getUserProfileData = [];
        state.getUserProfileError = null;
        // state.isAuthenticated=false;
      })
      .addCase(GetUserProfileAction.fulfilled, (state, action) => {
        console.log("get user ",GetUserProfileAction)
        state.getUserProfileLoading = false;
        state.getUserProfileData = action.payload;
        state.getUserProfileError = null;
        state.isAuthenticated=true;
      })
      .addCase(GetUserProfileAction.rejected, (state, action) => {
        state.getUserProfileLoading = false;
        state.getUserProfileError = action.payload;
        state.getUserProfileData = [];
        // state.isAuthenticated=false;
      })

      // change password
      .addCase(ChangePasswordAction.pending, (state: any) => {
        state.ChangePasswordLoading = true;
        state.ChangePasswordError = null;
      })
      .addCase(ChangePasswordAction.fulfilled, (state: any, action: any) => {
        state.ChangePasswordLoading = false;
        state.ChangePasswordError = null;
      })
      .addCase(ChangePasswordAction.rejected, (state: any, action: any) => {
        state.ChangePasswordLoading = false;
        state.ChangePasswordError = action.payload;
      })

    
      // Get Users
      .addCase(getAllUsersAction.pending, (state) => {
        state.getAllUsersLoading = true;
        state.getAllUsersData = [];
        state.getAllUsersError = null;
      })
      .addCase(getAllUsersAction.fulfilled, (state, action) => {
        state.getAllUsersLoading = false;
        state.getAllUsersData = action.payload;
        state.getAllUsersError = null;
      })
      .addCase(getAllUsersAction.rejected, (state, action) => {
        state.getAllUsersLoading = false;
        state.getAllUsersError = action.payload;
        state.getAllUsersData = [];
      })

      // get current user info
      .addCase(getCurrentUserInfoAction.pending, (state) => {
        state.getCurrentUserLoading = true;
        state.getCurrentUserData = [];
        state.getCurrentUserError = null;
      })
      .addCase(getCurrentUserInfoAction.fulfilled, (state, action) => {
        state.getCurrentUserLoading = false;
        state.getCurrentUserData = action.payload;
        state.getCurrentUserError = null;
      })
      .addCase(getCurrentUserInfoAction.rejected, (state, action) => {
        state.getCurrentUserLoading = false;
        state.getCurrentUserError = action.payload;
        state.getCurrentUserData = [];
      })
      // change password
      .addCase(SendClientOtpAction.pending, (state: any) => {
        state.sendClientOtpLoading = true;
        state.sendClientOtpError = null;
      })
      .addCase(SendClientOtpAction.fulfilled, (state: any, action: any) => {
        state.sendClientOtpLoading = false;
        state.sendClientOtpData = action.payload;
        state.sendClientOtpError = null;
      })
      .addCase(SendClientOtpAction.rejected, (state: any, action: any) => {
        state.sendClientOtpLoading = false;
        state.sendClientOtpError = action.payload;
      })

      // verify otp
      .addCase(VerifyOtpAction.pending, (state: any) => {
        state.verifyOtpLoading = true;
        state.verifyOtpError = null;
        state.verifyOtpData=null;
      })
      .addCase(VerifyOtpAction.fulfilled, (state: any, action: any) => {
        state.verifyOtpLoading = false;
        state.verifyOtpData = action.payload;
        state.verifyOtpError = null;
      })
      .addCase(VerifyOtpAction.rejected, (state: any, action: any) => {
        state.verifyOtpLoading = false;
        state.verifyOtpError = action.payload;
        state.verifyOtpData=null;
      })

      // verify otp
      .addCase(ChangeClientPasswordAction.pending, (state: any) => {
        state.changeClientPasswordLoading = true;
        state.changeClientPasswordError = null;
      })
      .addCase(
        ChangeClientPasswordAction.fulfilled,
        (state: any, action: any) => {
          state.changeClientPasswordLoading = false;
          state.changeClientPasswordData = action.payload;
          state.changeClientPasswordError = null;
        }
      )
      .addCase(
        ChangeClientPasswordAction.rejected,
        (state: any, action: any) => {
          state.changeClientPasswordLoading = false;
          state.changeClientPasswordError = action.payload;
        }
      );
  },
});

export const selectUser = (state: any) => state.auth.user;
export const selectIsAuthenticated = (state: any) => state.auth.isAuthenticated;
export const selectRoles = (state: any) => state.auth.roles;
export const selectPermissions = (state: any) => state.auth.permissions;
export const selectLoginLoading = (state: any) => state.auth.loginLoading;

export const selectLoginError = (state: any) => state.auth.loginError;

export const selectGetAllUsersError = (state: any) =>
  state.auth.getAllUsersError;
export const selectGetAllUsersLoading = (state: any) =>
  state.auth.getAllUsersLoading;
export const selectGetAllUsersData = (state: any) => state.auth.getAllUsersData;

export const selectGetCurrentUserError = (state: any) =>
  state.auth.getCurrentUserError;
export const selectGetCurrentUserLoading = (state: any) =>
  state.auth.getCurrentUserLoading;
export const selectGetCurrentUserData = (state: any) =>
  state.auth.getCurrentUserData;

export const selectSendClientOtpError = (state: any) =>
  state.auth.sendClientOtpError;
export const selectSendClientOtpLoading = (state: any) =>
  state.auth.sendClientOtpLoading;
export const selectSendClientOtpData = (state: any) =>
  state.auth.sendClientOtpData;

export const selectVerifyOtpError = (state: any) => state.auth.verifyOtpError;
export const selectVerifyOtpLoading = (state: any) =>
  state.auth.verifyOtpLoading;
export const selectVerifyOtpData = (state: any) => state.auth.verifyOtpData;

export const selectChangeClientPasswordError = (state: any) =>
  state.auth.changeClientPasswordError;
export const selectChangeClientPasswordLoading = (state: any) =>
  state.auth.changeClientPasswordLoading;
export const selectChangeClientPasswordData = (state: any) =>
  state.auth.changeClientPasswordData;

export const selectLogOutLoading = (state: any) => state.auth.logOutLoading;
export const selectLogOutError = (state: any) => state.auth.logOutError;

export const selectChangePasswordLoading = (state: any) =>
  state.auth.changePasswordLoading;
export const selectChangePasswordError = (state: any) =>
  state.auth.changePasswordError;

export const selectGetUserProfileError = (state: any) =>
  state.users.getUserProfileError;
export const selectGetUserProfileLoading = (state: any) =>
  state.users.getUserProfileLoading;
export const selectGetUserProfileData = (state: any) =>
  state.users.getUserProfileData;

export default authSlice.reducer;
