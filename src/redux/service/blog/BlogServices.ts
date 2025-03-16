import { BASE_URL } from "../../../api/config";
import HttpServises from "../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../utils/AxiosQuery";
import {
  CREATE_BLOG_POINT,
  DELETE_BLOG_POINT,
  GET_BLOG_BY_ID_POINT,
  GET_BLOG_POINT,
  UPDATE_BLOG_POINT,
} from "../../api/blog/BlogApi";

export const getBlogService = async (query: any) => {
  let queryText;
  if (!!query) {
    queryText = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_BLOG_POINT}?${queryText ? queryText : null}`
  );
};

export const getBlogByIdService = async (items: any) => {
  return await HttpServises.get(
    `${BASE_URL}${GET_BLOG_BY_ID_POINT}/${items.credentials?.credentials}`
  );
};

export const createBlogService = async (items: any) => {
  return await HttpServises.post(`${BASE_URL}${CREATE_BLOG_POINT}`, items);
};

export const updateBlogService = async (items: any, id: any) => {
  return await HttpServises.patch(
    `${BASE_URL}${UPDATE_BLOG_POINT}/${id}`,
    items
  );
};

export const deleteBlogService = async (id: any) => {
  return await HttpServises.delete(`${BASE_URL}${DELETE_BLOG_POINT}/${id}`);
};
