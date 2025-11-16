import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PRODUCT_REQUEST_STATUS } from "../../types/productRequestStatus/ProductRequestStatusTypes";
import {
  GetRequestProductAdminAction,
  GetRequestProductAdminByIdAction,
  GetRequestProductStatusAction,
  GetRequestProductStatusByIdAction,
  UpdateRequestProductAdminAction,
  UpdateRequestProductAdminProviderAction,
  UpdateRequestProductStatusAction,
  DeleteRequestProductAdminAction,
  EditRequestProductAdminAction,
} from "../../actions/productRequestStatus/RequestProductStatus";

interface productRequestStatusState {
  getProductRequestStatusError: string | null;
  getProductRequestStatusLoading: boolean;
  getProductRequestStatusData: any;

  getProductRequestStatusByIdError: any;
  getProductRequestStatusByIdLoading: any;
  getProductRequestStatusByIdData: any;

  updateProductRequestStatusError: any;
  updateProductRequestStatusLoading: any;
  updateProductRequestStatusData: any;

  getProductRequestAdminError: string | null;
  getProductRequestAdminLoading: boolean;
  getProductRequestAdminData: any;

  getProductRequestAdminByIdError: string | null;
  getProductRequestAdminByIdLoading: boolean;
  getProductRequestAdminByIdData: any;

  updateProductRequestAdminError: string | null;
  updateProductRequestAdminLoading: boolean;
  updateProductRequestAdminData: any;

  updateProductRequestProviderAdminError: string | null;
  updateProductRequestProviderAdminLoading: boolean;
  updateProductRequestProviderAdminData: any;

  deleteProductRequestAdminError: string | null;
  deleteProductRequestAdminLoading: boolean;
  deleteProductRequestAdminData: any;

  editProductRequestAdminError: string | null;
  editProductRequestAdminLoading: boolean;
  editProductRequestAdminData: any;
}

const initialState: productRequestStatusState = {
  getProductRequestStatusError: null,
  getProductRequestStatusLoading: false,
  getProductRequestStatusData: [],

  getProductRequestStatusByIdError: null,
  getProductRequestStatusByIdLoading: false,
  getProductRequestStatusByIdData: [],

  updateProductRequestStatusError: null,
  updateProductRequestStatusLoading: false,
  updateProductRequestStatusData: [],

  getProductRequestAdminError: null,
  getProductRequestAdminLoading: false,
  getProductRequestAdminData: [],

  getProductRequestAdminByIdError: null,
  getProductRequestAdminByIdLoading: false,
  getProductRequestAdminByIdData: [],

  updateProductRequestAdminError: null,
  updateProductRequestAdminLoading: false,
  updateProductRequestAdminData: [],

  updateProductRequestProviderAdminError: null,
  updateProductRequestProviderAdminLoading: false,
  updateProductRequestProviderAdminData: [],

  deleteProductRequestAdminError: null,
  deleteProductRequestAdminLoading: false,
  deleteProductRequestAdminData: [],

  editProductRequestAdminError: null,
  editProductRequestAdminLoading: false,
  editProductRequestAdminData: [],
};

