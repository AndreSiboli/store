import styles from "@/styles/pages/signup/Index.module.scss";

import Container from "@/app/components/layout/Container";
import Link from "next/link";
import FormSignup from "@/app/components/forms/FormSignup";

export default function SignUp() {
  return (
    <div className={styles.signup}>
      <Container>
        <div className={styles.signup_container}>
          <div className={styles.signup_form}>
            <div className={styles.form_title}>
              <h1>Welcome to AllGood</h1>
              <p>Make part of it</p>
            </div>

            <FormSignup />

            <nav className={styles.form_login}>
              <p>
                Do you have an account? <Link href="/login">Sign In</Link>
              </p>
            </nav>
            
          </div>
        </div>
      </Container>
    </div>
  );
}
