"use client";

import { useContext } from "react";
import { CartContext } from "@/_contexts/CartContext";
import styles from "@/styles/pages/cart/Index.module.scss";

import Container from "@/app/components/layout/Container";
import CartItem from "./_components/CartItem";
import Total from "./_components/Total";
import Link from "next/link";

export default function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <main className={styles.cart}>
      <Container>
        <div className={styles.cart_container}>
          {cart.length ? (
            <div className={styles.cart_wrapper}>
              <div className={styles.cart_products}>
                {cart.map((item) => (
                  <CartItem product={item} key={item.id} />
                ))}
              </div>
              <div className={styles.cart_total}>
                <Total />
              </div>
            </div>
          ) : (
            <div className={styles.cart_loading}>
              <p>You don&apos;t have any item in cart.</p>
              <Link href="/">Go shop</Link>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
