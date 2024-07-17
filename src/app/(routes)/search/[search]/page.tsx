"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/pages/under-construction/Index.module.scss";

import Container from "@/app/components/layout/Container";
import withAuth from "@/app/components/auth/withAuth";

function Search() {
  const route = useRouter();

  useEffect(() => {
    route.push("/under-construction");
  }, []);

  return (
    <div className={styles.search}>
      <Container>
        <div className={styles.search_container}>
          <div className={styles.search_wrapper}></div>
        </div>
      </Container>
    </div>
  );
}

export default withAuth(Search);
