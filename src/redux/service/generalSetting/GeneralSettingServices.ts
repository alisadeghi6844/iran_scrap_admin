import { BASE_URL } from "../../../api/config";
import HttpServises from "../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../utils/AxiosQuery";
import {
  CREATE_GENERAL_SETTING_POINT,
  DELETE_GENERAL_SETTING_POINT,
  GET_GENERAL_SETTING_POINT,
  UPDATE_GENERAL_SETTING_POINT,
} from "../../api/generalSetting/GeneralSettingApi";

export const getGeneralSettingService = async (query: any) => {
  let queryText;
  if (!!query) {
    queryText = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_GENERAL_SETTING_POINT}?${queryText ? queryText : null}`
  );
};

export const createGeneralSettingService = async (items: any) => {
  return await HttpServises.post(`${BASE_URL}${CREATE_GENERAL_SETTING_POINT}`, items);
};

export const updateGeneralSettingService = async (items: any, id: any) => {
  return await HttpServises.patch(
    `${BASE_URL}${UPDATE_GENERAL_SETTING_POINT}/${id}`,
    items
  );
};

export const deleteGeneralSettingService = async (id: any) => {
  return await HttpServises.delete(`${BASE_URL}${DELETE_GENERAL_SETTING_POINT}/${id}`);
};
