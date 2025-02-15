import { BASE_URL } from "../../../../../api/config";
import HttpServises from "../../../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../../../utils/AxiosQuery";
import {
  DELETE_APPETIZER_POINT,
  GET_ALL_APPETIZER_POINT,
  GET_BY_ID_APPETIZER_POINT,
  POST_APPETIZER_POINT,
  PUT_APPETIZER_POINT,
} from "../../../../api/foodReservation/management/appetizer/AppetizerApi";

export const getAllAppetizerService = async (query: any) => {
  let queryParams;
  if (query) {
    queryParams = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_ALL_APPETIZER_POINT}?${queryParams}`
  );
};

export const createAppetizerService = async (items: any) => {
  return await HttpServises.post(`${BASE_URL}${POST_APPETIZER_POINT}`, items, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateAppetizerService = async (items: any) => {
  return await HttpServises.put(`${BASE_URL}${PUT_APPETIZER_POINT}`, items, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteAppetizerService = async (items: any) => {
  return await HttpServises.delete(
    `${BASE_URL}${DELETE_APPETIZER_POINT}?id=${items}`
  );
};

export const getByIdAppetizerService = async (items: any) => {
  return await HttpServises.get(
    `${BASE_URL}${GET_BY_ID_APPETIZER_POINT}?id=${items}`
  );
};
