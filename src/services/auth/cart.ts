import { tokenInterceptor } from "./axiosConfig";

export async function getCartDB() {
  try {
    return await tokenInterceptor
      .get(`/cart`)
      .then((res) => res)
      .catch((err) => null);
  } catch (err) {
    return null;
  }
}

export async function setCartItemDB(productId: string | number) {
  try {
    return await tokenInterceptor
      .post(`/cart`, { productId })
      .then((res) => res)
      .catch((err) => null);
  } catch (err) {
    return null;
  }
}

export async function deleteCartItemDB(productId: string | number) {
  try {
    return await tokenInterceptor
      .delete(`/cart`, { data: { productId } })
      .then((res) => res)
      .catch((err) => null);
  } catch (err) {
    return null;
  }
}

export async function clearCartDB() {
  try {
    return await tokenInterceptor
      .delete(`/cart/clear`)
      .then((res) => res)
      .catch((err) => null);
  } catch (err) {
    return null;
  }
}

export async function updateHowManyDB({
  productId,
  howMany,
}: {
  productId: string | number;
  howMany: number;
}) {
  try {
    return await tokenInterceptor
      .patch(`/cart`, { productId, howMany })
      .then((res) => res)
      .catch((err) => null);
  } catch (err) {
    return null;
  }
}
