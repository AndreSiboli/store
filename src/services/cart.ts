import axios from "axios";
import process from "process";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export async function getCartDB() {
  try {
    return await instance
      .get(`/cart`)
      .then((res) => res)
      .catch((err) => null);
  } catch (err) {
    return null;
  }
}

export async function setCartItemDB(productId: string | number) {
  try {
    return await instance
      .post(`/cart`, { productId })
      .then((res) => res)
      .catch((err) => null);
  } catch (err) {
    return null;
  }
}

export async function deleteCartItemDB(productId: string | number) {
  try {
    return await instance
      .delete(`/cart`, { data: { productId } })
      .then((res) => res)
      .catch((err) => null);
  } catch (err) {
    return null;
  }
}

export async function clearCartDB() {
  try {
    return await instance
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
    return await instance
      .patch(`/cart`, { productId, howMany })
      .then((res) => res)
      .catch((err) => null);
  } catch (err) {
    return null;
  }
}
