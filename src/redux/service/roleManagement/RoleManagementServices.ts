import { BASE_URL } from "../../../api/config";
import HttpServises from "../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../utils/AxiosQuery";
import {
  ASSIGN_ROLE_MANAGEMENT_POINT,
  CREATE_ROLE_MANAGEMENT_POINT,
  DELETE_ROLE_MANAGEMENT_POINT,
  GET_ROLE_MANAGEMENT_BY_ID_POINT,
  GET_ROLE_MANAGEMENT_POINT,
  GET_PERMISSIONS_POINT,
  REVOKE_ROLE_MANAGEMENT_POINT,
  UPDATE_ROLE_MANAGEMENT_POINT,
} from "../../api/roleManagement/RoleManagementApi";

export const getRoleManagementService = async (query: any) => {
  let queryText;
  if (!!query) {
    queryText = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_ROLE_MANAGEMENT_POINT}?${queryText ? queryText : null}`
  );
};

export const getRoleManagementByIdService = async (items: any) => {
  return await HttpServises.get(
    `${BASE_URL}${GET_ROLE_MANAGEMENT_BY_ID_POINT}/${items.credentials?.credentials}`
  );
};

export const createRoleManagementService = async (items: any) => {
  return await HttpServises.post(`${BASE_URL}${CREATE_ROLE_MANAGEMENT_POINT}`, items);
};

export const updateRoleManagementService = async (items: any, id: any) => {
  return await HttpServises.put(
    `${BASE_URL}${UPDATE_ROLE_MANAGEMENT_POINT}/${id}`,
    items
  );
};

export const deleteRoleManagementService = async (id: any) => {
  
  return await HttpServises.delete(`${BASE_URL}${DELETE_ROLE_MANAGEMENT_POINT}/${id}`);
};

export const assignRoleManagementService = async (items: any) => {
  return await HttpServises.patch(`${BASE_URL}${ASSIGN_ROLE_MANAGEMENT_POINT}`, items);
};

export const revokeRoleManagementService = async (items: any) => {
  return await HttpServises.patch(`${BASE_URL}${REVOKE_ROLE_MANAGEMENT_POINT}`, items);
};

export const getPermissionsService = async (items: any) => {
  return await HttpServises.get(`${BASE_URL}${GET_PERMISSIONS_POINT}?${items}`);
};
