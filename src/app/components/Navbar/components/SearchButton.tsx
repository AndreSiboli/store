import styles from "@/styles/Navbar/components/SearchButton.module.scss";
import { PiMagnifyingGlass } from "react-icons/pi";

interface PropsType {
  handleSearch: () => void;
}

export default function SearchButton(props: PropsType) {
  const { handleSearch } = props;

  function onClick() {
    handleSearch();
  }

  return (
    <button className={styles.button} onClick={onClick}>
      <PiMagnifyingGlass />
    </button>
  );
}
