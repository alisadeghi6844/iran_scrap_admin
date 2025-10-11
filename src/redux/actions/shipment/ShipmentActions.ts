import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  SHIPMENT,
  CREATE_SHIPMENT_ADMIN,
  GET_SHIPMENT_ADMIN,
  GET_SHIPMENT_SUGGEST,
  CreateShipmentRequest,
  GetShipmentAdminQuery,
  GetShipmentSuggestQuery,
} from "../../types/shipment/ShipmentTypes";
import {
  createShipmentAdminService,
  getShipmentAdminService,
  getShipmentSuggestService,
} from "../../service/shipment/ShipmentServices";
import { toast } from "react-toastify";

export const CreateShipmentAdminAction = createAsyncThunk(
  `${SHIPMENT}/${CREATE_SHIPMENT_ADMIN}`,
  async ({ data, onSubmitForm }: { data: CreateShipmentRequest; onSubmitForm?: () => void }, thunkAPI) => {
    try {
      const response = await createShipmentAdminService(data);
      if (response?.status === 200 || response?.status === 201) {
        toast.success("حمل و نقل با موفقیت ایجاد شد");
        onSubmitForm && onSubmitForm();
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const GetShipmentAdminAction = createAsyncThunk(
  `${SHIPMENT}/${GET_SHIPMENT_ADMIN}`,
  async (credentials: GetShipmentAdminQuery, { rejectWithValue }: any) => {
    try {
      const response = await getShipmentAdminService(credentials);
      if (response?.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);

export const GetShipmentSuggestAction = createAsyncThunk(
  `${SHIPMENT}/${GET_SHIPMENT_SUGGEST}`,
  async (credentials: GetShipmentSuggestQuery, { rejectWithValue }: any) => {
    try {
      const response = await getShipmentSuggestService(credentials);
      if (response?.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
);