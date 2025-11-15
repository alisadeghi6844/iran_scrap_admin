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
  let queryText = "";
  if (query && typeof query === "object") {
    queryText = AxiosQueryCustom(query);
  }
  const url = `${BASE_URL}${GET_TICKET_POINT}${
    queryText ? `?${queryText}` : ""
  }`;
  return await HttpServises.get(url);
};

export const getTicketByIdService = async (ticketId: any) => {
  // Handle both object and direct ID cases
  const id =
    typeof ticketId === "object" && ticketId.id ? ticketId.id : ticketId;
  return await HttpServises.get(`${BASE_URL}${GET_TICKET_BY_ID_POINT}/${id}`);
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

export const answerTicketService = async (
  ticketId: string,
  message: string
) => {
  const formData = new FormData();
  formData.append("message", message);

  return await HttpServises.post(
    `${BASE_URL}ticket-admin/answer/${ticketId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const closeTicketService = async (ticketId: string) => {
  return await HttpServises.patch(`${BASE_URL}ticket-admin/close/${ticketId}`);
};
