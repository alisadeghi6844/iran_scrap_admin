import { BASE_URL } from "../../../api/config";
import HttpServises from "../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../utils/AxiosQuery";
import {
  CREATE_PRODUCT_POINT,
  DELETE_PRODUCT_POINT,
  GET_PRODUCT_BY_ID_POINT,
  GET_PRODUCT_POINT,
  UPDATE_PRODUCT_POINT,
  UPDATE_PRODUCT_STATUS_POINT,
  CHANGE_PRODUCT_STATUS_POINT,
  EDIT_PRODUCT_ADMIN_POINT,
  UPLOAD_PRODUCT_IMAGE_POINT,
  DELETE_PRODUCT_IMAGE_POINT,
} from "../../api/product/ProductApi";

export const getProductService = async (query: any) => {
  let queryText;
  if (!!query) {
    queryText = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_PRODUCT_POINT}?${queryText ? queryText : null}`
  );
};

export const getProductByIdService = async (items: any) => {
  return await HttpServises.get(
    `${BASE_URL}${GET_PRODUCT_BY_ID_POINT}/${items.credentials}`
  );
};

export const createProductService = async (items: any) => {
  return await HttpServises.post(`${BASE_URL}${CREATE_PRODUCT_POINT}`, items);
};

export const updateProductService = async (items: any, id: any) => {
  return await HttpServises.patch(
    `${BASE_URL}${UPDATE_PRODUCT_POINT}/${id}`,
    items
  );
};

export const deleteProductService = async (id: any) => {
  return await HttpServises.delete(`${BASE_URL}${DELETE_PRODUCT_POINT}/${id}`);
};

export const updateProductStatusService = async (items: any, id: any) => {
  return await HttpServises.patch(
    `${BASE_URL}${UPDATE_PRODUCT_STATUS_POINT}/${id}`,
    items
  );
};

export const changeProductStatusService = async (items: unknown) => {
  return await HttpServises.patch(
    `${BASE_URL}${CHANGE_PRODUCT_STATUS_POINT}/${items.productId}/change-status`,
    { status: items.status }
  );
};

export const editProductAdminService = async (productId: string, items: any) => {
  return await HttpServises.patch(
    `${BASE_URL}${EDIT_PRODUCT_ADMIN_POINT}/${productId}`,
    items
  );
};

export const uploadProductImageService = async (productId: string, formData: FormData) => {
  return await HttpServises.patch(
    `${BASE_URL}${UPLOAD_PRODUCT_IMAGE_POINT}/${productId}/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const deleteProductImageService = async (productId: string, imageId: string) => {
  return await HttpServises.delete(
    `${BASE_URL}${DELETE_PRODUCT_IMAGE_POINT}/${productId}/image/${imageId}`
  );
};