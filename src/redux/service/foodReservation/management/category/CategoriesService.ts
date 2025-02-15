import { BASE_URL } from "../../../../../api/config";
import HttpServises from "../../../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../../../utils/AxiosQuery";
import {
  DELETE_FOOD_CATEGORIES_POINT,
  GET_ALL_FOOD_CATEGORIES_POINT,
  GET_BY_ID_FOOD_CATEGORIES_POINT,
  POST_FOOD_CATEGORIES_POINT,
  PUT_FOOD_CATEGORIES_POINT,
} from "../../../../api/foodReservation/management/category/CategoriesApi";

export const getAllFoodCategoriesService = async (query: any) => {
  let queryParams;
  if (query) {
    queryParams = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_ALL_FOOD_CATEGORIES_POINT}?${queryParams}`
  );
};

export const createFoodCategoriesService = async (items: any) => {
  return await HttpServises.post(
    `${BASE_URL}${POST_FOOD_CATEGORIES_POINT}`,
    items,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const updateFoodCategoriesService = async (items: any) => {
  return await HttpServises.put(
    `${BASE_URL}${PUT_FOOD_CATEGORIES_POINT}`,
    items,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const deleteFoodCategoriesService = async (items: any) => {
  return await HttpServises.delete(
    `${BASE_URL}${DELETE_FOOD_CATEGORIES_POINT}?id=${items}`
  );
};

export const getByIdFoodCategoriesService = async (items: any) => {
  return await HttpServises.get(
    `${BASE_URL}${GET_BY_ID_FOOD_CATEGORIES_POINT}?id=${items}`
  );
};
