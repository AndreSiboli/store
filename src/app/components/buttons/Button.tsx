import { CSSProperties, ReactNode } from "react";
import { Roboto } from "next/font/google";
import styles from "@/styles/buttons/Button.module.scss";


interface PropsType {
  text: string | ReactNode;
  style?: CSSProperties;
  handleSubmit: ()=>void
}

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export default function Button(props: PropsType) {
  const { text, style, handleSubmit } = props;

  return (
    <button className={`${roboto.className} ${styles.button}`} style={style}
    onClick={handleSubmit}>
      <span
        className={`${styles.button_text} ${
          typeof text !== "string" && styles.node
        }`}
      >
        {text}
      </span>
    </button>
  );
}
