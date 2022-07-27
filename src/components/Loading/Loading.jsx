import styles from "./Loading.module.scss";
import { CircularProgress } from "@mui/material";

const Loading = () => {
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
