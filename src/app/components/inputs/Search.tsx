import { Roboto } from "next/font/google";
import styles from "@/styles/inputs/Search.module.scss";

import { PiMagnifyingGlass } from "react-icons/pi";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

interface PropsType {
  type: string;
  placeholder?: string;
  id: string;
  handleSubmit: () => void;
}

export default function Search(props: PropsType) {
  const { type, placeholder, id, handleSubmit } = props;

  return (
    <div className={styles.search}>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        name={id}
        className={`${roboto.className}`}
      />

      <button onClick={handleSubmit}>
        <PiMagnifyingGlass />
      </button>
    </div>
  );
}
