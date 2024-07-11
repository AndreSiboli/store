import styles from "@/styles/inputs/Input.module.scss";
import { RefObject } from "react";

interface PropsType {
  type: string;
  placeholder: string;
  id: string;
  name: string;
  reference: RefObject<HTMLInputElement>
}

export default function Input(props: PropsType) {
  const { id, name, type, placeholder, reference } = props;

  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      id={id}
      name={name}
      ref={reference}
    />
  );
}
