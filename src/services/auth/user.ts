import {
  configAPI,
  firstLoadingInterceptor,
  tokenInterceptor,
} from "./axiosConfig";

interface PasswordType {
  password: string;
  repassword: string;
  lastPassword: string;
}

export async function firstLoadingPage() {
  try {
    return await firstLoadingInterceptor
      .get(`/users`)
      .then((res) => res.data.user)
      .catch((err) => null);
  } catch (error) {
    return null;
  }
}

export async function getUserDB() {
  try {
    return await tokenInterceptor
      .get(`/users`)
      .then((res) => res.data.user)
      .catch((err) => null);
  } catch (error) {
    return null;
  }
}

export async function logout() {
  try {
    return await tokenInterceptor
      .get(`/logout`)
      .then((res) => res)
      .catch((err) => null);
  } catch (error) {
    return null;
  }
}

export async function deleteAccountDB() {
  try {
    return await tokenInterceptor
      .delete(`/users`)
      .then((res) => res)
      .catch((err) => null);
  } catch (error) {
    return null;
  }
}

export async function changePasswordDB(data: PasswordType) {
  try {
    return await tokenInterceptor
      .patch(`/users/password`, data)
      .then((res) => res)
      .catch((err) => err.response);
  } catch (err) {
    return false;
  }
}
