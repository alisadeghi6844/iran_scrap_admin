export const BASE_URL =
  import.meta.env.VITE_APP_TYPE === "development"
    ? import.meta.env.VITE_APP_API_POINT
    : import.meta.env.VITE_APP_TYPE === "production"
    ? import.meta.env.VITE_APP_API_POINT
    : null;
