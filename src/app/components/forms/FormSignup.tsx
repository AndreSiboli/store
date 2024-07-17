"use client";

import { useRef, useState, useTransition } from "react";
import {
  checkEmail,
  checkPassword,
  checkUsername,
} from "@/utils/userDataManager";
import styles from "@/styles/forms/FormLogin.module.scss";

import Input from "../inputs/Input";
import Submit from "../buttons/Submit";
import { signup } from "@/services/auth/credentials";
import { useRouter } from "next/navigation";

export default function FormSignup() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repasswordRef = useRef<HTMLInputElement>(null);
  const [err, setErr] = useState("");
  const [isPending, startTransition] = useTransition();

  function submit() {
    startTransition(async () => {
      setErr("");
      if (
        !emailRef.current ||
        !passwordRef.current ||
        !repasswordRef.current ||
        !usernameRef.current
      )
        return;

      const username = usernameRef.current.value;
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const repassword = repasswordRef.current.value;

      if (!checkUsername(username, setErr)) return;
      if (!checkEmail(email, setErr)) return;
      if (!checkPassword({ password, repassword }, setErr)) return;

      const auth = await signup({ username, email, password, repassword });
      if (!auth || auth.status !== 201) {
        return setErr(auth?.message || "An error has ocurred");
      }

      router.push("/login");
    });
  }

  return (
    <form action="" className={styles.form} id="signup">
      <div className={styles.form_input}>
        <label htmlFor="username">
          Username <span className={styles.required}>*</span>
        </label>
        <Input
          type="text"
          placeholder="Enter your username address"
          id="username"
          name="username"
          reference={usernameRef}
        />
      </div>

      <div className={styles.form_input}>
        <label htmlFor="email">
          Email <span className={styles.required}>*</span>
        </label>
        <Input
          type="email"
          placeholder="Enter your email address"
          id="email"
          name="email"
          reference={emailRef}
        />
      </div>

      <div className={styles.form_input}>
        <label htmlFor="password">
          Password <span className={styles.required}>*</span>
        </label>
        <Input
          type="password"
          placeholder="Enter your password"
          id="password"
          name="password"
          reference={passwordRef}
        />
      </div>

      <div className={styles.form_input}>
        <label htmlFor="repassword">
          Password Again <span className={styles.required}>*</span>
        </label>
        <Input
          type="password"
          placeholder="Enter your password again"
          id="repassword"
          name="repassword"
          reference={repasswordRef}
        />
      </div>

      {err && (
        <div className={styles.form_err}>
          <p>{err}</p>
        </div>
      )}

      <Submit text="Sign Up" handleSubmit={submit} isLoading={isPending} />
    </form>
  );
}
