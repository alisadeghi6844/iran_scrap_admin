import { BASE_URL } from "../../../api/config";
import HttpServises from "../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../utils/AxiosQuery";
import {
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

