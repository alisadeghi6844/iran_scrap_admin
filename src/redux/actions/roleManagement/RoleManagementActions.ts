import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ROLE_MANAGEMENT,
  CREATE_ROLE_MANAGEMENT,
  DELETE_ROLE_MANAGEMENT,
  GET_ROLE_MANAGEMENT,
  GET_ROLE_MANAGEMENT_BY_ID,
  UPDATE_ROLE_MANAGEMENT,
  GET_PERMISSIONS,
} from "../../types/roleManagement/RoleManagementTypes";
import {
  createRoleManagementService,
  deleteRoleManagementService,
  getPermissionsService,
  getRoleManagementByIdService,
  getRoleManagementService,
  updateRoleManagementService,
} from "../../service/roleManagement/RoleManagementServices";
import { toast } from "react-toastify";
import { ASSIGN_ROLE_MANAGEMENT, REVOKE_ROLE_MANAGEMENT } from "../../types/roleManagement/RoleManagementTypes";
import { assignRoleManagementService, revokeRoleManagementService } from "../../service/roleManagement/RoleManagementServices";

let query: any = null;

export const GetRoleManagementAction = createAsyncThunk(
  `${ROLE_MANAGEMENT}/${GET_ROLE_MANAGEMENT}`,
  async (credentials: any, { rejectWithValue }: any) => {
    query = credentials;
    try {
      const response = await getRoleManagementService(query);
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

export const GetRoleManagementByIdAction = createAsyncThunk(
  `${ROLE_MANAGEMENT}/${GET_ROLE_MANAGEMENT_BY_ID}`,
  async (credentials: any, { rejectWithValue }: any) => {

    try {
      const response = await getRoleManagementByIdService({credentials});
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

export const CreateRoleManagementAction = createAsyncThunk(
  `${ROLE_MANAGEMENT}/${CREATE_ROLE_MANAGEMENT}`,
  async ({ credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await createRoleManagementService(credentials);
      if (response?.status == 201) {
        toast.success("دسترسی با موفقیت ساخته شد");
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

export const UpdateRoleManagementAction = createAsyncThunk(
  `${ROLE_MANAGEMENT}/${UPDATE_ROLE_MANAGEMENT}`,
  async ({ id,credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await updateRoleManagementService(credentials,id);
      if (response?.status == 200) {
        toast.success("دسترسی با موفقیت ویرایش شد");
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

export const DeleteRoleManagementAction = createAsyncThunk(
  `${ROLE_MANAGEMENT}/${DELETE_ROLE_MANAGEMENT}`,
  async ({credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await deleteRoleManagementService(credentials);
      if (response?.status == 200) {
        toast.success("دسترسی با موفقیت حذف شد");
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

export const AssignRoleManagementAction = createAsyncThunk(
  `${ROLE_MANAGEMENT}/${ASSIGN_ROLE_MANAGEMENT}`,
  async ({ credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await assignRoleManagementService(credentials);

      if (response?.status == 200) {
        toast.success("دسترسی با موفقیت انتخاب شد");
        onSubmitForm && onSubmitForm();
      }
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "خطای ناشناخته" }
      );
    }
  }
  );  

export const RevokeRoleManagementAction = createAsyncThunk(
  `${ROLE_MANAGEMENT}/${REVOKE_ROLE_MANAGEMENT}`,
  async ({ credentials, onSubmitForm, resetForm }: any, thunkAPI) => {
    try {
      const response = await revokeRoleManagementService(credentials);

      if (response?.status == 200) {
        toast.success("دسترسی با موفقیت حذف شد");
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

export const GetPermissionsAction = createAsyncThunk(
  `${ROLE_MANAGEMENT}/${GET_PERMISSIONS}`,
  async (credentials: any, { rejectWithValue }: any) => {
    try {

      const response = await getPermissionsService(credentials);
      if (response?.status == 200) {
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
  
