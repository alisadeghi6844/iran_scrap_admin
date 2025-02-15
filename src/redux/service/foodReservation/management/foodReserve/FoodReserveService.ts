import { BASE_URL } from "../../../../../api/config";
import HttpServises from "../../../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../../../utils/AxiosQuery";
import {
  DELETE_CLIENT_FOOD_RESERVE_POINT,
  GET_ALL_CLIENT_FOOD_RESERVE_POINT,
  GET_CURRENT_USER_HISTORY_POINT,
  POST_CLIENT_FOOD_RESERVE_POINT,
} from "../../../../api/foodReservation/management/foodReserve/FoodReserveApi";

export const getAllClientFoodReserveService = async (query: any) => {
  let queryParams;
  if (query) {
    queryParams = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_ALL_CLIENT_FOOD_RESERVE_POINT}?${queryParams}`
  );
};

export const createClientFoodReserveService = async (items: any) => {
  return await HttpServises.post(
    `${BASE_URL}${POST_CLIENT_FOOD_RESERVE_POINT}`,
    items
  );
};

export const deleteClientFoodReserveService = async (items: any, date: any) => {
  return await HttpServises.delete(
    `${BASE_URL}${DELETE_CLIENT_FOOD_RESERVE_POINT}?id=${items}&date=${date}`
  );
};

export const getCurrentUserHistoryService = async (query: any) => {
  let queryParams;
  if (query) {
    queryParams = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_CURRENT_USER_HISTORY_POINT}?${queryParams}`
  );
};
