import { BASE_URL } from "../../../api/config";
import HttpServises from "../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../utils/AxiosQuery";
import {
  CREATE_PRODUCT_PRICE_POINT,
  DELETE_PRODUCT_PRICE_POINT,
  GET_PRODUCT_PRICE_POINT,
  GET_PRODUCT_PRICE_BY_ID_POINT,
  UPDATE_PRODUCT_PRICE_POINT,
} from "../../api/productPrice/ProductPriceApi";

export const getProductPriceService = async (query: any) => {
  let queryText;
  if (!!query) {
    queryText = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_PRODUCT_PRICE_POINT}?${queryText ? queryText : null}`
  );
};

export const getProductPriceByIdService = async (items: any) => {
  return await HttpServises.get(
    `${BASE_URL}${GET_PRODUCT_PRICE_BY_ID_POINT}/${items.credentials}`
  );
};

export const createProductPriceService = async (items: any) => {
  return await HttpServises.post(
    `${BASE_URL}${CREATE_PRODUCT_PRICE_POINT}`,
    items
  );
};

export const updateProductPriceService = async (items: any, id: any) => {
  console.log("item", items);
  return await HttpServises.patch(
    `${BASE_URL}${UPDATE_PRODUCT_PRICE_POINT}/${id}`,
    items
  );
};

export const deleteProductPriceService = async (id: any) => {
  return await HttpServises.delete(
    `${BASE_URL}${DELETE_PRODUCT_PRICE_POINT}/${id}`
  );
};
