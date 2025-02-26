import { BASE_URL } from "../../../api/config";
import HttpServises from "../../../api/HttpServises";
import { GET_USERS_POINT } from "../../api/users/UsersApi";

export const GetUsersService = async (items: any) => {
  return await HttpServises.get(`${BASE_URL}${GET_USERS_POINT}`);
};