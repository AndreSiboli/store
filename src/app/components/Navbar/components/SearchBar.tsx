"use client";

import styles from "@/styles/Navbar/components/SearchBar.module.scss";

import Search from "@/app/components/inputs/Search";

import { PiX } from "react-icons/pi";
import { useRouter } from "next/navigation";

interface PropsType {
  isSearchActive: boolean;
  handleSearch: () => void;
}

export default function SearchBar(props: PropsType) {
  const { isSearchActive, handleSearch } = props;
  const route = useRouter();

  function search() {
    handleSearch();
    route.push(`/under-construction`);
  }

  return (
    <div
      className={`${styles.search} ${isSearchActive && styles.search_active}`}
    >
      <div className={styles.search_wrapper}>
        <Search
          type="text"
          placeholder="Find some product!"
          id="search"
          handleSubmit={search}
        />
      </div>
      <button onClick={handleSearch} aria-label="Close search bar">
        <PiX />
      </button>
    </div>
  );
}
