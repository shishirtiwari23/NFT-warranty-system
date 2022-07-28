import styles from "./Button.module.scss";
import clsx from "clsx";

const Button = ({ type, variant = "primary", children, ...remaining }) => {
  return (
    <button
      {...remaining}
      type={type ? type : "button"}
      className={clsx(styles.container, styles[variant])}
    >
      {children}
    </button>
  );
};

export default Button;
