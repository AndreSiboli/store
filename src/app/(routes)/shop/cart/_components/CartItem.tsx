import { ProductsType } from "@/_types/ProductsType";
import styles from "./CartItem.module.scss";

import Img from "@/app/components/utils/Img";
import Link from "next/link";
import CartButtonMinimalist from "@/app/components/buttons/CartButtonMinimalist";
import HowMuch from "@/app/components/layout/HowMuch";

export default function CartItem({ product }: { product: ProductsType }) {
  const { thumbnail, id, title, price, description, stock, howMany } = product;

  return (
    <div className={styles.cart_item}>
      <div className={styles.cart_wrapper}>
        <figure className={styles.cart_image}>
          <Img src={thumbnail} />
        </figure>

        <section className={styles.cart_info}>
          <Link href={`/products/${id}`}>
            <h1>{title}</h1>
          </Link>
          <p className={styles.info_price}>${price}</p>
          <p className={styles.info_description}>{description}</p>
        </section>
      </div>

      <aside className={styles.cart_buttons}>
        <CartButtonMinimalist data={product} />
        <section className={styles.button_stock}>
          <p>On Stock: {stock}</p>
          <HowMuch inCart={howMany} max={stock} id={product.id} />
        </section>
      </aside>
    </div>
  );
}
