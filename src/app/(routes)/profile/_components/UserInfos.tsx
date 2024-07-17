import { UserType } from "@/_types/UserType";
import styles from "./UserInfo.module.scss";
import { formatDate } from "@/utils/treatDates";
import { CiLogout } from "react-icons/ci";
import { logout } from "@/services/auth/user";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserInfos({ user }: { user: UserType }) {
  const route = useRouter();

  async function log() {
    const isLogout = await logout();
    if (!isLogout) return;
    route.push("/login");
    location.reload();
  }

  return (
    <div className={styles.user}>
      <div className={styles.user_header}>
        <figure className={styles.user_image}>{/* <Img src={''} /> */}</figure>

        <div className={styles.user_info}>
          <p className={styles.username}>{user?.username}</p>
          <p className={styles.email}>{user?.email}</p>
        </div>
      </div>

      <div>
        <div className={styles.user_data}>
          <div className={styles.data_card}>
            <h2>Member since</h2>
            <p>{formatDate(user.createdAt)}</p>
          </div>
          <div className={styles.data_card}>
            <h2>Items in cart</h2>
            <p>{4}</p>
          </div>
          <div className={styles.data_card}>
            <h2>Item in cart</h2>
            <p>{4}</p>
          </div>
        </div>
        <div className={styles.user_logout}>
          <Link href='/m/logout'>
            <CiLogout />
          </Link>
        </div>
      </div>
    </div>
  );
}
