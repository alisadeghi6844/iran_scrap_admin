import axios from "axios";
import { toast } from "react-toastify";

import { GetToken } from "./getToken";
import { SetToken } from "./setToken";
import EventEmitter from "./EventEmitter";
import eventEmitter from "./EventEmitter";

class HttpService {
  constructor() {
    let hasRedirected = false;
    axios.interceptors.request.use(
      (config) => {
        const token = GetToken("access_token");
        if (token && token !== "") {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        if (response?.data?.isChangePassword && !hasRedirected) {
          hasRedirected = true;
          eventEmitter.emit("changePassword"); // رویداد را منتشر کنید
        }
        return response;
      },

      async (error) => {
        if (error?.response?.status == 401) {
          SetToken("access_token", null, 0);
          window.location = "/login";
        }

        if (error?.response?.status == 429) {
          toast.error(
            "شما بیش از حد مجاز درخواست ارسال کرده‌اید. لطفاً بعد از چند دقیقه دوباره تلاش کنید."
          );
        } else if (error?.response?.data?.errors) {
          const result = error?.response?.data?.errors.join(",") + ",";
          toast.error(result);
        } else if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error("خطایی از سمت سرور رخ داده است");
        }

        return Promise.reject(error); // حتماً باید خطا را برگردانید
      }
    );
  }

  updateContent() {
    document.getElementById("root");
  }

  get(url: string, config?: any) {
    return axios.get(url, config);
  }

  post(url: string, data?: any, config?: any) {
    return axios.post(url, data, config);
  }

  put(url: string, data?: any, config?: any) {
    return axios.put(url, data, config);
  }

  patch(url: string, data?: any, config?: any) {
    return axios.patch(url, data, config);
  }

  delete(url: string, config?: any) {
    return axios.delete(url, config);
  }
}

export default new HttpService();
