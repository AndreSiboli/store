"use client";

import { UserContext } from "@/_contexts/UserContext";
import { deleteAccountDB, logout } from "@/services/auth/user";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import styles from "@/styles/pages/delete-account/Index.module.scss";
import Container from "@/app/components/layout/Container";
import Loading from "@/app/components/utils/Loading";

export default function Logout() {
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function logoutAcc() {
      if (user) {
        const isLogout = await logout();
        if (!isLogout) return;
      }
      
      location.assign("/");
    }
    logoutAcc();
  }, []);

  return (
    <div className={styles.delete}>
      <Container>
        <div className={styles.delete_container}>
          <div className={styles.delete_loading}>
            <Loading />
          </div>
        </div>
      </Container>
    </div>
  );
}
