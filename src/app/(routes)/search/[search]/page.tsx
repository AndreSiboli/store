"use client";

import styles from "@/styles/pages/under-construction/Index.module.scss";
import Container from "@/app/components/layout/Container";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UnderConstruction() {
  const route = useRouter();

  useEffect(() => {
    route.push("/under-construction");
  }, []);

  return (
    <div className={styles.construction}>
      <Container>
        <div className={styles.construction_container}>
          <div className={styles.construction_wrapper}>
           
          </div>
        </div>
      </Container>
    </div>
  );
}
