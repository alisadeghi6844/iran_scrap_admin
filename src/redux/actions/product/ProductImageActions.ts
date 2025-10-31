import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
  uploadProductImageService, 
  deleteProductImageService 
} from "../../service/product/ProductServices";

// Upload product image
export const UploadProductImageAction = createAsyncThunk(
  "product/uploadImage",
  async (
    {
      productId,
      imageFile,
      onSuccess,
      onError,
    }: {
      productId: string;
      imageFile: File;
      onSuccess?: (response: any) => void;
      onError?: (error: any) => void;
    },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await uploadProductImageService(productId, formData);

      if (response?.status === 200 || response?.status === 201) {
        onSuccess && onSuccess(response);
        return response;
      } else {
        onError && onError(response);
        return rejectWithValue(response);
      }
    } catch (error: any) {
      onError && onError(error);
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

// Delete product image
export const DeleteProductImageAction = createAsyncThunk(
  "product/deleteImage",
  async (
    {
      productId,
      imageId,
      onSuccess,
      onError,
    }: {
      productId: string;
      imageId: string;
      onSuccess?: (response: any) => void;
      onError?: (error: any) => void;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await deleteProductImageService(productId, imageId);

      if (response?.status === 200 || response?.status === 204) {
        onSuccess && onSuccess(response);
        return response;
      } else {
        onError && onError(response);
        return rejectWithValue(response);
      }
    } catch (error: any) {
      onError && onError(error);
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);