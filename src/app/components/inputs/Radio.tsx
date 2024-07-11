import styles from "@/styles/inputs/Radio.module.scss";
import { ChangeEvent } from "react";

interface PropsType {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  handleRadio: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Radio(props: PropsType) {
  const { id, name, value, handleRadio, checked } = props;

  return (
    <div className={styles.radio}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => handleRadio(e)}
      />
      <label htmlFor={id}>
        <span></span>
      </label>
    </div>
  );
}
