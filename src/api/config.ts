export const BASE_URL =
  import.meta.env.VITE_APP_TYPE === "development"
    ? "http://localhost:3030/"
    : import.meta.env.VITE_APP_TYPE === "production"
    ? "http://192.168.170.27:3030/"
    : null;
