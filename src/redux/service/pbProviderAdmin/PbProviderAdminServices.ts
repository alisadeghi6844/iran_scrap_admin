import { BASE_URL } from "../../../api/config";
import HttpServises from "../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../utils/AxiosQuery";
import {
  CREATE_PB_PROVIDER_ADMIN_POINT,
  DELETE_PB_PROVIDER_ADMIN_POINT,
  GET_PB_PROVIDER_ADMIN_BY_ID_POINT,
  GET_PB_PROVIDER_ADMIN_POINT,
  UPDATE_PB_PROVIDER_ADMIN_POINT,
} from "../../api/pbProviderAdmin/PbProviderAdminApi";

export const getPbProviderAdminService = async (query: any) => {
  let queryText;
  if (!!query) {
    queryText = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_PB_PROVIDER_ADMIN_POINT}?${queryText ? queryText : null}`
  );
};

export const getPbProviderAdminByIdService = async (items: any) => {
  return await HttpServises.get(
    `${BASE_URL}${GET_PB_PROVIDER_ADMIN_BY_ID_POINT}/${items.credentials}`
  );
};

export const createPbProviderAdminService = async (items: any) => {
  return await HttpServises.post(`${BASE_URL}${CREATE_PB_PROVIDER_ADMIN_POINT}`, items);
};

export const updatePbProviderAdminService = async (items: any, id: any) => {
  return await HttpServises.patch(
    `${BASE_URL}${UPDATE_PB_PROVIDER_ADMIN_POINT}/${id}`,
    items
  );
};

export const deletePbProviderAdminService = async (id: any) => {
  return await HttpServises.delete(`${BASE_URL}${DELETE_PB_PROVIDER_ADMIN_POINT}/${id}`);
};