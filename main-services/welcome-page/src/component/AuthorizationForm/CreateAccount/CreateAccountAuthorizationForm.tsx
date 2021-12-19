import React from "react";
import styles from "../AuthorizationForm.module.css";
import { Button, Input } from "../../";

export const CreateAccountAuthorizationForm = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Create Account</h1>

      <Input title={"Email"} valuePlaceholder={"Email.."} />

      <Input title={"Password"} valuePlaceholder={"Password.."} />

      <div className={styles.addressContainer}>
        <Input title={"Name"} valuePlaceholder={"Name.."} />
        <span className={styles.profolioCreateAccount}>.profolio</span>
      </div>

      <div className={styles.checkboxContainer}>
        <input type={"checkbox"} />
        <span>By creating an account, you agree to our Terms of Service and have read and understood the Privacy Policy.</span>
      </div>

      <Button color={"blue"} className={styles.button}>
        Create
      </Button>
    </div>
  );
};
