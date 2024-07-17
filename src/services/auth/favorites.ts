import { tokenInterceptor } from "./axiosConfig";

export async function getFavoritesDB() {
  try {
    return await tokenInterceptor
      .get(`/favorites`)
      .then((res) => res)
      .catch((err) => null);
  } catch (err) {
    return null;
  }
}

export async function setFavoritesDB(productId: string | number) {
  try {
    return await tokenInterceptor
      .post(`/favorites`, { productId })
      .then((res) => res)
      .catch((err) => null);
  } catch (err) {
    return null;
  }
}

export async function deleteFavoritesDB(productId: string | number) {
  try {
    return await tokenInterceptor
      .delete(`/favorites`, { data: { productId } })
      .then((res) => res)
      .catch((err) => null);
  } catch (err) {
    return null;
  }
}
