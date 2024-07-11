import styles from "@/styles/layout/ProductsItem.module.scss";
import Img from "../utils/Img";
import { ProductsType } from "@/_types/ProductsType";

import ProductButton from "../buttons/ProductButton";
import Link from "next/link";
import FavoriteButton from "../buttons/FavoriteButton";

interface PropsType {
  data: ProductsType;
}

export default function ProductsItem(props: PropsType) {
  const { data } = props;

  return (
    <div className={styles.item}>
      <div className={styles.item_favorite}>
        <FavoriteButton data={data} />
      </div>
      <div className={styles.item_image}>
        <Img src={data.thumbnail} alt={data.title} />
      </div>
      <div className={styles.item_info}>
        <Link href={`/products/${data.id}`} className={styles.item_link}>
          <div className={styles.info_title}>
            <h1>{data.title}</h1>
          </div>
        </Link>
        <div className={styles.info_description}>
          <p>{data.description}</p>
        </div>
        <div className={styles.info_price}>
          <p>${data.price}</p>
        </div>
      </div>

      <div className={styles.info_button}>
        <ProductButton data={data} />
      </div>
    </div>
  );
}
