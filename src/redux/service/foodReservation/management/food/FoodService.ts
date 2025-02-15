import { BASE_URL } from "../../../../../api/config";
import HttpServises from "../../../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../../../utils/AxiosQuery";
import {
  DELETE_FOOD_POINT,
  GET_ALL_FOOD_POINT,
  GET_BY_ID_FOOD_POINT,
  POST_FOOD_POINT,
  PUT_FOOD_POINT,
} from "../../../../api/foodReservation/management/food/FoodApi";

export const getAllFoodService = async (query: any) => {
  let queryParams;
  if (query) {
    queryParams = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_ALL_FOOD_POINT}?${queryParams}`
  );
};

export const createFoodService = async (items: any) => {
  return await HttpServises.post(`${BASE_URL}${POST_FOOD_POINT}`, items, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateFoodService = async (items: any) => {
  return await HttpServises.put(`${BASE_URL}${PUT_FOOD_POINT}`, items, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteFoodService = async (items: any) => {
  return await HttpServises.delete(
    `${BASE_URL}${DELETE_FOOD_POINT}?id=${items}`
  );
};

export const getByIdFoodService = async (items: any) => {
  return await HttpServises.get(
    `${BASE_URL}${GET_BY_ID_FOOD_POINT}?id=${items}`
  );
};
