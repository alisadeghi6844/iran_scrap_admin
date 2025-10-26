import { BASE_URL } from "../../../api/config";
import HttpServises from "../../../api/HttpServises";
import {
  CLOSE_REQUEST_POINT,
  EXPIRE_OFFER_POINT,
  GET_PRODUCT_REQUEST_OFFER_ADMIN_POINT,
  GET_PRODUCT_REQUEST_OFFER_ADMIN_BY_ID_POINT,
  GET_PRODUCT_REQUEST_ADMIN_BY_ID_POINT,
  GET_PRODUCT_REQUEST_OFFERS_BY_REQUEST_ID_POINT,
  VERIFY_PAYMENT_POINT,
  MAKE_DELIVERED_POINT,
  SEND_OFFER_TO_BUYER_POINT,
  UPDATE_PRODUCT_REQUEST_OFFER_ADMIN_POINT,
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

export const getProductRequestOfferAdminService = async (params: any) => {
  const queryString = new URLSearchParams(params).toString();
  return await HttpServises.get(
    `${BASE_URL}${GET_PRODUCT_REQUEST_OFFER_ADMIN_POINT}?${queryString}`
  );
};

export const getProductRequestOfferAdminByIdService = async (offerId: string) => {
  return await HttpServises.get(
    `${BASE_URL}${GET_PRODUCT_REQUEST_OFFER_ADMIN_BY_ID_POINT}/${offerId}`
  );
};

export const getProductRequestAdminByIdService = async (requestId: string) => {
  return await HttpServises.get(
    `${BASE_URL}${GET_PRODUCT_REQUEST_ADMIN_BY_ID_POINT}/${requestId}`
  );
};

export const getProductRequestOffersByRequestIdService = async (requestId: string) => {
  return await HttpServises.get(
    `${BASE_URL}${GET_PRODUCT_REQUEST_OFFERS_BY_REQUEST_ID_POINT}/${requestId}`
  );
};

export const verifyPaymentService = async (data: {
  requestId: string;
  verified: boolean;
  comment: string;
}) => {
  return await HttpServises.post(
    `${BASE_URL}${VERIFY_PAYMENT_POINT}`,
    data
  );
};

export const makeDeliveredService = async (data: {
  orderId: string;
  unloadingDate: string;
}) => {
  return await HttpServises.post(
    `${BASE_URL}${MAKE_DELIVERED_POINT}`,
    data
  );
};

export const sendOfferToBuyerService = async (offerId: string) => {
  return await HttpServises.patch(
    `${BASE_URL}${SEND_OFFER_TO_BUYER_POINT}/${offerId}`,
    {}
  );
};

export const updateProductRequestOfferAdminService = async (offerId: string, data: unknown) => {
  return await HttpServises.put(
    `${BASE_URL}${UPDATE_PRODUCT_REQUEST_OFFER_ADMIN_POINT}/${offerId}`,
    data
  );
};