import { CardProps } from "./Card.types";
import styles from "./Card.module.css";

export const Card = ({ children }: CardProps): JSX.Element => {
  return <div className={styles.card}>{children}</div>;
};
