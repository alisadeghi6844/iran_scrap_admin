import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  BLOG_CATEGORY,
  CREATE_BLOG_CATEGORY,
  DELETE_BLOG_CATEGORY,
  GET_BLOG_CATEGORY,
  GET_BLOG_CATEGORY_BY_ID,
  UPDATE_BLOG_CATEGORY,
} from "../../types/blogCategory/BlogCategoryTypes";
import {
  createBlogCategoryService,
  deleteBlogCategoryService,
  getBlogCategoryByIdService,
  getBlogCategoryService,
  updateBlogCategoryService,
} from "../../service/blogCategory/BlogCategoryServices";
import { toast } from "react-toastify";

let query: any = null;

export const GetBlogCategoryAction = createAsyncThunk(
  `${BLOG_CATEGORY}/${GET_BLOG_CATEGORY}`,
  async (credentials: any, { rejectWithValue }: any) => {
    query = credentials;
    try {
      const response = await getBlogCategoryService(query);
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

export const GetBlogCategoryByIdAction = createAsyncThunk(
  `${BLOG_CATEGORY}/${GET_BLOG_CATEGORY_BY_ID}`,
  async (credentials: any, { rejectWithValue }: any) => {
    try {
      const response = await getBlogCategoryByIdService({ credentials });
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

export const CreateBlogCategoryAction = createAsyncThunk(
  `${BLOG_CATEGORY}/${CREATE_BLOG_CATEGORY}`,
  async ({ credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await createBlogCategoryService(credentials);
      if (response?.status == 201) {
        toast.success("دسته بندی وبلاگ با موفقیت ساخته شد");
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

export const UpdateBlogCategoryAction = createAsyncThunk(
  `${BLOG_CATEGORY}/${UPDATE_BLOG_CATEGORY}`,
  async ({ id, credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await updateBlogCategoryService(credentials, id);
      if (response?.status == 200) {
        toast.success("دسته بندی وبلاگ با موفقیت ویرایش شد");
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

export const DeleteBlogCategoryAction = createAsyncThunk(
  `${BLOG_CATEGORY}/${DELETE_BLOG_CATEGORY}`,
  async ({ credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await deleteBlogCategoryService(credentials);
      if (response?.status == 200) {
        toast.success("دسته بندی وبلاگ با موفقیت حذف شد");
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
