import axios from "axios";
import { getNewToken } from "./token";
import process from "process";

export const tokenInterceptor = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

tokenInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest?.__isRetryRequest) {
      originalRequest.__isRetryRequest = true;
      originalRequest.retry = true;

      const response = await getNewToken();
      console.log(response, 'resposta')
      if (!response || response?.response?.status === 403) {
        console.log('eita...')
        location.replace("/login");
        return Promise.reject(error);
      }
      return tokenInterceptor(originalRequest);
    }

    return Promise.reject(error);
  }
);

export const firstLoadingInterceptor = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

firstLoadingInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest?.__isRetryRequest) {
      originalRequest.__isRetryRequest = true;
      originalRequest.retry = true;

      const response = await getNewToken();

      if (!response || response?.response?.status === 403) {
        return Promise.reject(error);
      }
      return tokenInterceptor(originalRequest);
    }

    return Promise.reject(error);
  }
);

export const configAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});
