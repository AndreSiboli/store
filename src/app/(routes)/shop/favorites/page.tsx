"use client";

import { useContext } from "react";
import { UserContext } from "@/_contexts/UserContext";
import styles from "@/styles/pages/favorites/Index.module.scss";

import Container from "@/app/components/layout/Container";
import FavoriteItem from "./_components/FavoriteItem";
import Link from "next/link";
import withAuth from "@/app/components/auth/withAuth";

 function Favorites() {
  const { favorites } = useContext(UserContext);

  return (
    <main className={styles.favorites}>
      <Container>
        <div className={styles.favorites_container}>
          {favorites.length ? (
            <div className={styles.favorites_items}>
              {favorites.map((favorite) => (
                <FavoriteItem data={favorite} key={favorite.id} />
              ))}
            </div>
          ) : (
            <div className={styles.favorites_loading}>
              <p>You don&apos;t have any favorite item.</p>
              <Link href="/">Go Shop</Link>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}

export default withAuth(Favorites)
