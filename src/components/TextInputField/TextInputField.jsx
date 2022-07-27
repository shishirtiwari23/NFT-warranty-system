import styles from "./TextInputField.module.scss";

const TextInputField = (props) => {
  const {
    id,
    type,
    label,
    placeholder,
    variant,
    value,
    onChange,
    children,
    ...remaining
  } = { ...props };
  return (
    <div
      style={variant !== "large" ? {} : { width: "650px" }}
      className={styles.container}
    >
      {children}
      {variant !== "large" ? (
        <input
          {...remaining}
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      ) : (
        <textarea
          {...remaining}
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          rows={10}
          onChange={onChange}
        ></textarea>
      )}
      <label htmlFor="">{label}</label>
    </div>
  );
};
export default TextInputField;
