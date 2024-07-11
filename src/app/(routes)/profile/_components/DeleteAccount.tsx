import Link from "next/link";
import styles from "./DeleteAccount.module.scss";

export default function DeleteAccount() {
  return <Link href="/m/delete-account" className={styles.link}>Delete Account</Link>;
}
