import { BASE_URL } from "../../../api/config";
import HttpServises from "../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../utils/AxiosQuery";
import {
  DELETE_CREATE_USER_POINT,
  GET_ALL_CREATE_USER_POINT,
  GET_BY_ID_CREATE_USER_POINT,
  POST_CREATE_USER_POINT,
  PUT_CREATE_USER_POINT,
  UPDATE_USER_PASSWORD,
} from "../../api/account/CreateUser";

export const getAllCreateUserService = async (query: any) => {
  let queryParams;
  if (query) {
    queryParams = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_ALL_CREATE_USER_POINT}?${queryParams}`
  );
};

export const createCreateUserService = async (items: any) => {
  return await HttpServises.post(
    `${BASE_URL}${POST_CREATE_USER_POINT}`,
    items,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const updateCreateUserService = async (items: any) => {
  return await HttpServises.put(`${BASE_URL}${PUT_CREATE_USER_POINT}`, items, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteCreateUserService = async (items: any) => {
  return await HttpServises.delete(
    `${BASE_URL}${DELETE_CREATE_USER_POINT}?id=${items}`
  );
};

export const getByIdCreateUserService = async (items: any) => {
  return await HttpServises.get(
    `${BASE_URL}${GET_BY_ID_CREATE_USER_POINT}?id=${items}`
  );
};

export const updateUserPasswordService = async (items: any) => {
  return await HttpServises.put(`${BASE_URL}${UPDATE_USER_PASSWORD}`, items);
};
