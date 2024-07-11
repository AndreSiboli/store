"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/_contexts/UserContext";
import { ProductsAPIType } from "@/_types/ProductsType";
import { deleteFavoritesDB, setFavoritesDB } from "@/services/favorites";
import styles from "@/styles/buttons/FavoriteButton.module.scss";

import { PiHeartFill } from "react-icons/pi";

interface PropsType {
  data: ProductsAPIType;
}

export default function FavoriteButton(props: PropsType) {
  const { data } = props;

  const { favorites, defineFavorite, deleteFavorite, isUserLogged } =
    useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsFavorite(
      favorites.filter((fav) => fav.id === data.id).length ? true : false
    );
  }, [favorites]);

  async function add2Favorite() {
    if (!isUserLogged()) return;
    setIsLoading(true);

    if (isFavorite) {
      const res = await deleteFavoritesDB(data.id);
      if (!res) return;
      deleteFavorite(data.id);
      setIsLoading(false);
      return;
    }
    
    const res = await setFavoritesDB(data.id);
    if (!res) return;
    defineFavorite(data);
    setIsLoading(false);
  }

  return (
    <button
      className={`${styles.button} ${isLoading && styles.loading} ${
        isFavorite && styles.favorite
      }`}
      onClick={add2Favorite}
      aria-label={`Favorite ${data.title} item`}
    >
      <PiHeartFill />
    </button>
  );
}
