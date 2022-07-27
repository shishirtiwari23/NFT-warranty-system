import styles from "./Loading.module.scss";
import { CircularProgress, LinearProgress } from "@mui/material";

const Loading = ({ type }) => {
  if (type === "linear")
    return (
      <div
        style={{
          position: "absolute",
          top: "-2rem",
          left: "-1rem",
          width: "calc(2.5rem + 100%)",
        }}
        className={styles.container}
      >
        <LinearProgress />
      </div>
    );
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "50vh",
      }}
      className={styles.container}
    >
      <CircularProgress />
    </div>
  );
};

export default Loading;
