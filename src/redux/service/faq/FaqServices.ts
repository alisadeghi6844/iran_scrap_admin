import { BASE_URL } from "../../../api/config";
import HttpServises from "../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../utils/AxiosQuery";
import {
  CREATE_FAQ_POINT,
  DELETE_FAQ_POINT,
  GET_FAQ_POINT,
  UPDATE_FAQ_POINT,
} from "../../api/faq/FaqApi";

export const getFaqService = async (query: any) => {
  let queryText;
  if (!!query) {
    queryText = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_FAQ_POINT}?${queryText ? queryText : null}`
  );
};

export const createFaqService = async (items: any) => {
  return await HttpServises.post(`${BASE_URL}${CREATE_FAQ_POINT}`, items);
};

export const updateFaqService = async (items: any, id: any) => {
  return await HttpServises.patch(
    `${BASE_URL}${UPDATE_FAQ_POINT}/${id}`,
    items
  );
};

export const deleteFaqService = async (id: any) => {
  return await HttpServises.delete(`${BASE_URL}${DELETE_FAQ_POINT}/${id}`);
};
