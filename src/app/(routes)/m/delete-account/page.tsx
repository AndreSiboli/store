"use client";

import { UserContext } from "@/_contexts/UserContext";
import { deleteAccountDB } from "@/services/authServices";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import styles from "@/styles/pages/delete-account/Index.module.scss";
import Container from "@/app/components/layout/Container";
import Loading from "@/app/components/utils/Loading";

export default function DeleteAccount() {
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function deleteAcc() {
      if (!user) return;
      await deleteAccountDB();
      location.reload();
    }
    deleteAcc();
  }, [user]);

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
