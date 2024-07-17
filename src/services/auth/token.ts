import { tokenInterceptor, configAPI } from "./axiosConfig";

export async function getNewToken() {
  try {
    return await configAPI
      .post(`/refresh-token`)
      .then((res) => res)
      .catch((err) => err);
  } catch (err) {
    return false;
  }
}

export async function IsValidToken() {
  try {
    return await tokenInterceptor
      .get(`/token`)
      .then((res) => !!res)
      .catch((err) => false);
  } catch (err) {
    return false;
  }
}
