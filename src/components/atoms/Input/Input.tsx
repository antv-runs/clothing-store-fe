import styles from "./Input.module.scss";

type InputProps = {
  placeholder?: string;
};

export function Input({ placeholder }: InputProps) {
  return <input className={styles.input} placeholder={placeholder} />;
}
