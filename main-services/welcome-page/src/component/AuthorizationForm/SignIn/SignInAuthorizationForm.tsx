import React from "react";
import styles from "../AuthorizationForm.module.css";
import { Button, Input } from "../../";
import { NavLink } from "react-router-dom";

export const SignInAuthorizationForm = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Sign In</h1>

      <Input title={"Email"} valuePlaceholder={"Email.."} />

      <Input title={"Password"} valuePlaceholder={"Password.."} />
      <NavLink to={"/recovery-password"}>
        <span>Forgot password?</span>
      </NavLink>

      <div className={styles.checkboxContainer}>
        <input type={"checkbox"} />
        <span>Remember me</span>
      </div>

      <Button color={"blue"} className={styles.button}>
        Sign In
      </Button>
    </div>
  );
};
