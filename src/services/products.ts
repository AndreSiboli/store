import axios from "axios";

const instance = axios.create({
  baseURL: "https://dummyjson.com",
});

export async function getByCategory(category: string) {
  try {
    return await instance
      .get(`/products/category/${category}`)
      .then((res) => res.data.products)
      .catch((err) => null);
  } catch (err) {
    return null;
  }
}

export async function getProductById(product: string) {
  try {
    return await instance
      .get(`products/${product}`)
      .then((res) => res)
      .catch((err) => null);
  } catch (error) {
    return null;
  }
}

export async function getAllProductsById(datas: { _id: string }[]) {
  try {
    const urls = datas.map((data) => `/products/${data._id}`);

    return await axios
      .all(urls.map((url) => instance.get(`${url}`)))
      .then((res) => res.map((r) => r.data))
      .catch((err) => null);
  } catch (error) {
    return null;
  }
}
