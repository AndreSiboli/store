"use client";

import { CartContext } from "@/_contexts/CartContext";
import { UserContext } from "@/_contexts/UserContext";
import { ProductsAPIType } from "@/_types/ProductsType";
import { deleteCartItemDB, setCartItemDB } from "@/services/cart";
import styles from "@/styles/buttons/CartButtonMinimalist.module.scss";
import { useContext, useEffect, useState } from "react";

import { PiShoppingCart, PiCheck, PiX } from "react-icons/pi";

interface PropsType {
  data: ProductsAPIType;
}

export default function CartButtonMinimalist(props: PropsType) {
  const { data } = props;
  const { isUserLogged } = useContext(UserContext);
  const { addItemInCart, cart, deleteItemFromCart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState("");
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    setIsInCart(cart.filter((car) => car.id === data.id).length ? true : false);
  }, [cart]);

  async function addToCart() {
    if (!isUserLogged()) return;
    loadingCart();

    if (data.stock < 1) return failedCart();

    if (isInCart) {
      if (!(await deleteCartItemDB(data.id))) return failedCart();
      deleteItemFromCart(data.id);
    } else {
      if (!(await setCartItemDB(data.id))) return failedCart();
      addItemInCart(data);
    }

    clearAnimation();
  }

  function loadingCart() {
    setIsLoading("loading");
  }

  function failedCart() {
    setTimeout(() => {
      setIsLoading("failed");
      clearAnimation(3000);
    }, 500);
  }

  function clearAnimation(timer?: number) {
    setTimeout(() => {
      setIsLoading("");
    }, timer || 1000);
  }

  return (
    <button
      className={`${styles.button} ${styles[isLoading]}`}
      onClick={addToCart}
    >
      <div className={styles.button_main_text}>
        {isInCart ? <PiCheck /> : <PiShoppingCart />}
      </div>

      <div className={styles.button_dots}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={styles.button_check}>
        <PiCheck />
      </div>

      <div className={styles.button_failed}>
        <PiX />
      </div>
    </button>
  );
}
