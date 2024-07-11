import axios from "axios";
import process from "process";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export async function getFavoritesDB() {
  try {
    return await instance
      .get(`/favorites`)
      .then((res) => res)
      .catch((err) => null);
  } catch (err) {
    return null;
  }
}

export async function setFavoritesDB(productId: string | number) {
  try {
    return await instance
      .post(`/favorites`, { productId })
      .then((res) => res)
      .catch((err) => null);
  } catch (err) {
    return null;
  }
}

export async function deleteFavoritesDB(productId: string | number) {
  try {
    return await instance
      .delete(`/favorites`, { data: { productId } })
      .then((res) => res)
      .catch((err) => null);
  } catch (err) {
    return null;
  }
}
