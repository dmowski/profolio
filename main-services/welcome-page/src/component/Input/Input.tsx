import { InputProps } from "./Input.types";
import styles from "./Input.module.css";

export const Input = ({ valuePlaceholder, title, ...props }: InputProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.span}>{title}</span>
      <input placeholder={valuePlaceholder} className={styles.input} {...props} type="text" />
    </div>
  );
};
