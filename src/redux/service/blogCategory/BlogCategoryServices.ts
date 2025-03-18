import { BASE_URL } from "../../../api/config";
import HttpServises from "../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../utils/AxiosQuery";
import {
  CREATE_BLOG_CATEGORY_POINT,
  DELETE_BLOG_CATEGORY_POINT,
  GET_BLOG_CATEGORY_BY_ID_POINT,
  GET_BLOG_CATEGORY_POINT,
  UPDATE_BLOG_CATEGORY_POINT,
} from "../../api/blogCategory/BlogCategoryApi";

export const getBlogCategoryService = async (query: any) => {
  let queryText;
  if (!!query) {
    queryText = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_BLOG_CATEGORY_POINT}?${queryText ? queryText : null}`
  );
};

export const getBlogCategoryByIdService = async (items: any) => {
  console.log("items",items)
  return await HttpServises.get(
    `${BASE_URL}${GET_BLOG_CATEGORY_BY_ID_POINT}/${items.credentials?.credentials}`
  );
};

export const createBlogCategoryService = async (items: any) => {
  console.log(items);
  return await HttpServises.post(`${BASE_URL}${CREATE_BLOG_CATEGORY_POINT}`, items);
};

export const updateBlogCategoryService = async (items: any, id: any) => {
  return await HttpServises.patch(
    `${BASE_URL}${UPDATE_BLOG_CATEGORY_POINT}/${id}`,
    items
  );
};

export const deleteBlogCategoryService = async (id: any) => {
  return await HttpServises.delete(`${BASE_URL}${DELETE_BLOG_CATEGORY_POINT}/${id}`);
};
