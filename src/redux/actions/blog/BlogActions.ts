import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  BLOG,
  CREATE_BLOG,
  DELETE_BLOG,
  GET_BLOG,
  GET_BLOG_BY_ID,
  UPDATE_BLOG,
} from "../../types/blog/BlogTypes";
import {
  createBlogService,
  deleteBlogService,
  getBlogByIdService,
  getBlogService,
  updateBlogService,
} from "../../service/blog/BlogServices";
import { toast } from "react-toastify";

let query: any = null;

export const GetBlogAction = createAsyncThunk(
  `${BLOG}/${GET_BLOG}`,
  async (credentials: any, { rejectWithValue }: any) => {
    query = credentials;
    try {
      const response = await getBlogService(query);
      if (response?.status === 200) {
        return response.data; // به درستی داده‌های کاربر را برمی‌گرداند
      } else {
        return rejectWithValue(response.data); // در صورت خطای غیر 200
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const GetBlogByIdAction = createAsyncThunk(
  `${BLOG}/${GET_BLOG_BY_ID}`,
  async (credentials: any, { rejectWithValue }: any) => {
    try {
      const response = await getBlogByIdService({ credentials });
      if (response?.status === 200) {
        return response.data; // به درستی داده‌های کاربر را برمی‌گرداند
      } else {
        return rejectWithValue(response.data); // در صورت خطای غیر 200
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const CreateBlogAction = createAsyncThunk(
  `${BLOG}/${CREATE_BLOG}`,
  async ({ credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await createBlogService(credentials);
      if (response?.status == 201) {
        toast.success("وبلاگ با موفقیت ساخته شد");
        onSubmitForm && onSubmitForm();
        resetForm && resetForm();
      }
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const UpdateBlogAction = createAsyncThunk(
  `${BLOG}/${UPDATE_BLOG}`,
  async ({ id, credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await updateBlogService(credentials, id);
      if (response?.status == 200) {
        toast.success("وبلاگ با موفقیت ویرایش شد");
        onSubmitForm && onSubmitForm();
        resetForm && resetForm();
      }
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const DeleteBlogAction = createAsyncThunk(
  `${BLOG}/${DELETE_BLOG}`,
  async ({ credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await deleteBlogService(credentials);
      if (response?.status == 200) {
        toast.success("وبلاگ با موفقیت حذف شد");
        onSubmitForm && onSubmitForm();
        resetForm && resetForm();
        thunkAPI.dispatch(GetBlogAction(query));
      }
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);
