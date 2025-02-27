import { createSlice } from "@reduxjs/toolkit";
import { USERS } from "../../types/users/UsersTypes";
import { GetUsersAction } from "../../actions/users/UsersActions";

const initialState = {
  getUsersError: null,
  getUsersLoading: false,
  getUsersData: [],
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
  },
});



export const selectGetUsersError = (state: any) =>
  state.users.getUsersError;
export const selectGetUsersLoading = (state: any) =>
  state.users.getUsersLoading;
export const selectGetUsersData = (state: any) => state.users.getUsersData;

export default usersSlice.reducer;

