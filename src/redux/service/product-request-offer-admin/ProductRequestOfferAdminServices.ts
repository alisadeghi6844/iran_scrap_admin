import { BASE_URL } from "../../../api/config";
import HttpServises from "../../../api/HttpServises";
import {
  CLOSE_REQUEST_POINT,
  EXPIRE_OFFER_POINT,
} from "../../api/product-request-offer-admin/ProductRequestOfferAdminApi";

export const closeRequestService = async (requestId: string) => {
  return await HttpServises.post(
    `${BASE_URL}${CLOSE_REQUEST_POINT}/${requestId}`,
    {}
  );
};

export const expireOfferService = async (offerId: string) => {
  return await HttpServises.post(
    `${BASE_URL}${EXPIRE_OFFER_POINT}/${offerId}`,
    {}
  );
};