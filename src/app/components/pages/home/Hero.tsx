import { CarouselTypeUser } from "@/_types/carouselType";
import { projects } from "@/datas/heroData";
import styles from "@/styles/pages/home/Hero.module.scss";

import Carousel from "@/app/components/carousel/Carousel";
import CarouselItem from "@/app/components/carousel/CarouselItem";
import Container from "@/app/components/layout/Container";

export default function Hero() {
  const items = [
    { ...projects[projects.length - 1], id: 10 },
    ...projects,
    { ...projects[0], id: 11 },
  ];

  const config: CarouselTypeUser = {
    animationTime: 200,
    margin: 0,
    childWidth: "calc(100% - 200px)",
    buttons: false,
    slide: true,
    parentWidth: "100%",
    autoSlide: true,
  };

  return (
    <section className={styles.hero}>
      <Container>
        <Carousel carouselConfig={config}>
          {items.map((item) => (
            <CarouselItem
              data={{
                src: item.src,
                description: item.description,
                button: item.button,
                title: item.title,
              }}
              key={item.id}
            />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
