import styles from "@/styles/pages/under-construction/Index.module.scss";
import Container from "@/app/components/layout/Container";
import Link from "next/link";

export default function UnderConstruction() {
  return (
    <div className={styles.construction}>
      <Container>
        <div className={styles.construction_container}>
          <div className={styles.construction_wrapper}>
            <p>For being a fictional site. This page is under contruction. </p>
            <Link href="/">Go back</Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
