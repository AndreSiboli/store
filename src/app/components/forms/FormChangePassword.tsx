import { useRef, useState, useTransition } from "react";
import { changePasswordDB } from "@/services/auth/user";
import { checkLoginPassword, checkPassword } from "@/utils/userDataManager";
import styles from "@/styles/forms/FormChangePassword.module.scss";

import Input from "@/app/components/inputs/Input";
import Submit from "@/app/components/buttons/Submit";

export default function FormChangePassword() {
  const [isPending, startTransition] = useTransition();
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const newRepasswordRef = useRef<HTMLInputElement>(null);
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const [err, setErr] = useState("");

  async function submit() {
    startTransition(async () => {
      setErr("");
      const check = checkPasswords();
      if (!check) return;

      const res = await changePasswordDB(check);
      if (!res || res.status !== 200)
        return setErr(res?.data?.message || "An error has ocurred");
      clearFields();
      location.reload();
    });
  }

  function checkPasswords() {
    if (
      !newPasswordRef.current ||
      !newRepasswordRef.current ||
      !oldPasswordRef.current
    )
      return;

    const newPassword = newPasswordRef.current.value;
    const newRepassword = newRepasswordRef.current.value;
    const oldPassword = oldPasswordRef.current.value;

    if (
      !checkPassword(
        { password: newPassword, repassword: newRepassword },
        setErr
      )
    )
      return;
    if (!checkLoginPassword(oldPassword))
      return setErr("Your old password is wrong.");

    return {
      password: newPassword,
      repassword: newRepassword,
      lastPassword: oldPassword,
    };
  }

  function clearFields() {
    if (
      !newPasswordRef.current ||
      !newRepasswordRef.current ||
      !oldPasswordRef.current
    )
      return;

    newPasswordRef.current.value = "";
    newRepasswordRef.current.value = "";
    oldPasswordRef.current.value = "";
  }

  return (
    <form action="" className={styles.form}>
      <legend>Change password</legend>

      <div className={styles.form_wrapper}>
        <div className={styles.form_input}>
          <label htmlFor="new_password">
            Password <span className={styles.required}>*</span>
          </label>
          <Input
            type="password"
            placeholder="Enter Your New Password"
            id="new_password"
            name="new_password"
            reference={newPasswordRef}
          />
        </div>

        <div className={styles.form_input}>
          <label htmlFor="new_repassword">
            Password again <span className={styles.required}>*</span>
          </label>
          <Input
            type="password"
            placeholder="Enter Your New Password Again"
            id="new_repassword"
            name="new_repassword"
            reference={newRepasswordRef}
          />
        </div>

        <div className={styles.form_input}>
          <label htmlFor="old_password">
            Old Password <span className={styles.required}>*</span>
          </label>
          <Input
            type="password"
            placeholder="Enter Your Old Password"
            id="old_password"
            name="old_password"
            reference={oldPasswordRef}
          />
        </div>
      </div>

      {err && (
        <div className={styles.form_err}>
          <p>{err}</p>
        </div>
      )}

      <div className={styles.form_button}>
        <Submit
          text="Change password"
          handleSubmit={submit}
          isLoading={isPending}
        />
      </div>
    </form>
  );
}
