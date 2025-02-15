import { BASE_URL } from "../../../../../api/config";
import HttpServises from "../../../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../../../utils/AxiosQuery";
import {
  DELETE_ADMIN_FOOD_RESERVE_POINT,
  EXPORT_FOOD_RESERVE_POINT,
  GET_ALL_ADMIN_FOOD_RESERVE_POINT,
  GET_BY_ID_ADMIN_FOOD_RESERVE_POINT,
  POST_ADMIN_FOOD_RESERVE_POINT,
  PUT_ADMIN_FOOD_RESERVE_POINT,
} from "../../../../api/foodReservation/management/foodReserve/AdminFoodReserveApi";

export const getAllAdminFoodReserveService = async (query: any) => {
  let queryParams;
  if (query) {
    queryParams = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_ALL_ADMIN_FOOD_RESERVE_POINT}?${queryParams}`
  );
};

export const exportFoodReserveService = async (query: any) => {
  let queryParams;
  if (query) {
    queryParams = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${EXPORT_FOOD_RESERVE_POINT}?${queryParams}`
  );
};

export const createAdminFoodReserveService = async (items: any) => {
  return await HttpServises.post(
    `${BASE_URL}${POST_ADMIN_FOOD_RESERVE_POINT}`,
    items
  );
};

export const updateAdminFoodReserveService = async (items: any) => {
  return await HttpServises.put(
    `${BASE_URL}${PUT_ADMIN_FOOD_RESERVE_POINT}`,
    items
  );
};

export const deleteAdminFoodReserveService = async (items: any) => {
  return await HttpServises.delete(
    `${BASE_URL}${DELETE_ADMIN_FOOD_RESERVE_POINT}?id=${items}`
  );
};

export const getByIdAdminFoodReserveService = async (query: any) => {
  let queryParams;
  if (query) {
    queryParams = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_BY_ID_ADMIN_FOOD_RESERVE_POINT}?${queryParams}`
  );
};
