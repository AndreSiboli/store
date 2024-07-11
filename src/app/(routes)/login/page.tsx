import styles from "@/styles/pages/login/Index.module.scss";

import Container from "@/app/components/layout/Container";
import FormLogin from "@/app/components/forms/FormLogin";
import Link from "next/link";

export default function Login() {
  return (
    <div className={styles.login}>
      <Container>
        <div className={styles.login_container}>
          <div className={styles.login_form}>
            <div className={styles.form_title}>
              <h1>Welcome back</h1>
              <p>Connect and Enjoy with AllGood</p>
            </div>
            <FormLogin />
            <nav className={styles.form_signup}>
              <p>
                Don&apos;t have an account? <Link href="/signup">Sign up</Link>
              </p>
            </nav>
          </div>
        </div>
      </Container>
    </div>
  );
}
