import { BASE_URL } from "../../../api/config";
import HttpServises from "../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../utils/AxiosQuery";
import {
  CHANGE_CLIENT_PASSWORD_POINT,
  CHANGE_PASSWORD_POINT,
  GET_ALL_USERS_POINT,
  GET_CURRENT_USER_INFO_POINT,
  IS_TOKEN_VALID_POINT,
  LOG_OUT_POINT,
  LOGIN_POINT,
  SEND_CLIENT_OTP_POINT,
  VERIFY_OTP_POINT,
} from "../../api/account/AccountApi";

export const LoginService = async (items: any) => {
  return await HttpServises.post(`${BASE_URL}${LOGIN_POINT}`, items);
};

export const LogOutService = async (items: any) => {
  return await HttpServises.post(`${BASE_URL}${LOG_OUT_POINT}`, items);
};

export const ChangePasswordService = async (items: any) => {
  return await HttpServises.post(`${BASE_URL}${CHANGE_PASSWORD_POINT}`, items);
};

export const IsTokenValidService = async (items: any) => {
  return await HttpServises.get(`${BASE_URL}${IS_TOKEN_VALID_POINT}`);
};

export const getAllUsersService = async (query: any) => {
  let queryParams;
  if (query) {
    queryParams = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_ALL_USERS_POINT}?${queryParams}`
  );
};

export const GetCurrentUserInfoService = async (items: any) => {
  return await HttpServises.get(`${BASE_URL}${GET_CURRENT_USER_INFO_POINT}`);
};

export const SendClientOtpService = async (items: any) => {
  return await HttpServises.post(`${BASE_URL}${SEND_CLIENT_OTP_POINT}`, items);
};

export const VerifyOtpService = async (items: any) => {
  return await HttpServises.post(`${BASE_URL}${VERIFY_OTP_POINT}`, items);
};

export const ChangeClientPasswordService = async (items: any) => {
  return await HttpServises.post(`${BASE_URL}${CHANGE_CLIENT_PASSWORD_POINT}`, items);
};