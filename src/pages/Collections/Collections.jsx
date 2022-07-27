import { NFTCard } from "../../components";
import { MainLayout } from "../../Layouts";
import styles from "./Collections.module.scss";

const Collections = () => {
  return (
    <div className={styles.container}>
      <NFTCard />
    </div>
  );
};

export default Collections;
