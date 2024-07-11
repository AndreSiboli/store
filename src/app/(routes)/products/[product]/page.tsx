"use client";

import { ProductsType } from "@/_types/ProductsType";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductById } from "@/services/products";
import styles from "@/styles/pages/product/Index.module.scss";

import Container from "@/app/components/layout/Container";

import Img from "@/app/components/utils/Img";
import ProductInfo from "./_components/ProductInfo";
import Manager from "./_components/Manager";
import Loading from "@/app/components/utils/Loading";

export default function Product() {
  const [product, setProducts] = useState<ProductsType | null>(null);
  const param = useParams();

  useEffect(() => {
    async function response() {
      if (!param || typeof param.product !== "string") return;
      const res = await getProductById(param.product);
      if (!res || res.status !== 200) return;
      setProducts(res.data);
    }

    response();
  }, [param]);

  return (
    <main className={styles.product}>
      <Container>
        <div className={styles.product_container}>
          {product ? (
            <section className={styles.product_wrapper}>
              <div className={styles.product_header}>
                <figure className={styles.product_image}>
                  <Img
                    src={product.images[0]}
                    style={{ objectFit: "contain" }}
                  />
                </figure>

                <ProductInfo product={product} />
              </div>

              <Manager product={product} />
            </section>
          ) : (
            <div className={styles.product_loading}>
              <Loading />
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
