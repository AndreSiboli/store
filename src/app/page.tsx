import styles from "@/styles/page.module.scss";

import Hero from "./components/pages/home/Hero";
import Products from "./components/pages/home/Products";
import About from "./components/pages/home/About";

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <About />
      <Products />
    </main>
  );
}
