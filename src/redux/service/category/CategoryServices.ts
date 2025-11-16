import { BASE_URL } from "../../../api/config";
import HttpServises from "../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../utils/AxiosQuery";
import {
  CREATE_CATEGORY_ATTRIBUTE_POINT,
  CREATE_CATEGORY_POINT,
  GET_CATEGORY_BY_ID_POINT,
  GET_CATEGORY_POINT,
  UPDATE_CATEGORY_ATTRIBUTE_POINT,
  UPDATE_CATEGORY_POINT,
} from "../../api/category/CategoryApi";

export const getCategoryService = async (query: any) => {
  let queryText = "";
  
  if (query) {
    queryText = AxiosQueryCustom(query);
  }
  
  // If no query text is generated, add default parentId=null
  if (!queryText) {
    queryText = "parentId=null";
  }
  
  return await HttpServises.get(
    `${BASE_URL}${GET_CATEGORY_POINT}?${queryText}`
  );
};
export const getCategoryByIdService = async (items: any) => {
  console.log("items", items);
  return await HttpServises.get(
    `${BASE_URL}${GET_CATEGORY_BY_ID_POINT}/${items.credentials?.credentials}`
  );
};
export const createCategoryService = async (items: any) => {
  return await HttpServises.post(`${BASE_URL}${CREATE_CATEGORY_POINT}`, items);
};

export const updateCategoryService = async (items: any, id: any) => {
  return await HttpServises.patch(
    `${BASE_URL}${UPDATE_CATEGORY_POINT}/${id}`,
    items
  );
};

export const createCategoryAttributeService = async (items: any) => {
  return await HttpServises.post(
    `${BASE_URL}${CREATE_CATEGORY_ATTRIBUTE_POINT}`,
    items
  );
};

export const updateCategoryAttributeService = async (items: any) => {
  return await HttpServises.patch(
    `${BASE_URL}${UPDATE_CATEGORY_ATTRIBUTE_POINT}/${items}`
  );
};
