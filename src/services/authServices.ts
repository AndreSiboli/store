import axios from "axios";
import process from "process";

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

interface PasswordType {
  password: string;
  repassword: string;
  lastPassword: string;
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export async function login(data: LoginType) {
  try {
    return await instance
      .post(`/login`, data)
      .then((res) => res)
      .catch((err) => null);
  } catch (error) {
    return null;
  }
}

export async function signup(data: SignupType) {
  try {
    return await instance
      .post(`/register`, data)
      .then((res) => res)
      .catch((err) => {
        return err.response;
      });
  } catch (error) {
    return null;
  }
}

export async function getUserDB() {
  try {
    return await instance
      .get(`/users`)
      .then((res) => res.data.user)
      .catch((err) => null);
  } catch (error) {
    return null;
  }
}

export async function checkIsValidToken() {
  try {
    return await instance
      .get(`/token`)
      .then((res) => !!res)
      .catch((err) => console.log(err));
  } catch (err) {
    return false;
  }
}

export async function logout() {
  try {
    return await instance
      .get(`/logout`)
      .then((res) => res)
      .catch((err) => null);
  } catch (error) {
    return null;
  }
}

export async function deleteAccountDB() {
  try {
    return await instance
      .delete(`/users`)
      .then((res) => res)
      .catch((err) => null);
  } catch (error) {
    return null;
  }
}

export async function changePasswordDB(data: PasswordType) {
  try {
    return await instance
      .patch(`/users/password`, data)
      .then((res) => res)
      .catch((err) => err.response);
  } catch (err) {
    return false;
  }
}
