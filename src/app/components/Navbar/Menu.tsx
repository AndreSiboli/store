"use client";

import { MouseEvent } from "react";
import styles from "@/styles/Navbar/Menu.module.scss";

import Link from "next/link";
import SearchButton from "@/app/components/Navbar/components/SearchButton";

import {
  PiHeart,
  PiPinterestLogo,
  PiXLogo,
  PiYoutubeLogo,
} from "react-icons/pi";

interface PropsType {
  isMenuActive: boolean;
  handleCloseMenu: () => void;
  handleSearch: () => void;
}

export default function Menu(props: PropsType) {
  const { isMenuActive, handleCloseMenu, handleSearch } = props;
  const domains = [
    { to: "/#home", text: "Home" },
    { to: "/#about", text: "About" },
    { to: "/#products", text: "Products" },
    { to: "/#contact", text: "Contact" },
  ];
  const socials = [
    {
      icon: <PiPinterestLogo />,
      label: "Pinterest",
      to: "https://pinterest.com",
    },
    {
      icon: <PiXLogo />,
      label: "X",
      to: "https://x.com",
    },
    {
      icon: <PiYoutubeLogo />,
      label: "Youtube",
      to: "https://youtube.com",
    },
  ];

  function checkClose(e: MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLDivElement;
    if (target.id === "menu") handleCloseMenu();
  }

  return (
    <div
      className={`${styles.menu} ${isMenuActive && styles.menu_active}`}
      id="menu"
      onClick={checkClose}
    >
      <div className={styles.menu_wrapper}>
        <div className={styles.menu_search}>
          <SearchButton handleSearch={handleSearch} />
        </div>
        <div className={styles.menu_group_nav}>
          <nav className={styles.menu_navigation}>
            {domains.map((domain) => (
              <Link href={domain.to} key={domain.to}>
                {domain.text}
              </Link>
            ))}
          </nav>

          <div className={styles.menu_icons}>
            <nav className={styles.menu_social}>
              {socials.map((social) => (
                <Link
                  href={social.to}
                  aria-label={social.label}
                  key={social.to}
                >
                  {social.icon}
                </Link>
              ))}
            </nav>
            <nav className={styles.menu_favorite}>
              <Link href={""}>
                <PiHeart />
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
