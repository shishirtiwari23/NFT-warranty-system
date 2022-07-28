import { NFTCard, CollectionCard } from "../../components";
import { MainLayout } from "../../Layouts";
import styles from "./Collections.module.scss";

const Collections = () => {
  return (
    <div className={styles.container}>
      <CollectionCard />
      <NFTCard />
    </div>
  );
};

export default Collections;
