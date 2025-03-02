import { BASE_URL } from "../../../api/config";
import HttpServises from "../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../utils/AxiosQuery";
import {
  GET_USER_PROFILE_POINT,
  GET_USERS_POINT,
} from "../../api/users/UsersApi";

export const GetUsersService = async (query: any) => {
  let queryText;
  if (!!query) {
    queryText = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_USERS_POINT}?${queryText ? queryText : null}`
  );
};

export const GetUserProfileService = async (query: any) => {
  let queryText;
  if (!!query) {
    queryText = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_USER_PROFILE_POINT}?${queryText ? queryText : null}`
  );
};