const productRequestStatusSlice = createSlice({
  name: PRODUCT_REQUEST_STATUS,
  initialState,
  reducers: {
    clearUpdateProductRequestAdminData: (state) => {
      state.updateProductRequestAdminData = null;
      state.updateProductRequestAdminError = null;
      state.updateProductRequestAdminLoading = false;
    },
    clearGetProductRequestAdminByIdData: (state) => {
      state.getProductRequestAdminByIdData = null;
      state.getProductRequestAdminByIdError = null;
      state.getProductRequestAdminByIdLoading = false;
    },
    clearAllProductRequestAdminData: (state) => {
      state.getProductRequestAdminByIdData = null;
      state.getProductRequestAdminByIdError = null;
      state.getProductRequestAdminByIdLoading = false;
      state.updateProductRequestAdminData = null;
      state.updateProductRequestAdminError = null;
      state.updateProductRequestAdminLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get products request status
      .addCase(GetRequestProductStatusAction.pending, (state) => {
        state.getProductRequestStatusLoading = true;
        state.getProductRequestStatusData = [];
        state.getProductRequestStatusError = null;
      })
      .addCase(
        GetRequestProductStatusAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getProductRequestStatusLoading = false;
          state.getProductRequestStatusData = action.payload;
          state.getProductRequestStatusError = null;
        }
      )
      .addCase(
        GetRequestProductStatusAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getProductRequestStatusLoading = false;
          state.getProductRequestStatusError = action.payload;
          state.getProductRequestStatusData = [];
        }
      )

      // Get products request status by id
      .addCase(GetRequestProductStatusByIdAction.pending, (state) => {
        state.getProductRequestStatusByIdLoading = true;
        state.getProductRequestStatusByIdData = [];
        state.getProductRequestStatusByIdError = null;
      })
      .addCase(GetRequestProductStatusByIdAction.fulfilled, (state, action) => {
        state.getProductRequestStatusByIdLoading = false;
        state.getProductRequestStatusByIdData = action.payload;
        state.getProductRequestStatusByIdError = null;
      })
      .addCase(GetRequestProductStatusByIdAction.rejected, (state, action) => {
        state.getProductRequestStatusByIdLoading = false;
        state.getProductRequestStatusByIdError = action.payload;
        state.getProductRequestStatusByIdData = [];
      }) // add products request status
      .addCase(UpdateRequestProductStatusAction.pending, (state) => {
        state.updateProductRequestStatusLoading = true;
        state.updateProductRequestStatusData = [];
        state.updateProductRequestStatusError = null;
      })
      .addCase(UpdateRequestProductStatusAction.fulfilled, (state, action) => {
        state.updateProductRequestStatusLoading = false;
        state.updateProductRequestStatusData = action.payload;
        state.updateProductRequestStatusError = null;
      })
      .addCase(UpdateRequestProductStatusAction.rejected, (state, action) => {
        state.updateProductRequestStatusLoading = false;
        state.updateProductRequestStatusError = action.payload;
        state.updateProductRequestStatusData = [];
      })

      // Get products request admin
      .addCase(GetRequestProductAdminAction.pending, (state) => {
        state.getProductRequestAdminLoading = true;
        state.getProductRequestAdminData = [];
        state.getProductRequestAdminError = null;
      })
      .addCase(
        GetRequestProductAdminAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getProductRequestAdminLoading = false;
          state.getProductRequestAdminData = action.payload;
          state.getProductRequestAdminError = null;
        }
      )
      .addCase(
        GetRequestProductAdminAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getProductRequestAdminLoading = false;
          state.getProductRequestAdminError = action.payload;
          state.getProductRequestAdminData = [];
        }
      ) // Get products request admin
      .addCase(GetRequestProductAdminByIdAction.pending, (state) => {
        state.getProductRequestAdminByIdLoading = true;
        state.getProductRequestAdminByIdData = [];
        state.getProductRequestAdminByIdError = null;
      })
      .addCase(
        GetRequestProductAdminByIdAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.getProductRequestAdminByIdLoading = false;
          state.getProductRequestAdminByIdData = action.payload;
          state.getProductRequestAdminByIdError = null;
        }
      )
      .addCase(
        GetRequestProductAdminByIdAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.getProductRequestAdminByIdLoading = false;
          state.getProductRequestAdminByIdError = action.payload;
          state.getProductRequestAdminByIdData = [];
        }
      ) // update products request admin
      .addCase(UpdateRequestProductAdminAction.pending, (state) => {
        state.updateProductRequestAdminLoading = true;
        state.updateProductRequestAdminData = [];
        state.updateProductRequestAdminError = null;
      })
      .addCase(
        UpdateRequestProductAdminAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          console.log("action.payload", action.payload);
          state.updateProductRequestAdminLoading = false;
          state.updateProductRequestAdminData = action.payload;
          state.updateProductRequestAdminError = null;
        }
      )
      .addCase(
        UpdateRequestProductAdminAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.updateProductRequestAdminLoading = false;
          state.updateProductRequestAdminError = action.payload;
          state.updateProductRequestAdminData = [];
        }
      ) // update products request provider admin
      .addCase(UpdateRequestProductAdminProviderAction.pending, (state) => {
        state.updateProductRequestProviderAdminLoading = true;
        state.updateProductRequestProviderAdminData = [];
        state.updateProductRequestProviderAdminError = null;
      })
      .addCase(
        UpdateRequestProductAdminProviderAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.updateProductRequestProviderAdminLoading = false;
          state.updateProductRequestProviderAdminData = action.payload;
          state.updateProductRequestProviderAdminError = null;
        }
      )
      .addCase(
        UpdateRequestProductAdminProviderAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.updateProductRequestProviderAdminLoading = false;
          state.updateProductRequestProviderAdminError = action.payload;
          state.updateProductRequestProviderAdminData = [];
        }
      )
      // delete products request admin
      .addCase(DeleteRequestProductAdminAction.pending, (state) => {
        state.deleteProductRequestAdminLoading = true;
        state.deleteProductRequestAdminData = [];
        state.deleteProductRequestAdminError = null;
      })
      .addCase(
        DeleteRequestProductAdminAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.deleteProductRequestAdminLoading = false;
          state.deleteProductRequestAdminData = action.payload;
          state.deleteProductRequestAdminError = null;
        }
      )
      .addCase(
        DeleteRequestProductAdminAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.deleteProductRequestAdminLoading = false;
          state.deleteProductRequestAdminError = action.payload;
          state.deleteProductRequestAdminData = [];
        }
      )
      // edit products request admin
      .addCase(EditRequestProductAdminAction.pending, (state) => {
        state.editProductRequestAdminLoading = true;
        state.editProductRequestAdminData = [];
        state.editProductRequestAdminError = null;
      })
      .addCase(
        EditRequestProductAdminAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.editProductRequestAdminLoading = false;
          state.editProductRequestAdminData = action.payload;
          state.editProductRequestAdminError = null;
        }
      )
      .addCase(
        EditRequestProductAdminAction.rejected,
        (state, action: PayloadAction<string>) => {
          state.editProductRequestAdminLoading = false;
          state.editProductRequestAdminError = action.payload;
          state.editProductRequestAdminData = [];
        }
      );
  },
});

