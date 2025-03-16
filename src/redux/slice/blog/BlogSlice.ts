import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BLOG } from "../../types/blog/BlogTypes";
import {
  CreateBlogAction,
  DeleteBlogAction,
  GetBlogAction,
  GetBlogByIdAction,
  UpdateBlogAction,
} from "../../actions/blog/BlogActions";

interface blogState {
  getBlogError: string | null;
  getBlogLoading: boolean;
  getBlogData: any;

  getBlogByIdError: string | null;
  getBlogByIdLoading: boolean;
  getBlogByIdData: any;

  createBlogError: any;
  createBlogLoading: any;
  createBlogData: any;

  updateBlogError: string | null;
  updateBlogLoading: boolean;
  updateBlogData: any;

  deleteBlogError: string | null;
  deleteBlogLoading: boolean;
  deleteBlogData: any;
}

const initialState: blogState = {
  getBlogError: null,
  getBlogLoading: false,
  getBlogData: [],

  getBlogByIdError: null,
  getBlogByIdLoading: false,
  getBlogByIdData: [],

  createBlogError: null,
  createBlogLoading: false,
  createBlogData: [],

  updateBlogError: null,
  updateBlogLoading: false,
  updateBlogData: [],

  deleteBlogError: null,
  deleteBlogLoading: false,
  deleteBlogData: [],
};

const blogSlice = createSlice({
  name: BLOG,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get blog
      .addCase(GetBlogAction.pending, (state) => {
        state.getBlogLoading = true;
        state.getBlogData = [];
        state.getBlogError = null;
      })
      .addCase(GetBlogAction.fulfilled, (state, action: PayloadAction<any>) => {
        state.getBlogLoading = false;
        state.getBlogData = action.payload;
        state.getBlogError = null;
      })
      .addCase(
        GetBlogAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getBlogLoading = false;
          state.getBlogError = action.payload;
          state.getBlogData = [];
        }
      )
      // Get blog
      .addCase(GetBlogByIdAction.pending, (state) => {
        state.getBlogByIdLoading = true;
        state.getBlogByIdData = [];
        state.getBlogByIdError = null;
      })
      .addCase(
        GetBlogByIdAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getBlogByIdLoading = false;
          state.getBlogByIdData = action.payload;
          state.getBlogByIdError = null;
        }
      )
      .addCase(
        GetBlogByIdAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getBlogByIdLoading = false;
          state.getBlogByIdError = action.payload;
          state.getBlogByIdData = [];
        }
      )
      // create blog
      .addCase(CreateBlogAction.pending, (state) => {
        state.createBlogLoading = true;
        state.createBlogData = [];
        state.createBlogError = null;
      })
      .addCase(CreateBlogAction.fulfilled, (state, action) => {
        state.createBlogLoading = false;
        state.createBlogData = action.payload;
        state.createBlogError = null;
      })
      .addCase(CreateBlogAction.rejected, (state, action) => {
        state.createBlogLoading = false;
        state.createBlogError = action.payload;
        state.createBlogData = [];
      })

      // update blog
      .addCase(UpdateBlogAction.pending, (state) => {
        state.updateBlogLoading = true;
        state.updateBlogData = [];
        state.updateBlogError = null;
      })
      .addCase(UpdateBlogAction.fulfilled, (state, action) => {
        state.updateBlogLoading = false;
        state.updateBlogData = action.payload;
        state.updateBlogError = null;
      })
      .addCase(UpdateBlogAction.rejected, (state, action) => {
        state.updateBlogLoading = false;
        state.updateBlogError = action.payload;
        state.updateBlogData = [];
      })

      // delete blog
      .addCase(DeleteBlogAction.pending, (state) => {
        state.deleteBlogLoading = true;
        state.deleteBlogData = [];
        state.deleteBlogError = null;
      })
      .addCase(DeleteBlogAction.fulfilled, (state, action) => {
        state.deleteBlogLoading = false;
        state.deleteBlogData = action.payload;
        state.deleteBlogError = null;
      })
      .addCase(DeleteBlogAction.rejected, (state, action) => {
        state.deleteBlogLoading = false;
        state.deleteBlogError = action.payload;
        state.deleteBlogData = [];
      });
  },
});

export const selectGetBlogError = (state: any) => state.blog.getBlogError;
export const selectGetBlogLoading = (state: any) => state.blog.getBlogLoading;
export const selectGetBlogData = (state: any) => state.blog.getBlogData;

export const selectGetBlogByIdError = (state: any) =>
  state.blog.getBlogByIdError;
export const selectGetBlogByIdLoading = (state: any) =>
  state.blog.getBlogByIdLoading;
export const selectGetBlogByIdData = (state: any) => state.blog.getBlogByIdData;

export const selectCreateBlogError = (state: any) => state.blog.createBlogError;
export const selectCreateBlogLoading = (state: any) =>
  state.blog.createBlogLoading;
export const selectCreateBlogData = (state: any) => state.blog.createBlogData;

export const selectUpdateBlogError = (state: any) => state.blog.updateBlogError;
export const selectUpdateBlogLoading = (state: any) =>
  state.blog.updateBlogLoading;
export const selectUpdateBlogData = (state: any) => state.blog.updateBlogData;

export const selectDeleteBlogError = (state: any) => state.blog.deleteBlogError;
export const selectDeleteBlogLoading = (state: any) =>
  state.blog.deleteBlogLoading;
export const selectDeleteBlogData = (state: any) => state.blog.deleteBlogData;

export default blogSlice.reducer;
