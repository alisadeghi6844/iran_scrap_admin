import HttpServises from "../../../api/HttpServises";
import { AxiosQueryCustom } from "../../../utils/AxiosQuery";
import { GET_PRICE_SCRAP_PRODUCTS_POINT } from "../../api/priceScrap/PriceScrapApi";

// Base URL for price scrap API
const PRICE_SCRAP_BASE_URL = "http://localhost:3004";

export const getPriceScrapProductsService = async (query: any) => {
  let queryText;
  if (!!query) {
    queryText = AxiosQueryCustom(query);
  }
  return await HttpServises.get(
    `${PRICE_SCRAP_BASE_URL}/${GET_PRICE_SCRAP_PRODUCTS_POINT}${queryText ? `?${queryText}` : ""}`
  );
};

