import { ProductsAPIType } from "@/_types/ProductsType";
import styles from "./FavoriteItem.module.scss";

import CartButtonMinimalist from "@/app/components/buttons/CartButtonMinimalist";
import FavoriteButton from "@/app/components/buttons/FavoriteButton";
import Img from "@/app/components/utils/Img";
import Link from "next/link";

interface PropsType {
  data: ProductsAPIType;
}

export default function FavoriteItem(props: PropsType) {
  const { data } = props;
  const { id, thumbnail, title, price, description } = data;

  return (
    <div className={styles.favorite_item}>
      <div className={styles.favorite_wrapper}>
        <figure className={styles.favorite_image}>
          <Img src={thumbnail} />
        </figure>

        <section className={styles.favorite_info}>
          <Link href={`/products/${id}`}>
            <h1>{title}</h1>
          </Link>
          <p className={styles.info_price}>${price}</p>
          <p className={styles.info_description}>{description}</p>
        </section>
      </div>

      <aside className={styles.favorite_buttons}>
        <FavoriteButton data={data} />
        <CartButtonMinimalist data={data} />
      </aside>
    </div>
  );
}
