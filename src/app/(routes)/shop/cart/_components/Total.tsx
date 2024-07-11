import { useContext } from "react";
import { CartContext } from "@/_contexts/CartContext";
import styles from "./Total.module.scss";

import Button from "@/app/components/buttons/Button";

import { PiShoppingBag } from "react-icons/pi";
import { clearCartDB } from "@/services/cart";

export default function Total() {
  const { total, clearCart } = useContext(CartContext);

  async function makingBuying() {
    alert(`If it was a real site, your buying would be $${total}`);
    const res = await clearCartDB();
    if (!res) return;
    clearCart();
  }

  return (
    <aside className={styles.total}>
      <div className={styles.total_price}>
        <h1>Total:</h1>
        <p>${total}</p>
      </div>
      <div className={styles.total_button}>
        <Button
          text={
            <>
              <PiShoppingBag />
              Buying
            </>
          }
          handleSubmit={makingBuying}
        />
      </div>
    </aside>
  );
}
