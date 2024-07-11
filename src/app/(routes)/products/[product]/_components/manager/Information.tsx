import { ProductsAPIType } from "@/_types/ProductsType";
import styles from "./Information.module.scss";

export default function Infomation({ product }: { product: ProductsAPIType }) {
  const {
    weight,
    returnPolicy,
    warrantyInformation,
    availabilityStatus,
    dimensions: { height, width, depth },
  } = product;

  const infos = [
    { key: "Weight", value: weight },
    { key: "Height", value: height },
    { key: "Width", value: width },
    { key: "Depth", value: depth },
    { key: "Availability", value: availabilityStatus },
    { key: "Warranty", value: warrantyInformation },
    { key: "returnPolicy", value: returnPolicy },
  ];

  return (
    <section className={styles.information}>
      <section className={styles.information_description}>
        <p>{product.description}</p>
      </section>

      <div className={styles.information_wrapper}>
        {infos.map((info) => (
          <div className={styles.info} key={info.key}>
            <p>
              <span>{info.key}:</span> {info.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
