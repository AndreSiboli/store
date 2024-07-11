"use client";

import { MouseEvent } from "react";
import styles from "@/styles/buttons/Submit.module.scss";
import { Roboto } from "next/font/google";

interface PropsType {
  text: string;
  handleSubmit: () => void;
  isLoading: boolean;
}

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export default function Submit(props: PropsType) {
  const { text, handleSubmit, isLoading } = props;

  function submit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    handleSubmit();
  }
  return (
    <button
      className={`${roboto.className} ${styles.submit}`}
      onClick={(e) => submit(e)}
    >
      {isLoading ? <div className={styles.submit_loading}></div> : text}
    </button>
  );
}
