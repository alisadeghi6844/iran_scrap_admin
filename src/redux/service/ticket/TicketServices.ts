import { BASE_URL } from "../../../api/config";
import HttpServises from "../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../utils/AxiosQuery";
import {
  CREATE_TICKET_POINT,
  GET_TICKET_BY_ID_POINT,
  GET_TICKET_POINT,
  UPDATE_TICKET_POINT,
} from "../../api/ticket/TicketApi";

export const getTicketService = async (query: any) => {
  let queryText;
  if (!!query) {
    queryText = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_TICKET_POINT}?${queryText ? queryText : null}`
  );
};

export const getTicketByIdService = async (items: any) => {
  return await HttpServises.get(
    `${BASE_URL}${GET_TICKET_BY_ID_POINT}/${items.credentials?.credentials}`
  );
};

export const createTicketService = async (items: any) => {
  return await HttpServises.post(`${BASE_URL}${CREATE_TICKET_POINT}`, items);
};

export const updateTicketService = async (items: any, id: any) => {
  return await HttpServises.patch(
    `${BASE_URL}${UPDATE_TICKET_POINT}/${id}`,
    items
  );
};