"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { UserContext } from "./UserContext";
import { getAllProductsById } from "@/services/products";
import { ProductsAPIType, ProductsType } from "@/_types/ProductsType";
import { UserType } from "@/_types/UserType";

interface CartContextType {
  cart: ProductsType[];
  total: string;
  addItemInCart: (product: ProductsAPIType) => void;
  deleteItemFromCart: (id: string | number) => void;
  increaseItem: (id: number | string, hm: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext({} as CartContextType);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState<ProductsType[]>([]);
  const [total, setTotal] = useState("0.00");

  function mergeArraysById(arr1: ProductsType[], arr2: UserType["cart"]) {
    return arr1.map((item1) => {
      const match = arr2.find((item2) => item2._id === item1.id);
      return match ? { ...item1, howMany: match.how_many } : item1;
    });
  }

  useLayoutEffect(() => {
    async function gettingCart() {
      if (!user) return;

      const res = await getAllProductsById(user.cart);
      if (!res) return;

      setCart(mergeArraysById(res, user.cart));
    }

    gettingCart();
  }, [user]);

  useLayoutEffect(() => {
    if (!cart.length) return;
    const totalPrice = cart.reduce(
      (prev, current) => prev + current.price * current.howMany,
      0
    );
    setTotal(totalPrice.toFixed(2));
  }, [cart]);

  function addItemInCart(product: ProductsAPIType) {
    const newProduct = {
      ...product,
      howMany: 1,
    };

    setCart((prevState) => [...prevState, newProduct]);
  }

  function deleteItemFromCart(id: string | number) {
    const deletedItem = cart.filter((car) => car.id !== id);
    setCart(deletedItem);
  }

  function increaseItem(id: number | string, hm: number) {
    const updatedItem = cart.map((item) =>
      item.id === id ? { ...item, howMany: hm } : item
    );

    setCart(updatedItem);
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        addItemInCart,
        deleteItemFromCart,
        increaseItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
