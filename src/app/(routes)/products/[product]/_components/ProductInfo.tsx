import styles from "./ProductInfo.module.scss";
import { ProductsType } from "@/_types/ProductsType";

import HowMuch from "@/app/components/layout/HowMuch";
import Rating from "@/app/components/layout/Rating";
import ProductButton from "@/app/components/buttons/ProductButton";
import FavoriteButton from "@/app/components/buttons/FavoriteButton";
import Link from "next/link";

//This components has more components within
export default function ProductInfo({ product }: { product: ProductsType }) {
  return (
    <section className={styles.info}>
      <section className={styles.info_wrapper}>
        <InfoHeader product={product} />

        <div className={styles.info_title}>
          <h1>{product.title}</h1>
        </div>

        <Rating rate={product.rating} count={product.rating} />

        <div className={styles.info_price}>
          <p>${product.price}</p>
        </div>

        <div className={styles.info_quantity}>
          <div className={styles.stock_left}>
            <p>Stock: {product.stock}</p>
          </div>
        </div>

        <Tags product={product} />
      </section>

      <section className={styles.info_buttons}>
        <ProductButton data={product} />
      </section>
    </section>
  );
}

function InfoHeader({ product }: { product: ProductsType }) {
  return (
    <div className={styles.info_header}>
      <div className={styles.info_header_code}>
        <p>{product.sku}</p>
      </div>

      <FavoriteButton data={product} />
    </div>
  );
}

function Tags({ product }: { product: ProductsType }) {
  return (
    <div className={styles.tags}>
      <p className={styles.tags_title}>Tags:</p>{" "}
      {product.tags.map((tag) => {
        if (tag === product.tags.at(-1))
          return (
            <p className={styles.tags_link} key={tag}>
              <Link href={"/"}>{tag}</Link>
            </p>
          );
        return (
          <p className={styles.tags_link} key={tag}>
            <Link href={"/"}>{tag}</Link>,{" "}
          </p>
        );
      })}
    </div>
  );
}