export const selectGetProductRequestStatusError = (state: any) =>
  state.productRequestStatus.getProductRequestStatusError;
export const selectGetProductRequestStatusLoading = (state: any) =>
  state.productRequestStatus.getProductRequestStatusLoading;
export const selectGetProductRequestStatusData = (state: any) =>
  state.productRequestStatus.getProductRequestStatusData;

export const selectGetProductRequestStatusByIdError = (state: any) =>
  state.productRequestStatus.getProductRequestStatusByIdError;
export const selectGetProductRequestStatusByIdLoading = (state: any) =>
  state.productRequestStatus.getProductRequestStatusByIdLoading;
export const selectGetProductRequestStatusByIdData = (state: any) =>
  state.productRequestStatus.getProductRequestStatusByIdData;

export const selectUpdateProductRequestStatusError = (state: any) =>
  state.productRequestStatus.updateProductRequestStatusError;
export const selectUpdateProductRequestStatusLoading = (state: any) =>
  state.productRequestStatus.updateProductRequestStatusLoading;
export const selectUpdateProductRequestStatusData = (state: any) =>
  state.productRequestStatus.updateProductRequestStatusData;

export const selectGetProductRequestAdminError = (state: any) =>
  state.productRequestStatus.getProductRequestAdminError;
export const selectGetProductRequestAdminLoading = (state: any) =>
  state.productRequestStatus.getProductRequestAdminLoading;
export const selectGetProductRequestAdminData = (state: any) =>
  state.productRequestStatus.getProductRequestAdminData;

export const selectGetProductRequestAdminByIdError = (state: any) =>
  state.productRequestStatus.getProductRequestAdminByIdError;
export const selectGetProductRequestAdminByIdLoading = (state: any) =>
  state.productRequestStatus.getProductRequestAdminByIdLoading;
export const selectGetProductRequestAdminByIdData = (state: any) =>
  state.productRequestStatus.getProductRequestAdminByIdData;

export const selectUpdateProductRequestAdminError = (state: any) =>
  state.productRequestStatus.updateProductRequestAdminError;
export const selectUpdateProductRequestAdminLoading = (state: any) =>
  state.productRequestStatus.updateProductRequestAdminLoading;
export const selectUpdateProductRequestAdminData = (state: any) =>
  state.productRequestStatus.updateProductRequestAdminData;

export const selectUpdateProductRequestProviderAdminError = (state: any) =>
  state.productRequestStatus.updateProductRequestProviderAdminError;
export const selectUpdateProductRequestProviderAdminLoading = (state: any) =>
  state.productRequestStatus.updateProductRequestProviderAdminLoading;
export const selectUpdateProductRequestProviderAdminData = (state: any) =>
  state.productRequestStatus.updateProductRequestProviderAdminData;

export const selectDeleteProductRequestAdminError = (state: any) =>
  state.productRequestStatus.deleteProductRequestAdminError;
export const selectDeleteProductRequestAdminLoading = (state: any) =>
  state.productRequestStatus.deleteProductRequestAdminLoading;
export const selectDeleteProductRequestAdminData = (state: any) =>
  state.productRequestStatus.deleteProductRequestAdminData;

export const selectEditProductRequestAdminError = (state: any) =>
  state.productRequestStatus.editProductRequestAdminError;
export const selectEditProductRequestAdminLoading = (state: any) =>
  state.productRequestStatus.editProductRequestAdminLoading;
export const selectEditProductRequestAdminData = (state: any) =>
  state.productRequestStatus.editProductRequestAdminData;

// Export actions
export const { 
  clearUpdateProductRequestAdminData,
  clearGetProductRequestAdminByIdData,
  clearAllProductRequestAdminData
} = productRequestStatusSlice.actions;

export default productRequestStatusSlice.reducer;
