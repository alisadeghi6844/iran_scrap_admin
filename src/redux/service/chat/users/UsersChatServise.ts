import { BASE_URL } from "../../../../api/config";
import HttpServises from "../../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../../utils/AxiosQuery";
import {
  GET_ALL_USERS_CHAT_POINT,
  GET_CONTACT_BY_ID_POINT,
  GET_CONTACTS_FOR_DM_POINT,
  GET_MESSAGES_POINT,
  GET_STATIC_CONTACTS_POINT,
} from "../../../api/chat/users/UsersChatApi";

export const getAllUsersChatService = async (query: any) => {
  let queryParams;
  if (query) {
    queryParams = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_ALL_USERS_CHAT_POINT}?${queryParams}`
  );
};

export const getContactByIdService = async (query: any) => {
  let queryParams;
  if (query) {
    queryParams = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_CONTACT_BY_ID_POINT}?${queryParams}`
  );
};

export const getMessagesService = async (query: any) => {
  let queryParams;
  if (query) {
    queryParams = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_MESSAGES_POINT}?${queryParams}`
  );
};

export const getContactsForDmService = async (query: any) => {
  let queryParams;
  if (query) {
    queryParams = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_CONTACTS_FOR_DM_POINT}?${queryParams}`
  );
};

export const getStaticContactsService = async (query: any) => {
  let queryParams;
  if (query) {
    queryParams = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_STATIC_CONTACTS_POINT}?${queryParams}`
  );
};
