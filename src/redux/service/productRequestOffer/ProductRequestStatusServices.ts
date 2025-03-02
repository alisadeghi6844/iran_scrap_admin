import { BASE_URL } from "../../../api/config";
import HttpServises from "../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../utils/AxiosQuery";
import {
  GET_PRODUCT_REQUEST_OFFER_BY_ID_POINT,
  GET_PRODUCT_REQUEST_OFFER_POINT,
  UPDATE_PRODUCT_REQUEST_OFFER_POINT,
  UPDATE_PRODUCT_REQUEST_OFFER_SEND_TO_BUYER_POINT,
} from "../../api/productRequestOffer/ProductRequestStatusApi";

export const getProductRequestOfferService = async (query: any) => {
  let queryText;
  if (!!query) {
    queryText = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_PRODUCT_REQUEST_OFFER_POINT}?${
      queryText ? queryText : null
    }`
  );
};

export const getProductRequestOfferByIdService = async (items: any) => {
  return await HttpServises.get(
    `${BASE_URL}${GET_PRODUCT_REQUEST_OFFER_BY_ID_POINT}/${items}`
  );
};

export const updateProductRequestOfferService = async (items: any) => {
  return await HttpServises.patch(
    `${BASE_URL}${UPDATE_PRODUCT_REQUEST_OFFER_POINT}/${items}`
  );
};

export const updateProductRequestOfferToBuyerService = async (items: any) => {
  return await HttpServises.patch(
    `${BASE_URL}${UPDATE_PRODUCT_REQUEST_OFFER_SEND_TO_BUYER_POINT}/${items}`
  );
};
