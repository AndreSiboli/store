"use client";

import { ProductsAPIType } from "@/_types/ProductsType";
import { UserType } from "@/_types/UserType";
import { firstLoadingPage, getUserDB } from "@/services/auth/user";
import { getAllProductsById } from "@/services/products";
import { ReactNode, createContext, useLayoutEffect, useState } from "react";

interface UserContextType {
  user: UserType | null;
  favorites: ProductsAPIType[];
  firstLoad: boolean;
  defineUser: (data: UserType) => void;
  defineFavorite: (data: ProductsAPIType) => void;
  deleteFavorite: (id: string | number) => void;
  isUserLogged: () => boolean;
  logoutUser: () => void;
}

export const UserContext = createContext({} as UserContextType);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const [favorites, setFavorites] = useState<ProductsAPIType[]>([]);

  useLayoutEffect(() => {
    async function gettingUser() {
      if (user) return;
      const userData = await firstLoadingPage();
      setFirstLoad(false);
      if (!userData) return;
      defineUser(userData);
    }

    gettingUser();
  }, [user]);

  useLayoutEffect(() => {
    async function gettingProducts() {
      if (!user) return;
      const favoriteData = await getAllProductsById(user.favorites);
      if (!favoriteData) return;
      setFavorites(favoriteData);
    }

    gettingProducts();
  }, [user]);

  function isUserLogged() {
    return !!user;
  }

  function defineUser(data: UserType | null) {
    setUser(data);
  }

  function defineFavorite(data: ProductsAPIType) {
    setFavorites((prevState) => [...prevState, data]);
  }

  function deleteFavorite(id: string | number) {
    const deletedItem = favorites.filter((fav) => fav.id !== id);
    setFavorites(deletedItem);
  }

  function logoutUser() {
    setUser(null);
    setFavorites([]);
  }

  return (
    <UserContext.Provider
      value={{
        defineUser,
        user,
        defineFavorite,
        favorites,
        deleteFavorite,
        isUserLogged,
        logoutUser,
        firstLoad,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
