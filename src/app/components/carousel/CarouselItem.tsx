import { CSSProperties } from "react";
import { StaticImageData } from "next/image";
import styles from "@/styles/carousel/Item.module.scss";

import Img from "@/app/components/utils/Img";
import LinkButton from "@/app/components/links/LinkButton";
import Container from "@/app/components/layout/Container";

import { PiArrowDown } from "react-icons/pi";

interface PropsType {
  data: {
    src: StaticImageData | string;
    title: string;
    button: {
      link: string;
      text: string;
    };
    description: string;
  };

  style?: CSSProperties;
}

export default function CarouselItem(props: PropsType) {
  const { data, style } = props;

  return (
    <div className={styles.item} style={style}>
      <div className={styles.item_image}>
        <Img src={data.src} alt="" />
      </div>
      <Container>
        <div className={styles.item_wrapper}>
          <div className={styles.item_container}>
            <div className={styles.item_info}>
              <h1>{data.title}</h1>
              <p>{data.description}</p>
              <div className={styles.info_button}>
                <LinkButton
                  text={
                    <>
                      {data.button.text}
                      <PiArrowDown />
                    </>
                  }
                  to={data.button.link}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
