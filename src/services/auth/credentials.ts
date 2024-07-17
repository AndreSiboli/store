import { configAPI } from "./axiosConfig";

interface LoginType {
  email: string;
  password: string;
}

interface SignupType {
  username: string;
  email: string;
  password: string;
  repassword: string;
}

export async function login(data: LoginType) {
  try {
    return await configAPI
      .post(`/login`, data)
      .then((res) => res)
      .catch((err) => null);
  } catch (error) {
    return null;
  }
}

export async function signup(data: SignupType) {
  try {
    return await configAPI
      .post(`/register`, data)
      .then((res) => res)
      .catch((err) => {
        return err.response;
      });
  } catch (error) {
    return null;
  }
}
