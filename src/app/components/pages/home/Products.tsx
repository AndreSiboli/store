import { ProductsType } from "@/_types/ProductsType";
import { getByCategory } from "@/services/products";
import styles from "@/styles/pages/home/Products.module.scss";
import ProductsItem from "../../layout/ProductsItem";
import CarouselProducts from "../../carousel/CarouselProducts";
import Container from "../../layout/Container";

export default async function Products() {
  const groceries: ProductsType[] = await getByCategory("groceries");
  const kitchen: ProductsType[] = await getByCategory("kitchen-accessories");
  const smartphones: ProductsType[] = await getByCategory("home-decoration");

  const configBase = {
    animationTime: 200,
    parentWidth: "100%",
    childWidth: "calc(100% - 200px)",
    margin: 8,
    buttons: true,
    slide: true,
    autoSlide: false,
    itemPerView: 4,
  };

  return (
    <div className={styles.products}>
      <Container>
        <div className={styles.products_container}>
          <div className={styles.products_groceries} id="groceries">
            <h2>Groceries</h2>
            {groceries && (
              <CarouselProducts carouselConfig={configBase}>
                {groceries.map((grocery) => (
                  <ProductsItem data={grocery} key={grocery.id} />
                ))}
              </CarouselProducts>
            )}
          </div>
          <div className={styles.products_groceries} id="kitchen-accessories">
            <h2>Kitchen</h2>
            {kitchen && (
              <CarouselProducts carouselConfig={configBase}>
                {kitchen.map((kit) => (
                  <ProductsItem data={kit} key={kit.id} />
                ))}
              </CarouselProducts>
            )}
          </div>
          <div className={styles.products_groceries} id="decoration">
            <h2>Decoration</h2>

            {smartphones && (
              <CarouselProducts carouselConfig={configBase}>
                {smartphones.map((smartphone) => (
                  <ProductsItem data={smartphone} key={smartphone.id} />
                ))}
              </CarouselProducts>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
