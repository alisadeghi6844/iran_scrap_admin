import HttpServises from "../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../utils/AxiosQuery";
import { GET_PRICE_SCRAP_PRODUCTS_POINT } from "../../api/priceScrap/PriceScrapApi";
import { BASE_URL } from "../../../api/config";

export const getPriceScrapProductsService = async (query: any) => {
  let queryText;
  if (!!query) {
    queryText = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${BASE_URL}${GET_PRICE_SCRAP_PRODUCTS_POINT}${queryText ? `?${queryText}` : ""}`
  );
};

