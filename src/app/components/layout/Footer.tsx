import styles from "@/styles/layout/Footer.module.scss";
import Container from "./Container";
import Logo from "./Logo";
import { PiPinterestLogo, PiXLogo, PiYoutubeLogo } from "react-icons/pi";
import Link from "next/link";

export default function Footer() {
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
  const mentions = [
    {
      text: "DummyJSON",
      to: "https://dummyjson.com/docs/products",
    },
    {
      text: "Pexels",
      to: "https://pexels.com",
    },
  ];
  const terms = [
    { text: "TERMS AND CONDITIONS", to: "/terms-and-conditions" },
    { text: "PRIVACY POLICY", to: "/privacy-policy" },
    { text: "WORK WITH US", to: "/work-with-us" },
    { text: "CONTACT US", to: "/contact" },
  ];

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footer_container}>
          <header className={styles.footer_header}>
            <nav className={styles.header_social}>
              {socials.map((social) => (
                <Link
                  href={social.to}
                  aria-label={social.label}
                  key={social.to}
                  target="_blank"
                >
                  {social.icon}
                </Link>
              ))}
            </nav>
            
            <div className={styles.header_logo}>
              <Logo />
            </div>
          </header>

          <div className={styles.footer_navigation}>
            <div className={styles.nav_container}>
              <nav className={styles.nav_help}>
                <span>Help</span>
                <nav className={styles.group_links}>
                  <p>
                    Our team are available to help you by phone{" "}
                    {`(+555) 123-4567`} or email{" "}
                    <Link href="mailto:allgoods.ficional@outlook.com">
                      allgoods.ficional@outlook.com
                    </Link>
                  </p>
                  <Link href="/SAQ">SAQ</Link>
                </nav>
              </nav>

              <nav className={styles.nav_mention}>
                <span>Mentions</span>
                <nav className={styles.group_links}>
                  {mentions.map((mention) => (
                    <Link href={mention.to} key={mention.to} target="_blank">
                      {mention.text}
                    </Link>
                  ))}
                </nav>
              </nav>
            </div>

            <nav className={styles.nav_terms}>
              {terms.map((term) => (
                <Link href={term.to} key={term.to}>
                  {term.text}
                </Link>
              ))}
            </nav>
          </div>

          <div className={styles.footer_copyright}>
            <p>Copyright &copy; AllGoods {new Date().getFullYear()}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
