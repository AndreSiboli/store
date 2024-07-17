"use client";

import styles from "@/styles/pages/profile/Index.module.scss";

import { useContext } from "react";
import { UserContext } from "@/_contexts/UserContext";

import Container from "@/app/components/layout/Container";
import Loading from "@/app/components/utils/Loading";
import UserInfos from "./_components/UserInfos";
import FormChangePassword from "@/app/components/forms/FormChangePassword";
import DeleteAccount from "./_components/DeleteAccount";
import withAuth from "@/app/components/auth/withAuth";

function Profile() {
  const { user } = useContext(UserContext);

  return (
    <main className={styles.profile}>
      <Container>
        <section className={styles.profile_container}>
          {user ? (
            <div className={styles.profile_wrapper}>
              <UserInfos user={user} />
              <FormChangePassword />
              <DeleteAccount />
            </div>
          ) : (
            <div className={styles.profile_loading}>
              <Loading />
            </div>
          )}
        </section>
      </Container>
    </main>
  );
}

export default withAuth(Profile);
