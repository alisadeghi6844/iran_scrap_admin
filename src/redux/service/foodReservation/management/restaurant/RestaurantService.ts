import { BASE_URL } from "../../../../../api/config";
import HttpServises from "../../../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../../../utils/AxiosQuery";
import {
  DELETE_RESTAURANT_POINT,
  GET_ALL_RESTAURANT_POINT,
  GET_BY_ID_RESTAURANT_POINT,
  POST_RESTAURANT_POINT,
  PUT_RESTAURANT_POINT,
} from "../../../../api/foodReservation/management/restaurant/RestaurantApi";

export const getAllRestaurantService = async (query: any) => {
  let queryParams;
  if (query) {
    queryParams = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_ALL_RESTAURANT_POINT}?${queryParams}`
  );
};

export const createRestaurantService = async (items: any) => {
  return await HttpServises.post(`${BASE_URL}${POST_RESTAURANT_POINT}`, items);
};

export const updateRestaurantService = async (items: any) => {
  return await HttpServises.put(`${BASE_URL}${PUT_RESTAURANT_POINT}`, items);
};

export const deleteRestaurantService = async (items: any) => {
  return await HttpServises.delete(
    `${BASE_URL}${DELETE_RESTAURANT_POINT}?id=${items}`
  );
};

export const getByIdRestaurantService = async (items: any) => {
  return await HttpServises.get(
    `${BASE_URL}${GET_BY_ID_RESTAURANT_POINT}?id=${items}`
  );
};
