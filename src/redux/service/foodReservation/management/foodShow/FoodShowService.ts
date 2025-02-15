import { BASE_URL } from "../../../../../api/config";
import HttpServises from "../../../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../../../utils/AxiosQuery";
import {
  DELETE_FOOD_SHOW_POINT,
  GET_ALL_CLIENT_FOODS_POINT,
  GET_ALL_FOOD_SHOW_POINT,
  GET_BY_ID_FOOD_SHOW_POINT,
  POST_FOOD_SHOW_POINT,
  PUT_FOOD_SHOW_POINT,
} from "../../../../api/foodReservation/management/foodShow/FoodShowApi";

export const getAllFoodShowService = async (query: any) => {
  let queryParams;
  if (query) {
    queryParams = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_ALL_FOOD_SHOW_POINT}?${queryParams}`
  );
};

export const getAllClientFoodsService = async (query: any) => {
  let queryParams;
  if (query) {
    queryParams = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_ALL_CLIENT_FOODS_POINT}?${queryParams}`
  );
};

export const createFoodShowService = async (items: any) => {
  return await HttpServises.post(`${BASE_URL}${POST_FOOD_SHOW_POINT}`, items);
};

export const updateFoodShowService = async (items: any) => {
  return await HttpServises.put(`${BASE_URL}${PUT_FOOD_SHOW_POINT}`, items);
};

export const deleteFoodShowService = async (items: any) => {
  return await HttpServises.delete(
    `${BASE_URL}${DELETE_FOOD_SHOW_POINT}?id=${items}`
  );
};

export const getByIdFoodShowService = async (items: any) => {
  return await HttpServises.get(
    `${BASE_URL}${GET_BY_ID_FOOD_SHOW_POINT}?id=${items}`
  );
};
