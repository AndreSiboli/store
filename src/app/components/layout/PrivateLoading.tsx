import styles from "@/styles/layout/PrivateLoading.module.scss";
import Loading from "../utils/Loading";

export default function PrivateLoading() {
  return (
    <div className={styles.loading}>
      <div className={styles.loading_container}>
        <Loading />
      </div>
    </div>
  );
}
