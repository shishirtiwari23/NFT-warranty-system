import styles from "./MainLayout.module.scss";
import { Navbar } from "../../components";

const MainLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default MainLayout;
