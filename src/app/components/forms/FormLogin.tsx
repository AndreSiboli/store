"use client";

import { useContext, useRef, useState, useTransition } from "react";
import { checkLoginEmail, checkLoginPassword } from "@/utils/userDataManager";
import styles from "@/styles/forms/FormLogin.module.scss";

import Input from "../inputs/Input";
import Link from "next/link";
import Submit from "../buttons/Submit";
import { login } from "@/services/authServices";
import { UserContext } from "@/_contexts/UserContext";
import { useRouter } from "next/navigation";

export default function FormLogin() {
  const { defineUser } = useContext(UserContext);
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [err, setErr] = useState("");
  const [isPending, startTransition] = useTransition();

  function submit() {
    startTransition(async () => {
      setErr("");
      if (!emailRef.current || !passwordRef.current) return;
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      //Check on the front to not overload back
      if (!checkLoginEmail(email) || !checkLoginPassword(password))
        return setErr("Email or password incorrect.");

      const auth = await login({ email, password });
      if (!auth || auth.status !== 200)
        return setErr("Email or password incorrect.");

      defineUser(auth.data.user);
      router.push("/");
    });
  }

  return (
    <form action="" className={styles.form} id="login">
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
        <nav className={styles.form_forgot}>
          <Link href="/">Forgot password?</Link>
        </nav>
      </div>

      {err && (
        <div className={styles.form_err}>
          <p>{err}</p>
        </div>
      )}

      <Submit text="Sign In" handleSubmit={submit} isLoading={isPending} />
    </form>
  );
}
