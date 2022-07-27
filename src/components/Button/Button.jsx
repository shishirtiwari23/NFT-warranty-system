import styles from "./Button.module.scss";

const Button = ({ type, children, ...remaining }) => {
  return (
    <button
      {...remaining}
      type={type ? type : "button"}
      className={styles.container}
    >
      {children}
    </button>
  );
};

export default Button;
