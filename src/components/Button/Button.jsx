import styles from "./Button.module.scss";

const Button = ({ children, ...remaining }) => {
  return (
    <button {...remaining} className={styles.container}>
      {children}
    </button>
  );
};

export default Button;
