import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BLOG_CATEGORY } from "../../types/blogCategory/BlogCategoryTypes";
import {
  CreateBlogCategoryAction,
  DeleteBlogCategoryAction,
  GetBlogCategoryAction,
  GetBlogCategoryByIdAction,
  UpdateBlogCategoryAction,
} from "../../actions/blogCategory/BlogCategoryActions";

interface blogCategoryState {
  getBlogCategoryError: string | null;
  getBlogCategoryLoading: boolean;
  getBlogCategoryData: any;

  getBlogCategoryByIdError: string | null;
  getBlogCategoryByIdLoading: boolean;
  getBlogCategoryByIdData: any;

  createBlogCategoryError: any;
  createBlogCategoryLoading: any;
  createBlogCategoryData: any;

  updateBlogCategoryError: string | null;
  updateBlogCategoryLoading: boolean;
  updateBlogCategoryData: any;

  deleteBlogCategoryError: string | null;
  deleteBlogCategoryLoading: boolean;
  deleteBlogCategoryData: any;
}

const initialState: blogCategoryState = {
  getBlogCategoryError: null,
  getBlogCategoryLoading: false,
  getBlogCategoryData: [],

  getBlogCategoryByIdError: null,
  getBlogCategoryByIdLoading: false,
  getBlogCategoryByIdData: [],

  createBlogCategoryError: null,
  createBlogCategoryLoading: false,
  createBlogCategoryData: [],

  updateBlogCategoryError: null,
  updateBlogCategoryLoading: false,
  updateBlogCategoryData: [],

  deleteBlogCategoryError: null,
  deleteBlogCategoryLoading: false,
  deleteBlogCategoryData: [],
};

const blogCategorySlice = createSlice({
  name: BLOG_CATEGORY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get blogCategory
      .addCase(GetBlogCategoryAction.pending, (state) => {
        state.getBlogCategoryLoading = true;
        state.getBlogCategoryData = [];
        state.getBlogCategoryError = null;
      })
      .addCase(GetBlogCategoryAction.fulfilled, (state, action: PayloadAction<any>) => {
        state.getBlogCategoryLoading = false;
        state.getBlogCategoryData = action.payload;
        state.getBlogCategoryError = null;
      })
      .addCase(
        GetBlogCategoryAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getBlogCategoryLoading = false;
          state.getBlogCategoryError = action.payload;
          state.getBlogCategoryData = [];
        }
      )
      // Get blogCategory
      .addCase(GetBlogCategoryByIdAction.pending, (state) => {
        state.getBlogCategoryByIdLoading = true;
        state.getBlogCategoryByIdData = [];
        state.getBlogCategoryByIdError = null;
      })
      .addCase(
        GetBlogCategoryByIdAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getBlogCategoryByIdLoading = false;
          state.getBlogCategoryByIdData = action.payload;
          state.getBlogCategoryByIdError = null;
        }
      )
      .addCase(
        GetBlogCategoryByIdAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getBlogCategoryByIdLoading = false;
          state.getBlogCategoryByIdError = action.payload;
          state.getBlogCategoryByIdData = [];
        }
      )
      // create blogCategory
      .addCase(CreateBlogCategoryAction.pending, (state) => {
        state.createBlogCategoryLoading = true;
        state.createBlogCategoryData = [];
        state.createBlogCategoryError = null;
      })
      .addCase(CreateBlogCategoryAction.fulfilled, (state, action) => {
        state.createBlogCategoryLoading = false;
        state.createBlogCategoryData = action.payload;
        state.createBlogCategoryError = null;
      })
      .addCase(CreateBlogCategoryAction.rejected, (state, action) => {
        state.createBlogCategoryLoading = false;
        state.createBlogCategoryError = action.payload;
        state.createBlogCategoryData = [];
      })

      // update blogCategory
      .addCase(UpdateBlogCategoryAction.pending, (state) => {
        state.updateBlogCategoryLoading = true;
        state.updateBlogCategoryData = [];
        state.updateBlogCategoryError = null;
      })
      .addCase(UpdateBlogCategoryAction.fulfilled, (state, action) => {
        state.updateBlogCategoryLoading = false;
        state.updateBlogCategoryData = action.payload;
        state.updateBlogCategoryError = null;
      })
      .addCase(UpdateBlogCategoryAction.rejected, (state, action) => {
        state.updateBlogCategoryLoading = false;
        state.updateBlogCategoryError = action.payload;
        state.updateBlogCategoryData = [];
      })

      // delete blogCategory
      .addCase(DeleteBlogCategoryAction.pending, (state) => {
        state.deleteBlogCategoryLoading = true;
        state.deleteBlogCategoryData = [];
        state.deleteBlogCategoryError = null;
      })
      .addCase(DeleteBlogCategoryAction.fulfilled, (state, action) => {
        state.deleteBlogCategoryLoading = false;
        state.deleteBlogCategoryData = action.payload;
        state.deleteBlogCategoryError = null;
      })
      .addCase(DeleteBlogCategoryAction.rejected, (state, action) => {
        state.deleteBlogCategoryLoading = false;
        state.deleteBlogCategoryError = action.payload;
        state.deleteBlogCategoryData = [];
      });
  },
});

export const selectGetBlogCategoryError = (state: any) => state.blogCategory.getBlogCategoryError;
export const selectGetBlogCategoryLoading = (state: any) => state.blogCategory.getBlogCategoryLoading;
export const selectGetBlogCategoryData = (state: any) => state.blogCategory.getBlogCategoryData;

export const selectGetBlogCategoryByIdError = (state: any) =>
  state.blogCategory.getBlogCategoryByIdError;
export const selectGetBlogCategoryByIdLoading = (state: any) =>
  state.blogCategory.getBlogCategoryByIdLoading;
export const selectGetBlogCategoryByIdData = (state: any) => state.blogCategory.getBlogCategoryByIdData;

export const selectCreateBlogCategoryError = (state: any) => state.blogCategory.createBlogCategoryError;
export const selectCreateBlogCategoryLoading = (state: any) =>
  state.blogCategory.createBlogCategoryLoading;
export const selectCreateBlogCategoryData = (state: any) => state.blogCategory.createBlogCategoryData;

export const selectUpdateBlogCategoryError = (state: any) => state.blogCategory.updateBlogCategoryError;
export const selectUpdateBlogCategoryLoading = (state: any) =>
  state.blogCategory.updateBlogCategoryLoading;
export const selectUpdateBlogCategoryData = (state: any) => state.blogCategory.updateBlogCategoryData;

export const selectDeleteBlogCategoryError = (state: any) => state.blogCategory.deleteBlogCategoryError;
export const selectDeleteBlogCategoryLoading = (state: any) =>
  state.blogCategory.deleteBlogCategoryLoading;
export const selectDeleteBlogCategoryData = (state: any) => state.blogCategory.deleteBlogCategoryData;

export default blogCategorySlice.reducer;
