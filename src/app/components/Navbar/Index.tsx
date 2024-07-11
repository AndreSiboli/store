"use client";

import { useContext, useEffect, useState } from "react";
import styles from "@/styles/Navbar/Index.module.scss";

import Container from "@/app/components/layout/Container";
import Logo from "@/app/components/layout/Logo";
import Link from "next/link";

import { PiUser, PiUserCheck, PiHeart, PiShoppingCart } from "react-icons/pi";
import Menu from "./Menu";
import SearchButton from "./components/SearchButton";
import SearchBar from "./components/SearchBar";
import { UserContext } from "@/_contexts/UserContext";

export default function Navbar() {
  const { user } = useContext(UserContext);

  const utils = [
    { to: "/shop/favorites", label: "Favorites", icon: <PiHeart /> },
    {
      to: user ? "/profile" : "/login",
      label: user ? "Profile" : "Login",
      icon: user ? <PiUserCheck /> : <PiUser />,
    },
    { to: "/shop/cart", label: "Contact", icon: <PiShoppingCart /> },
  ];
  const [isOnTop, setIsOnTop] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  function scrolling() {
    const scroll = window.scrollY;

    if (scroll === 0) setIsOnTop(true);
    else setIsOnTop(false);
  }

  useEffect(() => {
    scrolling();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrolling);

    return () => {
      window.removeEventListener("scroll", scrolling);
    };
  }, [isOnTop]);

  function defineIsMenuActive() {
    setIsMenuActive((prevState) => !prevState);
  }

  function defineIsSearchActive() {
    setIsSearchActive((prevState) => !prevState);
  }

  return (
    <header
      className={`${styles.header} ${isOnTop && styles.onTop} ${
        isMenuActive && styles.menu_active
      }`}
    >
      <Container>
        <div className={styles.header_container}>
          <div className={styles.header_menu}>
            <div className={styles.menu_hamburger} onClick={defineIsMenuActive}>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className={styles.menu_search}>
              <SearchButton handleSearch={defineIsSearchActive} />
            </div>
          </div>

          <div className={styles.header_logo}>
            <Logo />
          </div>

          <nav className={styles.header_navigation}>
            <div className={styles.navigation_action}>
              {utils.map((util) => (
                <Link href={util.to} aria-label={util.label} key={util.to}>
                  {util.icon}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </Container>

      <SearchBar
        handleSearch={defineIsSearchActive}
        isSearchActive={isSearchActive}
      />

      <Menu
        isMenuActive={isMenuActive}
        handleCloseMenu={defineIsMenuActive}
        handleSearch={defineIsSearchActive}
      />
    </header>
  );
}
